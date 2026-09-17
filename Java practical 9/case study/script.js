window.onload = function () {
    let lastDay = localStorage.getItem("lastViewedDay");
    let sessionClicks = sessionStorage.getItem("sessionClicks") || 0;

    if (lastDay) {
        highlightDay(lastDay);
        document.getElementById("message").innerText = "Welcome back! Last viewed: " + lastDay;
    }

    document.getElementById("localValue").innerText = lastDay || "—";
    document.getElementById("sessionValue").innerText = sessionClicks;
};

function selectDay(day) {
    let clicks = parseInt(sessionStorage.getItem("sessionClicks") || 0) + 1;
    sessionStorage.setItem("sessionClicks", clicks);
    localStorage.setItem("lastViewedDay", day);

    highlightDay(day);
    updateStorageDisplay();

    alert("📅 " + day + " Schedule Selected!\n\nSession Clicks: " + clicks);
}

function highlightDay(day) {
    document.querySelectorAll(".day-row").forEach(row => {
        row.classList.remove("active");
    });

    document.querySelectorAll('.day-row[data-day="' + day + '"]').forEach(row => {
        row.classList.add("active");
    });
}

function updateStorageDisplay() {
    let lastDay = localStorage.getItem("lastViewedDay") || "—";
    let sessionClicks = sessionStorage.getItem("sessionClicks") || 0;

    document.getElementById("localValue").innerText = lastDay;
    document.getElementById("sessionValue").innerText = sessionClicks;
}

function clearData() {
    localStorage.removeItem("lastViewedDay");
    sessionStorage.removeItem("sessionClicks");

    document.querySelectorAll(".day-row").forEach(row => {
        row.classList.remove("active");
    });

    updateStorageDisplay();
    document.getElementById("message").innerText = "All schedule data cleared.";
} 
