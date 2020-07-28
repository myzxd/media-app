/* eslint-disable no-restricted-syntax */
/**
 * 应用 - 预约
 */
import is from 'is_js';
import dot from 'dot-prop';
import { fetchActivityPermission, fetchActivityPrizeInfo } from '../../services/activities/activity20191224';

export default {
  /**
   * 命名空间
   */
  namespace: 'activity20191224',

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
   * @namespace activity20191224/effects
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
        activity_no: '20191224_activity_surprise_nine_grids_flag',
      };
      const result = yield call(fetchActivityPermission, params);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.ok) && result.ok) {
        yield put({ type: 'reduceActivityPermission', payload: result });
      } else {
        console.log('获取活动参与权限失败', 3);
      }
    },

    // 更新奖品信息
    * fetchActivityPrizeInfo({ payload = {} }, { call, put }) {
      if (is.empty(payload.accountId) || is.not.existy(payload.accountId)) {
        console.log('无法请求数据，缺少账户ID', 3);
        return;
      }

      // 请求参数
      const params = {
        account_id: payload.accountId,
        activity_no: '20191224_activity_surprise_nine_grids_flag',
      };

      const result = yield call(fetchActivityPrizeInfo, params);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.ok) && result.ok) {
        console.log('领奖成功');
        // 成功回调
        if (payload.onSuccessPlay) {
          payload.onSuccessPlay(result.data.pool_no);
        }
        return;
      }

      console.log('领奖失败');
      // 失败回调
      if (payload.onFailureCallback) {
        payload.onFailureCallback(result);
      }
    },

    // 清空中奖信息，礼品列表和是否能抽奖
    * resetActivityInfo(e, { put }) {
      yield put({ type: 'reduceResetActivityInfo' });
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
      const giftsBox = [];
      if (action.payload) {
        hasActivityPermission = dot.get(action.payload, 'is_allow', false);
        activityPrizes = dot.get(action.payload, 'reward_pool_list', []);
        activityPrizes.map((item) => {
          const obj = {};
          for (const key in item) {
            if (key === 'name') {
              obj[key] = item[key].slice(0, -2);
            } else {
              obj[key] = item[key];
            }
          }
          giftsBox.push(obj);
        });
      }
      return {
        ...state, hasActivityPermission, activityPrizes: giftsBox,
      };
    },

    /**
     * 清空活动信息
     * #returns {array} 更新 score
     * @memberof module:model/activities/reducers
     */
    reduceResetActivityInfo(state) {
      return {
        ...state, hasActivityPermission: false, activityPrizes: [],
      };
    },
  },
};
