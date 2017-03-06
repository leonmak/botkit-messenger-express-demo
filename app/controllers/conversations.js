/* eslint-disable brace-style */
/* eslint-disable camelcase */

module.exports = function (controller) {
  // this is triggered when a user clicks the send-to-messenger plugin
  controller.on('facebook_optin', function (bot, message) {
    bot.reply(message, 'Welcome, friend')
  })

  // user said send
  controller.hears(['Send'], 'message_received,facebook_postback', function (bot, message) {
    // start conversation - picture - des - loc
    bot.reply(message, 'Hey there, upload a picture of the food, amigo.')
  })

  // user said report
  controller.hears(['Report'], 'message_received', function (bot, message) {
    bot.reply(message, 'Hey there amigo, what is the id of that foul message?')
  })

  // user says anything else
  controller.hears('(.*)', 'message_received', function (bot, message) {
    bot.reply(message, 'you said ' + message.match[1])
  })
}
