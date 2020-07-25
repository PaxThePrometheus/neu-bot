module.exports = {
    name: 'iq',
    description: 'Tells you your iq',
    execute(message, args){
        message.channel.send("Your iq is " + Math.floor(Math.random() * 149 + 1 ) + "!");
    }    
}