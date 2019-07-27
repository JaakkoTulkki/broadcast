import {waitNotToThrow} from "./utils"
afterEach(() => {
  document.querySelectorAll('iframe').forEach(elem => {elem.parentNode.removeChild(elem)});
})

beforeEach(() => {
  document.querySelectorAll('iframe').forEach(elem => {elem.parentNode.removeChild(elem)});
})

test('iframe should work one deep', async (done) => {
  const iframe = document.createElement("iframe");
  const cb1 = jest.fn();
  document.body.appendChild(iframe);
  const assertionFn = (event) => {
    cb1();
    expect(event.data).toEqual('from iframe');
  };
  window.addEventListener('message', assertionFn, true);

  iframe.contentWindow.document.write("<script>window.top.postMessage('from iframe', window.location.origin)</script>");

  await waitNotToThrow(() => {
    expect(cb1).toHaveBeenCalled();
  })
  window.removeEventListener('message', assertionFn, true);
  done();
})

test('nested iframes should work', async (done) => {
  const cb1 = jest.fn();
  const assertionFn = (event) => {
    cb1();
    expect(event.data).toEqual('from inner iframe');
  }
  window.addEventListener('message', assertionFn, true);
  const outerIframe = document.createElement("iframe");
  const innderIframe = document.createElement('iframe');
  document.body.appendChild(outerIframe);
  outerIframe.contentWindow.document.body.appendChild(innderIframe)
  innderIframe.contentWindow.document.write("<script>window.top.postMessage('from inner iframe', window.location.origin)</script>");

  await waitNotToThrow(() => {
    expect(cb1).toHaveBeenCalled();
  })
  window.removeEventListener('message', assertionFn, true);
  done();
});