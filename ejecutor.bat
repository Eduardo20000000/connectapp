@echo off
title Control Remoto - Iniciando...

echo ========================================
echo       CONTROL REMOTO
echo ========================================
echo.
echo Instalando paquetes necesarios...
echo.

call npm install

if %errorlevel% neq 0 (
echo.
echo [ERROR] No se pudieron instalar los paquetes.
pause
exit /b
)

echo.
echo ========================================
echo       Iniciando aplicacion...
echo ========================================
echo.

node app.js

echo.
echo ========================================
echo       Aplicacion finalizada
echo ========================================
pause
