const config = require("../config.json");
const {EmbedBuilder, AttachmentBuilder, ChannelType, PermissionsBitField, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, ModalBuilder, TextInputBuilder, TextInputStyle, StringSelectMenuBuilder} = require("discord.js");
const ms = require("ms");
const tempmail = require("tempmail.lol");
module.exports = {name: "interactionCreate", execute: async function (_0x3a3cx3, _0x3a3cx4) {
  if (!_0x3a3cx3.guild || _0x3a3cx3.user.bot) {
    return;
  }
  ;
  if (_0x3a3cx3.isCommand()) {
    const _0x3a3cx5 = _0x3a3cx4.commands.get(_0x3a3cx3.commandName);
    if (!_0x3a3cx5) {
      return;
    }
    ;
    try {
      await _0x3a3cx5.execute(_0x3a3cx3, _0x3a3cx3.client);
    } catch (error) {
      console.log(`${error}`);
      await _0x3a3cx3.reply({content: "An unexpected error occurred report in <#1015213311740100638>", ephemeral: true});
    }
  }
  ;
  if (_0x3a3cx3.customId === "deletar") {
    _0x3a3cx3.channel.delete();
  }
  ;
  if (_0x3a3cx3.customId === "services") {
    const _0x3a3cx6 = _0x3a3cx3.values;
    if (_0x3a3cx6 == "gerar_email") {
      if (_0x3a3cx3.guild.channels.cache.find(_0x3a3cx7 => {
        return _0x3a3cx7.topic == _0x3a3cx3.member.user.id;
      })) {
        const _0x3a3cx8 = (new ActionRowBuilder).addComponents((new StringSelectMenuBuilder).setCustomId("services").setPlaceholder("Selecione um serviço").addOptions({label: "Email Temporário", description: "Gere um Endereço de Email Temporário Descartável", value: "gerar_email", emoji: "1062517970288529468"}));
        await _0x3a3cx3.deferUpdate();
        await _0x3a3cx3.editReply({components: [_0x3a3cx8]});
        let _0x3a3cx9 = (new EmbedBuilder).setColor("Red").setDescription(`❌ Você ja possui um email criado.`).setTimestamp();
        return _0x3a3cx3.followUp({embeds: [_0x3a3cx9], ephemeral: true});
      }
      ;
      const _0x3a3cx8 = (new ActionRowBuilder).addComponents((new StringSelectMenuBuilder).setCustomId("services").setPlaceholder("Selecione um serviço").addOptions({label: "Email Temporário", description: "Gere um Endereço de Email Temporário Descartável", value: "gerar_email", emoji: "1062517970288529468"}));
      await _0x3a3cx3.deferUpdate();
      await _0x3a3cx3.editReply({components: [_0x3a3cx8]});
      let _0x3a3cxa = _0x3a3cx3.guild.roles.cache.find(_0x3a3cxb => {
        return _0x3a3cxb.name === "@everyone";
      });
      await _0x3a3cx3.guild.channels.create({name: _0x3a3cx3.member.user.username, parent: config.categoria, topic: _0x3a3cx3.member.user.id, type: ChannelType.GuildText, permissionOverwrites: [{id: _0x3a3cxa.id, deny: [PermissionsBitField.Flags.ViewChannel]}, {id: _0x3a3cx3.member.user.id, allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ReadMessageHistory], deny: [PermissionsBitField.Flags.SendMessages]}]}).then(async _0x3a3cx7 => {
        const _0x3a3cxc = (new ActionRowBuilder).addComponents((new ButtonBuilder).setLabel("Ir para seu Email Temporário").setStyle(ButtonStyle.Link).setURL(`https://discord.com/channels/${_0x3a3cx3.guild.id}/${_0x3a3cx7.id}`));
        let _0x3a3cx9 = (new EmbedBuilder).setColor("Green").setTitle(_0x3a3cx4.user.username).setDescription(`✅ Inbox Criado Com Sucesso! <#${_0x3a3cx7.id}>`).setTimestamp();
        _0x3a3cx3.followUp({embeds: [_0x3a3cx9], components: [_0x3a3cxc], ephemeral: true});
        tempmail.createInbox((_0x3a3cxc, _0x3a3cxd) => {
          if (_0x3a3cxd) {
            return console.error(_0x3a3cxd);
          }
          ;
          const _0x3a3cxe = (new ActionRowBuilder).addComponents((new ButtonBuilder).setCustomId(`cell`).setEmoji("📱").setStyle(ButtonStyle.Secondary), (new ButtonBuilder).setCustomId(`deletar`).setEmoji("🗑️").setStyle(ButtonStyle.Danger));
          const _0x3a3cxf = Date.now() + ms("1h");
          const _0x3a3cx10 = new Date(_0x3a3cxf);
          const _0x3a3cx11 = Math.floor(_0x3a3cx10.getTime() / 1e3);
          let _0x3a3cx12 = (new EmbedBuilder).setColor("#00FFFF").setTitle(_0x3a3cx4.user.username).setThumbnail(_0x3a3cx3.user.avatarURL()).setDescription(`Seu Email Temporário:\n\`\`\`${_0x3a3cxc.address}\`\`\`\n\n**Este email expira <t:${_0x3a3cx11}:F>**`).setTimestamp();
          _0x3a3cx7.send({components: [_0x3a3cxe], embeds: [_0x3a3cx12], content: `<@${_0x3a3cx3.user.id}>`});
          const _0x3a3cx13 = _0x3a3cx7.createMessageComponentCollector({componentType: ComponentType.Button, time: 6e5, filter: _0x3a3cx14 => {
            return _0x3a3cx14.user.id === _0x3a3cx3.user.id && _0x3a3cx14.customId === `cell`;
          }});
          _0x3a3cx13.on("collect", async _0x3a3cx14 => {
            _0x3a3cx14.channel.send({content: `${_0x3a3cxc.address}`, ephemeral: true});
            _0x3a3cxe.components[0].setDisabled(true);
            await _0x3a3cx14.update({components: [_0x3a3cxe]});
          });
          let _0x3a3cx15 = 3600;
          let _0x3a3cx16 = setInterval(function () {
            tempmail.checkInbox(_0x3a3cxc.token, _0x3a3cx17 => {
              _0x3a3cx17.forEach(_0x3a3cx18 => {
                let _0x3a3cx12 = (new EmbedBuilder).setColor("#00FFFF").setAuthor({name: _0x3a3cx18.from}).setTitle(_0x3a3cx18.subject).setDescription(_0x3a3cx18.body).setThumbnail("https://cdn.discordapp.com/attachments/1067440697361313873/1067440853024518144/1672200964185.png").setTimestamp();
                _0x3a3cx7.send({embeds: [_0x3a3cx12], content: `<@${_0x3a3cx3.user.id}>`});
              });
            });
            if (!_0x3a3cx3.guild.channels.cache.find(_0x3a3cx7 => {
              return _0x3a3cx7.topic == _0x3a3cx3.member.user.id;
            })) {
              return clearInterval(_0x3a3cx16);
            }
            ;
            _0x3a3cx15--;
            if (_0x3a3cx15 === 0) {
              _0x3a3cx7.delete();
              return clearInterval(_0x3a3cx16);
            }
          }, 4e3);
        }, false);
      });
    }
  }
}};
