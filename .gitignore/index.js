const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ("*")

bot.on('ready', function() {
    bot.user.setGame("Tera");
    console.log("Connected");
});

bot.login(process.env.TOKEN);


bot.on('message', message => {
    if (message.content === prefix + "help"){
        message.channel.sendMessage('Liste des commandes: \n -*help \n -.kick \n -.ban');
    }

    if (message.content === "Salut"){
        message.reply("Salut jeune pousse.");
        console.log("Commande Salut effectué");
    }
});


var prefix = ("*")

bot.login(process.env.TOKEN);

bot.on("guildMemberAdd", member => {
    member.guild.channels.find("name", "général").send(`Bienvenue ${member} tu trouveras ton bonheur ici !`)
})

bot.on("guildMemberRemove", member => {
    member.guild.channels.find("name", "général").send(`${member} à fuit, je vous félicite pas.`)
})

bot.on('guildMemberAdd', member => {
    var role = member.guild.roles.find('name', 'Membre Testeur');
    member.addRole(role)
})


var prefix = ("*")

bot.login(process.env.TOKEN);

bot.on('message', message => {
    let command = message.content.split(" ")[0];
    const args = message.content.slice(prefix.length).split(/ +/);
    command = args.shift().toLowerCase();

    if (command === "kick") {
        let modRole = message.guild.roles.find("name", "Test");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Hop hop petit con, t'as pas le droit à cette commande !").catch(console.error);
        }
        if(message.mentions.users.size === 0) {
            return message.reply("Ouais mais qui?").catch(console.error);
        }
        let kickMember = message.guild.member(message.mentions.users.first());
        if(!kickMember) {
            return message.reply("L'utilisateur est introuvable ou impossible à exclure.").catch(console.error);
        }
        if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
            return message.reply("Je n'ai pas la permission KICK_MEMBERS pour faire ceci.").catch(console.error);
        }
        kickMember.kick().then(member => {
            message.reply(`${member.user.username} a été expulsé sans aucun soucis.`).catch(console.error);
            message.guild.channels.find("name", "général").send(`**${member.user.username} a été expulsé par **${message.author.username}**`)
        }).catch(console.error)
            
    }

    if (command === "ban") {
        let modRole = message.guild.roles.find("name", "Test");
        if(!message.member.roles.has(modRole.id)) {
            return message.reply("Si pour kick t'as pas la permission, je pense que ban c'est pareil. Baka").catch(console.error);
        }
        const member = message.mentions.members.first();
        if (!member) return message.reply("Je dois ban qui? Précise");
        member.ban().then(member => {
            message.reply(`${member.user.username} a été banni comme par magie.`).catch(console.error);
            message.guild.channels.find("name", "général").send(`**${member.user.username}** a été banni du discord par **${message.author.username}**`)
        }).catch(console.error)
}})
