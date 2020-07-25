const Discord = require('discord.js');

const client = new Discord.Client();

const cheerio = require('cheerio');

const request = require('request');

const ytdl = require('ytdl-core');

const search = require('youtube-search');

const config = require('./config/config.json');

const opts = {
    maxResults: 10,
    key: config.YOUTUBE_API,
    type: 'video'
};

const PREFIX = 'neu!';

var servers = {};

const fs = require('fs');
const { openStdin } = require('process');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Neu Bot is online!');
    client.user.setActivity('neu!help');
})

client.on('message', async message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            message.channel.send(`${Math.floor(message.createdAt - message.createdAt)}\nAPI Latency ${Math.round(client.ping)}ms`);
            break;
        case 'help':
            const sembed = new Discord.MessageEmbed()
                .setColor(0x00FFA)
                .setTitle("Server Commands")
                .addField("**Essential Commands**", "**neu!help**: Shows An embedded guide \n **neu!whoami**: tells you your information \n **neu!ping**: says the ping of the bot \n **neu!mock**: Mocks words you say \n **neu!info**: shows information of a specific arg \n **neu!avatar**: shows you your avatar \n **neu!embed**: makes an embedded message")
                .addField("**Admin Commands**", "**neu!clear**: Clears messages on chat \n **neu!kick**: kicks players out of the server \n **neu!ban**: Bans player from the server \n **neu!warn**: Gives a member a warn")
                .addField("**Fun Commands**", "**neu!iq**: Tells you your iq \n **neu!braincell**: Tells you how many braincells you have \n **neu!simprate**: Tells you how much of a simp you are \n **neu!gayrate**: tells you how gay you are \n **neu!mysexuality**: Tells you your sexuality ps. its a joke \n **neu!coinflip**: Neu flips a coin through technology! \n **neu!pp**: Tells you your pp size \n **neu!mydeath**: tells you how you die")
                .addField("**Info**", "**neu!info**: shows info of a specific arg \n **Args:** \n **neu!info author** shows the name of his creator \n **neu!info server** shows server info \n **neu!info bot** shows bot info")
                .addField("**Music Commands**", "**NOTE**:\n Music commands may be\n a little buggy since its\n under development \n **neu!play**: plays music \n **neu!skip**: skips queued songs \n **neu!stop**: stops the queue")
                .addField("\u200b", "\u200b")
                .addField("\u200b", "\u200b")
                .addField("These are the only commands given for now \n **Enjoy your stay!**")
                .setFooter('Neu Bot Commands', client.user.displayAvatarURL())
            message.channel.send(sembed);
            break;
        case 'info':
            if (args[1] === 'author') {
                message.channel.send('**Bot Created By Paxx#5039**')
            } else if (args[1] === 'server') {
                const SEembed = new Discord.MessageEmbed()
                    .setAuthor(`${message.guild.name} Info `, message.guild.iconURL())
                    .setTitle('**Server Stats**')
                    .setColor(0x00FFA)
                    .addField("**Server Name** ", message.guild.name, true)
                    .addField("**Server Owner** ", message.guild.owner, true)
                    .addField("**Member Count** ", message.guild.memberCount, true)
                    .addField("**Roles** ", message.guild.roles.cache.size, true)
                    .setFooter(`Neu Bot`, client.user.displayAvatarURL())
                message.channel.send(SEembed);
            } else if (args[1] === 'bot') {
                const bembed = new Discord.MessageEmbed()
                    .setColor('#00FFA')
                    .setTitle("**Bot Info**")
                    .setAuthor(`${client.user.username} Info`, client.user.displayAvatarURL())
                    .setThumbnail(client.user.displayAvatarURL())
                    .setDescription("[Invite me!](https://discord.com/oauth2/authorize?client_id=720135396230561834&scope=bot&permissions=2146958591)")
                    .addFields(
                        { name: '**Bot Name**', value: 'Neu Bot' },
                        { name: '\u200B', value: '\u200B' },
                        { name: '**Guild Count **', value: `${client.guilds.cache.size}`, inline: true },
                        { name: '**User Count **', value: `${client.users.cache.size}`, inline: true },
                        { name: '**Node.js Version **', value: '**14.4.0**', inline: true },
                        { name: '**Discord.js Version **', value: '**12.2.0**', inline: true },
                        { name: '**Bot Language **', value: 'Discord.js', inline: true },
                        { name: '**Bot Version **', value: '**1.0.0**', inline: true },
                        { name: '\u200b', value: '\u200b' },
                        { name: '**Other Information **', value: '**Neu Bot - Pronounced as "New Bot"**', inline: true },
                        { name: '\u200b', value: '\u200b' },
                        { name: '**Bot Developer **', value: "[**Paxx#5039**]()", inline: true },
                        { name: '**People who helped **', value: 'BearXplode and WitheredToast', inline: true },
                        { name: '\u200b', value: '\u200b' },
                    )
                bembed.addField("Invite me!", "[Here!](https://discord.com/oauth2/authorize?client_id=720135396230561834&scope=bot&permissions=2146958591)")
                    .setTimestamp()
                    .setFooter('Neu Bot', client.user.displayAvatarURL())
                message.channel.send(bembed);

            } else if (args[1] === 'version') {
                message.channel.send('Bot Version : **1.0.0**');
            } else {
                message.channel.send('Source not found')
            }
            break;
        case 'clear':
            if (!message.member.hasPermission("ADMINISTRATOR", explicit = true))
                return message.channel.send("You dont have permissions to execute this command :P")
            if (message.content.startsWith(`${PREFIX}clear`)) {
                if (!args[1]) return message.reply('Error missing args')
                message.channel.bulkDelete(args[1]);
            }
            break;
        case 'whoami':
            const embed = new Discord.MessageEmbed()
                .setTitle('Who am i?')
                .addField('**Your name is**', message.author.username)
                .addField('**Your discord tag is**', message.author.tag)
                .addField('**Youre a member of**', message.guild.name)
                .setColor(0x00FFA)
                .setThumbnail(message.author.displayAvatarURL())
            message.channel.send(embed);
            break;
        case 'iq':
            if (message.content.startsWith(`${PREFIX}iq`)) {
                client.commands.get('iq').execute(message, args);
            }
            break;
        case 'braincell':
            if (message.content.startsWith(`${PREFIX}braincell`)) {
                client.commands.get('braincell').execute(message, args);
            }
            break;
        case 'avatar':
            const aembed = new Discord.MessageEmbed()
                .setTitle('**Your avatar!**')
                .setThumbnail(message.author.displayAvatarURL())
            message.channel.send(aembed);
            break;
        // coin flip system //
        case 'coinflip':
            {
                function doRandCF() {
                    var rand = ['HEADS', 'TAILS'];
                    return rand[Math.floor(Math.random() * rand.length)];
                }
                message.channel.send("**Flipped a coin**, It landed **" + `${doRandCF()}` + "** !")
                break;
            };
        case 'mysexuality':
            if (message.content.startsWith(`${PREFIX}mysexuality`)) {
                client.commands.get('mysexuality').execute(message, args);
            }
            break;
        case 'simprate':
            if (message.content.startsWith(`${PREFIX}simprate`)) {
                client.commands.get('simprate').execute(message, args);
            }
            break;

        case 'pp':
            function doRandPP() {
                var rand = ['8===D', '8==========D', '8=D', '8==D', '8======D', '8====D', '8=====D', '8=======D', '8========D', 'LIES, YOU HAVE NO PP'];
                return rand[Math.floor(Math.random() * rand.length)];
            }
            message.channel.send('```Heres your pp size ' + message.author.username + '\n\n' + `${doRandPP()}` + '```');
            break;
        case 'mock':
            if (message.content.startsWith(`${PREFIX}mock`)) {
                var text = message.content.split(' ').slice(1).join(' ')
                if (!text) return message.channel.send('You need to type a message')
                message.channel.send(text)
                message.delete()
            }
            break;
        case 'kick':
            if (message.content.startsWith(`${PREFIX}kick`)) {
                if (!message.member.hasPermission("KICK_MEMBERS", explicit = true))
                    return message.channel.send("You dont have permissions to execute this command :P")
                client.commands.get('kick').execute(message, args);
            }
            break;
        case 'ban':
            if (message.content.startsWith(`${PREFIX}ban`)) {
                if (!message.member.hasPermission("BAN_MEMBERS", explicit = true))
                    return message.channel.send("You dont have permissions to execute this command :P")
                client.commands.get('ban').execute(message, args);
            }
            break;
        case 'gayrate':
            if (message.content.startsWith(`${PREFIX}gayrate`)) {
                client.commands.get('gayrate').execute(message, args);
            }
            break;
        case 'embed':
            if (message.content.startsWith(`${PREFIX}embed`)) {
                const Membed = new Discord.MessageEmbed()
                    .setTitle(message.author.tag)
                    .setDescription(text = message.content.split(' ').slice(1).join(' '))
                message.channel.send(Membed)
                message.delete()
            }
            break;
        case 'mydeath':
            if (message.content.startsWith(`${PREFIX}mydeath`)) {
                client.commands.get('mydeath').execute(message, args);
            }
            break;
        case 'play':
            function play(connection, message) {
                var server = servers[message.guild.id];

                server.dispatcher = connection.play(ytdl(server.queue[0], { filter: "audioonly" }));

                server.queue.shift();

                server.dispatcher.on("end", function () {
                    if (server.queue[0]) {
                        play(conection, message);
                    } else {
                        connection.disconnect();
                    }
                })
            }

            if (message.content.startsWith(`${PREFIX}play`)) {
                if (!args[0]) {
                    message.channel.send('You need to provide a link');
                    return;
                }

                if (!message.member.voice.channel) {
                    message.channel.send('You must be connected to a channel')
                    return;
                }

                if (!servers[message.guild.id]) servers[message.guild.id] = {
                    queue: []
                }

                var server = servers[message.guild.id];

                server.queue.push(args[1]);

                if (!message.member.voice.connection) message.member.voice.channel.join().then(function (connection) {
                    play(connection, message);

                })
            }
            break;
        case 'skip':
            var server = servers[message.guild.id];
            if (server.dispatcher) server.dispatcher.end();
            message.channel.send('Song Skipped');
            break;
        case 'stop':
            var server = servers[message.guild.id];
            if (message.guild.voice.connection) {
                for (var i = server.queue.length - 1; i >= 0; i--) {
                    server.queue.splice(i, 1);
                }

                server.dispatcher.end();
                message.channel.send('Ending the queue. leaving voice channel')
                console.log('queue stopped')
            }
            if (message.guild.voice.connection) message.guild.voice.connection.disconnect();
            break;
        case 'rcat':
            image(message);
            break;
        case 'guilds':
            message.channel.send('Watching ' + client.guilds.cache.size + ' Guilds/Servers!');
            break;
        case 'search':
                let Yembed = new Discord.MessageEmbed()
                    .setColor("#73ffdc")
                    .setDescription("Please enter a search query. Remember to narrow down your search.")
                    .setTitle("YouTube Search API");
                let embedMsg = await message.channel.send(Yembed);
                let filter = m => m.author.id === message.author.id;
                let query = await message.channel.awaitMessages(filter, { max: 1 });
                let results = await search(query.first().content, opts).catch(err => console.log(err));
                if(results) {
                    let youtubeResults = results.results;
                    let i  =0;
                    let titles = youtubeResults.map(result => {
                        i++;
                        return i + ") " + result.title;
                    });
                    console.log(titles);
                    message.channel.send({
                        Yembed: {
                            title: 'Select which song you want by typing the number',
                            description: titles.join("\n")
                        }
                    }).catch(err => console.log(err));
                    
                    filter = m => (m.author.id === message.author.id) && m.content >= 1 && m.content <= youtubeResults.length;
                    let collected = await message.channel.awaitMessages(filter, { maxMatches: 1 });
                    let selected = youtubeResults[collected.first().content - 1];
        
                    MTembed = new Discord.MessageEmbed()
                        .setTitle(`${selected.title}`)
                        .setURL(`${selected.link}`)
                        .setDescription(`${selected.description}`)
                        .setThumbnail(`${selected.thumbnails.default.url}`);
        
                    message.channel.send(MTembed);
                }
            
            break;
    }
})

function image(message) {

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + "cats",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function (error, response, responseBody) {
        if (error) {
            return;
        }


        $ = cheerio.load(responseBody);


        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) {

            return;
        }

        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
}

client.login(config.TOKEN);
