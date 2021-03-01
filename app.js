    const Discord = require('discord.js');
    const express = require('express')
    const fs = require('fs');

    const Vue = require('vue');
    const vuetify = require('./plugins/vuetify');
    const index = require ('./index.vue')

    require('dotenv').config();

    const app = express()

    const client = new Discord.Client({ ws: { intents: Discord.Intents.ALL } });

    client.commands = new Discord.Collection();

    const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

    for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command)
    }

    let playerArray = [];

    function Server(server_id, bool){
    this.server_id = server_id;
    this.paused = bool;
    }

    new Vue({
        vuetify,
        render: h => h(index)
    }).$mount('#app')

    const { Player } = require("discord-music-player");
    const player = new Player(client, {
    leaveOnEmpty: true,
    leaveOnStop: true,
    leaveOnEnd: true,
    timeout: 60000,
    quality: 'high',
    
    });
    client.player = player;
    client.on('ready', ()=>{
    client.guilds.cache.map(guild => guild.id).forEach(id => {
        playerArray.push(new Server(id, false));
    });
    
    client.user.setActivity('those sick beats'); 
    
    
    })

    client.api.applications('676575206214729748').guilds('698980600001855547').commands.post({
        data: {
        name: 'play',
          description: 'Plays a song with search params',
          options: [
              {
                name: 'value',
                description: 'values for search params',
                type: 3,
                default: false,
                required: true
              }
          ]
      }
  }).then(response =>{
      console.log(response)
  });
    //#########################################################################################
  client.api.applications('676575206214729748').guilds('698980600001855547').commands.post({
    data: {
        name: 'skip',
        description: 'Skips the current song',
    }
    }).then(response =>{
    console.log(response)
    });
    //#########################################################################################
    client.api.applications('676575206214729748').guilds('698980600001855547').commands.post({
    data: {
        name: 'clear',
        description: 'Clears the queue',
    }
    }).then(response =>{
    console.log(response)
    });
    //#########################################################################################
    client.api.applications('676575206214729748').guilds('698980600001855547').commands.post({
        data: {
        name: 'pause',
        description: 'Pauses the current song',
    }
    }).then(response =>{
    console.log(response)
        });
    //#########################################################################################
    client.api.applications('676575206214729748').guilds('698980600001855547').commands.post({
        data: {
        name: 'resume',
        description: 'Resumes the current song',
    }
    }).then(response =>{
    console.log(response)
    });
    //#########################################################################################
    client.api.applications('676575206214729748').guilds('698980600001855547').commands.post({
        data: {
        name: 'skip',
        description: 'Skips the current song',
        }
    }).then(response =>{
    console.log(response)
    });
    //#########################################################################################
    client.api.applications('676575206214729748').guilds('698980600001855547').commands.post({
        data: {
        name: 'np',
        description: 'Posts the status for the music player',
    }
    }).then(response =>{
    console.log(response)
    });
    client.api.applications('676575206214729748').guilds('698980600001855547').commands.post({
        data: {
        name: 'status',
        description: 'Posts the status for the music player',
    }
    }).then(response =>{
    console.log(response)
    });
    //#########################################################################################
    client.api.applications('676575206214729748').guilds('698980600001855547').commands.post({
        data: {
        name: 'leave',
        description: 'Leaves the channel and clears the queue',
    }
    }).then(response =>{
    console.log(response)
    });

    client.ws.on("INTERACTION_CREATE", async (interaction) =>{
        const command = interaction.data.name.toLowerCase();
      
        client.commands.forEach(interName => {
            if(interName.name === command){
                serverIndex = playerArray.findIndex(s => s.server_id === interaction.guild_id);
                if (command === 'pause' && client.player.isPlaying(interaction.guild_id) ){
                    playerArray[serverIndex].paused = true;
                }
                else if (command === 'resume' && client.player.isPlaying(interaction.guild_id) || command === 'leave' && client.player.isPlaying(interaction.guild_id)){
                    playerArray[serverIndex].paused = false;
                }
                interName.execute(interaction ,client, Discord, playerArray[serverIndex].paused);
            }
        });
    })

    app.get('/api/pause',async (req, res) =>{
    client.player.pause('698980600001855547')
    serverIndex = playerArray.findIndex((s => s.server_id == 698980600001855547));
    playerArray[serverIndex].paused = true;
    res.status(200)
    res.send("paused")
    });

    app.listen(3000, ()=>{
    console.log("listening on port 3000")
    })

    client.login(process.env.BOT_TOKEN);