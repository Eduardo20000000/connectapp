const fs = require('fs')
require('colors')
const logger = require('../utils/logger');

let allUploads = []
module.exports = function uploadFile(data, linkCode, ws){
    if(data.type == "file-start"){
        allUploads.push(
            {
                id: data.transferID,
                mimetype: data.mimetype,
                size: data.size,
                name: data.name,
                writer: fs.createWriteStream(`${process.cwd()}/uploads/${data.name}`)
            }
        )
     logger.info("Archivo enviado desde celular".yellow)
    }
    if(data.type !== 'file-start' && data.type !== 'file-end'){
        const buffer = Buffer.from(data.chunk, "base64")
        //significa q hay q escribir D:
        let find = allUploads.find((x) => x.id === `${data.transferID}`)
        if(!find) return
        find.writer.write(buffer)
    }
       if(data.type == 'file-end'){
        //hay q finalizar
        let find = allUploads.find((x) => x.id === `${data.transferID}`)
        if(!find) return
        find.writer.end()
        logger.success("Se ha terminado de subir el archivo. Puedes revisarlo en " + `${process.cwd()}/uploads/${find.name}`)
            let packet = {
                type: 9,
                data: 
{message: `Se terminó de subir ${find.name} a la carpeta de uploads.`, linkCode, color: "success"}                
            }
            ws.send(JSON.stringify(packet))
    }
}