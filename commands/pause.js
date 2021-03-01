module.exports={
    name: "pause",
    description: "Pauses the music",
    async execute(interaction, client, Discord, pause){
        client.player.pause(interaction.guild_id);
    
        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Pausing the song!')
        .addField("Requested by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
    }
}