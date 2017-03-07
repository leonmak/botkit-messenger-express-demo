let templates = {
	review: (id) => {
		return {
			text: `Review buffet #${id}!`,
			quick_replies: [
			{
				"content_type": "text",
				"title": `Over ${id}`,
				"payload": "send",
			},
			{
				"content_type": "text",
				"title": `Upvote ${id}`,
				"payload": "upvote",
			},
			{
				"content_type": "text",
				"title": `Downvote ${id}`,
				"payload": "downvote",
			},
			{
				"content_type": "text",
				"title": "Review later",
				"payload": "close"
			}
			]
		}
	},
	quick_help: {
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
	"location": {
		"text": "Please share your location:",
		"quick_replies":[
		{
			"content_type": "location",
		},
		{
			"content_type": "text",
			"title": "No",
			"payload": "no"
		}
		]
	},
	"options_message": {
		attachment: {
			type:"template",
			payload:{
				template_type:"generic",
				elements: [{
					title: "Press Yes or No",
					buttons:[{
						type:"postback",
						title:"Yes 😀",
						payload:"SAID_YES"
					},
					{
						type:"postback",
						title:"No 😔",
						payload:"SAID_NO"
					}]
				}]
			}
		}
	}
};

module.exports = templates