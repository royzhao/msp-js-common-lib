import {Cookie} from './cookie.service';

describe('Cookie', () => {
  it('get cookie in learn4me.com', () => {
    let cookie = new Cookie();
    expect(cookie.getCookie('u_id')).toEqual('6');
  });
})