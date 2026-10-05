module.exports = {openProgramHandler}
const fs = require('fs')
    let packetbBuilder = require('./packetBuilder');

async function openProgramHandler(linkCode, ws, data, executePath) {
    const programName = data.program;
    const path = require('path');
    const { exec, execSync, spawn } = require('child_process');
    
    const specialApps = {
  msedge: "microsoft-edge:",
  notepad: "notepad",
  calc: "calc",
};

    function findProgramPath(name) {
      try {
        if(specialApps[name] || name.endsWith(".lnk")) {
          if(name.endsWith(".lnk")) return {isSpecial: true, name}
          return {isSpecial: true, name: specialApps[name]};
        }
    const result = execSync(`where.exe ${name}`, {
      encoding: "utf8",
    });

    return result.split("\n")[0].trim();
  } catch {
    return null;
  }
    }
    let programPath = findProgramPath(programName);
    if(programPath && programPath.isSpecial) {
      exec(`start "" "${programPath.name}"`, (error) => {
         if (error) {
           console.error(`Error al abrir ${programName}:`.red, error);
           let packet = {
                type: 9,
                data: 
{message: `Error al abrir ${programName}!`, linkCode, color: "error"}                
            }
            ws.send(JSON.stringify(packet))
            return;
        } else {
             let packet = {
                type: 9,
                data: 
{message: `Se ha abierto ${programName} extitosamente!`, linkCode, color: "notification"}                
            }
            ws.send(JSON.stringify(packet))
        }
      })
      return;
    }
    if(!programPath) return console.log("No se encontro ni una wea")
    if(executePath) programPath = executePath;

    exec(`start "" "${programPath}"`, (error) => {
        if (error) {
           console.error(`Error al abrir ${programName}:`.red, error);
            let packet = {
                type: 9,
                data: 
{message: `Error al abrir ${programName}!`, linkCode, color: "error"}                
            }
            ws.send(JSON.stringify(packet))
            return;
        } else {
                   let packet = {
                type: 9,
                data: 
{message: `Se ha abierto ${programName} extitosamente!`, linkCode, color: "notification"}                
            }
            ws.send(JSON.stringify(packet))

        }
    })
}