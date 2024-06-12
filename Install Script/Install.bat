@echo off

title "Installing Dependencies"

REM This script sets up a development environment by installing several dependencies and cloning the GitHub repository for the bot

REM This creates a file in your documents folder that stores the directory location that you would like to clone the git into
REM This was necessary as I need to refresh the PATH later on which erases any normal attempt to tell the script where to clone.
echo %~dp0 > %userprofile%\Documents\CTBSCL.txt

REM Check if Node.js is installed, and if not, download and install it.
node -v > nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js is already installed.
) else (
    echo Node.js is being installed, please wait...
    curl -o node.msi https://nodejs.org/dist/v20.3.1/node-v20.3.1-x64.msi

    powershell -Command "Start-Process -FilePath 'msiexec.exe' -ArgumentList '/i node.msi /quiet' -Verb RunAs"
    IF NOT !errorlevel! NEQ 0 (
        echo An error occurred while installing Node.js.
        pause
        exit
    )
)

REM Retrieve the original location of the script.
set /p original_location=<%userprofile%\Documents\CTBSCL.txt

REM Checks if Python 3.8 is installed, and if not, downloads and installs it.
reg query "HKLM\SOFTWARE\Python\PythonCore\3.8" > nul 2>&1
if %errorlevel% equ 0 (
    echo Python is already installed.
) else (
    echo Python is being installed, this install may take a minute, please wait...
    cd /d %original_location%
    REM The following code is inspired from @torphedo https://github.com/torphedo/BOTW-Mods/blob/main/code/scripts/Installer.bat#L31-L33
    curl -s -o python-3.8.10-amd64.exe https://www.python.org/ftp/python/3.8.10/python-3.8.10-amd64.exe
    python-3.8.10-amd64.exe /quiet InstallAllUsers=1 DefaultAllUsersTargetDir=C:\Python38 PrependPath=1
    IF NOT !errorlevel! NEQ 0 (
        echo An error occurred while installing Python.
        pause
        exit
    )
    del python-3.8.10-amd64.exe
)

REM Checks if Chocolatey is installed, and if not, downloads and installs it.
if not exist "%ChocolateyInstall%" (
    echo Chocolatey is not installed. Proceeding with installation, please wait...
    @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
    IF NOTerrorlevel NEQ 0 (
        echo An error occurred while installing Chocolatey.
        pause
        exit
    )
) else (
    dir "%ChocolateyInstall%" /a-d /b >nul 2>nul
    if %errorlevel% equ 0 (
        echo Chocolatey is already installed.
    ) else (
        echo Chocolatey installation directory is empty. Proceeding with installation, please wait...
        @"%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe" -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "[System.Net.ServicePointManager]::SecurityProtocol = 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))" && SET "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin"
        IF NOTerrorlevel NEQ 0 (
            echo An error occurred while installing Chocolatey.
            pause
            exit
        )
    )
)

REM Checks if Git is installed, and if not, downloads and installs it.
where git > nul 2>&1
if %errorlevel% equ 0 (
    echo Git is already installed.
) else (
    echo Git is being installed, please wait...
    choco install git -y
     IF NOT !errorlevel! NEQ 0 (
        echo An error occurred while installing Git.
        pause
        exit
    )
)

title "Cloning the GitHub repository"

REM Update the system PATH with the user's PATH.
for /f "tokens=3*" %%A in ('reg query "HKLM\SYSTEM\CurrentControlSet\Control\Session Manager\Environment" /v Path') do set syspath=%%A%%B
for /f "tokens=3*" %%A in ('reg query "HKCU\Environment" /v Path') do set userpath=%%A%%B
set "PATH=%userpath%;%syspath%"

REM Change the current directory to the original location of the script.
set /p original_location=<%userprofile%\Documents\CTBSCL.txt
cd /d %original_location%

REM Clone a GitHub repository.
git clone -b ForWildModsServer https://github.com/Clonephaze/Clones-Test-Bot
IF NOT !errorlevel! NEQ 0 (
    echo An error occurred while cloning the repository.
    pause
    exit
)

REM Delete the file used to store the directory location.
if exist "%userprofile%\Documents\CTBSCL.txt" (
    del "%userprofile%\Documents\CTBSCL.txt"
)

REM Change the current directory to the cloned repository's Install Script directory.
cd Clones-Test-Bot/Install Script

REM Run a Python script.
python "DependenciesFileCreation.py"
IF NOT !errorlevel! NEQ 0 (
    echo An error occurred while running the Python script.
    pause
    exit
)