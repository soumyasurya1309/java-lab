window.onload = function () {
    let savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
        applyTheme(savedTheme);
        updateStorageDisplay();
        document.getElementById("message").innerText = "Welcome back! Theme restored.";
    }
};

function setTheme(theme) {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
    sessionStorage.setItem("currentTheme", theme);
    updateStorageDisplay();
    document.getElementById("message").innerText = "Theme saved: " + theme;
}

function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
}

function clearTheme() {
    localStorage.removeItem("theme");
    sessionStorage.removeItem("currentTheme");
    document.body.classList.remove("dark");
    updateStorageDisplay();
    document.getElementById("message").innerText = "Theme preference cleared.";
}

function updateStorageDisplay() {
    let localVal = localStorage.getItem("theme") || "—";
    let sessionVal = sessionStorage.getItem("currentTheme") || "—";
    document.getElementById("localValue").innerText = localVal;
    document.getElementById("sessionValue").innerText = sessionVal;
}
