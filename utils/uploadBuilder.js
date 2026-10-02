const fs = require('fs')
require('colors')
let allUploads = []
module.exports = function uploadFile(data){
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
        console.log("Archivo enviado desde celular".yellow)
    }
    if(data.type !== 'file-start' && data.type !== 'file-end'){
        const buffer = Buffer.from(data.chunk, "base64")
        //significa q hay q escribir D:
        let find = allUploads.find((x) => x.id === `${data.transferID}`)
        if(!find) return
        find.writer.write(buffer)
    }
       if(data.type == 'file-end'){
        //significaclear q hay q finalizar
        let find = allUploads.find((x) => x.id === `${data.transferID}`)
        if(!find) return
        find.writer.end()
        console.log("Se ha terminado de subir el archivo. Puedes revisarlo en " + `${process.cwd()}/uploads/${find.name}`)
    }
}