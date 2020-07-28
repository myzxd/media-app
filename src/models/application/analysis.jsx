/**
 * 应用 - 分析 - 全局的统计服务
 */
import is from 'is_js';

export default {
  /**
   * 命名空间
   */
  namespace: 'applicationAnalysis',

  /**
   * 状态树
   */
  state: {

  },

  effects: {

    // 创建事件记录
    * createEventRecord({ payload = {} }, { put }) {
      if (is.not.existy(payload.key) || is.empty(payload.key)) {
        console.log('统计事件key不存在，无法统计');
        return;
      }
      // 请求参数
      const params = {
        eventNo: 'H5_action_point', // 统计埋点的标示
        storageKey: payload.key,
      };

      // 使用存储服务进行请求
      yield put({
        type: 'applicationStorage/createStorageRecord',
        payload: {
          ...params,
          onSuccessCallback: () => {
            console.info(`Analysis: ${payload.key} 事件记录成功`);
          },
          onFailureCallback: () => {
            console.info(`Analysis: ${payload.key} 事件记录失败`, 3);
          },
        },
      });
    },
  },
};
