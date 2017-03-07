/* eslint-disable brace-style */
/* eslint-disable camelcase */

const templates = require ('../templates')
const FB = require('./facebook_send')

module.exports = function (controller) {

  const postToAll = (bot, post) => {
      controller.storage.users.all().then(users => {
      users.forEach(user => {
        FB.newMessage(user.id, `A new buffet has been posted!\n#${post.id}: ${post.title}`).then(()=> {
          FB.newMessage(user.id, post.imageUrl, 'image').then(() => {
            FB.newMessage(user.id, post.coordinates, 'location').then(()=> {
              FB.newMessage(user.id, templates.review(post.id),'quick_replies')
            })
          })
        })
      })
    })
  }


  // on trigger (see ./botkit) when a user clicks the send-to-messenger plugin
  controller.on('facebook_optin', (bot, message) => {
    bot.reply(message, 'Welcome, my food hunting friend')
  })

  controller.on('facebook_location', (bot, message, tempPosts) => {
    const {user, timestamp, attachments} = message
    const coordinates = attachments[0].payload.coordinates
    let post = {
      user, 
      timestamp, 
      coordinates
    }
    const askTitleLocation = (err, convo) => {
      convo.say('Good job amigo!')
      convo.ask('Tell me more about your discovery:', (response, convo) => { 
        post.title = response.text
        convo.say('Sweet..')
        convo.say('Send me an image of the food!')
        tempPosts.user = post
        convo.next()
      })
    }

    if (tempPosts.user && tempPosts.user.imageUrl) {
      let newPost = tempPosts.user
      newPost.coordinates = coordinates
console.log(tempPosts)
      controller.storage.posts.count().then(count => {
        newPost.id = count + 1
        controller.storage.posts.save(newPost).then(() => {
          delete tempPosts.user
          postToAll(bot, newPost)
        })
      })
    } else {
      bot.startConversation(message, askTitleLocation)  
    }
  })

  controller.on('facebook_image', (bot, message, tempPosts) => {
    let {user, timestamp, attachments} = message
    let post = {
      user, 
      timestamp, 
      imageUrl: attachments[0].payload.url
    }

    const askTitleImage = (err, convo) => {
      convo.say('Good job amigo!')
      convo.ask('Tell me more about your discovery:', (response, convo) => { 
        post.title = response.text
        convo.say('Sweet..')
        convo.say('Send me the location of the food!')
        tempPosts.user = post
        convo.next() // call convo.ask again before convo.next
      })
    }
    
    if (tempPosts.user && tempPosts.user.coordinates) {
      let newPost = tempPosts.user
      newPost.imageUrl = imageUrl
      controller.storage.posts.count().then(count => {
        newPost.id = count + 1
        controller.storage.posts.save(newPost, () => {
          delete tempPosts.user
          postToAll(bot, newPost)
        })
      })
    } else {
      bot.startConversation(message, askTitleImage)
    }
  })

  // user said send
  controller.hears(['Add'], 'message_received,facebook_postback', (bot, message) => {
    // start conversation - picture - des - loc
    bot.startConversation(message, (err,convo) => {
      convo.say('Hey there amigo, upload a picture of the food, wouldya?');
    });
  })

  // user said report
  controller.hears(['Report'], 'message_received,facebook_postback', (bot, message) => {
    // Check if have id else Start convo to get id
    bot.reply(message, 'Hey there amigo, what is the id of that foul message?')
  })

  // user said upvote
  controller.hears(['Upvote'], 'message_received,facebook_postback', (bot, message) => {
    // Check if have id else Start convo to get id
    bot.reply(message, 'Hey there amigo, what is the id of that awesome message?')
  })

  // user said over
  controller.hears(['Over'], 'message_received,facebook_postback', (bot, message) => {
    // Check if have id else Start convo to get id
    bot.reply(message, 'Hey there amigo, what is the id of that dish that got away?')
  })

  // user says anything else
  controller.hears('(.*)', 'message_received', (bot, message) => {
    bot.reply(message, 'you said ' + message.match[1])
  })
}
