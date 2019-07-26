import BroadcastChannel from 'broadcast-channel';
const host = new BroadcastChannel('host');
const client = new BroadcastChannel('second')

host.postMessage({
  msg: 'hello from the second',
  source: 'second',
});

client.onmessage = (msg) => {
  console.log(`second received ${msg.msg}`);
};

