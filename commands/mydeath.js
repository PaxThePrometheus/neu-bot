const Discord = require('discord.js')

module.exports = {
    name: 'mydeath',
    description: 'tells you how you die',
    execute(message, args) {
        function doRandDT() {
            var rand = ['You die in a car crash in the middle of nowhere, no one can help you, you\'re gonna die alone', 'You\'re gonna die by plummeting to the earth due to your parachute failing, your corpse is unrecognisable', 'Someone poisons your meal because of hatred', 'You\'ll slip and break your neck while taking a bath', 'You\'ll die in a burning building, all escape points closed, the smoke is sucking every bit of life out of you', 'You\'re gonna die by heart attack in the mid\'st of meeting your favorite artist', 'You\'re gonna get eaten by wild bears in a camping trip', 'You\'re gonna get eaten by stray dogs while jogging', 'A plane is gonna crash into your house at 7:58 PM', 'You\'re accidentally gonna get shot by police', 'You\'re gonna wake up to see that there\'s a gigantic tidal wave in front of your house', 'You\'re gonna fall on traintracks and a japanese bullet train is gonna run you over', 'You\'re gonna fall off a cruise ship and drown to your death', 'Your city is gonna get bombed by north korea']
            return rand[Math.floor(Math.random() * rand.length)];
        }
        message.channel.send(doRandDT());
    }

}