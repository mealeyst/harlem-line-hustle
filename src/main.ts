import {
  Engine,
  FreeCamera,
  HemisphericLight,
  Scene,
  Vector3,
} from "@babylonjs/core";
import { AppendSceneAsync } from "@babylonjs/core/Loading";
import "@babylonjs/loaders";
import "@babylonjs/inspector";

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const engine = new Engine(canvas, true);
const scene = new Scene(engine);

// Function to resize canvas based on inspector visibility
const resizeCanvas = () => {
  let inspectorWidth = 0;
  if (scene.debugLayer.isVisible()) {
    // Try to get the actual inspector width from the DOM
    const inspectorHost = document.getElementById("babylonjs-inspector-host");
    if (inspectorHost) {
      inspectorWidth = inspectorHost.offsetWidth || 600; // Fallback to 600px if not found
    } else {
      inspectorWidth = 600; // Default inspector width (300px left + 300px right)
    }
  }
  canvas.width = window.innerWidth - inspectorWidth - 1;
  canvas.height = window.innerHeight - 5;
  engine.resize();
};

// Initial resize
resizeCanvas();

// Handle window resize
window.addEventListener("resize", () => {
  resizeCanvas();
});

// Create a default camera immediately so the scene can render
const defaultCamera = new FreeCamera(
  "defaultCamera",
  new Vector3(0, 5, 10),
  scene
);
defaultCamera.speed = 0.2; // Slow down camera movement
// Set up collision detection for default camera
defaultCamera.ellipsoid = new Vector3(0.5, 1, 0.5);
defaultCamera.checkCollisions = true;
defaultCamera.applyGravity = false;
// Lock default camera height
const defaultCameraHeight = defaultCamera.position.y;
scene.onBeforeRenderObservable.add(() => {
  if (
    scene.activeCamera === defaultCamera &&
    defaultCamera.position.y !== defaultCameraHeight
  ) {
    defaultCamera.position.y = defaultCameraHeight;
  }
});
defaultCamera.attachControl(canvas, true);
defaultCamera.target = Vector3.Zero();
scene.activeCamera = defaultCamera;

// Add a default light immediately
const defaultLight = new HemisphericLight(
  "defaultLight",
  new Vector3(0, 1, 0),
  scene
);
defaultLight.intensity = 1;

