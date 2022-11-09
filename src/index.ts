import { HLHLogo } from "./components/logo";
import * as Stage from "./components/stage";
customElements.define("hlh-logo", HLHLogo);
window.addEventListener("load", () => {
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
  });

  document.querySelectorAll(".navLink").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const { target } = event;
      const scrollToElement = document.querySelector(
        (target as HTMLAnchorElement).getAttribute("href")
      );

      Stage.contentRegion().navigate(scrollToElement);
      // scrollToElement.scrollIntoView({ behavior: "smooth" });
    });
  });
});
