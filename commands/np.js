module.exports={
    name: "np",
    description: "Posts the queue's status",
    async execute(interaction, client, Discord, pause){
        const bar = client.player.createProgressBar(interaction.guild_id, 40);
        const currentlyPlaying = pause;
        const currentSong = client.player.nowPlaying(interaction.guild_id);
        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Player Status')
        .addField("Currently playing:", `${currentSong.name}`, false)
        .addField('Paused:', `${currentlyPlaying}`, false)
        .addField('Progress', `\`${bar}\``, true)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
    }
}