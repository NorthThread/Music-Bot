const { execute } = require("./play");

module.exports={
    name: "leave",
    description: "Leaves the channel",
    async execute(interaction, client, Discord, pause){
        if(client.player.isPlaying(interaction.guild_id) === true){
        client.player.stop(interaction.guild_id);

        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Leaving the channel!')
        .addField("Requested by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
        else{
        const embedmsg = new Discord.MessageEmbed()
        .setColor('#FF00FF')
        .setTitle('Error!')
        .addField('Error type:', "Can't leave while not in a channel!", false)
        .addField("Caused by:", interaction.member.user.username, false)
        client.channels.cache.get(`${interaction.channel_id}`).send(embedmsg);
        }
    }
}