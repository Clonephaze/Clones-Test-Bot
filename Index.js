const Discord = require('discord.js');
 const client = new Discord.Client();

client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', msg => {
 if (msg.content === 'ping') {
 msg.reply('pong');
 }
 });

client.login('MTEyMDU4MTA3NTk2MjQzNzcxMg.GvTtsO.2YxQYdfTfpftPqyC0cgnNP48vkiDNkJ43rMJH0');``