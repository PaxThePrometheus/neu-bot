module.exports = {
    name: 'gayrate',
    description: 'Tells you how gay you are',
    execute(message, args){
        message.channel.send("You are **" + Math.floor(Math.random() * 99 + 1 ) + "%** gay!");
    }    
}