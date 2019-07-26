import BroadcastChannel from 'broadcast-channel';
const channel = new BroadcastChannel('host');
channel.onmessage = msg => {
  if(msg.source) {
    const client = new BroadcastChannel(msg.source);
    client.postMessage({
      source: 'host',
      msg: `I received your message: ${msg.msg}`,
    });
    client.close();
  }
}

channel.addEventListener('message', function (msg) {
  console.log(`this is message listener: ${msg.msg}`)
});


