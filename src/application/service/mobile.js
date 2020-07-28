// 手机相关功能函数
class Mobile {
  // 获取应用配置
  static applicationConfig(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callConfig', params, onSuccessCallback, onFailureCallback);
  }

  // 退出到手机导航栏
  static quitToNavigation(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callFinish', params, onSuccessCallback, onFailureCallback);
  }

  // 页面后退的调用（ios兼容使用）
  static navigationGoBack(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callNavigationGoBack', params, onSuccessCallback, onFailureCallback);
  }

  // 显示全屏
  static displayFullScreen(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callFullscreen', params, onSuccessCallback, onFailureCallback);
  }

  // 退出全屏
  static quitFullScreen(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callFullscreen', params, onSuccessCallback, onFailureCallback);
  }

  // 显示圆角
  static displayCornerRadius(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callRoundedCorner', {
      ...params,
      isRoundedCorner: true,
    }, onSuccessCallback, onFailureCallback);
  }

  // 退出圆角
  static quitCornerRadius(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callRoundedCorner', {
      ...params,
      isRoundedCorner: false,
    }, onSuccessCallback, onFailureCallback);
  }

  // 服务费预支
  static payInAdvance(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callPayInAdvance', params, onSuccessCallback, onFailureCallback);
  }

  // 预约
  static makeAppointment(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callMakeAppointment', params, onSuccessCallback, onFailureCallback);
  }

  // 更新状态栏背景颜色
  static updateStateBarColor(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callStateBarColorChange', params, onSuccessCallback, onFailureCallback);
  }

  // 更新tabs显示
  static updateTabsDisplayState(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callUpdateTabs', params, onSuccessCallback, onFailureCallback);
  }

  // 获取地理位置
  static getLocationService(params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    Mobile.callMobileHandler('callLocationService', params, onSuccessCallback, onFailureCallback);
  }

  // 调用手机端函数
  static callMobileHandler(action, params = {}, onSuccessCallback = () => {}, onFailureCallback = () => {}) {
    if (window.bridge && window.bridge.callHandler) {
      window.bridge.callHandler(action, JSON.stringify(params), onSuccessCallback);
    } else {
      onFailureCallback();
    }
  }
}

export default Mobile;
