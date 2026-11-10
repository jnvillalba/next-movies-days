import AOS from "aos";

let initialized = false;

export function refreshMovieAnimations() {
  if (!initialized) {
    AOS.init({
      duration: 400,
      easing: "ease-out",
      offset: 60,
      once: true,
      mirror: false,
      // React explicitly refreshes AOS after list changes.
      disableMutationObserver: true,
    });
    initialized = true;
    return;
  }

  AOS.refreshHard();
}
