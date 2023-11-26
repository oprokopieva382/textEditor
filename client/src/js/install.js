const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  // Store the deferred prompt for later use
  deferredPrompt = event;
});

butInstall.addEventListener("click", async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;

    choiceResult.outcome === "accepted"
      ? console.log("User accepted the PWA installation")
      : console.log("User declined the PWA installation");

      deferredPrompt = null;
  }
});

window.addEventListener("appinstalled", (event) => {
    console.log("👍", "appinstalled", event);
});
