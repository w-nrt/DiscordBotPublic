//This code was reformatted by w-nrt on 11/2/26, original code was a mess

//Main Imports (discord.js & dotenv)
const {
    Client,
    ActivityType,
    REST,
    GatewayIntentBits,
    //Intents,
    ActionRowBuilder,
    MessageFlags,
    ButtonBuilder,
    ButtonStyle,
    SlashCommandBuilder,
    ModalBuilder,
    Events,
    TextInputBuilder,
    TextInputStyle,
    channelLink
} = require('discord.js'); //All events I need for the bot's function 

require('dotenv').config(); // For .env files to be readable

//Constants needed

const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
}); //Define what the bot can do exactly and the bot is identified as 'bot'


const BoutonL1Form = new ButtonBuilder().setCustomId('btn').setLabel("Demander l'accés au serveur").setStyle(ButtonStyle.Primary); // Button to access the form for my compsci grad server


//Main bot code

//Make the bot's status "online" (green) and set it's rpc as "Watching Rome going up in flames", bot's name is "Nero" for context

bot.once(Events.ClientReady, c => {
    bot.user.setPresence({
        status: 'dnd', // 'dnd', 'online', 'idle', 'invisible'
        activities: [{
            name: 'Rome going up in flames',
            type: ActivityType.Watching // 'Playing', 'Watching', 'Listening', 'Streaming'
        }]
    });
});


bot.on('messageCreate', async (message) => {

    if (message.member != '1442622910656413882') { // make sure its NOT the bot saying that

        const mess = message.content.toLowerCase() //used to properly match the message; if someone says "LOvE YoU" itll be "love you"
        if (message.guild == 1300844280058875978) { // Custom responses for certain messages in my friend server

            const regex = /\b(i am|im|i'm)\s+(.*)/i;//string matching for 'i am' in a message
            const matchz = mess.match(regex); //reuse the matching text after "i am"

            if ((regex.test(mess)) && (message.member != '1442622910656413882') && !(mess.includes('@everyone') && !(mess.includes('@here'))) && (getRandomInt(6) == 1)) {
                message.reply('salutations ' + matchz[2] + ' I am saber');
            }

            if (mess == "<@1442622910656413882> hi" || message.content == '<@1442622910656413882> hey' || message.content == '<@1442622910656413882> hello') {
                await message.reply('hello performer...!');
            }



        }

        if (message.guild == 1470181191557709975) { // Custom responses for my roblox game

            if ((mess.includes("become tester") || mess.includes("be tester")) && mess.includes("how")){
                message.reply("Read https://discord.com/channels/1470181191557709975/1470513347593113701 if you're interested in becoming a Tester!")
            }
        }
    }
});

// This is used for my uni graduation's discord server; used for verification
bot.on('interactionCreate', async interaction => {

    if (interaction.isModalSubmit()) {
        const answer1 = interaction.fields.getTextInputValue('Pren');
        const answer2 = interaction.fields.getTextInputValue('nom');
        const an3 = interaction.fields.getTextInputValue('licen');
        const an4 = interaction.fields.getTextInputValue('grp');
        await bot.channels.cache.get('1443718905297375415').send("# Un nouvel acteur est arrivé! \n \n> **Prénom:** " + answer1 + "\n> **Nom:** " + answer2 + "\n> **Qui fait un(e):** " + an3 + '\n> **Dans le groupe:** ' + an4 + "\n \n <@" + interaction.user + '> \n Prenez soin de sa requête, acteurs! <@&1420277020784594996> <@&1420276971237277696>');
        await interaction.reply({ content: 'Envoyé, attendez quelques instants!', flags: MessageFlags.Ephemeral });
    }


    if (!interaction.isButton()) return; // Make sure user interacted with a button and not a command or whatever

    if (interaction.customId === 'btn') {
        // Create the modal
        const modal = new ModalBuilder().setCustomId('myModal').setTitle('Mais qui va là!');

        //Modal's questions
        const Pren = new TextInputBuilder()
            .setCustomId('Pren')
            .setLabel("Prénom")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(50);

        const nom = new TextInputBuilder()
            .setCustomId('nom')
            .setLabel("Nom")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(50);

        const License = new TextInputBuilder()
            .setCustomId('licen')
            .setLabel("Licence ou formation")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(50);

        const Groupe = new TextInputBuilder()
            .setCustomId('grp')
            .setLabel("Portail et Groupe, SI APPLIQUABLE")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(50);

        //all answer rows stored into csts
        const un = new ActionRowBuilder().addComponents(Pren);
        const deux = new ActionRowBuilder().addComponents(nom);
        const trois = new ActionRowBuilder().addComponents(License);
        const quatre = new ActionRowBuilder().addComponents(Groupe);


        // Add inputs to the modal
        modal.addComponents(un, deux, trois, quatre);

        // Show the modal to the user
        await interaction.showModal(modal);
    }
});


bot.login(process.env.DISCORD_TOKEN);
