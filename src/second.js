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

window.parent.postMessage('hello middle from the second.js', window.location.origin);
window.top.postMessage('hello top from the second.js', window.location.origin);