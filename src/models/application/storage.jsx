/**
 * 应用 - 分析 - 全局的统计服务
 */
import is from 'is_js';
import dot from 'dot-prop';
import { config } from '../../application/index';
import { createStorageRecord } from '../../services/application/storage';

export default {
  /**
   * 命名空间
   */
  namespace: 'applicationStorage',

  /**
   * 状态树
   */
  state: {},

  effects: {

    // 创建事件记录
    * createStorageRecord({ payload = {} }, { call }) {
      if (is.empty(payload.eventNo) || is.not.existy(payload.eventNo)) {
        console.log('无法储存数据，缺少存储类型', 3);
        return;
      }

      if (is.empty(payload.storageKey) || is.not.existy(payload.storageKey)) {
        console.log('无法储存数据，缺少存储数据key', 3);
        return;
      }

      // 请求参数
      const params = {
        event_no: payload.eventNo,
        storage_key: payload.storageKey,
        storage_data: dot.get(payload, 'storageData', {}),
      };

      // 添加账户id
      if (is.existy(config.AccountId) && is.not.empty(config.AccountId)) {
        params.account_id = config.AccountId;
      }

      const result = yield call(createStorageRecord, params);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.ok) && result.ok) {
        // console.log('存储记录成功');
        // 成功回调
        if (payload.onSuccessCallback) {
          payload.onSuccessCallback(result);
        }
        return;
      }

      // console.log('存储记录失败');
      // 失败回调
      if (payload.onFailureCallback) {
        payload.onFailureCallback(result);
      }
    },
  },
};
