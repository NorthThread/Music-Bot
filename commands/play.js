module.exports={
    name: "play",
    description: "plays a song depending on input",
    async execute(interaction, client, Discord, playerArray){
        const args = interaction.data.options;
        const params = args.find(arg => arg.name.toLowerCase() == "value").value;
        
        if(client.player.isPlaying(interaction.guild_id) === false){
        let song = await client.player.play((await client.guilds.cache.get('698980600001855547').members.fetch(`${interaction.member.user.id}`)).voice.channel, params, {
            sortBy: 'relevance'
        }).catch(err =>
            console.log(err)

        );
        song = song.song;
        if(song != null){
        const embedmsg = new Discord.MessageEmbed()
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
        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('URL To Song')
        .setURL(song.url)
        
        .addField("Adding to queue:", `${song.name}`, true)
        .addField("Requested by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
      }
    }
}