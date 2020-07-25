module.exports = {
    name: 'braincell',
    description: 'Tells you how many braincells you have',
    execute(message, args){
        message.channel.send("You have " + Math.floor(Math.random() * 86000000000 + 1 ) + " braincells!");
    }    
}