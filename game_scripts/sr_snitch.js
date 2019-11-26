const Discord = require('discord.js');

class SRSnitch{
    constructor(client, guild, config){
        this.client = client;
        this.guild = guild;
        this.config = config;
    }

    genEnviroment(){
        //build category lobby
        this.guild.createChannel(this.config.sr_snitch_lobby, {
            type: 'category',
            permissionOverwrites: [{
                id: this.guild.id,
                deny: ['MANAGE_MESSAGES'],
                deny: ['SEND_MESSAGES']
            }]
        })
            .then(console.log)
            .catch(console.error);
    }
    start(){
        this.genEnviroment();
    }
}