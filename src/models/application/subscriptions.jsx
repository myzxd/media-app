/**
 * 应用 - 会议 - 全局的订阅服务
 */
import is from 'is_js';
import { parse } from 'qs';
import { config } from '../../application/index';

export default {
  /**
   * 命名空间
   */
  namespace: 'applicationSubscriptions',

  /**
   * 状态树
   */
  state: {
  },

  /**
   * 全局订阅
   */
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        const { pathname } = location;

        // 判断是否配置授权，如果没有配置，则不处理请求
        if (is.empty(config) || is.not.existy(config)) {
          return;
        }

        // 活动页，判断是否能跳转到普树
        if (pathname === '/Manage/Activities/20191204') {
          // 获取人员信息
          dispatch({ type: 'applicationSystem/checkCanDriectToPuShu' });
        }
      });
    },
  },
};
