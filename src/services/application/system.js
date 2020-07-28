/**
 * 系统 - 系统变量
 */
import request from '../../application/utils/request';

/**
 * 创建储存记录
 * @see {@link http://api.document/xxx 接口文档}
 */
export async function checkCanDriectToPuShu(params) {
  return request('salary_loan.salary_loan.get_team_info', {
    method: 'POST',
    apiVersion: 'v2',
    body: JSON.stringify(params),
  }).then(data => data);
}
