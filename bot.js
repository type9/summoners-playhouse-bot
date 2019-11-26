const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');

//game scripts to import
const SR_Snitch = require('/game_scripts/sr_snitch.js');
client.login(auth.token);

//configurables
//this object models information that needs to be passed to a game script
class ServerConfig{
  constructor(){
    this.cmd = ('!gm');

    this.gm_channel = String;
    this.gm_lobby = String;

    this.sr_snitch_lobby = String;
    this.sr_snitch_announcements = String;
    this.sr_snitch_t1_voice = String;
    this.sr_snitch_t2_voice = String;
    this.sr_snitch_t1_text = String;
    this.sr_snitch_t2_text = String;
  }
}

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

// setting default test values
let config = new ServerConfig()
config.gm_lobby = ('Lobby');
config.gm_channel = ('game-status');

config.sr_snitch_lobby = ('SR Snitch');
config.sr_snitch_announcements('announcements');
config.sr_snitch_t1_text = ('announcements-team-1');
config.sr_snitch_t2_text = ('announcements-team-2');
config.sr_snitch_t1_voice = ('team-1');
config.sr_snitch_t2_voice = ('team-2');

client.on('message', msg => {
    this_guild = msg.guild
    if (!this_guild) return; // checks that the message comes from a server

    if((msg.channel.parent.name == config.gm_lobby) && (msg.channel.name == config.gm_channel)){ // checks the message is coming from the correct channel in the correct category
      n = 0; // represents number of parameters we are in
      msg_content = msg.content.split(' '); // splits into an array

      if(msg_content[n] == config.cmd){ // checks for the cmd key term
        n += 1; //move one layer argument deeper
        
        if(msg_content[n] == 'start'){ // key term for starting games
          n +=1;
          if(msg_content[n] == 'sr-snitch'){ // intialization of a SR-Snitch game
            console.log(`Starting a game of SR-Snitch on ${this_guild.name}`);
            msg.channel.send(`Starting a game of SR-Snitch with x players`);
          }
        } else if (msg_content[n] == 'ping') {
          msg.reply('pong');

        } else if (msg_content[n] == 'clear') {
          msg.channel.bulkDelete(20);
        }
        msg.channel.send(`Command had an incorrect argument at position ${n}`);
      }
    }
});