@echo off
echo.
echo.
echo Aby wylaczyc serwer wcisnij ctrl+c, po pojawieniu sie wpisz Y i nacisnij Enter
echo.
start chrome.exe http://localhost:3000
node ./server.js
