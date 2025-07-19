// Check for saved theme preference or use prefers-color-scheme
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
const currentTheme = localStorage.getItem("theme");

// Function to set theme
function setTheme(theme) {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    const themeSelect = document.getElementById("theme-select");
    
    if (theme === "light") {
        document.documentElement.setAttribute("data-theme", "light");
        themeColorMeta.content = "#f5f0e9"; // Light theme content bg color
        if (themeSelect) themeSelect.value = "light";
    } else if (theme === "system") {
        if (prefersDarkScheme.matches) {
            document.documentElement.removeAttribute("data-theme");
            themeColorMeta.content = "#1a1a1a"; // Dark theme content bg color
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            themeColorMeta.content = "#f5f0e9"; // Light theme content bg color
        }
        if (themeSelect) themeSelect.value = "system";
    } else {
        // Default to dark theme
        document.documentElement.removeAttribute("data-theme");
        themeColorMeta.content = "#1a1a1a"; // Dark theme content bg color
        if (themeSelect) themeSelect.value = "dark";
    }
}

// Set initial theme based on saved preference or default to dark
if (currentTheme) {
    setTheme(currentTheme);
} else {
    // Default to dark mode if no saved preference
    setTheme("dark");
}

// Handle theme change from select
function handleThemeChange(event) {
    const selectedTheme = event.target.value;
    localStorage.setItem("theme", selectedTheme);
    setTheme(selectedTheme);
}

// Add event listener when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    const themeSelect = document.getElementById("theme-select");
    if (themeSelect) {
        themeSelect.addEventListener("change", handleThemeChange);
    }
});

// Legacy support for existing checkbox if it exists
if (document.getElementById("footer-checkbox")) {
    document.getElementById("footer-checkbox").addEventListener("change", function() {
        const currentTheme = localStorage.getItem("theme") || "dark";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    });
}

// Listen for changes in system color scheme preference
prefersDarkScheme.addEventListener("change", (e) => {
    // Only update if the user has selected system theme
    if (localStorage.getItem("theme") === "system") {
        setTheme("system");
    }
});