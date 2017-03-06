let templates = {
	"quick_help": {
        text: 'Hey Amigo! Here\'s some commands to start off..',
        quick_replies: [
            {
                "content_type": "text",
                "title": "Send",
                "payload": "send",
            },
            {
                "content_type": "text",
                "title": "Upvote",
                "payload": "upvote",
            },
            {
                "content_type": "text",
                "title": "Over",
                "payload": "over",
            },
            {
            	"content_type": "text",
                "title": "Subscribe",
                "payload": "subscribe",
            },
            {
            	"content_type": "text",
                "title": "Report",
                "payload": "report",	
            }
        ]
    },
	"options_message": {
		"attachment": {
			"type": "template",
			"payload": {
				"template_type": "generic",
				"elements": [
				{
					"title": "Option 1",
					"subtitle": "Amazon Echo",
					"image_url":"http://newswatchtv.com/wp-content/uploads/2015/11/Amazon-Echo.jpg"
				},
				{
					"title": "Option 2",
					"subtitle": "Nest protect",
					"image_url":"http://www.computerlegacy.com/wp-content/uploads/2015/08/nest_protect.jpg"
				},
				{
					"title": "Option 3",
					"subtitle": "Apple iWatch",
					"image_url":"http://i0.wp.com/www.thebinarytrend.com/wp-content/uploads/2015/03/Apple-Watch-logo-main1.png"
				}
				]
			}
		}
	}
};

module.exports = {
	templates: templates
};