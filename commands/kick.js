const Discord = require('discord.js');

module.exports = {
    name : 'kick',
    description : 'kicks members',
        execute(message, args){
            
            if (!args[1]) message.channel.send('You need to specify a person to kick')

            const user = message.mentions.users.first();

            if (user) {
                const member = message.guild.member(user);

                if (member) {
                    member.kick('You got kicked by' + `${message.author.username}`).then(() => {
                        message.reply(`Successfully kicked ${user.tag}`);
                    }).catch(err => {
                        message.reply('I was unable to kick the member')
                        console.log(err);
                    })
                } else {
                    message.reply("User not available")
                }
            } else {
                message.reply("You need to specify a person");
            }
        }
}