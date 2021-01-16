// here is a file
const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

var yesNoQuestionWords = ["are", "is", "does", "have", "can", "am", "was",
                          "were", "has", "do", "did", "could*", "should", "may",
                          "would", "shall", "will", "won't", "wont"];
var questionWordsRegex = new RegExp(yesNoQuestionWords.join("|"), "i");
var yesNoAnswers = ["Better not tell you.", "Most likely.", "Very doubtful.",
                    "Ask again.", "As I see it, yes.", "My sources say no.",
                    "Cannot predict now.", "Yes.", "Don't count on it.", "Without a doubt",
                    "Fuck off.", "Don't talk to me.", "Don't you have better things to do?"];

// bot startup
client.on('ready', () => {
  console.log("Connectd as: " + client.user.tag);


// respond to messages
client.on('message', (receivedMessage) => {
  var contentLowercase = receivedMessage.content.toLowerCase();
  if(receivedMessage.author == client.user) {
    return;
  }

  if(contentLowercase.includes("hello ryley")) {
    receivedMessage.channel.send("Hi " + receivedMessage.author.toString() + " !")
  }

  if(receivedMessage.content.toLowerCase().includes("shower")) {
    receivedMessage.channel.send("I'm not in the shower");
  }

  // respond to yes or no questions
  if(contentLowercase.includes("?")) {
    if(questionWordsRegex.test(contentLowercase)) { // look for key words
      receivedMessage.channel.send(yesNoAnswers[getRandInt(yesNoAnswers.length)], {tts: true});
    }
  }
})

client.login(config.secret);

function getRandInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
