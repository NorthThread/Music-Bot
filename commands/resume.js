module.exports={
    name: "resume",
    description: "Resumes the music",
    async execute(interaction, client, Discord, pause){
        client.player.resume(interaction.guild_id);
    
        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Resuming the song!')
        .addField("Requested by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
    }
}