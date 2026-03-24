@echo off
title BW Lead Server + Tunnel
echo.
echo  ╔══════════════════════════════════════╗
echo  ║  BW Lead Capture Server + Tunnel     ║
echo  ╚══════════════════════════════════════╝
echo.

REM Check if ngrok is installed
where ngrok >NUL 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [!] ngrok nicht gefunden.
    echo.
    echo  Installation:
    echo  1. https://ngrok.com/download ^> Windows x64
    echo  2. Entpacken nach C:\ngrok\
    echo  3. Zu PATH hinzufuegen: setx PATH "%%PATH%%;C:\ngrok"
    echo  4. Account erstellen: ngrok.com ^> Auth Token kopieren
    echo  5. ngrok config add-authtoken TOKEN
    echo.
    pause
    exit /b 1
)

REM Start lead server in background
echo [1] Starte Lead Server auf Port 8020...
start /B C:\Users\Fabien\AppData\Local\Programs\Python\Python312\python.exe ^
    C:\JARVIS\agents\jarvis_lead_server.py

timeout /t 2 >NUL

REM Start ngrok tunnel
echo [2] Starte ngrok Tunnel...
echo     (URL erscheint unten - in index.html eintragen!)
echo.
ngrok http 8020
