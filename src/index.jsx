import dva from 'dva';
import ReactDOM from 'react-dom';
import React from 'react';
import createLoading from 'dva-loading';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import { LocaleProvider } from 'antd-mobile';
// import zhCN from 'antd-mobile/lib/locale-provider/zh_CN';
import Hook from './application/service/hook';

import { History } from './application/utils/history';

import './index.css';
import router from './router';

import score from './models/manage/score';
import activities from './models/manage/activities';
import applicationSystem from './models/application/system';
import applicationStorage from './models/application/storage';
import applicationAnalysis from './models/application/analysis';
import applicationSubscriptions from './models/application/subscriptions';

// 运营活动相关的modal，一次性的
import activity20191204 from './models/activities/activity20191204';
import activity20191212 from './models/activities/activity20191212';
import activity20191224 from './models/activities/activity20191224';

// 兼容android对象，使用window注册
window.hookObject = Hook;
window.isHookRegister = false;

moment.locale('zh-cn');

const history = new History();
window.hookHistory = history.privateHistory;
// 1. Initialize
const app = dva({
  history,
  ...createLoading(),
  onError(error) {
    // eslint-disable-next-line no-console
    console.error('app onError', error);
  },
});

// 2. Plugins
app.use(createLoading({
  effects: true,
}));

// 3. Model
app.model(score);
app.model(activities);
app.model(applicationSystem);
app.model(applicationStorage);
app.model(applicationAnalysis);
app.model(applicationSubscriptions);
app.model(activity20191204);
app.model(activity20191212);
app.model(activity20191224);

// 4. Router
app.router(router);

// 5. Start
const App = app.start();

// 6. render
ReactDOM.render(
  <App />,
  window.document.getElementById('root'),
);
