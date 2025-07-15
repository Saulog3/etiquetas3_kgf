@echo off
cd /d %~dp0

start "Inspecao"  cmd /k node index.js

pause
