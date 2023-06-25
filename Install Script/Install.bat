@echo off

echo %~dp0 > %userprofile%\Documents\CTBSCL.txt

powershell -command "& {Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Force}"

node -v > nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js is already installed.
) else (
    echo Node.js is being installed, please wait...
    curl -o node.msi https://nodejs.org/dist/v20.3.1/node-v20.3.1-x64.msi

    powershell -Command "Start-Process -FilePath 'msiexec.exe' -ArgumentList '/i node.msi /quiet' -Verb RunAs"
)

set /p original_location=<%userprofile%\Documents\CTBSCL.txt

reg query "HKLM\SOFTWARE\Python\PythonCore\3.8" > nul 2>&1
if %errorlevel% equ 0 (
    echo Python is already installed.
) else (
    echo Python is being installed, please wait...
    cd /d %original_location%
    REM The following three lines of code are from @torphedo https://github.com/torphedo/BOTW-Mods/blob/main/code/scripts/Installer.bat#L31-L33
    curl -s -o python-3.8.10-amd64.exe https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe
    python-3.8.10-amd64.exe /quiet InstallAllUsers=1 DefaultAllUsersTargetDir=C:\Python38 PrependPath=1
    del python-3.8.10-amd64.exe
)

choco list --local-only chocolateygui > nul 2>&1
if %errorlevel% equ 0 (
    echo Chocolatey is already installed.
) else (
    echo Chocolatey is being installed, please wait...
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
)

where git > nul 2>&1
if %errorlevel% equ 0 (
    echo Git is already installed.
) else (
    echo Git is being installed, please wait...
    choco install git -y
)

for /f "tokens=3*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path') do set syspath=%%A%%B

for /f "tokens=3*" %%A in ('reg query "HKCU\Environment" /v Path') do set userpath=%%A%%B

set PATH=%userpath%;%syspath%

set /p original_location=<%userprofile%\Documents\CTBSCL.txt
cd /d %original_location%

git clone https://github.com/Clonephaze/Clones-Test-Bot

cd Clones-Test-Bot/Install Script

python "DependenciesFileCreation.py"
