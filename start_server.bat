@echo off
cd /d %~dp0

start "Etiquetas" cmd /k http-server
start "Inspecao"  cmd /k node index.js

pause