/* eslint-disable no-console */
/**
 * 优惠券-活动页面
 * 活动时间：2019-11月底之前
 * 结束时间：2019-12-01 00:00
 */
import is from 'is_js';
import dot from 'dot-prop';
import moment from 'moment';
import { connect } from 'dva';
import { Toast } from 'antd-mobile';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BackgroundImage from './static/background.png';
import BackgroundImage1 from './static/background1.png';
import BackgroundImage2 from './static/background2.png';
import BackgroundImage3 from './static/background3.png';

import { ApplicationAnalysisKey } from '../../../application/define/index';
import PrizeButton from './prizeButton';

import { config, mobile } from '../../../application/index';
import { CoreNavigation } from '../../../components';
import style from './style.less';

const { CoreNavigationItemType, CoreNavigationAction } = CoreNavigation;

// 金蛋的索引
const ActivityIndex = {
  first: 'first',
  second: 'second',
  third: 'third',

  // 根据选中的索引，获取背景图片
  backgroundImageByIndex(index) {
    switch (index) {
      case this.first: return BackgroundImage1;
      case this.second: return BackgroundImage2;
      case this.third: return BackgroundImage3;
      default: return BackgroundImage;
    }
  },
};

class Index extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super();
    this.state = {
      reloadCount: 0, // 刷新页面使用
      prizeSelectedIndex: 0,  // 选中的奖品索引，默认不选中
      activityPrizes: dot.get(props, 'activity20191204.activityPrizes', []),
      hasActivityPermission: dot.get(props, 'activity20191204.hasActivityPermission', false),
      canDriectToPuShu: dot.get(props, 'applicationSystem.canDriectToPuShu', false),
    };

    // 统计浏览
    props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageActivity20191204Opened } });
  }

  componentDidMount() {
    const { AccountId } = config;
    if (is.not.empty(AccountId) && is.existy(AccountId)) {
      this.onFetchActivityPermission(AccountId);
    }

    mobile.updateStateBarColor({ color: 'e34e3e' }, undefined, () => {
      console.log('componentDidMount updateStateBarColor 移动端尚未初始化，操作失败');
    });

    // 隐藏tabs
    mobile.updateTabsDisplayState({ isHide: true }, undefined, () => {
      console.log('更新tabs隐藏失败');
    });

    // 统计浏览
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageActivity20191204Viewed } });
  }

  componentWillReceiveProps(props) {
    const state = {
      activityPrizes: dot.get(props, 'activity20191204.activityPrizes', []),
      hasActivityPermission: dot.get(props, 'activity20191204.hasActivityPermission', false),
      canDriectToPuShu: dot.get(props, 'applicationSystem.canDriectToPuShu', false),
    };
    this.setState(state);
  }

  componentWillUnmount() {
    mobile.updateStateBarColor({ color: 'FFFFFF' }, undefined, () => {
      console.log('componentWillUnmount updateStateBarColor 移动端尚未初始化，操作失败');
    });

    // 显示tabs
    mobile.updateTabsDisplayState({ isHide: false }, undefined, () => {
      console.log('更新tabs显示失败');
    });
  }

  // 获取活动参与权限
  onFetchActivityPermission = (accountId) => {
    const { dispatch } = this.props;
    const params = {
      accountId,
    };
    dispatch({ type: 'activity20191204/fetchActivityPermission', payload: params });
  }

  onReloadPage = () => {
    const { reloadCount } = this.state;
    const { AccountId } = config;
    this.setState({
      reloadCount: reloadCount + 1,
    });
    this.onFetchActivityPermission(AccountId);
  }

  // 跳转到我的积分页
  onDirectToScore = () => {
    // 统计跳转
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromActivity20191204ToScore } });

    const { privateHistory } = this.props.history;
    privateHistory.push('/Manage/Score?action=back');
  }

  // 跳转到普树页面
  onDirectToPuShu = () => {
    // 统计跳转
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromActivity20191204ToPuShu } });

    console.log('onDirectToPuShu');
    // 服务费预支
    mobile.payInAdvance({}, undefined, () => {
      Toast.fail('移动端尚未初始化，操作失败');
    });
  }

  // 根据抽奖更新背景图
  onChangeBannerByIndex = (index) => {
    this.setState({
      prizeSelectedIndex: index,
    });
  }

  // 渲染导航栏
  renderNavigation = () => {
    // 左侧行为
    const leftActionCustom = {
      type: CoreNavigationItemType.icon,
      icon: 'left',
      action: CoreNavigationAction.back,
    };

    const props = {
      title: <span style={{ color: '#FFFDE6' }}>预支服务费</span>,
      history: this.props.history,
      leftItem: leftActionCustom,
      style: {
        backgroundColor: '#E34E3E',
        color: '#FFFDE6',
      },
    };

    return (
      <CoreNavigation {...props} />
    );
  }

  // 渲染金蛋点击按钮
  renderPrizeButtons = () => {
    // 如果没有抽奖机会，直接不显示抽奖按钮
    const { hasActivityPermission, activityPrizes } = this.state;
    if (hasActivityPermission !== true) {
      console.log('没有活动抽奖的权限');
      return '';
    }

    // 判断奖品池
    if (is.empty(activityPrizes)) {
      console.log('奖品池信息为空, 不能抽奖');
      return '';
    }

    return (
      <div className={style['page-pirze-container']}>
        <PrizeButton activityPrizes={activityPrizes} className={style['page-prize-first-button']} onChangeBannerByIndex={() => { this.onChangeBannerByIndex(ActivityIndex.first); }} onReloadPage={this.onReloadPage} />
        <PrizeButton activityPrizes={activityPrizes} className={style['page-prize-second-button']} onChangeBannerByIndex={() => { this.onChangeBannerByIndex(ActivityIndex.second); }} onReloadPage={this.onReloadPage} />
        <PrizeButton activityPrizes={activityPrizes} className={style['page-prize-third-button']} onChangeBannerByIndex={() => { this.onChangeBannerByIndex(ActivityIndex.third); }} onDirectToPuShu={this.onDirectToPuShu} onReloadPage={this.onReloadPage} />
      </div>
    );
  }

  // 渲染行为功能按钮
  renderActionButtons = () => (
    <div className={style['page-button-container']}>
      <div className={style['page-button-first-button']} onClick={this.onDirectToScore}>查看积分</div>
    </div>
  )

  // 暂时屏蔽优惠券的活动
  // const { canDriectToPuShu } = this.state;
  // // 判断能否访问普树
  // if (canDriectToPuShu !== true) {
  //   return (
  //     <div className={style['page-button-container']}>
  //       <div className={style['page-button-first-button']} onClick={this.onDirectToScore}>查看积分</div>
  //       <div className={style['page-button-second-button-disabled']}>马上预支</div>
  //     </div>
  //   );
  // }
  //
  // return (
  //   <div className={style['page-button-container']}>
  //     <div className={style['page-button-first-button']} onClick={this.onDirectToScore}>查看积分</div>
  //     <div className={style['page-button-second-button']} onClick={this.onDirectToPuShu}>马上预支</div>
  //   </div>
  // );


  // 渲染活动的背景
  renderActivityBackground = () => {
    const { prizeSelectedIndex } = this.state;
    const backgroundImage = ActivityIndex.backgroundImageByIndex(prizeSelectedIndex);
    return (
      <img src={backgroundImage} alt="" style={{ width: '100%' }} />
    );
  }

  // 渲染抽奖提示
  renderPrizeTips = () => {
    // 判断是否能够抽奖
    const { hasActivityPermission } = this.state;
    if (hasActivityPermission !== true) {
      return (
        <div className={style['page-prize-tips']}>
            今日抽奖机会已使用，明天再来吧
        </div>
      );
    }

    return (
      <div className={style['page-prize-tips']}>
        您还有一次抽奖机会
      </div>
    );
  }

  // 渲染预约姓名
  renderPrizeInfo = () => {
    const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    const names = '134,147,150,151,152,157,158,159,178,182,183,184,187,188,130,131,132,145,155,156,185,186,176,175,133,149,153,180,181,189,177'.split(',');
    const name = `${names[Math.floor(Math.random() * names.length)]}xxxxx${rand(100, 999)}`;

    const date = moment().format('MM月DD日');
    const hour = moment().subtract(Math.floor((Math.random() * 5) + 1), 'hour').format('HH');
    const minute = moment().subtract(Math.floor((Math.random() * 59) + 1), 'minute').format('mm');
    const second = moment().subtract(Math.floor((Math.random() * 59) + 1), 'second').format('mm');

    const prizeSeed = rand(1, 999);
    let prize = '6积分';
    if (prizeSeed > 600) {
      prize = '优惠券';
    }
    if (prizeSeed > 300 && prize <= 600) {
      prize = '66积分';
    }
    return `${name} ${date} ${hour}:${minute}:${second} 获得${prize}`;
  }

  // 渲染中奖信息
  renderFakeInfo = () => (
    <div className={style['page-info-content']}>
      <p className={style['page-info-content-text']}>{this.renderPrizeInfo()}</p>
      <p className={style['page-info-content-text']}>{this.renderPrizeInfo()}</p>
      <p className={style['page-info-content-text']}>{this.renderPrizeInfo()}</p>
    </div>
  )

  //
  renderContent = () => (
    <div>
      {/* 渲染金蛋点击按钮 */}
      {this.renderPrizeButtons()}

      {/* 渲染行为功能按钮 */}
      {this.renderActionButtons()}

      {/* 渲染抽奖提示 */}
      {this.renderPrizeTips()}

      {/* 渲染假的活动信息 */}
      {this.renderFakeInfo()}

      {/* 渲染活动的背景图片 */}
      {this.renderActivityBackground()}
    </div>
  )

  render() {
    const { reloadCount } = this.state;
    console.log(`页面刷新计数: ${reloadCount}`);
    return (
      <div className={style['page-container']}>
        {/* 渲染导航栏 */}
        {this.renderNavigation()}

        {/* 渲染内容 */}
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ activity20191204, applicationSystem }) {
  return { activity20191204, applicationSystem };
}

export default connect(mapStateToProps)(Index);
