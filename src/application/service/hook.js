import is from 'is_js';

// 手机相关功能函数
class Hook {
  // 初始化钩子函数
  static init = () => {
    // 注册函数方法
    if (is.not.truthy(window.isHookRegister)) {
      Hook.registerNavigationGoBack();
      Hook.registerNavigationGoForward();
      Hook.registerNavigationReload();
    }
  }

  // 页面后退
  static registerNavigationGoBack = () => {
    Hook.registerHook('jsNavigationGoBack', () => {
      if (window.hookHistory) {
        window.hookHistory.goBack();
      }
    });
  }

  // 页面前进
  static registerNavigationGoForward = () => {
    Hook.registerHook('jsNavigationGoForward', () => {
      if (window.hookHistory) {
        window.hookHistory.goForward();
      }
    });
  }

  // 页面刷新
  static registerNavigationReload = () => {
    Hook.registerHook('jsNavigationReload', () => {
      window.location.reload();
    });
  }

  // 注册钩子函数
  static registerHook = (name = '', handler = () => {}) => {
    // 判断bridge的注册
    if (!window.bridge) {
      console.log('registerHook: window.bridge not init, cant register js hook');
      return;
    }

    // 判断函数名称
    if (name === '') {
      console.log('registerHook: function name cant be empty, cant register js hook');
      return;
    }

    // 注册js方法，提供客户端调用
    window.bridge.registerHandler(name, (data, responseCallback) => {
      if (handler) {
        console.log(`registerHook: call hook ${name}`);
        handler(data);
      }

      // 标示
      if (responseCallback) {
        console.log('registerHook: call responseCallback');
        responseCallback(data);
      } else {
        console.log('registerHook: responseCallback empty');
      }
    });

    console.log(`register hook ${name}`);
    window.isHookRegister = true;
  }
}

export default Hook;
