const { handler } = require('./index.js');

const onDone = (err, res) => {
  if (err)
    console.error("[Error]", err);

  console.log(res);
}

handler({
  "conversationId": "6686438688030720"
}, {
  done: onDone,
}, onDone)