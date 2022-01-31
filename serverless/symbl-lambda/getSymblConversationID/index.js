const request = require('request');
const { AWS_ID, AWS_SECRET, BUCKET_NAME, BUCKET_URL, SYMBL_APP_ID, SYMBL_APP_SECRET } = require('./constants.js');

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
  const { filename } = body;
  const fileUrl = `${BUCKET_URL}/${filename}`;
  const payload = {
    'url': fileUrl,
  }

  const responses = {
    400: 'Bad Request! Please refer docs for correct input fields.',
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
    500: 'Something went wrong! Please contact support@symbl.ai'
  }
  
  getAccessToken().then(({ accessToken }) => {
    const videoOption = {
      url: 'https://api.symbl.ai/v1/process/audio/url',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };
    request.post(videoOption, (err, response, body) => {
      const statusCode = response.statusCode;
      if (err || Object.keys(responses).indexOf(statusCode.toString()) !== -1) {
        console.log("Error getting conversation ID:", err, "Status Code:", statusCode)
      }
      callback(null, response.body);
    });
  })
  .catch((err) => console.error("Error Getting Access Token:", err));
}