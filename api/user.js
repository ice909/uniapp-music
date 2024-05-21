import { request, get } from '@/utils/request.js';

/*
 *登录状态
 */
export function loginStatus() {
  return get('/login/status', {}, true, true);
}

/*
 *获取用户账号
 */
export function userAccount() {
  return get('/user/account', {}, true, true);
}

/*
 *发送验证码
 * @param phone 手机号
 */
export function captchaSent(phone) {
  return request({
    url: '/captcha/sent',
    method: 'GET',
    data: {
      phone: phone,
      timestamp: new Date().getTime(),
    },
  });
}
/*
 *手机号登录
 * @param phone 手机号
 * @param captcha 验证码
 * 传入验证码后密码将会失效
 */
export function loginCellphone(phone, captcha) {
  return request({
    url: '/login/cellphone',
    method: 'GET',
    data: {
      phone: phone,
      captcha: captcha,
      timestamp: new Date().getTime(),
    },
  });
}
/*
 *获取用户详情
 * @param uid 用户id
 */
export function userDetail(uid) {
  return request({
    url: '/user/detail',
    method: 'GET',
    data: {
      uid: uid,
      timestamp: new Date().getTime(),
    },
  });
}

/*
 *获取二维码key
 */
export function qrKey() {
  return get('/login/qr/key', {}, false, true);
}

/*
 *获取二维码
 * @param key 二维码key
 * @param qrimg 传入后会额外返回二维码图片base64编码
 */
export function qrCreate(key) {
  return get('/login/qr/create', { key: key, qrimg: 1 }, false, true);
}

/*
 *二维码检测扫码状态
 * @param key 二维码key
 */
export function qrCheck(key) {
  return get('/login/qr/check', { key: key }, false, true);
}