// Load the GLB file
AppendSceneAsync("/train_scene.glb", scene)
  .then(() => {
    console.log("Scene loaded successfully");

    // Find cameras in the scene (excluding the default one)
    const glbCameras = scene.cameras.filter((cam) => cam !== defaultCamera);

    if (glbCameras.length > 0) {
      // GLB has cameras, use the first one (or activeCamera if it's from GLB)
      const cameraToUse =
        scene.activeCamera && scene.activeCamera !== defaultCamera
          ? scene.activeCamera
          : glbCameras[0];

      console.log("Switching to camera from GLB file:", cameraToUse.name);

      // Slow down camera movement for GLB camera (if it's a FreeCamera)
      if (cameraToUse instanceof FreeCamera) {
        cameraToUse.speed = 0.2; // Slow down camera movement
        // Set up collision detection for GLB camera
        cameraToUse.ellipsoid = new Vector3(0.5, 1, 0.5);
        cameraToUse.checkCollisions = true;
        cameraToUse.applyGravity = false;
        // Lock GLB camera height
        const glbCameraHeight = cameraToUse.position.y;
        scene.onBeforeRenderObservable.add(() => {
          if (
            scene.activeCamera === cameraToUse &&
            cameraToUse.position.y !== glbCameraHeight
          ) {
            cameraToUse.position.y = glbCameraHeight;
          }
        });
      }

      scene.activeCamera = cameraToUse;
      cameraToUse.attachControl(canvas, true);

      // Dispose of the default camera
      defaultCamera.detachControl();
      defaultCamera.dispose();
    } else {
      // No camera in the GLB, keep using the default one
      console.log("No camera in GLB, using default camera");
      if (scene.activeCamera !== defaultCamera) {
        scene.activeCamera = defaultCamera;
      }
    }

    // Check lights - if GLB has lights, we can keep the default as backup or remove it
    const glbLights = scene.lights.filter((light) => light !== defaultLight);
    if (glbLights.length > 0) {
      console.log("GLB has lights, keeping default light as backup");
    } else {
      console.log("No lights in GLB, using default light");
    }

    // Set up collision detection
    // scene.collisionsEnabled = true;

    // Collision mesh names to enable
    const collisionMeshNames = [
      "Collision_Detection",
      "Train_Car_Body",
      "Train_Car_Wall",
      "Train_Car_Doors",
    ];

    // Find and enable collisions for specified meshes
    const collisionMeshes: any[] = [];
    scene.meshes.forEach((mesh) => {
      // Check if mesh name contains any of the collision names
      const matches = collisionMeshNames.some((name) =>
        mesh.name.includes(name)
      );

      if (matches) {
        mesh.checkCollisions = true;
        collisionMeshes.push(mesh);
        console.log(`Enabled collision detection for mesh: ${mesh.name}`);
      }
    });

    // Set up camera collision detection and lock height
    if (scene.activeCamera instanceof FreeCamera) {
      const camera = scene.activeCamera;
      camera.ellipsoid = new Vector3(0.25, 0.5, 0.25);
      camera.checkCollisions = true;
      camera.applyGravity = false;

      // Lock camera height - store initial Y position
      const lockedHeight = camera.position.y;

      // Keep camera at the same height in the render loop
      scene.onBeforeRenderObservable.add(() => {
        if (camera.position.y !== lockedHeight) {
          camera.position.y = lockedHeight;
        }
      });

      console.log(
        "Enabled camera collision detection and locked height at",
        lockedHeight
      );
    }

    if (collisionMeshes.length === 0) {
      console.warn(
        "No collision meshes found. Searched for:",
        collisionMeshNames.join(", ")
      );
    } else {
      console.log(
        `Enabled collision detection for ${collisionMeshes.length} mesh(es)`
      );
    }

    // Set up animations
    const sittingAnimation = scene.animationGroups.find(
      (ag) => ag.name === "001.sitting"
    );
    const lookRightAnimation = scene.animationGroups.find(
      (ag) => ag.name === "003.look_right"
    );

    if (sittingAnimation) {
      // Play sitting animation on loop
      sittingAnimation.play(true); // true = loop
      console.log("Playing 001.sitting animation");

      // Set up look_right animation triggers based on sitting animation loops
      if (lookRightAnimation) {
        let loopCount = 0;
        // Random number of loops to wait before triggering look_right (between 2-5 loops)
        let targetLoops = Math.floor(Math.random() * 4) + 2;

        // Listen for sitting animation loops
        sittingAnimation.onAnimationLoopObservable.add(() => {
          loopCount++;

          // When we reach the target number of loops, trigger look_right
          if (loopCount >= targetLoops) {
            loopCount = 0; // Reset counter
            // Generate new random target for next cycle
            targetLoops = Math.floor(Math.random() * 4) + 2;

            // Stop sitting animation
            sittingAnimation.stop();

            // Play look_right animation once
            lookRightAnimation.play(false); // false = don't loop

            // When look_right finishes, return to sitting
            lookRightAnimation.onAnimationEndObservable.addOnce(() => {
              sittingAnimation.play(true);
            });
          }
        });

        console.log(
          `Set up 003.look_right animation triggers after ${targetLoops} sitting loops`
        );
      }
    } else {
      console.warn("Animation '001.sitting' not found in scene");
    }
  })
  .catch((error) => {
    console.error("Error loading scene:", error);
  });

// Add keyboard event listener for Ctrl+I to toggle inspector
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "i") {
    event.preventDefault();
    if (scene.debugLayer.isVisible()) {
      scene.debugLayer.hide();
    } else {
      scene.debugLayer.show();
    }
    // Resize canvas after toggling inspector
    setTimeout(() => {
      resizeCanvas();
    }, 100); // Small delay to ensure inspector DOM is updated
  }
});

engine.runRenderLoop(() => {
  scene.render();
});
