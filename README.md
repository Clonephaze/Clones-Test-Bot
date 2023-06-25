<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/q6xoMVH.png" alt="Project logo"></a>
</p>
<h3 align="center">Clone's Test Bot</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Issues](https://img.shields.io/github/issues/Clonephaze/Clones-Test-Bot)](https://github.com/Clonephaze/Clones-Test-Bot/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/Clonephaze/Clones-Test-Bot/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center"> Welcome to the Git repository for my Discord Bot
    <br> 
</p>

![Alt Text](https://i.imgur.com/vxPkm4Z.gif)


## 📝 Table of Contents

- [📝 Table of Contents](#-table-of-contents)
- [🧐 About ](#-about-)
- [🏁 Getting Started ](#-getting-started-)
- [✔ Prerequisites ](#-prerequisites-)
- [💻 Installing ](#-installing-)
- [🎈 Usage ](#-usage-)
- [⛏️ Built Using ](#️-built-using-)
- [✍️ Authors ](#️-authors-)
- [🎉 Acknowledgements ](#-acknowledgements-)

## 🧐 About <a name = "about"></a>

&nbsp;&nbsp;&nbsp;I designed this bot as a side project as a way to sharpen my JavaScript skills, and I just wanted a helpful bot that wouldn't cost me an arm and a leg to use. While serving as a platform to enhance the author's programming skills, the bot is intended to be a valuable asset when connected to any server. By integrating with the Wolfram Alpha API and ChatGPT API, it possesses the capability provide robust and powerful knowledge, resources, and more. Additionally, it has a couple automatic problem detections that will respond to users having common issues. With its potential for future growth and expansion, this bot aspires to become an increasingly versatile tool, offering an array of functionalities and contributing to an enriched Discord community experience.

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will help you get your bot up and running using your own personal tokens for the Discord bot, Wolfram Alpha API, and ChatGPT API. Just follow these steps, and you'll have your bot set up and ready to go in no time! 
## ✔ Prerequisites <a name = "prerequisites"></a>

To make it extremely easy for the end user I have created an install script that will do most of the tedious work for you! If you would rather use the manual install instructions, you can find them [HERE](./manualInstallInstructions.md). Otherwise read on!

This guide is going to start at a point assuming you've already made and gotten your Discord bot token . If you have not already done so please come back to this guide when you have. Additionally, if you want to use the Wolfram Alpha or Chat GPT commands then you will need their respective API keys.

Before you can use the script you'll need to select and install the appropriate versions of Node.js [HERE](https://nodejs.org/), Python [HERE](https://www.python.org/downloads), and Git [HERE](https://gitforwindows.org/)

After you're done with that you'll need to create a folder where you'd like your bot to live, somewhere like: C:\Users\YOUR_USERNAME_HERE\Documents\GitHub.

## 💻 Installing <a name = "installing"></a>

Now that you have Node.js, Python, and git and you've created a folder where you'd like your bot to reside we can move on to seting up the bot itself! Go ahead and download the install script [HERE](https://github.com/Clonephaze/Clones-Test-Bot/releases/latest) and place it inside your previously made folder. When ready, execute the script. 

The script will proceed to clone the git repository and install the required libraries to make the bot and all commands work. After it has installed the libraries it will prompt you prompt you for the following information:

- Your Discord bot token found [HERE](https://discord.com/developers/applications) *aplication->Bot->Bot Token*
- Your Application ID found [HERE](https://discord.com/developers/applications) *aplication->General Information->Application ID*
- Your Server ID found [HERE](https://support.discord.com/hc/en-us/articles/206346498) *Open discord application->Right click your server->Copy server ID*
- Your Wolfram Alpha API key *optional* 
- Your ChatGPT API key *optional*

After that last prompt it will close and you're left with a completely prepared environment for your bot!

**LAST STEP!** Open up a command prompt window in the directory with your bot and run the following command. The easiest way to open a command prompt window in the correct directory is to type "cmd" into the address bar and hit enter.
```
node index.js
```
If everything was done correctly that should be it! Your bot should now be logged on through the console to whatever server you invited it to. 

## 🎈 Usage <a name="usage"></a>

Now that you've logged in the bot in the console, open the Discord server the bot is connected to and type "/" in any text channel to bring up a list of commands!


## ⛏️ Built Using <a name = "built_using"></a>

- [Discord.js](https://discord.js.org/)
- [Discordjs-ChatGPT](https://github.com/Elitezen/discordjs-chatgpt/) - ChatGPT library for Discord.js

## ✍️ Authors <a name = "authors"></a>

- [@Clonephaze](https://github.com/Clonephaze)


## 🎉 Acknowledgements <a name = "acknowledgement"></a>

- Hat tip to anyone whose code was used
- [@kylelobo](https://github.com/kylelobo) -ReadMe Generator. Very useful as a template builder.
