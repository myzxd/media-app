/**
 * 应用 - 积分页相关接口
 */
import request from '../../application/utils/request';

/**
 * 查新参加活动的权限
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchActivityPermission(params) {
  return request('activity_event_core.activity_event_core.validate_account_permissions', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}

/**
 * 更新活动中奖信息
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function updateActivityPrizeInfo(params = {}) {
  return request('activity_event_core.activity_event_core.create', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}
