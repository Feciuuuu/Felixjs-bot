const { Webhook, MessageBuilder } = require('discord-webhook-node');
let axios = require("axios");
let offline = false

module.exports = (client, config) => {
    if(config.zaćmienia.on) {
    setInterval(function () {
    const guild = client.guilds.cache.get(config.bot.id_serwera);
    const hook = new Webhook(config.zaćmienia.webhook);
    axios.get(`http://${config.bot.ip}/players.json`).then(data => {

        const embed = new MessageBuilder()
        .setAuthor(config.bot.nazwawyspy, guild.iconURL())
        .setDescription(config.zaćmienia.wiadomość)
        .setThumbnail(config.zaćmienia.grafika)
        .setColor(config.zaćmienia.colour)
        .setFooter(config.zaćmienia.foother)
        .setTimestamp();
    
    if(offline) {
    if(config.zaćmienia.ping) {
        hook.send(config.zaćmienia.jakiping);
        hook.send(embed).then(offline = false)
    } else {
    hook.send(embed).then(offline = false)
    }
    }
    
    }).catch(err => {
    offline = true
    });
    }, config.zaćmienia.aktualizacja)
    }
}