/**
 * 应用 - 预约
 */
import is from 'is_js';
import dot from 'dot-prop';
import {
  createAppointmentInfo, fetchAppointmentInfo, fetchAppointmentCount,
} from '../../services/manage/activities';

export default {
  /**
   * 命名空间
   */
  namespace: 'activities',

  /**
   * 状态树
   */
  state: {

    // 预约信息
    isAppointment: false,

    // 预约人数
    appointmentCount: 0,
  },

  /**
   * @namespace score/effects
   */
  effects: {

    // 获取预约信息
    * fetchAppointmentInfo({ payload = {} }, { call, put }) {
      if (is.empty(payload.accountId) || is.not.existy(payload.accountId)) {
        console.log('无法请求数据，缺少账户ID', 3);
        return;
      }

      // 请求参数
      const params = {
        account_id: payload.accountId,
        activity_id: '5dddddf2aea3614667e28e1a',
      };
      const result = yield call(fetchAppointmentInfo, params);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.ok) && result.ok) {
        yield put({ type: 'reduceAppointmentInfo', payload: result });
      } else {
        console.log('获取预约信息失败', 3);
      }
    },

    // 获取预约信息
    * fetchAppointmentCount({ payload = {} }, { call, put }) {
      if (is.empty(payload.accountId) || is.not.existy(payload.accountId)) {
        console.log('无法请求数据，缺少账户ID', 3);
        return;
      }

      // 请求参数
      const params = {
        account_id: payload.accountId,
        activity_id: '5dddddf2aea3614667e28e1a',
      };
      const result = yield call(fetchAppointmentCount, params);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.ok) && result.ok) {
        yield put({ type: 'reduceAppointmentCount', payload: result });
      } else {
        console.log('获取预约计数失败', 3);
      }
    },

    // 预约
    * createAppointmentInfo({ payload = {} }, { call, put }) {
      if (is.empty(payload.accountId) || is.not.existy(payload.accountId)) {
        console.log('无法请求数据，缺少账户ID', 3);
        return;
      }

      // 请求参数
      const params = {
        account_id: payload.accountId,
        activity_id: '5dddddf2aea3614667e28e1a',
      };

      const result = yield call(createAppointmentInfo, params);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.ok) && result.ok) {
        console.log('预约成功');
        // 成功回调
        if (payload.onSuccessCallback) {
          payload.onSuccessCallback(result);
        }
        return;
      }

      console.log('预约失败');
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
     * 查询预约信息
     * #returns {array} 更新 score
     * @memberof module:model/activities/reducers
     */
    reduceAppointmentInfo(state, action) {
      let isAppointment = false;
      if (action.payload) {
        isAppointment = dot.get(action.payload, 'exists', false);
      }
      return {
        ...state, isAppointment,
      };
    },

    /**
     * 查询预约数量
     * #returns {array} 更新 score
     * @memberof module:model/activities/reducers
     */
    reduceAppointmentCount(state, action) {
      let appointmentCount = 0;
      if (action.payload) {
        appointmentCount = dot.get(action.payload, 'num', 0);
      }
      return {
        ...state, appointmentCount,
      };
    },
  },
};
