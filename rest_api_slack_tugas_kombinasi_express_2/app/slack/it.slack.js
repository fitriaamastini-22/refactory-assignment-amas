var Slack = require('node-slack');
var slack = new Slack("https://hooks.slack.com/services/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");

exports.sendMessage = async (username, channel, message) => {
    try {

        await slack.send({
            text: message,
            channel: '#' + channel,
            username: username
        });
    } catch (err) {
        console.log("ERR " + err);
    }
    console.log('Sending message', message, 'to channel', channel);
}
