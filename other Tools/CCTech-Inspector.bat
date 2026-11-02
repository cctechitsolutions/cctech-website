@echo off
setlocal
title CCTech IT Solutions - Laptop Inspector

if not exist "%~dp0CCTech-Inspector.ps1" (
    echo [ERROR] CCTech-Inspector.ps1 must be in the same folder as this launcher.
    echo Download both CCTech Inspector files and keep them together.
    pause
    exit /b 1
)

echo Starting CCTech Laptop Inspector...
echo.

rem ExecutionPolicy Bypass applies to this PowerShell process only.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0CCTech-Inspector.ps1"
set "exitCode=%errorlevel%"

if not "%exitCode%"=="0" (
    echo.
    echo [ERROR] Inspector exited with code %exitCode%.
    pause
)

exit /b %exitCode%
