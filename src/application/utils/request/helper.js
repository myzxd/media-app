import CryptoJS from 'crypto-js';
import Crypto from 'crypto';
import Errors from './errors';
import { config } from '../../index';

// const authorize = {};

class RequestHelper {
  /**
   * X-AUTH 签名
   *
   * @param  {number} timestamp 时间戳
   * @return {string}           加密串
   */
  static signByAuth(timestamp) {
    const message = [timestamp, timestamp].join(':');
    if (config.SecretKey) {
      return CryptoJS.HmacMD5(message, config.SecretKey).toString();
    }
    return '';
  }

  /**
   * X-TOKEN 签名
   *
   * @param  {string} token     登陆后返回的授权token
   * @param  {number} timestamp 时间戳
   * @return {string}           加密串
   */
  static signByToken(token, timestamp) {
    const message = [token, timestamp, timestamp].join(':');
    if (config.SecretKey) {
      return CryptoJS.HmacMD5(message, config.SecretKey).toString();
    }
    return '';
  }

  /**
   * 获取签名的header
   *
   * @param  {string} type header签名类型，X-AUTH或者X-TOKEN
   * @return {array}       签名加密后的header数据
   */
  static getHeaderBySign(type) {
    const timestamp = new Date() * 1;
    const result = {
      'X-APP-KEY': config.AccessKey,
      'X-MSG-ID': [timestamp, timestamp].join(','),
    };

    let sign = null;
    if (type === 'X-AUTH') {
      sign = RequestHelper.signByAuth(timestamp);
      result[type] = [sign].join(',');
    } else {
      const token = config.AccessToken;
      sign = RequestHelper.signByToken(token, timestamp);
      result[type] = [token, sign].join(',');
    }
    return result;
  }


  /**
   * 获取错误信息
   *
   * @param  {object} error 错误信息对象
   * @return {string}       错误信息
   */
  static getErrorMessage(error) {
    // 错误不存在，则直接返回
    if (error === undefined) {
      return '错误不存在，无法提供信息';
    }

    // 错误码不存在，则直接返回错误
    if (!error.err_code && !Number(error.err_code)) {
      return error;
    }

    // 错误信息
    let errorMessage = '';

    // 判断新的接口格式返回的错误信息
    if (error.zh_message) {
      errorMessage = error.zh_message;
    } else {
      errorMessage = Errors[error.err_code] || `${error.err_code} ${error.err_name} ${error.message}`;
    }

    // 返回参数错误的具体信息
    if (error.err_code === 401001) {
      return `${errorMessage}`;
    }

    // 返回正常的错误
    if (error.err_code !== 415001 && error.err_code !== 415002) {
      return errorMessage;
    }

    return errorMessage;
  }

  // 随机字符串（指定长度）
  static cryptoRandomString(len) {
    if (!Number.isFinite(len)) {
      throw new TypeError('Expected a finite number');
    }

    return Crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
  }

  // 32位的随机字符串
  static uniqueString() {
    return RequestHelper.cryptoRandomString(32);
  }
}

export default RequestHelper;
