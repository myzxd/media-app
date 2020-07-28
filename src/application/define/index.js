// 会议状态
const MeetingState = {
  wait: 1,
  process: 50,
  finish: 100,
  cancel: -100,
  description(rawValue) {
    switch (Number(rawValue)) {
      case this.wait: return '未开始';
      case this.process: return '进行中';
      case this.finish: return '已结束';
      case this.cancel: return '已取消';
      default: return '未定义';
    }
  },
};

// 积分明细类型
const ScoreDetailMap = {
  sign: 10,
  lottery: 20,
  description(rawValue) {
    switch (Number(rawValue)) {
      case this.sign: return '每日签到领奖(签到)';
      case this.lottery: return '抽奖奖励(活动)';
      default: return '未定义';
    }
  },
};

// 统计事件的Flag值
const ApplicationAnalysisKey = {
  // 页面访问统计
  PageHomeOpened: 'PageHomeOpened',                           // 首页打开
  PageHomeViewed: 'PageHomeViewed',                           // 首页浏览
  PageSignOpened: 'PageSignOpened',                           // 签到页打开
  PageSignViewed: 'PageSignViewed',                           // 签到页浏览
  PageScoreOpened: 'PageScoreOpened',                         // 个人页打开
  PageScoreViewed: 'PageScoreViewed',                         // 个人页浏览
  PageScoreDetailOpened: 'PageScoreDetailOpened',             // 积分详情页面浏览
  PageScoreDetailViewed: 'PageScoreDetailViewed',             // 积分详情页面打开
  PageScoreRankOpened: 'PageScoreRankOpened',                 // 积分排行页面打开
  PageScoreRankViewed: 'PageScoreRankViewed',                 // 积分排行页面浏览
  PageSignDescriptionOpened: 'PageSignDescriptionOpened',     // 签到描述页打开
  PageSignDescriptionViewed: 'PageSignDescriptionViewed',     // 签到描述页浏览
  PageAppointmentOpened: 'PageAppointmentOpened',             // 预约页面打开
  PageAppointmentViewed: 'PageAppointmentViewed',             // 预约页面浏览
  PageActivity20191204Opened: 'PageActivity20191204Opened',   // 砸金蛋活动页打开
  PageActivity20191204Viewed: 'PageActivity20191204Viewed',   // 砸金蛋活动页浏览
  PageActivity20191212Opened: 'PageActivity20191212Opened',   // 九宫格活动页打开
  PageActivity20191212Viewed: 'PageActivity20191212Viewed',   // 九宫格活动页浏览
  PageActivity20191224Opened: 'PageActivity20191224Opened',   // 九宫格第二版活动页打开
  PageActivity20191224Viewed: 'PageActivity20191224Viewed',   // 九宫格第二版活动页浏览
  PageDayDayMoneyOpened: 'PageDayDayMoneyOpened',   // 天天赚钱页打开
  PageDayDayMoneyViewed: 'PageDayDayMoneyViewed',   // 天天赚钱页浏览
  PageDayDayMoneyRuleOpened: 'PageDayDayMoneyOpened',   // 天天赚钱规则页打开
  PageDayDayMoneyRuleViewed: 'PageDayDayMoneyViewed',   // 天天赚钱规则页浏览

  // 页面跳转统计
  RedirectFromHomeToSignPage: 'RedirectFormHomeToSignPage',                   // 首页跳转到签到页
  RedirectFromHomeToActivity20191204: 'RedirectFromHomeToActivity20191204',   // 首页跳转到砸金蛋活动
  RedirectFromHomeToActivity20191212: 'RedirectFromHomeToActivity20191212',   // 首页跳转到九宫格活动页面
  RedirectFromScoreToSignPage: 'RedirectFromScoreToSignPage',                 // 个人页跳转到签到页
  RedirectFromActivity20191204ToScore: 'RedirectFromActivity20191204ToScore', // 砸金蛋活动页跳转到积分页
  RedirectFromActivity20191204ToPuShu: 'RedirectFromActivity20191204ToPuShu', // 砸金蛋活动页跳转到普树页
  RedirectFromActivity20191212ToScore: 'RedirectFromActivity20191212ToScore', // 九宫格活动页跳转到积分页
  RedirectFromActivity20191224ToScore: 'RedirectFromActivity20191224ToScore', // 九宫格第二版活动页跳转到积分页
  RedirectFromHomeToDayDayMoney: 'RedirectFromHomeToDayDayMoney',           // 首页跳转到天天赚钱页
  RedirectFromDayDayMoneyToDayDayMoneyRule: 'RedirectFromDayDayMoneyToDayDayMoneyRule',           // 天天赚钱页面跳转到天天赚钱规则页面

  // 页面事件统计
  ActionDailySign: 'ActionDailySign',                               // 每日签到事件
  ActionAppointmentPayment: 'ActionAppointmentPayment',             // 服务费预约点击
  ActionAppointmentTasks: 'ActionAppointmentTasks',                 // 任务中心预约点击
  ActionAppointmentMoneyMaker: 'ActionAppointmentMoneyMaker',       // 赚外快预约点击
  ActionAppointmentAdvertisement: 'ActionAppointmentAdvertisement', // 看广告预约点击
  ActionActivity20191204: 'ActionActivity20191204',                 // 砸金蛋活动的点击
  ActionActivity20191212: 'ActionActivity20191212',                 // 九宫格活动的点击
  ActionActivity20191224: 'ActionActivity20191224',                 // 九宫格第二版活动的点击
  ActionDayDayMoneyApplication: 'ActionDayDayMoneyApplication',      // 天天赚钱立即申请的点击
};

export {
  MeetingState,
  ScoreDetailMap,                                    // 积分明细
  ApplicationAnalysisKey,
};
