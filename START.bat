call  npm install

IF %ERRORLEVEL% NEQ 0 (
    echo Lỗi khi chạy npm install.
    pause
    exit /b %ERRORLEVEL%
)

node index.js

pause