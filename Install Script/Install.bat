@echo off

powershell -command "& {Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Force}"

node -v > nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js is already installed.
) else (
    curl -o node.msi https://nodejs.org/dist/v20.3.1/node-v20.3.1-x64.msi

    powershell -Command "Start-Process -FilePath 'msiexec.exe' -ArgumentList '/i node.msi /quiet' -Verb RunAs"
)


choco list --local-only chocolateygui > nul 2>&1
if %errorlevel% equ 0 (
    echo Chocolatey is already installed.
) else (
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
)

where git > nul 2>&1
if %errorlevel% equ 0 (
    echo Git is already installed.
) else (
    choco install git -y
)

for /f "tokens=3*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path') do set syspath=%%A%%B

for /f "tokens=3*" %%A in ('reg query "HKCU\Environment" /v Path') do set userpath=%%A%%B

set PATH=%userpath%;%syspath%

git clone https://github.com/Clonephaze/Clones-Test-Bot %userprofile%/Documents/Github/Clones-Test-Bot

cd %userprofile%/Documents/Github/Clones-Test-Bot

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

