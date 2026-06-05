const {SlashCommandBuilder} = require("@discordjs/builders");
const {PermissionsBitField, EmbedBuilder, Modal, TextInputComponent, MessageActionRow, MessageButton, PermissionFlagsBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder} = require("discord.js");
module.exports = {data: (new SlashCommandBuilder).setName("painel").setDefaultMemberPermissions(PermissionFlagsBits.Administrator).setDescription("Painel de serviços."), execute: async function (_0xee17x0, _0xee17x1) {
  if (!_0xee17x0.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    const _0xee17x2 = (new EmbedBuilder).setThumbnail(_0xee17x1.user.displayAvatarURL()).setColor("Red").setTitle(_0xee17x1.user.username).setDescription("❌ Você não pode usar este comando!").setTimestamp().setFooter({text: _0xee17x0.member.user.username, iconURL: _0xee17x0.member.user.displayAvatarURL()});
    return _0xee17x0.reply({embeds: [_0xee17x2]});
  }
  ;
  _0xee17x0.reply({content: "enviando...", ephemeral: true});
  const _0xee17x3 = (new ActionRowBuilder).addComponents((new StringSelectMenuBuilder).setCustomId("services").setPlaceholder("Selecione um serviço").addOptions({label: "Email Temporário", description: "Gere um Endereço de Email Temporário Descartável", value: "gerar_email", emoji: "1062517970288529468"}));
  const _0xee17x4 = (new EmbedBuilder).setColor("Purple").setAuthor({name: _0xee17x1.user.username, iconURL: _0xee17x1.user.displayAvatarURL()}).setDescription("> **Seja bem-vindo(a) ao nosso Painel.**\n\n**Para começar a usar nosso Bot, siga as instruções abaixo.**\n> ``1`` • Selecione o tipo do serviço no menu abaixo\n> ``2`` • Aguarde o bot realizar o serviço para você").setImage("https://cdn.discordapp.com/attachments/1067440697361313873/1067440853024518144/1672200964185.png");
  _0xee17x0.channel.send({embeds: [_0xee17x4], components: [_0xee17x3]});
}};
