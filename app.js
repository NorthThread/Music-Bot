const discord = require('discord.js');
require('dotenv').config();

const client = new discord.Client({ ws: { intents: discord.Intents.ALL } });


let playerArray = [];

function Server(server_id, bool){
    this.server_id = server_id;
    this.paused = bool;
}

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
    
    console.log(playerArray);
    
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
      const args = interaction.data.options;

    if(command === "play"){
        const params = args.find(arg => arg.name.toLowerCase() == "value").value;
        
        if(client.player.isPlaying(interaction.guild_id) === false){
        let song = await client.player.play((await client.guilds.cache.get('698980600001855547').members.fetch(`${interaction.member.user.id}`)).voice.channel, params, {
            sortBy: 'relevance'
        }).catch(err =>
            console.log(err)

        );
        song = song.song;
           if(song != null){
        const embedmsg = new discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('URL To Song')
        .setURL(song.url)
        .addField("Playing:", `${song.name}`, true)
        .addField("Requested by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
           }
        }
      else{
        let song = await client.player.addToQueue(interaction.guild_id, params, {
            sortBy: 'relevance'
        }).catch(err =>
            console.log(err)
        );
        song = song.song;
        
        if(song != null){
        const embedmsg = new discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('URL To Song')
        .setURL(song.url)
        
        .addField("Adding to queue:", `${song.name}`, true)
        .addField("Requested by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
      }
    }
    else if(command === 'skip'){
        serverIndex = playerArray.findIndex(s => s.server_id === interaction.guild_id);
        
        if(playerArray[serverIndex].paused === true){
        let song = await client.player.skip(interaction.guild_id);

        const embedmsg = new discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Skipping song')
        .addField("Song name:", `${song.name}`, true)
        .addField("Skipped by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
        else{
        const embedmsg = new discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Error!')
        .addField("Error msg:", "Can's skip while paused", true)
        .addField("Caused by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
    }
    else if(command === 'clear'){
        client.player.clearQueue(interaction.guild_id);

        const embedmsg = new discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Clearing the queue!')
        .addField("Cleared by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
    }
    else if(command === 'leave'){
        client.player.stop(interaction.guild_id);

        const embedmsg = new discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Leaving the channel!')
        .addField("Requested by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
    }
    else if(command === 'pause' && client.player.isPlaying(interaction.guild_id) === true){
        client.player.pause(interaction.guild_id);
        serverIndex = playerArray.findIndex((s => s.server_id == interaction.guild_id));
        playerArray[serverIndex].paused = true;
        const embedmsg = new discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Pausing the song!')
        .addField("Requested by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
    }
    else if(command === 'resume' && client.player.isPlaying(interaction.guild_id)){
        client.player.resume(interaction.guild_id);
        serverIndex = playerArray.findIndex(s => s.server_id === interaction.guild_id);
        playerArray[serverIndex].paused = false;
        const embedmsg = new discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Resuming the song!')
        .addField("Requested by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
    }
    else if(command === 'np' || command === 'status'){
        const bar = client.player.createProgressBar(interaction.guild_id, 40);
        serverIndex = playerArray.findIndex((s => s.server_id === interaction.guild_id));
        const currentlyPlaying = playerArray[serverIndex].paused;
        const currentSong = client.player.nowPlaying(interaction.guild_id);
        const embedmsg = new discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Player Status')
        .addField("Currently playing:", `${currentSong.name}`, false)
        .addField('Paused:', `${currentlyPlaying}`, false)
        .addField('Progress', `\`${bar}\``, true)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
    }
  })

  client.login(process.env.BOT_TOKEN);