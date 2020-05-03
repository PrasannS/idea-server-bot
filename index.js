const Discord = require("discord.js")
const client = new Discord.Client()
const fs = require('fs') 

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {

  if (msg.content.includes('-add')) {
    var wordArr = msg.content.split(' ');

    var ind = msg.content.indexOf(wordArr[1])+wordArr[1].length+1;
    fs.appendFile('tasks/'+wordArr[1]+'.txt', "\n"+msg.content.substring(ind), (err) => { 
    if (err) throw err;
	});
	msg.reply("added to **"+wordArr[1]+"**");

  }
  else if (msg.content.includes('-read')){
  	var wordArr = msg.content.split(' ');
  	try{
  		const message = fs.readFileSync('tasks/'+wordArr[1]+'.txt').toString('utf-8');
  		console.log(message);
  		var tasks = message.split("\n");
  		console.log(tasks);
  		var temp = "";
  		for (t in tasks){
  			if (tasks[t]===""){}
  			else{
  				temp+="\n"+t+" "+tasks[t];
  			}
  		}
  		msg.reply(temp);
  	}
  	catch(err){
		const message = "**doesn't exist**";
		console.log(message);
  		msg.reply(message);
  	}
  }
  else if (msg.content.includes('-clear')){
  	var wordArr = msg.content.split(' ');
  	fs.writeFile('tasks/'+wordArr[1]+'.txt', "", (err) => { 
    	if (err) throw err;
	});
  	msg.reply('**cleared**');
  }
  else if (msg.content.includes('-list')){
  	var tasks = fs.readdirSync('tasks');
  	var temp = "";
  	for (t in tasks){
  		temp+="\n"+t+". "+tasks[t].substring(0,tasks[t].indexOf('.'));
  	}
  	msg.reply("\n**List of all task lists:**"+temp);
  }


})

/*
client.on("guildMemberAdd", member => {
  member.send(
    `Hi Lucas, you should be more polite to me next time!`
  )
})
*/

client.login("NzA2MjU2OTY3MjIzNzM4NDEx.Xq3nMA.gaJZ0m2NPnvOu-oKoRAi6zAcSuI")