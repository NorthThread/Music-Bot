module.exports={
    name: "skip",
    description: "skips a song",
    async execute(interaction, client, Discord, paused){
        if(paused === false){
        let song = await client.player.skip(interaction.guild_id);

        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Skipping song')
        .addField("Song name:", `${song.name}`, true)
        .addField("Skipped by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
        else{
        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Error!')
        .addField("Error msg:", "Can't skip while paused", true)
        .addField("Caused by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
    }
}