/**
 * 应用 - 预约
 */
import is from 'is_js';
import dot from 'dot-prop';
import { fetchActivityPermission, updateActivityPrizeInfo } from '../../services/activities/activity20191212';

export default {
  /**
   * 命名空间
   */
  namespace: 'activity20191212',

  /**
   * 状态树
   */
  state: {

    // 是否可以抽奖
    hasActivityPermission: false,

    // 活动奖品信息
    activityPrizes: [],
  },

  /**
   * @namespace activity20191212/effects
   */
  effects: {

    // 获取活动权限信息
    * fetchActivityPermission({ payload = {} }, { call, put }) {
      if (is.empty(payload.accountId) || is.not.existy(payload.accountId)) {
        console.log('无法请求数据，缺少账户ID', 3);
        return;
      }
      // 请求参数
      const params = {
        account_id: payload.accountId,
        activity_no: '20191212_activity_surprise_nine_grids_flag',
      };
      const result = yield call(fetchActivityPermission, params);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.ok) && result.ok) {
        yield put({ type: 'reduceActivityPermission', payload: result });
      } else {
        console.log('获取活动参与权限失败', 3);
      }
    },

    // 更新奖品信息
    * updateActivityPrizeInfo({ payload = {} }, { call }) {
      if (is.empty(payload.accountId) || is.not.existy(payload.accountId)) {
        console.log('无法请求数据，缺少账户ID', 3);
        return;
      }

      // 校验奖品信息
      if (is.empty(payload.prize) || is.not.existy(payload.prize)) {
        console.log('无法请求数据，缺少奖品信息', 3);
        return;
      }

      // 请求参数
      const params = {
        account_id: payload.accountId,
        activity_no: '20191212_activity_surprise_nine_grids_flag',
        reward_pool_no: payload.prize,
      };

      const result = yield call(updateActivityPrizeInfo, params);
      console.log(result);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.ok) && result.ok) {
        console.log('领奖成功');
        // 成功回调
        if (payload.onSuccessCallback) {
          payload.onSuccessCallback(result);
        }
        return;
      }

      console.log('领奖失败');
      // 失败回调
      if (payload.onFailureCallback) {
        payload.onFailureCallback(result);
      }
    },
  },

  /**
   * @namespace activities/reducers
   */
  reducers: {

    /**
     * 查询活动权限信息
     * #returns {array} 更新 score
     * @memberof module:model/activities/reducers
     */
    reduceActivityPermission(state, action) {
      let hasActivityPermission = false;
      let activityPrizes = [];
      if (action.payload) {
        hasActivityPermission = dot.get(action.payload, 'is_allow', false);
        activityPrizes = dot.get(action.payload, 'reward_pool_list', []);
      }
      return {
        ...state, hasActivityPermission, activityPrizes,
      };
    },
  },
};
