const { handler } = require('./index.js');

const onDone = (err, res) => {
  if (err)
    console.error("[Error]", err);

  console.log(res);
}

handler({
  "filename": "therapy-demo.mp3"
}, {
  done: onDone,
}, onDone)