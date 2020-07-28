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
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BackgroundImage from './static/02.png';
import { ApplicationAnalysisKey } from '../../../application/define/index';
// import PrizeButton from './prizeButton';

import NineGame from './nineGame';                              // 九宫格游戏组件
import { config, mobile } from '../../../application/index';
import { CoreNavigation } from '../../../components';
import style from './style.less';

const { CoreNavigationItemType, CoreNavigationAction } = CoreNavigation;

class Index extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super();
    this.state = {
      reloadCount: 0, // 刷新页面使用
      activityPrizes: dot.get(props, 'activity20191212.activityPrizes', []),
      hasActivityPermission: dot.get(props, 'activity20191212.hasActivityPermission', false),
      isSigned: false,                   // 默认未签到
    };

    // 统计浏览
    props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageActivity20191212Opened } });
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

    // 获取签到信息
    this.props.dispatch({ type: 'score/fetchSignInfo', payload: { AccountId } });
    // 统计浏览
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageActivity20191212Viewed } });
  }

  componentWillReceiveProps(props) {
    const state = {
      activityPrizes: dot.get(props, 'activity20191212.activityPrizes', []),
      hasActivityPermission: dot.get(props, 'activity20191212.hasActivityPermission', false),
      isSigned: dot.get(props, 'score.isSigned', false),
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
    dispatch({ type: 'activity20191212/fetchActivityPermission', payload: params });
  }

  // 刷新页面
  onReloadPage = () => {
    const { reloadCount } = this.state;
    const { AccountId } = config;
    this.setState({
      reloadCount: reloadCount + 1,
    });
    this.onFetchActivityPermission(AccountId);
    // 获取签到信息
    this.props.dispatch({ type: 'score/fetchSignInfo', payload: { AccountId } });
  }

  // 跳转到我的积分页
  onDirectToScore = () => {
    // 统计跳转
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromActivity20191212ToScore } });

    const { privateHistory } = this.props.history;
    privateHistory.push('/Manage/Score?action=back');
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
      title: <span style={{ color: '#FFFDE6' }}>抽奖活动</span>,
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

  // 渲染抽奖点击按钮
  renderPrizeButtons = () => {
    // 如果没有抽奖机会，直接不显示抽奖按钮
    // const { hasActivityPermission, activityPrizes } = this.state;
    // if (hasActivityPermission !== true) {
    //   console.log('没有活动抽奖的权限');
    //   return '';
    // }

    // 判断奖品池
    // if (is.empty(activityPrizes)) {
    //   console.log('奖品池信息为空, 不能抽奖');
    //   return '';
    // }

    // return (
    //   <div className={style['page-pirze-container']}>
    //     {/* <PrizeButton activityPrizes={activityPrizes} className={style['page-prize-first-button']} onReloadPage={this.onReloadPage} /> */}
    //   </div>
    // );
  }

  // 渲染游戏提示
  renderGameTips = () => (
    <div className={style['page-game-tips']}>完成每日签到可增加 1 次抽奖机会</div>
  )

  // 渲染九宫格游戏
  renderNineGame = () => {
    const { privateHistory } = this.props.history;
    return (<div className={style['page-game-bg-box']}><NineGame onReloadPage={this.onReloadPage} privateHistory={privateHistory} /></div>);
  }


  // 渲染行为功能按钮
  renderActionButtons = () => (
    <div className={style['page-button-container']}>
      <div className={style['page-button-first-button']} onClick={this.onDirectToScore}>查看积分</div>
    </div>
  )

  // 渲染抽奖提示
  renderPrizeTips = () => {
    console.log(this)
    const { isSigned, hasActivityPermission } = this.state;
    // 判断是否能够抽奖
    if (!isSigned) {
      return (
        <div className={style['page-prize-tips']}>
          完成每日签到可增加一次抽奖机会
        </div>
      );
    }
    if (hasActivityPermission !== true) {
      return (
        <div className={style['page-prize-tips']}>
          今日抽奖机会已用完，明天再来吧~
        </div>
      );
    }

    return null;
  }

  // 渲染伪造的中奖信息
  renderPrizeInfo = () => {
    // 随机函数，返回指定范围内的随机整数
    const rand = (min, max) => Math.floor(Math.random() * (max - min)) + min;
    // 手机号段
    const names = '134,147,150,151,152,157,158,159,178,182,183,184,187,188,130,131,132,145,155,156,185,186,176,175,133,149,153,180,181,189,177'.split(',');
    // 伪造中奖手机号
    const name = `${names[Math.floor(Math.random() * names.length)]}xxxxx${rand(100, 999)}`;

    // 年月日
    const date = moment().format('MM月DD日');
    const hour = moment().subtract(Math.floor((Math.random() * 5) + 1), 'hour').format('HH');
    const minute = moment().subtract(Math.floor((Math.random() * 59) + 1), 'minute').format('mm');
    const second = moment().subtract(Math.floor((Math.random() * 59) + 1), 'second').format('mm');

    // 伪造大奖中奖概率，6积分概率计算50%，66积分概率50%
    const prizeSeed = rand(1, 999);
    let prize = '6积分';
    if (prizeSeed < 500) {
      prize = '66积分';
    }

    // 伪造中奖信息
    return `${name} ${date} ${hour}:${minute}:${second} 获得${prize}`;
  }

  // 渲染中奖信息
  renderFakeInfo = () => (
    <div className={style['page-info-content']}>
      <div className={style['page-info-content-title']}>中奖名单</div>
      <p className={style['page-info-content-text']}>{this.renderPrizeInfo()}</p>
      <p className={style['page-info-content-text']}>{this.renderPrizeInfo()}</p>
      <p className={style['page-info-content-text']}>{this.renderPrizeInfo()}</p>
    </div>
  )

  // 活动细则说明
  renderExplain = () => (
    <div className={style['page-explain-wrap']}>
      <div className={style['page-explain-title']}>
        {/* eslint-disable-next-line global-require */}
        <img src={require('./static/03.png')} alt="" />
      </div>
      <div className={style['page-explain-content']}>
        <div className={style['page-explain-content-notice']}>每位用户每天可以有两次抽奖机会，在活动期间每天可获得一次抽奖机会，另外完成每日签到可额外获得一次抽奖机会~</div>
        <div className={style['page-explain-content-div']}>
          <div className={style['page-explain-content-div-top']}>活动时间：</div>
          <div className={style['page-explain-content-div-tiny']}>2019.12.06-2019.12.31</div>
        </div>
        <div className={style['page-explain-content-div']}>
          <div className={style['page-explain-content-div-top']}>活动奖励说明：</div>
          <div>参与抽奖可得BOSS骑士APP积分，更有机会获得66积分礼包，每次抽奖100%中奖。</div>
        </div>
        <div className={style['page-explain-content-div']}>
          <div className={style['page-explain-content-div-top']}>活动细则：</div>
          <div className={style['page-explain-content-div-li']}>1. 参与活动请使用最新版APP。</div>
          <div className={style['page-explain-content-div-li']}>2. 获得的积分奖励在【我的】-【积分】中查看。</div>
          <div className={style['page-explain-content-div-li']}>3. 活动形式、活动奖励以及活动截止时间可能会根据活动进行情况做出调整。</div>
          <div className={style['page-explain-content-div-li']}>4. 本活动最终解释权归BOSS骑士APP所属公司。</div>
        </div>
      </div>
    </div>
  )

  //
  renderContent = () => (
    <div>
      {/* 渲染金蛋点击按钮 */}
      {this.renderPrizeButtons()}

      {/* 渲染游戏提示 */}
      {this.renderGameTips()}
      {/* 渲染九宫格游戏 */}
      {this.renderNineGame()}

      {/* 渲染行为功能按钮 */}
      {this.renderActionButtons()}

      {/* 渲染抽奖提示 */}
      {this.renderPrizeTips()}

      {/* 渲染假的活动信息 */}
      {this.renderFakeInfo()}

      {/* 活动细则说明 */}
      {this.renderExplain()}

      {/* 渲染活动的背景图片 */}
      <img src={BackgroundImage} alt="" style={{ width: '100%', display: 'block' }} />
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

function mapStateToProps({ activity20191212, applicationSystem, score }) {
  return { activity20191212, applicationSystem, score };
}

export default connect(mapStateToProps)(Index);
