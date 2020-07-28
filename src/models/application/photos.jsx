/**
 * 上传图片组件
 */
import is from 'is_js';
import { Toast } from 'antd-mobile';

import {
  getUploadToken,
  uploadFileToQiNiu,
  fetchFileURL,
} from '../../services/upload';

export default {
  /**
   *  命名空间
   *  @default
   */
  namespace: 'applicationPhotos',

  /**
   * 状态树
   * @prop {object} storage 存储空间
   * @prop {string} token 上传token
   * @prop {string} path 上传path
   */
  state: {
    storage: {}, // 存储空间（根据指定的namespace来使用，隔离不同业务的文件列表）
    token: '',  // 上传token
    path: '', // 上传path
  },

  /**
   *@namespace application/photos/effects
   */
  effects: {
    /**
     * 获取上传的token
     * @params {string} fileName 文件名
     * @memberof module:model/application/files~application/files/effects
     */
    * fetchToken({ payload = {} }, { call, put }) {
      const params = {
        file_name: 'defaultFileName',
      };
      // 文件名称
      if (is.existy(payload.filename) && is.not.empty(payload.filename)) {
        params.file_name = payload.filename;
      }

      const result = yield call(getUploadToken, params);
      if (is.truthy(result.ok) && is.existy(result.token) && is.existy(result.path)) {
        // 成功回调
        if (payload.onSuccessCallback) {
          payload.onSuccessCallback(result.token, result.path);
        }
        yield put({ type: 'reduceParams', payload: { token: result.token, path: result.path } });
        return;
      }

      // 失败回调
      if (payload.onFailureCallback) {
        payload.onFailureCallback('上传文件失败，无法获取上传token');
      }
    },

    /**
     * 上传照片
     * @param {object} file 上传的文件
     * @param {function} onSuccessCallback 上传成功回调
     * @memberof module:model/employee/manage~employee/manage/effects
     */
    // eslint-disable-next-line consistent-return
    * uploadFile({ payload }, { call }) {
      const { file, onSuccessCallback } = payload;
      if (is.not.existy(file)) {
        return Toast.info('上传文件不能为空');
      }

      // 获取上传的token
      const tokenResult = yield call(getUploadToken, { file_name: 'defaultFileName' });
      if (is.truthy(tokenResult.ok) && is.existy(tokenResult.token) && is.existy(tokenResult.path)) {
        // form形式上传文件
        const formdata = new window.FormData();
        formdata.append('key', tokenResult.path);
        formdata.append('token', tokenResult.token);
        formdata.append('file', payload.file);
        const result = yield call(uploadFileToQiNiu, formdata);
        if (is.not.existy(result.key) || is.empty(result.key)) {
          return Toast.info('上传文件失败');
        }

        // 文件名称
        // const { name } = payload.file;
        // const name = payload.file.map(item => item.file.name);
        // 文件唯一标示（页面显示使用）
        const uid = result.key;
        // 请求返回的hash
        const { hash } = result;
        // 根据key获取相应的文件地址
        const fileURL = yield call(fetchFileURL, { target_id: result.key });
        if (is.not.truthy(fileURL.ok)) {
          return Toast.info('获取上传文件地址失败');
        }
        // 已经处理好的文件信息
        const meta = {
          uid,
          hash,
          status: 'done',
          // name: fileURL.name,
          url: fileURL.url,
        };
        // 添加成功回调
        if (onSuccessCallback) {
          onSuccessCallback(meta);
        }
      } else {
        return Toast.info('上传文件失败，无法获取上传token');
      }
    },
  },

  /**
   *
   */
  /**
   * @namespace application/files/reducers
   */
  reducers: {
    /**
     * 更新上传的授权参数
     * @return {object} 更新 token,path
     * @memberof module:model/application/files~application/files/reducers
     */
    reduceParams(state, action) {
      const { token, path } = action.payload;
      return { ...state, token, path };
    },
  },
};
