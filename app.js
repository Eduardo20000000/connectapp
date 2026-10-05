require('colors')
const WebSocket = require('ws')
const {openProgramHandler} = require('./utils/openProgram');
const handleMouseMovement = require('./utils/handleMouseMovement');
const tecladoHandler = require('./utils/tecladoHandler');
const { findPrograms } = require('./utils/findProgramsHandler');
const PacketBuilder = require('./utils/packetBuilder');
const uploadBuilder = require('./utils/uploadBuilder');
const logger = require('./utils/logger');
let linkCode;
console.clear()
console.log(`
╔═════════════════════════════════════════════════════╗
║          || - || Iniciando ConnectApp || - ||       ║
║                                                     ║
╚═════════════════════════════════════════════════════╝ 
`.green)
logger.info("Iniciando aplicación...");
logger.info("© 2026 Eduardo Layana");
logger.separator()
const appData = {
    "database": {
        "host": "api.connectapp.dpdns.org"
    },
    "server": {
        "port": 443,
        "host": "masterserver.connectapp.dpdns.org"
    }
}
const websocket = new WebSocket(`wss://${appData.server.host}:${appData.server.port}`)
websocket.onopen = () => {
logger.success("WebSocket conectado correctamente");
logger.connection(`Servidor: ${appData.server.host}:${appData.server.port}`);    setTimeout(() => {
    let packet = {
            type: 1,
            data: {
                deviceType: 0, // 0: PC
                loggedIn: false //No es necesario para la laptop, pues el celu es el que se loguea y vincula con la laptop.
            }
        }
        websocket.send(JSON.stringify(packet))
logger.info("Registrando dispositivo como PC...");
    }, 3000)
}
websocket.onclose = (event) => {
 logger.warning(
    `WebSocket cerrado\n` +
    `Código: ${event.code}\n` +
    `Motivo: ${event.reason || "Sin motivo especificado"}`
);

}
 websocket.onmessage = (event) => {
        let message = JSON.parse(event.data)
        if(message.msgType === 4){
            let packet = {
                type: 5,//onReady - Ahora esperamos la respuesta con el codigo de vinculación creado
                data: {}
            }
            setTimeout(() => {
                websocket.send(JSON.stringify(packet))
            }, 2000)
        }
          if(message.msgType === 5){
            var QRCode = require('qrcode')
            linkCode = message.data.code;

       logger.success("Código de vinculación generado");

console.log(
    `\n       🔗 Código: ${message.data.code}`.green.bold
);
QRCode.toString(`https://connectapp.dpdns.org/mobile.html?linkCode=${message.data.code}`,{type:'terminal', small: true}, function (err, url) {
    console.log(url)
})

logger.info("Escanea el código QR o introduce el código manualmente");
        }

           if(message.msgType === 6){
         logger.info(message.data.message)
        }
         if(message.msgType === 7){
             handleMouseMovement(websocket, message)
            
        }
        if(message.msgType === 8){
            openProgramHandler(linkCode, websocket, message.data)
        }
         if(message.msgType === 10){
            tecladoHandler(websocket, message.data)
            
        }
        if(message.msgType === 11){
            let programas = findPrograms();
            
                let packet = {
                type: 11,
                data: {
                    programas,
                    connectCode: linkCode
                }
            }
            websocket.send(JSON.stringify(packet))
             packet = {
                type: 9,
                data: 
{message: `Se han obtenido ${programas.length} programas de accesos_directos!`, linkCode, color: "notification"}                
            }
                    websocket.send(JSON.stringify(packet))

        }
        if(message.msgType === 12){
            uploadBuilder(message.data, linkCode, websocket)
        }
 }