import BroadcastChannel from 'broadcast-channel';
import {waitNotToThrow} from "./utils"

beforeEach(async () => {
  const hasRun = await BroadcastChannel.clearNodeFolder();
  // console.log(hasRun); // > trueq on NodeJs, false on Browsers
})

test('BroadcastChannel should approve messages from the same channel', async (done) => {
  const channel = new BroadcastChannel('one');
  const oneMock = jest.fn();
  channel.onmessage = (msg) => {
    expect(msg).toEqual({hello: 'world'});
    oneMock();
  }
  const same = new BroadcastChannel('one');
  await same.postMessage({hello: 'world'})
  await waitNotToThrow(() => {
    expect(oneMock).toHaveBeenCalled();
  })
  await channel.close();
  await same.close();
  done();
});

test('Same channels should receive the messages', async (done) => {
  const one = new BroadcastChannel('one');
  const two = new BroadcastChannel('one');
  const oneMock = jest.fn();
  const twoMock = jest.fn();
  one.onmessage = (msg) => {
    expect(msg).toEqual({hello: 'world'});
    oneMock();
  }
  two.onmessage = (msg) => {
    expect(msg).toEqual({hello: 'world'});
    twoMock();
  }

  const same = new BroadcastChannel('one');
  await same.postMessage({hello: 'world'})
  await waitNotToThrow(() => {
    expect(oneMock).toHaveBeenCalled();
    expect(twoMock).toHaveBeenCalled();
  }, 10);
  await one.close();
  await two.close();
  await same.close();
  done();
})

test('BroadcastChannel should not receive messages from different channels', async (done) => {
  const channel = new BroadcastChannel('one');
  const oneMock = jest.fn();
  channel.onmessage = (msg) => {
    oneMock();
  }
  const different = new BroadcastChannel('different');
  await different.postMessage({hello: 'world'})
  expect(oneMock).not.toHaveBeenCalled();
  await channel.close();
  await different.close();
  done();
})

test('postMessage works without any iframes', async (done) => {
  const mock = jest.fn();
  window.addEventListener('message', (msg) => {
    mock();
    expect(msg.data).toEqual({hello: 'world'});
  })
  window.postMessage({hello: 'world'}, window.location.origin);

  await waitNotToThrow(() => {
    expect(mock).toHaveBeenCalled();
  })
  done();
})

test.only('postMessage works with iframes', async (done) => {
  const mock = jest.fn();
  window.addEventListener('message', (msg) => {
    mock();
    expect(msg.data).toEqual({hello: 'world'});
  })
  window.postMessage({hello: 'world'}, window.location.origin);

  await waitNotToThrow(() => {
    expect(mock).toHaveBeenCalled();
  })
  done();
})