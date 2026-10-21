module.exports = tecladoHandler
const { keyboard, Key, KeyboardClass, mouse, Button } = require("@nut-tree-fork/nut-js");
var array = ["copiar", "pegar", "pantalla completa", "cerrar ventana actual", "sostener click", "liberar click", "subir", "bajar"]

async function tecladoHandler(socket, data) {
    if (data.tecla == "nada lol" && data.metodo !== undefined) {
        switch (data.metodo) {
            case "copiar": {
                keyboard.pressKey(Key.LeftControl, Key.C)
                keyboard.releaseKey(Key.LeftControl, Key.C)
                break
            }
            case "pegar": {
                keyboard.pressKey(Key.LeftControl, Key.V)
                keyboard.releaseKey(Key.LeftControl, Key.V)
                break
            }
            case "pantalla completa": {
                keyboard.pressKey(Key.Fn, Key.F11)
                break

            }
            case "cerrar ventana actual": {
                keyboard.pressKey(Key.LeftAlt, Key.F4)
                keyboard.releaseKey(Key.LeftAlt, Key.F4)
                break

            }
            case "sostener click": {
                mouse.pressButton(Button.LEFT)
                break

            }
            case "liberar click": {
                mouse.releaseButton(Button.LEFT)
                break

            }
            case "subir": {
                keyboard.pressKey(Key.PageUp)
                keyboard.releaseKey(Key.PageUp)

                break

            }
            case "bajar": {
                keyboard.pressKey(Key.PageDown)
                keyboard.releaseKey(Key.PageDown)


                break

            }


        }
        return

    }
    if (data.tecla == "borrar") {
        keyboard.type(Key.Backspace)
        return;
    }
    keyboard.type(data.tecla)
}