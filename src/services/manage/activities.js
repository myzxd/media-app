/**
 * 应用 - 积分页相关接口
 */
import request from '../../application/utils/request';

/**
 * 创建预约信息
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function createAppointmentInfo(params) {
  return request('activity_event_core.activity_event_core.create', {
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
  return request('activity_event_core.activity_event_core.check_activity_data_exists', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}

/**
 * 查询预约人数的信息
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function fetchAppointmentCount(params = {}) {
  return request('activity.activity.get_counter_num', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}
