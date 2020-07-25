module.exports = {
    name: 'simprate',
    description: 'tells you how much of a simp you are',
    execute(message, args){
        message.channel.send("You are **" + Math.floor(Math.random() * 99 + 1 ) + "%** simp!");
    }    
}