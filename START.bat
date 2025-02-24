@echo off
SETLOCAL

echo Checking environment requirements...

node -v >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js chưa được cài đặt.
    echo Vui long tai Node.js tu https://nodejs.org/
    pause
    EXIT /B 1
)

git --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git chua duoc cai dat.
    echo Vui long tai Git tu https://git-scm.com/
    pause
    EXIT /B 1
)

echo Installing dependencies...
call npm install
IF %ERRORLEVEL% NEQ 0 (
    echo ERROR: Loi khi chay npm install
    pause
    EXIT /B %ERRORLEVEL%
)

if not exist index.js (
    echo ERROR: Khong tim thay file index.js
    pause
    EXIT /B 1
)

echo Starting application...
node index.js

echo.
echo Application closed with code %ERRORLEVEL%
pause