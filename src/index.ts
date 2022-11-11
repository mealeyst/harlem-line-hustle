import { HLHLogo } from "./components/logo";
import * as Stage from "./components/stage";
customElements.define("hlh-logo", HLHLogo);
window.addEventListener("load", () => {
  let currentElement = document.querySelector("#about");
  Stage.renderStage();
  Stage.contentRegion().open();
  window.addEventListener(
    "mousemove",
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      Stage.renderSpotlight(e.clientX, e.clientY);
    },
    false
  );

  window.addEventListener("resize", () => {
    Stage.renderStage();
    Stage.contentRegion(true).render();
    currentElement.scrollIntoView();
  });

  document.querySelectorAll(".navLink").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const { target } = event;
      const scrollToElement = document.querySelector(
        (target as HTMLAnchorElement).getAttribute("href")
      );
      currentElement = scrollToElement;
      document.querySelector("#mainNav").classList.remove("open");
      Stage.contentRegion().navigate(scrollToElement);
      // scrollToElement.scrollIntoView({ behavior: "smooth" });
    });
  });

  document.querySelector("#menuOpen").addEventListener("click", (e) => {
    console.log("Opening");
    document.querySelector("#mainNav").classList.add("open");
  });
  document.querySelector("#menuClose").addEventListener("click", (e) => {
    document.querySelector("#mainNav").classList.remove("open");
  });
});
