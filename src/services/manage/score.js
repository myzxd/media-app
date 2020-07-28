/**
 * 应用 - 积分页相关接口
 */
import request from '../../application/utils/request';

/**
 * 每日签到
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function updateScoreByDailySign(params) {
  return request('assignment.clock.clock_in', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}

/**
 * 查询签到信息
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchSignInfo(params) {
  return request('assignment.clock.is_clock_in', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}

/**
 * 创建预约信息
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function createAppointmentInfo(params) {
  return request('assignment.counter.create', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}

/**
 * 查询预约信息
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchAppointmentInfo(params = {}) {
  return request('assignment.appointment.get_appointment_info', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}

/**
 * 获取签到积分
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchScore(params) {
  return request('wallet.wallet.get', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}
/**
 * 获取积分详情
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchScoreDetail(params) {
  return request('wallet.score.find_score_log', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}

/**
 * 获取积分排名
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchScoreRank(params) {
  return request('wallet.score.find_score_ranking_list', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}

/**
 * 获取自身积分排名
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchScoreRankSelf(params) {
  return request('wallet.score.get_self_score_ranking', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}
