const request = require('request');

const { SYMBL_APP_ID, SYMBL_APP_SECRET } = require('./constants.js');

const getAccessToken = () => new Promise((resolve, reject) => {
  const authOptions = {
    method: 'post',
    url: "https://api.symbl.ai/oauth2/token:generate",
    body: {
      type: "application",
      appId: SYMBL_APP_ID,
      appSecret: SYMBL_APP_SECRET
    },
    json: true
  };
  
  request(authOptions, (err, res, body) => {
    if (err) {
      console.error('error posting json: ', err);
      reject(err);
    }
    resolve(body);
  });
})

exports.handler = (event, context, callback) => {
  const body = event.body && typeof event.body === "string" ? JSON.parse(event.body) : event;
  const { conversationId } = body;

  getAccessToken().then(({ accessToken }) => {
    request.get({
      url: `https://api.symbl.ai/v1/conversations/${conversationId}`,
      headers: { 'Authorization': `Bearer ${accessToken}` },
      json: true
    }, (err, convoResponse) => {
      request.get({
        url: `https://api.symbl.ai/v1/conversations/${conversationId}/messages`,
        headers: { 'Authorization': `Bearer ${accessToken}` },
        json: true
      }, (err, transcriptResponse) => {
          if (err)
            callback(err);
          callback(null, { ...convoResponse.body, ...transcriptResponse.body })
      });
    })

  });
}