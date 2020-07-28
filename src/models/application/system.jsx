/**
 * 应用 - 全局
 */
import is from 'is_js';
import dot from 'dot-prop';
import { checkCanDriectToPuShu } from '../../services/application/system';

export default {
  /**
   * 命名空间
   */
  namespace: 'applicationSystem',

  /**
   * 状态树
   */
  state: {
    // 判断是否可以跳转到普树
    canDriectToPuShu: false,
  },

  effects: {

    // 检查是否在团队中
    * checkCanDriectToPuShu({ payload = {} }, { call, put }) {
      const result = yield call(checkCanDriectToPuShu);
      if (is.existy(result) && is.not.empty(result) && is.existy(result.team_id) && result.team_id) {
        yield put({ type: 'reduceCanDriectToPuShu', payload: result });
      } else {
        console.log('获取信息失败', 3);
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
    reduceCanDriectToPuShu(state, action) {
      let canDriectToPuShu = false;
      if (action.payload) {
        canDriectToPuShu = dot.has(action.payload, 'team_id') && dot.has(action.payload, 'staff_id');
      }
      return {
        ...state, canDriectToPuShu,
      };
    },
  },
};
