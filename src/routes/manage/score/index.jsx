/* eslint-disable no-console */
/**
 * 我的签到
 */
import dot from 'dot-prop';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Icon } from 'antd-mobile';
import React, { Component } from 'react';

import style from './style.less';
import { CoreNavigation } from '../../../components/index';
import { mobile, config } from '../../../application/index';
import { ApplicationAnalysisKey } from '../../../application/define/index';



import CardImage from './static/card.png';
import WaitImage from './static/wait.png';

const { CoreNavigationItemType, CoreNavigationAction } = CoreNavigation;

class Index extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super();
    console.log(props);
    this.state = {
      score: dot.get(props, 'score.score', 0),  // 个人总分
      selfRank: 0,                                // 个人排名
      navigationAction: dot.get(props, 'location.query.action', 'quit'),
    };

    // 个人页打开
    props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageScoreOpened } });
  }

  componentDidMount() {
    // 获取积分详情
    const { dispatch } = this.props;
    const params = {
      accountId: dot.get(config, 'AccountId', ''),
    };
    dispatch({ type: 'score/fetchScore', payload: params });

    mobile.updateStateBarColor({ color: 'EF3D31' }, undefined, () => {
      console.log('componentDidMount updateStateBarColor 移动端尚未初始化，操作失败');
    });

    // 判断是否是全屏显示
    if (this.isFullScreen()) {
      // 隐藏tabs
      mobile.updateTabsDisplayState({ isHide: true }, undefined, () => {
        console.log('更新tabs隐藏失败');
      });
    }

    // 个人页浏览
    dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageScoreViewed } });

    // 积分排名
    dispatch({ type: 'score/fetchScoreRank' });

    //  自身积分排名
    dispatch({ type: 'score/fetchScoreRankSelf' });
  }

  componentWillReceiveProps(props) {
    const state = {
      score: dot.get(props, 'score.score', 0),
      selfRank: dot.get(props, 'score.scoreRankSelf', 0),
      navigationAction: dot.get(props, 'location.query.action', 'quit'),
    };
    this.setState(state);
  }

  componentWillUnmount() {
    mobile.updateStateBarColor({ color: 'FFFFFF' }, undefined, () => {
      console.log('componentWillUnmount updateStateBarColor 移动端尚未初始化，操作失败');
    });

    // 判断是否是全屏显示
    if (this.isFullScreen()) {
      // 隐藏tabs
      mobile.updateTabsDisplayState({ isHide: false }, undefined, () => {
        console.log('更新tabs显示失败');
      });
    }
  }

  // 判断是否是全屏
  isFullScreen = () => {
    // 如果需要返回，则显示全屏
    const { navigationAction } = this.state;
    return navigationAction === 'back';
  }

  // 跳转到签到页面
  onDirectToSign = () => {
    // 个人页跳转到签到页
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromScoreToSignPage } });

    const { privateHistory } = this.props.history;
    privateHistory.push('/Manage/Sign');
  }

  // 渲染导航栏
  renderNavigation = () => {
    // 判断导航栏使用返回还是原生的退出
    const { navigationAction } = this.state;
    // 左侧行为
    const leftActionCustom = {
      type: CoreNavigationItemType.icon,
      icon: 'left',
      action: navigationAction === 'back' ? CoreNavigationAction.back : CoreNavigationAction.quit,
    };
    // 右侧行为
    const rightActionCustom = {
      type: CoreNavigationItemType.text,
      text: '明细',
      action: navigationAction === 'push' ? CoreNavigationAction.push : CoreNavigationAction.push,
      url: '/Manage/Score/Detail',
    };

    const props = {
      title: <span style={{ color: '#FFFFFF', fontSize: '.15rem' }}>我的积分</span>,
      history: this.props.history,
      leftItem: leftActionCustom,
      rightItem: rightActionCustom,
      style: {
        backgroundColor: '#EF3D31',
        color: '#FFF',
      },
    };

    return (
      <CoreNavigation {...props} />
    );
  }

  renderContent = () => {
    const { score, selfRank } = this.state;

    return (
      <div>
        <div className={style['account-score-content-container']}>
          <div className={style['account-score-content-text']}>总积分</div>
          <div className={style['account-score-content-number']}>{score}</div>
          <div className={style['account-score-content-rank']}>
            <div className={style['account-score-content-rank-site']}>积分排名</div>
            {
              selfRank ? (<div className={style['account-score-content-rank-btn-wrap']} onClick={()=>{this.props.history.privateHistory.push('/Manage/Score/Rank');}}>第&nbsp;<span>{selfRank}</span>&nbsp;名<Icon type="right"/></div>) : ''
            }
          </div>
        </div>

        <div className={style['account-core-earn']}>
          <div className={style['account-row-content-container']}>
            <div className={style['account-row-content-title']}>赚取积分</div>
            <div className={style['account-row-content-click']} onClick={this.onDirectToSign}>&nbsp;</div>
            <img style={{ width: '100%' }} src={CardImage} alt="" />
          </div>
        </div>

        <div>
          <div className={style['account-row-content-container']}>
            <div className={style['account-row-content-title']}>积分兑换</div>
            <img style={{ width: '100%' }} src={WaitImage} alt="" />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={style['account-score-container']}>
        {/* 渲染导航栏 */}
        {this.renderNavigation()}

        {/* 渲染内容 */}
        {this.renderContent()}
      </div>
    );
  }
}

function mapStateToProps({ score }) {
  return { score };
}

export default connect(mapStateToProps)(Index);
