const { execute } = require("./play");

module.exports={
    name: "clear",
    description: "Clears the queue",
    async execute(interaction, client, Discord, paused){
        if(client.player.isPlaying(interaction.guild_id)){
        client.player.clearQueue(interaction.guild_id);

        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Clearing the queue!')
        .addField("Cleared by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
        else{
        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Error!')
        .addField('Error type:', "Can't clear queue while not connected")
        .addField("Caused by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
    }
}