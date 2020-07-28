import Config from './service/config';
import Network from './service/network';
import Mobile from './service/mobile';
import Utils from './utils';

// 初始化应用
function createApp() {
  // 工具类
  const utils = Utils;

  // 授权配置文件
  const config = Config;

  // 手机相关功能调用
  const mobile = Mobile;

  // 监听有网的情况
  Network.observerOnline(() => {
    // eslint-disable-next-line no-alert
    const isRefresh = window.confirm('网络已恢复正常，是否要刷新页面?');
    if (isRefresh === true) {
      window.location.reload();
    }
  });

  // 监听断网的情况
  Network.observerOffline(() => {
    // eslint-disable-next-line no-alert
    window.alert('目前已断网，请检查您的网络链接。');
  });

  return {
    mobile,
    config,
    utils,
  };
}

const app = createApp();
const {
  mobile,
  config,
  utils,
} = app;

// 上一版 module.exports = createApp();
export default app;
export {
  mobile,
  config,
  utils,
};
