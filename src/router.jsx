/**
 * router center 路由模块
 */
import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'dva/dynamic';
import { Router, Route, Switch } from 'dva/router';

import routesConfig from './application/define/routes';
import Hook from './application/service/hook';

// 路由中心
export default function AppRouter({ history, app }) {
  // 手机服务的钩子函数注册
  Hook.init(history);

  // 渲染动态路由
  const renderDynamicRoutes = (routes = []) => routes.map((route) => {
    // 动态加载，dva支持的dynamic初始化，返回Promise对象。dynamic说明见 https://dvajs.com/api/#dva-dynamic
    const DynamicComponent = dynamic({
      app, // dva 实例，加载 models 时需要
      component: route.component,
    });
      // 初始化路由节点
    return (<Route key={route.path} exact={route.path !== '*'} path={route.path} component={DynamicComponent} />);
  });

  return (
    <Router history={history}>
      {/* 只渲染单一路径条件，https://reacttraining.com/react-router/web/api/Switch */}
      <Switch>
        {/* 渲染动态路由 */}
        {renderDynamicRoutes(routesConfig) }
      </Switch>
    </Router>
  );
}

AppRouter.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  app: PropTypes.object.isRequired,
};
