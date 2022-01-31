const AWS = require('aws-sdk');
const { AWS_ID, AWS_SECRET, BUCKET_NAME } = require('./constants.js');

const s3 = new AWS.S3({
  accessKeyId: AWS_ID,
  secretAccessKey: AWS_SECRET,
  region: 'us-east-2',
});

exports.handler = (event, context) => {
  const body = JSON.parse(event.body);
  const params = ({
    Bucket: BUCKET_NAME,
    Key: body.filename,
    ContentType: 'audio/*',
    Expires: 60 * 5 //time to expire in seconds
  });
  
  s3.getSignedUrl('putObject', params, (error, url) => {
    if (error) {
      console.log('error:', error)
      context.done(error)
    } else {
      context.done(null, {
        url: url,
      });
    } 
  })
}