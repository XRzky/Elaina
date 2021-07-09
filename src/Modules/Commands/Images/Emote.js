const Command = require('../../../Structures/Command.js');
const { MessageEmbed } = require('discord.js');
const { Colors } = require('../../../Structures/Configuration.js');
const Emoji = require('demojijs');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			aliases: [],
			description: 'Sends a random emoji from Emoji.gg',
			category: 'Images',
			cooldown: 3000
		});
	}

	async run(message) {
		Emoji.randomEmoji().then((data) => {
			const embed = new MessageEmbed()
				.setColor(Colors.DEFAULT)
				.setTitle(data.title)
				.setDescription([
					`${data.description}`,
					`***Favorite:*** ${data.faves}`,
					`***Resolution:*** ${data.width}x${data.height}`,
					`***Size:*** ${this.client.utils.formatBytes(data.filesize)}`
				].join('\n'))
				.setImage(data.image)
				.setFooter(`Responded in ${this.client.utils.responseTime(message)} | Powered by Emoji.gg`, message.author.avatarURL({ dynamic: true }));

			return message.reply({ embeds: [embed] });
		});
	}

};
