const {Client, GatewayIntentBits, ActivityType} = require("discord.js");
module.exports = {name: "ready", once: true, execute: async function (_0x3581x1) {
  console.log(`${"Successfully logged in to "}${_0x3581x1.user.tag}${""}`.green);
  _0x3581x1.user.setPresence({activities: [{name: `${"Gerando Emails >> ! PxzStore"}`, type: ActivityType.Streaming, url: "https://twitch.tv/pxtrem1"}]});
}};
