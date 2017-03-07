const fetch = require('node-fetch');

const newMessage = (id, msg, hasAtts, hasTemplate) => {

  let message;
  if (hasAtts) {
    switch (hasAtts) {
      case'image':
      message = { attachment: { "type": "image", "payload": { "url": msg } } }
      break
      case 'location':
      let {lat, long} = msg
      message = {
        "attachment": {
          "type": "template",
          "payload": {
            "template_type": "generic",
            "elements": {
              "element": {
                "title": "Location of buffet",
                "image_url": `https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center=${lat},${long}&zoom=20&markers=${lat},${long}&key=${process.env.GMAPS_STATIC_API_KEY}`,
                "item_url": "http:\/\/maps.google.com\/?q="+lat+","+long+"&z=18"
              }
            }
          }
        }
      }
      break
      case 'quick_replies':
        message = msg
      break
      default: break
    }
  } else if (hasTemplate) {
    message = hasTemplate
  } else {
    message = { text: msg }
  }

  const body = JSON.stringify({
    recipient: { id },
    message,
  });

  return fetch('https://graph.facebook.com/me/messages?access_token=' + encodeURIComponent(process.env.FACEBOOK_PAGE_TOKEN), {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
}

module.exports = {
  newMessage
}