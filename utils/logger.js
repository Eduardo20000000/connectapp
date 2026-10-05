require("colors");

const line = "─".repeat(48);

function time() {
    return new Date().toLocaleTimeString("es-CL", {
        hour12: false
    });
}

function log(icon, title, message = "", color = "white") {

    const prefix = `[${time()}]`;

    console.log(
        `${prefix} ${icon} ${title}`[color]
        + (message ? `\n       ${message}` : "")
    );
}

module.exports = {

    info(message) {
        log("→", "INFO", message, "cyan");
    },

    success(message) {
        log("✓", "SUCCESS", message, "green");
    },

    warning(message) {
        log("!", "WARNING", message, "yellow");
    },

    error(message) {
        log("✕", "ERROR", message, "red");
    },

    connection(message) {
        log("◉", "CONNECTION", message, "blue");
    },

    packet(direction, type, message = "") {
        const arrow = direction === "in" ? "←" : "→";

        console.log(
            `[${time()}] ${arrow} PACKET`.magenta
            + `\n       Tipo: ${type}`.gray
            + (message ? `\n       ${message}`.gray : "")
        );
    },

    file(message) {
        log("▣", "FILE", message, "cyan");
    },

    separator() {
        console.log(`\n${line}`.gray);
    }
};