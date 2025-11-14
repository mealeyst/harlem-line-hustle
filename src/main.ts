import {
  Engine,
  FreeCamera,
  HemisphericLight,
  Scene,
  Vector3,
  PickingInfo,
  PointerEventTypes,
  CreateAudioEngineAsync,
  CreateSoundAsync,
  StaticSound,
  Color3,
  Mesh,
} from "@babylonjs/core";
import { ThinHighlightLayer } from "@babylonjs/core/Layers/thinHighlightLayer";
import { AppendSceneAsync } from "@babylonjs/core/Loading";
import { FreeCameraVirtualJoystickInput } from "@babylonjs/core/Cameras/Inputs/freeCameraVirtualJoystickInput";
import { VirtualJoystick } from "@babylonjs/core/Misc/virtualJoystick";
import {
  AdvancedDynamicTexture,
  TextBlock,
  Rectangle,
  Button,
} from "@babylonjs/gui";
import "@babylonjs/loaders";
import "@babylonjs/inspector";
import "@babylonjs/core/Cameras/Inputs/freeCameraVirtualJoystickInput";

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

      // Set up mobile joystick for touchscreen devices
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      if (isTouchDevice) {
        console.log("Touchscreen detected, setting up mobile joystick");

        // Use the camera's built-in virtual joystick input system
        camera.inputs.addVirtualJoystick();

        // Find the virtual joystick input in the camera's inputs
        const virtualJoystickInput = camera.inputs.attached
          .virtualJoystick as FreeCameraVirtualJoystickInput;
        if (virtualJoystickInput) {
          // Get the left joystick (movement) and customize it
          const leftJoystick = virtualJoystickInput.getLeftJoystick();
          if (leftJoystick) {
            leftJoystick.setJoystickSensibility(0.075); // Reduced by half (was 0.15)
            leftJoystick.limitToContainer = true;
            // Make joystick more visible with larger size and distinct color
            leftJoystick.containerSize = 150;
            leftJoystick.puckSize = 60;
            leftJoystick.setJoystickColor("#4CAF50"); // Green for movement

            // CRITICAL: Set position FIRST, then alwaysVisible
            // The alwaysVisible setter only works if _joystickPosition is already set!
            leftJoystick.setPosition(100, window.innerHeight - 100);

            // Now set alwaysVisible - this will properly increment _AlwaysVisibleSticks
            leftJoystick.alwaysVisible = true;

            // Update joystick position on window resize
            const updateLeftJoystickPosition = () => {
              leftJoystick.setPosition(100, window.innerHeight - 100);
            };
            window.addEventListener("resize", updateLeftJoystickPosition);
          }

          // Get the right joystick (camera rotation) and customize it
          const rightJoystick = virtualJoystickInput.getRightJoystick();
          if (rightJoystick) {
            rightJoystick.setJoystickSensibility(0.01875); // Reduced by 25% more (was 0.025, originally 0.05)
            rightJoystick.limitToContainer = true;
            // Make joystick more visible with larger size and distinct color
            rightJoystick.containerSize = 150;
            rightJoystick.puckSize = 60;
            rightJoystick.setJoystickColor("#FF9800"); // Orange for camera rotation

            // CRITICAL: Set position FIRST, then alwaysVisible
            // The alwaysVisible setter only works if _joystickPosition is already set!
            rightJoystick.setPosition(
              window.innerWidth - 100,
              window.innerHeight - 100
            );

            // Now set alwaysVisible - this will properly increment _AlwaysVisibleSticks
            rightJoystick.alwaysVisible = true;

            // Update joystick position on window resize
            const updateRightJoystickPosition = () => {
              rightJoystick.setPosition(
                window.innerWidth - 100,
                window.innerHeight - 100
              );
            };
            window.addEventListener("resize", updateRightJoystickPosition);
          }

          // Force joysticks to be visible by ensuring the canvas is set up correctly
          // The VirtualJoystick canvas is created with position: absolute and zIndex: 5
          // We need to ensure it's visible and properly layered
          const ensureJoysticksVisible = () => {
            if (VirtualJoystick.Canvas) {
              // Ensure canvas is visible and properly positioned
              VirtualJoystick.Canvas.style.zIndex = "1"; // Lower than GUI (1000)
              VirtualJoystick.Canvas.style.position = "fixed"; // Ensure it's fixed to viewport
              VirtualJoystick.Canvas.style.top = "0px";
              VirtualJoystick.Canvas.style.left = "0px";
              VirtualJoystick.Canvas.style.width = "100%";
              VirtualJoystick.Canvas.style.height = "100%";
              VirtualJoystick.Canvas.style.backgroundColor = "transparent";
              VirtualJoystick.Canvas.style.touchAction = "none";

              // CRITICAL: Make canvas not intercept pointer events by default
              // We'll handle pointer events manually to only capture in joystick areas
              VirtualJoystick.Canvas.style.pointerEvents = "none";

              // Ensure canvas is in the DOM and visible
              if (!document.body.contains(VirtualJoystick.Canvas)) {
                document.body.appendChild(VirtualJoystick.Canvas);
              }

              // Force canvas to be visible
              VirtualJoystick.Canvas.style.display = "block";
              VirtualJoystick.Canvas.style.visibility = "visible";
              VirtualJoystick.Canvas.style.opacity = "1";

              // Create overlay divs for joystick areas that will capture touches
              // Left joystick area
              let leftJoystickArea =
                document.getElementById("left-joystick-area");
              if (!leftJoystickArea) {
                leftJoystickArea = document.createElement("div");
                leftJoystickArea.id = "left-joystick-area";
                leftJoystickArea.style.position = "fixed";
                leftJoystickArea.style.width = "300px";
                leftJoystickArea.style.height = "300px";
                leftJoystickArea.style.bottom = "0px";
                leftJoystickArea.style.left = "0px";
                leftJoystickArea.style.zIndex = "2"; // Above joystick canvas, below GUI
                leftJoystickArea.style.pointerEvents = "auto";
                leftJoystickArea.style.touchAction = "none";
                document.body.appendChild(leftJoystickArea);
              }

              // Right joystick area
              let rightJoystickArea = document.getElementById(
                "right-joystick-area"
              );
              if (!rightJoystickArea) {
                rightJoystickArea = document.createElement("div");
                rightJoystickArea.id = "right-joystick-area";
                rightJoystickArea.style.position = "fixed";
                rightJoystickArea.style.width = "300px";
                rightJoystickArea.style.height = "300px";
                rightJoystickArea.style.bottom = "0px";
                rightJoystickArea.style.right = "0px";
                rightJoystickArea.style.zIndex = "2"; // Above joystick canvas, below GUI
                rightJoystickArea.style.pointerEvents = "auto";
                rightJoystickArea.style.touchAction = "none";
                document.body.appendChild(rightJoystickArea);
              }

              // Forward pointer events from overlay areas to the VirtualJoystick canvas
              const forwardPointerEvent = (e: PointerEvent) => {
                // Temporarily enable pointer events on canvas
                VirtualJoystick.Canvas!.style.pointerEvents = "auto";
                // Create a new event and dispatch it on the canvas
                const newEvent = new PointerEvent(e.type, {
                  pointerId: e.pointerId,
                  bubbles: true,
                  cancelable: true,
                  clientX: e.clientX,
                  clientY: e.clientY,
                  button: e.button,
                  buttons: e.buttons,
                  pressure: e.pressure,
                  width: e.width,
                  height: e.height,
                  tiltX: e.tiltX,
                  tiltY: e.tiltY,
                  pointerType: e.pointerType,
                  isPrimary: e.isPrimary,
                });
                VirtualJoystick.Canvas!.dispatchEvent(newEvent);
                // Disable pointer events again after a short delay
                setTimeout(() => {
                  if (VirtualJoystick.Canvas) {
                    VirtualJoystick.Canvas.style.pointerEvents = "none";
                  }
                }, 0);
              };

              // Set up event forwarding for left joystick area
              if (leftJoystickArea) {
                leftJoystickArea.addEventListener("pointerdown", (e) => {
                  forwardPointerEvent(e);
                });
                leftJoystickArea.addEventListener("pointermove", (e) => {
                  forwardPointerEvent(e);
                });
                leftJoystickArea.addEventListener("pointerup", (e) => {
                  forwardPointerEvent(e);
                });
                leftJoystickArea.addEventListener("pointercancel", (e) => {
                  forwardPointerEvent(e);
                });
              }

              // Set up event forwarding for right joystick area
              if (rightJoystickArea) {
                rightJoystickArea.addEventListener("pointerdown", (e) => {
                  forwardPointerEvent(e);
                });
                rightJoystickArea.addEventListener("pointermove", (e) => {
                  forwardPointerEvent(e);
                });
                rightJoystickArea.addEventListener("pointerup", (e) => {
                  forwardPointerEvent(e);
                });
                rightJoystickArea.addEventListener("pointercancel", (e) => {
                  forwardPointerEvent(e);
                });
              }

              // Update joystick area positions on resize
              const updateJoystickAreas = () => {
                if (leftJoystickArea) {
                  leftJoystickArea.style.width = "300px";
                  leftJoystickArea.style.height = "300px";
                  leftJoystickArea.style.bottom = "0px";
                  leftJoystickArea.style.left = "0px";
                }
                if (rightJoystickArea) {
                  rightJoystickArea.style.width = "300px";
                  rightJoystickArea.style.height = "300px";
                  rightJoystickArea.style.bottom = "0px";
                  rightJoystickArea.style.right = "0px";
                }
              };
              window.addEventListener("resize", updateJoystickAreas);
            }

            // Force joysticks to render by setting their positions
            // This should trigger the _drawVirtualJoystick loop
            if (leftJoystick && leftJoystick.alwaysVisible) {
              // Set position to trigger initial render
              leftJoystick.setPosition(100, window.innerHeight - 100);
            }
            if (rightJoystick && rightJoystick.alwaysVisible) {
              // Set position to trigger initial render
              rightJoystick.setPosition(
                window.innerWidth - 100,
                window.innerHeight - 100
              );
            }
          };

          // Try multiple times to ensure it works (canvas creation is async)
          ensureJoysticksVisible();
          setTimeout(ensureJoysticksVisible, 100);
          setTimeout(ensureJoysticksVisible, 300);
          setTimeout(ensureJoysticksVisible, 500);

          // Also check on window resize
          window.addEventListener("resize", ensureJoysticksVisible);
        }

        console.log("Mobile joystick initialized");
      }

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

    // Set up generic interactable mesh system
    const shawnMesh = scene.meshes.find((mesh) => mesh.name === "Shawn") as
      | Mesh
      | undefined;

    // Define interactable meshes and their interaction handlers
    interface InteractableMesh {
      mesh: Mesh;
      interactionHandler: () => Promise<void>;
      buttonText: string;
    }

    const interactableMeshes: InteractableMesh[] = [];

    if (shawnMesh) {
      console.log("Found Shawn mesh, setting up interaction system");

      // Create GUI for text popup
      const guiTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");
      guiTexture.idealWidth = 1920;
      guiTexture.idealHeight = 1080;
      // Ensure GUI is above joysticks - access the canvas element after creation
      setTimeout(() => {
        const guiCanvas = document.querySelector(
          'canvas[data-engine="Babylon.js"]'
        )?.nextElementSibling as HTMLElement;
        if (guiCanvas && guiCanvas.tagName === "CANVAS") {
          guiCanvas.style.zIndex = "1000";
          guiCanvas.style.pointerEvents = "auto";
        }
      }, 100);

      // Create background rectangle for text
      const backgroundRect = new Rectangle("shawnTextBackground");
      backgroundRect.width = "500px";
      backgroundRect.height = "300px";
      backgroundRect.cornerRadius = 10;
      backgroundRect.color = "white";
      backgroundRect.thickness = 2;
      backgroundRect.background = "rgba(0, 0, 0, 0.7)";
      backgroundRect.horizontalAlignment =
        Rectangle.HORIZONTAL_ALIGNMENT_CENTER;
      backgroundRect.verticalAlignment = Rectangle.VERTICAL_ALIGNMENT_CENTER;
      backgroundRect.isVisible = false;
      guiTexture.addControl(backgroundRect);

      // Create text block (initially hidden)
      const textBlock = new TextBlock("shawnText");
      textBlock.text = `Hello! I'm Shawn, and you're riding
        with me on the Harlem Line Hustle!`;
      textBlock.color = "white";
      textBlock.fontSize = 30;
      textBlock.textHorizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
      textBlock.textVerticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;
      textBlock.isVisible = false;
      backgroundRect.addControl(textBlock);

      // Set up audio engine and sound (will be initialized on first user interaction)
      let shawnSound: StaticSound | null = null;
      let audioInitialized = false;
      let audioInitializing = false;

      // Function to initialize audio (called on first user interaction)
      const initializeAudio = async () => {
        if (audioInitialized || audioInitializing) {
          return;
        }
        audioInitializing = true;

        try {
          const audioEngine = await CreateAudioEngineAsync();
          console.log("Audio engine created");

          // Wait for the audio engine to unlock (required for browser autoplay policies)
          await audioEngine.unlockAsync();
          console.log("Audio engine unlocked");

          // Create sound
          shawnSound = await CreateSoundAsync(
            "shawnClickSound",
            "/shawn.mp3",
            {},
            audioEngine
          );
          console.log("Shawn sound loaded successfully");
          audioInitialized = true;
        } catch (error) {
          console.error("Failed to set up audio:", error);
        } finally {
          audioInitializing = false;
        }
      };

      // Track if text is currently showing
      let isShowingText = false;

      // Function to handle Shawn interaction
      const triggerShawnInteraction = async () => {
        if (!isShowingText) {
          isShowingText = true;

          // Show text and background
          textBlock.isVisible = true;
          backgroundRect.isVisible = true;

          // Initialize audio on first click (user gesture required)
          if (!audioInitialized && !audioInitializing) {
            await initializeAudio();
          }

          // Play sound if available (wait for initialization if needed)
          if (audioInitializing) {
            // Wait for audio to finish initializing
            while (audioInitializing) {
              await new Promise((resolve) => setTimeout(resolve, 100));
            }
          }

          if (shawnSound) {
            try {
              shawnSound.play();
              console.log("Playing Shawn sound");
            } catch (error) {
              console.warn("Could not play sound:", error);
            }
          }

          // Hide text after 3 seconds
          setTimeout(() => {
            textBlock.isVisible = false;
            backgroundRect.isVisible = false;
            isShowingText = false;
          }, 3000);
        }
      };

      // Add Shawn to interactable meshes
      interactableMeshes.push({
        mesh: shawnMesh,
        interactionHandler: triggerShawnInteraction,
        buttonText: "Interact",
      });

      // Set up highlight layer for interactable meshes
      const highlightLayer = new ThinHighlightLayer("highlightLayer", scene, {
        mainTextureRatio: 0.5,
        blurTextureSizeRatio: 0.3,
      });

      let currentlyHighlightedMesh: Mesh | null = null;
      let currentInteractionHandler: (() => Promise<void>) | null = null;

      // Set up click/pick detection
      const handlePick = async (pickInfo: PickingInfo) => {
        const interactable = interactableMeshes.find(
          (item) => item.mesh === pickInfo.pickedMesh
        );
        if (interactable) {
          await interactable.interactionHandler();
        }
      };

      // Add click/pick event listener
      scene.onPointerObservable.add(async (pointerInfo) => {
        if (pointerInfo.type === PointerEventTypes.POINTERDOWN) {
          const pickResult = scene.pick(scene.pointerX, scene.pointerY);
          if (pickResult) {
            await handlePick(pickResult);
          }
        }
      });

      // Check what the camera is looking at (center of screen) continuously
      const checkCenterOfScreen = () => {
        if (!scene.activeCamera) return;

        // Pick at the center of the screen
        const centerX = engine.getRenderWidth() / 2;
        const centerY = engine.getRenderHeight() / 2;
        const pickResult = scene.pick(centerX, centerY);

        // Find if we're looking at an interactable mesh
        const interactable = pickResult?.pickedMesh
          ? interactableMeshes.find(
              (item) => item.mesh === pickResult.pickedMesh
            )
          : null;

        if (interactable) {
          // We're looking at an interactable mesh
          if (currentlyHighlightedMesh !== interactable.mesh) {
            // Remove previous highlight
            if (currentlyHighlightedMesh) {
              highlightLayer.removeMesh(currentlyHighlightedMesh);
            }
            // Add new highlight
            highlightLayer.addMesh(interactable.mesh, Color3.Yellow());
            currentlyHighlightedMesh = interactable.mesh;
            currentInteractionHandler = interactable.interactionHandler;
          }
        } else {
          // Not looking at an interactable mesh
          if (currentlyHighlightedMesh) {
            highlightLayer.removeMesh(currentlyHighlightedMesh);
            currentlyHighlightedMesh = null;
            currentInteractionHandler = null;
          }
        }
      };

      // Check center of screen every frame
      scene.onBeforeRenderObservable.add(checkCenterOfScreen);

      // Add mobile button for interaction (only on touch devices)
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      if (isTouchDevice) {
        // Create generic interaction button
        const interactButton = Button.CreateSimpleButton(
          "interactionButton",
          "Interact"
        );
        interactButton.width = "200px";
        interactButton.height = "50px";
        interactButton.color = "white";
        interactButton.background = "rgba(76, 175, 80, 0.8)"; // Green background
        interactButton.cornerRadius = 10;
        interactButton.fontSize = 18;
        interactButton.thickness = 2;
        interactButton.horizontalAlignment = Button.HORIZONTAL_ALIGNMENT_CENTER;
        interactButton.verticalAlignment = Button.VERTICAL_ALIGNMENT_TOP;
        interactButton.top = "20px";
        interactButton.isVisible = false; // Initially hidden

        // Update button text and visibility based on what we're looking at
        const updateButton = () => {
          if (currentlyHighlightedMesh && currentInteractionHandler) {
            const interactable = interactableMeshes.find(
              (item) => item.mesh === currentlyHighlightedMesh
            );
            if (interactable) {
              interactButton.textBlock!.text = interactable.buttonText;
              interactButton.isVisible = true;
            }
          } else {
            interactButton.isVisible = false;
          }
        };

        // Add hover effect
        interactButton.onPointerEnterObservable.add(() => {
          interactButton.background = "rgba(76, 175, 80, 1)";
        });
        interactButton.onPointerOutObservable.add(() => {
          interactButton.background = "rgba(76, 175, 80, 0.8)";
        });

        // Trigger interaction on button click
        interactButton.onPointerClickObservable.add(async () => {
          if (currentInteractionHandler) {
            await currentInteractionHandler();
          }
        });

        guiTexture.addControl(interactButton);

        // Update button visibility every frame
        scene.onBeforeRenderObservable.add(updateButton);

        console.log("Mobile interaction button added");
      }

      console.log("Interactable mesh system set up");
    } else {
      console.warn("Shawn mesh not found in scene");
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
