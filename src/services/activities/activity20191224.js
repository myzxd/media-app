/**
 * 应用 - 积分页相关接口
 */
import request from '../../application/utils/request';

/**
 * 查新参加活动的权限
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchActivityPermission(params = {}) {
  return request('activity_event_core.activity_event_core.validate_account_permissions', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
  // return {
  //   ok: true,
  //   is_allow: true,
  //   reward_pool_list: [
  //     {
  //       activity_id: 'activity_id',
  //       reward_type: 10,
  //       reward_amount: 6,
  //       name: '6分积分奖励',
  //       no: '20191224_activity_surprise_nine_grids_prize_score_6',
  //       count: 9999999999,
  //       probability: 20,
  //       note: '积分奖励系列',
  //     },
  //     {
  //       activity_id: 'activity_id',
  //       reward_type: 10,
  //       reward_amount: 66,
  //       name: '66分积分奖励',
  //       no: '20191224_activity_surprise_nine_grids_prize_score_66',
  //       count: 9999999999,
  //       probability: 10,
  //       note: '积分奖励系列',
  //     },
  //     {
  //       activity_id: 'activity_id',
  //       reward_type: 10,
  //       reward_amount: 2,
  //       name: '2分积分奖励',
  //       no: '20191224_activity_surprise_nine_grids_prize_score_2',
  //       count: 9999999999,
  //       probability: 48.2,
  //       note: '积分奖励系列',
  //     },
  //     {
  //       activity_id: 'activity_id',
  //       reward_type: 30,
  //       reward_amount: 8,
  //       name: '0.08元奖励',
  //       no: '20191224_activity_surprise_nine_grids_prize_money_8',
  //       count: 9999999999,
  //       probability: 20,
  //       note: '现金奖励系列',
  //     },
  //     {
  //       activity_id: 'activity_id',
  //       reward_type: 30,
  //       reward_amount: 23,
  //       name: '0.23元奖励',
  //       no: '20191224_activity_surprise_nine_grids_prize_money_23',
  //       count: 1500,
  //       probability: 1,
  //       note: '现金奖励系列',
  //     },
  //     {
  //       activity_id: 'activity_id',
  //       reward_type: 30,
  //       reward_amount: 128,
  //       name: '1.28元奖励',
  //       no: '20191224_activity_surprise_nine_grids_prize_money_128',
  //       count: 150,
  //       probability: 0.5,
  //       note: '现金奖励系列',
  //     },
  //     {
  //       activity_id: 'activity_id',
  //       reward_type: 30,
  //       reward_amount: 298,
  //       name: '2.98元奖励',
  //       no: '20191224_activity_surprise_nine_grids_prize_money_298',
  //       count: 100,
  //       probability: 0,
  //       note: '现金奖励系列',
  //     },
  //     {
  //       activity_id: 'activity_id',
  //       reward_type: 30,
  //       reward_amount: 2000,
  //       name: '20元奖励',
  //       no: '20191224_activity_surprise_nine_grids_prize_money_2000',
  //       count: 15,
  //       probability: 0.3,
  //       note: '现金奖励系列',
  //     },
  //   ],
  // };
}

/**
 * 更新活动中奖信息
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchActivityPrizeInfo(params = {}) {
  return request('activity_event_core.activity_event_core.create', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
  // return {
  //   ok: true,
  //   data: { pool_no: '20191224_activity_surprise_nine_grids_prize_score_66'},
  // };
}
