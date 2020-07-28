/**
 * 应用 - 会议
 */
import is from 'is_js';
import dot from 'dot-prop';
import { Toast } from 'antd-mobile';
import {
  updateScoreByDailySign,
  fetchScore,
  fetchSignInfo,
  fetchAppointmentInfo,
  createAppointmentInfo,
  fetchScoreDetail,
  fetchScoreRank,
  fetchScoreRankSelf,
} from '../../services/manage/score';

export default {
  /**
   * 命名空间
   */
  namespace: 'score',

  /**
   * 状态树
   */
  state: {

    // 我的总积分（个人积分页使用）
    score: 0,

    // 是否签名成功
    isSigned: false,

    // 连续签约天数
    signDays: 0,

    // 签到获得积分（签到页面使用）
    scoreByDailySign: 0,

    // 预约数量
    appointmentInfo: {},

    // 积分明细
    scoreDetail:[],

    // 积分排名
    scoreRank:[],

    // 自身积分排名
    scoreRankSelf:'',
  },

  /**
   * @namespace score/effects
   */
  effects: {

    // 获取积分
    * fetchScore({ payload = {} }, { call, put }) {
      if (is.empty(payload.accountId)) {
        console.log('无法获取信息，缺少账户ID', 3);
        return;
      }
      const params = {
        account_id: payload.accountId,
      };
      const result = yield call(fetchScore, params);
      if (is.existy(result) && dot.has(result, 'total_score')) {
        yield put({ type: 'reduceScore', payload: result });
      } else {
        Toast.fail('获取信息失败', 3);
      }
    },

    // 获取签到信息
    * fetchSignInfo({ payload = {} }, { call, put }) {
      if (is.empty(payload.accountId)) {
        console.log('无法获取信息，缺少账户ID', 3);
        return;
      }
      const params = {
        account_id: payload.accountId,
      };
      const result = yield call(fetchSignInfo, params);
      if (result && is.not.empty(result) && is.existy(result.is_clock_in)) {
        yield put({ type: 'reduceSignInfo', payload: result });
      } else {
        Toast.fail('获取签到信息失败', 3);
      }
    },

    // 获取预约信息
    * fetchAppointmentInfo({ payload = {} }, { call, put }) {
      const result = yield call(fetchAppointmentInfo);
      if (result && is.not.empty(result)) {
        yield put({ type: 'reduceAppointmentInfo', payload: result });
      } else {
        console.log('获取预约信息失败', 3);
      }
    },

    // 创建预约信息
    * createAppointmentInfo({ payload = {} }, { call, put }) {
      if (is.empty(payload.type)) {
        console.log('无法获取信息，缺少预约类型', 3);
        return;
      }

      const params = {
        counter_type: 10,
        counter_sub_type: payload.type,
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

    // 签到
    * updateScoreByDailySign({ payload = {} }, { call, put }) {
      if (is.empty(payload.accountId) || is.not.existy(payload.accountId)) {
        console.log('无法请求数据，缺少账户ID', 3);
        return;
      }

      // 请求参数
      const params = {
        account_id: payload.accountId,
      };

      const result = yield call(updateScoreByDailySign, params);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.ok) && result.ok) {
        console.log('签到成功');
        // 成功回调
        if (payload.onSuccessCallback) {
          payload.onSuccessCallback(result);
        }
        return;
      }

      console.log('签到失败');
      // 失败回调
      if (payload.onFailureCallback) {
        payload.onFailureCallback(result);
      }
    },
    // 获取积分详情信息
    * fetchScoreDetail({ payload = {} }, { call, put }){
      if (is.empty(payload.months) || is.not.existy(payload.months)) {
        console.log('没有对应日期');
        return;
      }
      // 请求参数
      const params = {
        // account_id: '5d6cf8f2ce6d2a08789bcfcd',
        months: payload.months,
      };
      const result = yield call(fetchScoreDetail, params);
      if (result && is.not.empty(result)) {
        yield put({ type: 'reduceScoreDetail', payload: result });
      } else {
        console.log('获取积分详情失败');
      }
    },

    // 获取积分排行榜信息
    * fetchScoreRank({ payload = {} }, { call, put }){
      const result = yield call(fetchScoreRank);
      if (result && is.not.empty(result)) {
        yield put({ type: 'reduceScoreRank', payload: result });
      } else {
        console.log('获取积分排名失败');
      }
    },

    // 获取自身积分排行
    * fetchScoreRankSelf({ payload = {} }, { call, put }){
      const result = yield call(fetchScoreRankSelf);
      if (result && is.not.empty(result)) {
        yield put({ type: 'reduceScoreRankSelf', payload: result });
      } else {
        console.log('获取积分排名失败');
      }
    }
  },

  /**
   * @namespace score/reducers
   */
  reducers: {

    /**
     * 获取个人积分
     * #returns {array} 更新 score
     * @memberof module:model/meeting/reducers
     */
    reduceScore(state, action) {
      let score = 0;
      if (action.payload) {
        score = dot.get(action.payload, 'total_score', 0);
      }
      return { ...state, score };
    },

    /**
     * 查询签到信息
     * #returns {array} 更新 score
     * @memberof module:model/meeting/reducers
     */
    reduceSignInfo(state, action) {
      let isSigned = false;
      let signDays = 0;
      if (action.payload) {
        isSigned = dot.get(action.payload, 'is_clock_in', false);
        signDays = dot.get(action.payload, 'continuous_day', 0);
      }
      return {
        ...state, isSigned, signDays,
      };
    },

    /**
     * 查询预约信息
     * #returns {array} 更新 score
     * @memberof module:model/meeting/reducers
     */
    reduceAppointmentInfo(state, action) {
      let appointmentInfo = {};
      if (action.payload) {
        appointmentInfo = action.payload;
      }
      return {
        ...state, appointmentInfo,
      };
    },
    /**
     * 获取积分详情
     * #returns {array} 更新 scoreDetail
     * @memberof module:model/meeting/reducers
     */
    reduceScoreDetail(state, action) {
      let scoreDetail = [];
      if (action.payload) {
        scoreDetail = action.payload;
      }
      return {
        ...state, scoreDetail,
      };
    },
    /**
     * 获取积分详情
     * #returns {array} 更新 scoreDetail
     * @memberof module:model/meeting/reducers
     */
    reduceScoreRank(state, action) {
      let scoreRank = [];
      if (action.payload) {
        scoreRank = action.payload;
      }
      return {
        ...state, scoreRank,
      };
    },
    /**
     * 获取自身积分排行
     * #returns {array} 更新 scoreDetail
     * @memberof module:model/meeting/reducers
     */
    reduceScoreRankSelf(state, action) {
      let scoreRankSelf = '';
      if (action.payload) {
        scoreRankSelf = action.payload.self_rank;
      }
      return {
        ...state, scoreRankSelf,
      };
    },
  },
};
