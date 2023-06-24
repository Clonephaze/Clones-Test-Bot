@echo off

echo %~dp0 > %userprofile%\Documents\CTBSCL.txt

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

set /p original_location=<%userprofile%\Documents\CTBSCL.txt
cd /d %original_location%

git clone https://github.com/Clonephaze/Clones-Test-Bot %original_location%

cd %original_location%/Clones-Test-Bot/Install Script

python "DependenciesFileCreation.py"
