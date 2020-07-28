/* eslint no-console: ["error", { allow: ["warn", "error", "log"]  }] */
// 路由报Loading错时，页面需要刷新
const onRouteError = (err) => {
  console.log(`DEBUG: 路由调试 ${err}`);
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = err.match(pattern);
  console.log(err);
  // 检测是否有问题
  if (isChunkLoadFailed) {
    console.log('DEBUG: 路由刷新');
    window.location.reload(); // 刷新
  }
};

// 路由配置
const routes = [
  // 业务相关
  {
    title: '首页',
    path: '/Manage/Home',
    component: () => import('../../routes/manage/home/index.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '我的积分',
    path: '/Manage/Score',
    component: () => import('../../routes/manage/score/index.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '积分明细',
    path: '/Manage/Score/Detail',
    component: () => import('../../routes/manage/score/detail.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '积分排行榜',
    path: '/Manage/Score/Rank',
    component: () => import('../../routes/manage/score/rank.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '签到(供AppStore审核使用)',
    path: '/Manage/StoreSign',
    component: () => import('../../routes/manage/fakeSign/index.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '签到',
    path: '/Manage/Sign',
    component: () => import('../../routes/manage/sign/index.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '签到说明',
    path: '/Manage/Sign/Description',
    component: () => import('../../routes/manage/sign/description.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '天天赚钱',
    path: '/Manage/DayDayMoney',
    component: () => import('../../routes/manage/daydaymoney/index.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '天天赚钱规则',
    path: '/Manage/DayDayMoney/Rule',
    component: () => import('../../routes/manage/daydaymoney/rule.jsx').catch(err => onRouteError(`${err}`)),
  },

  // 活动相关
  {
    title: '预支预约（活动）兼容旧路由地址',
    path: '/Manage/AppointMent/201911',
    component: () => import('../../routes/activities/20191128/index.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '预支预约（活动）',
    path: '/Manage/Activities/20191128',
    component: () => import('../../routes/activities/20191128/index.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '砸蛋抽奖（活动）',
    path: '/Manage/Activities/20191204',
    component: () => import('../../routes/activities/20191204/index.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '九宫格抽奖（活动）',
    path: '/Manage/Activities/20191212',
    component: () => import('../../routes/activities/20191212/index.jsx').catch(err => onRouteError(`${err}`)),
  },
  {
    title: '九宫格抽奖2（活动）',
    path: '/Manage/Activities/20191224',
    component: () => import('../../routes/activities/20191224/index.jsx').catch(err => onRouteError(`${err}`)),
  },

  // 个人信息授权书
  {
    title: '个人信息授权书',
    path: '/Manage/InfoAuthorization',
    component: () => import('../../routes/argument/personalInfoAuthorization.jsx').catch(err => onRouteError(`${err}`)),
  },
  // TODO：上线前，隐藏下述路由
  // {
  //   title: '功能调试',
  //   path: '/',
  //   component: () => import('../../routes/debuger/core.jsx').catch(err => onRouteError(`${err}`)),
  // },
];

export default routes;
