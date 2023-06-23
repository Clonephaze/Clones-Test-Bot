 <p align="center">
     <a href="" rel="noopener">
       <img class="round-image" width=200px height=200px src="https://i.imgur.com/M5fBsF7.jpg" alt="Project logo">
     </a>
   </p>

   <link rel="stylesheet" type="text/css" href="style.css">

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

This guide is going to start at a point assuming you've already made and gotten your Discord bot token, and you installed a code editor such as Visual Studio Code or something else that will let you edit .js files. If you have not already done so please come back to this guide when you have. Additionally, if you want to use the Wolfram Alpha or Chat GPT commands then you will need their respective API keys.

Once you've got all that out of the way there's a library you'll need to install and a file structure to setup so lets go over all that first. 

Starting with Node.js: Select and install the appropriate version of Node.js [HERE](https://nodejs.org/).

After you're done with that you'll need to create a folder where you'd like your bot to live, somewhere like: C:\Users\YOUR_USERNAME_HERE\Documents\GitHub.

## 💻 Installing <a name = "installing"></a>

Now that you have Node.js and you've created a folder where you'd like your bot to reside we can move on to seting up the bot itself! If you know how to clone a repo you can do that, if not go ahead and download the entire git directory [HERE](https://github.com/Clonephaze/Clones-Test-Bot/archive/refs/heads/main.zip) and place the folder titled "Clones-Test-Bot-main" inside your previously made folder. 

After that, open the "Clones-Test-Bot-main" folder and open a command prompt window in that folder. The easiest way is to type "cmd" in the address bar. We're going to be installing the required libraries to make the bot and all commands work. 

Once there type the following command to install Discord.js
```
npm install discord.js
```
Then type the following command to install the dotEnv library
```
npm i dotenv
```
Then type the following command to install the undici library
```
npm i undici
```
Now if you're going to want to use the chatGPT command you'll also need this library
```
npm i discordjs-chatgpt
```
Only a few more steps to go! Now we need to make a couple files. First, open up the "Clones-Test-Bot-main" directory in your choice of code editor.

Creat a new file and name it "config.json"

Open the file and copy the following text into it:
```
{
  "token": "{YOUR_BOT_TOKEN_HERE}",
  "clientId": "{YOUR_APPLICATION_ID_HERE}",
  "guildId": "{YOUR_SERVER_ID_HERE}",
  "WolfAPI": "{YOUR-WOLFRAM-API-KEY}"
}
```
Edit each field with the appropriate key/token being sure to REMOVE THE BRACKETS "{}" and then save your file. If you need help figuring out your discord keys please refer to this [insruction&nbsp;page.](https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands)

Now lets invite your bot onto whatever server you're wanting your bot to run on. Under your [Developer&nbsp;Portal](https://discord.com/developers/applications) open your application and on the left side chose OAuth2->URL Generator. In the "scopes" box choose "bot". In the permissions box that pops up choose the permissions you want. I chose admin to keep it simple personally. Copy the generated URL at the bottom of the page and enter it into a browser you're signed in through to invite to the appropriate server. Follow the instructions on that screen.

If you would like to use the ChatGPT command you will need just one more file, if not feel free to move on to the last step! If so, go ahead and create one more file in the base directory for the bot and name it ".env" with no letters or numbers proceeding the file name. In this file enter the following line.

```
YOUR_OPENAI_API_KEY={Paste your openAI API key here}
```
Again be sure to replace the field with your api key and take care that the brackets "{}" are removed, then save your file.

LAST STEP! Open up a command prompt window in the base bot directory again, and this time type the following command.
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
- Inspiration
- References
**