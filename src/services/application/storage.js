/**
 * 系统 - 存储相关接口
 */
import request from '../../application/utils/request';

/**
 * 创建储存记录
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function createStorageRecord(params) {
  return request('event.event_storage.insert', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }, 'X-AUTH').then(data => data);
}
