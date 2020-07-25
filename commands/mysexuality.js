module.exports = {
    name:'mysexuality',
    description:'tells you your gender',
    execute(message, args){
        function doRandLG() {
            var rand = ['Gay' , 'Transgender' , 'Queer' , 'Lesbian' , 'Homosexual' , 'Pansexual' , 'Demisexual'  , 'undefined' , 'no pp']
            return rand[Math.floor(Math.random()*rand.length)];   
        }
        message.channel.send("Your sexuality is **-drumroll-** " + `${doRandLG()}` + " !");
    }

}