@echo off

REM Change PowerShell execution policy
powershell -command "& {Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Force}"

curl -o node.msi https://nodejs.org/dist/v20.3.1/node-v20.3.1-x64.msi

REM Install Node.js using msiexec.exe
msiexec.exe /i node.msi /quiet

curl -s -o git.exe https://github.com/git-for-windows/git/releases/download/v2.41.0.windows.1/Git-2.41.0-64-bit.exe
start /wait git.exe /SILENT

git clone https://github.com/Clonephaze/Clones-Test-Bot

cd Clones-Test-Bot

npm install

echo { "token": "", "clientId": "", "guildId": "", "WolfAPI": "" } > template-config.json

set /p token="Enter your Discord bot token: "
set /p clientId="Enter your application's client ID: "
set /p guildId="Enter your server ID: "
set /p WolfAPI="Enter your Wolfram API key or just press enter to skip: "

powershell -Command "(Get-Content template-config.json -Raw | ConvertFrom-Json) | ForEach-Object { $_.token = '%token%'; $_.clientId = '%clientId%'; $_.guildId = '%guildId%'; $_.WolfAPI = '%WolfAPI%'; $_ } | ConvertTo-Json -Depth 100 | Set-Content config.json"

echo USER_ENTRY_HERE > template.env

set /p userEntry="Enter your OpenAI API key or just press enter to skip: "

powershell -Command "(Get-Content template.env) -replace 'USER_ENTRY_HERE', '%userEntry%' | Set-Content .env"

del template-config.json
del template.env
