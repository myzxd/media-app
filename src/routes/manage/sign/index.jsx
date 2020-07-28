/* eslint-disable no-console */
/**
 * 每日签到
 */
import dot from 'dot-prop';
import { connect } from 'dva';
import React, { Component } from 'react';
import { Progress } from 'antd-mobile';
import PropTypes from 'prop-types';

import { ApplicationAnalysisKey } from '../../../application/define/index';
import { CoreNavigation } from '../../../components';

import { mobile, config } from '../../../application/index';
import style from './style.less';

import SignButton from './sign';
import BackgroundImage from './static/background.png';
import BackgroundImage1 from './static/background1.png';
import BackgroundImage2 from './static/background2.png';
import BackgroundImage3 from './static/background3.png';

const { CoreNavigationItemType, CoreNavigationAction } = CoreNavigation;

class Index extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super();
    this.state = {
      isSigned: dot.get(props, 'score.isSigned', false),  // 是否签名
      signDays: dot.get(props, 'score.signDays', 0),      // 连续签到天数
      reloadCount: 0, // 刷新页面使用
    };

    // 页面打开
    props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageSignOpened } });
  }

  componentDidMount() {
    // 获取积分详情
    const { dispatch } = this.props;
    const params = {
      accountId: dot.get(config, 'AccountId', ''),
    };
    dispatch({ type: 'score/fetchSignInfo', payload: params });

    mobile.updateStateBarColor({ color: 'EF3D31' }, undefined, () => {
      console.log('componentDidMount updateStateBarColor 移动端尚未初始化，操作失败');
    });

    // 隐藏tabs
    mobile.updateTabsDisplayState({ isHide: true }, undefined, () => {
      console.log('更新tabs隐藏失败');
    });

    // 页面浏览
    dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageSignViewed } });
  }

  componentWillReceiveProps(props) {
    const state = {
      isSigned: dot.get(props, 'score.isSigned', false),  // 是否签名
      signDays: dot.get(props, 'score.signDays', 0),      // 连续签到天数
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

  // 跳转到签到页面
  onDirectToDescription = () => {
    // 签到页跳转到签到描述页
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromSignToSignDesc } });

    const { privateHistory } = this.props.history;
    privateHistory.push('/Manage/Sign/Description');
  }

  onReloadPage = () => {
    // 获取积分详情
    const { dispatch } = this.props;
    const params = {
      accountId: dot.get(config, 'AccountId', ''),
    };
    dispatch({ type: 'score/fetchSignInfo', payload: params });

    const { reloadCount } = this.state;
    this.setState({
      reloadCount: reloadCount + 1,
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
      title: <span style={{ color: '#FFF' }}>每日签到</span>,
      history: this.props.history,
      leftItem: leftActionCustom,
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
    const { isSigned, signDays } = this.state;
    let backgroundImage = BackgroundImage;
    // 进度条
    const progress = signDays / 30 * 100;
    if (progress >= 10 && progress < 50) {
      backgroundImage = BackgroundImage1;
    }
    if (progress >= 50 && progress < 100) {
      backgroundImage = BackgroundImage2;
    }
    if (progress >= 100) {
      backgroundImage = BackgroundImage3;
    }
    return (
      <div className={style['sign-content-container']}>
        <img style={{ width: '100%', position: 'absolute', top: 0 }} src={backgroundImage} alt="" />

        {/* 签到进度 */}
        <div className={style['sign-progress-bar-container']}>
          <Progress style={{ borderRadius: '.04rem' }} barStyle={{ border: '.02rem solid #0BBE50' }} percent={progress} position="normal" />
        </div>

        {/* 签到状态 */}
        <div className={style['sign-content-button-container']}>
          <div className={style['sign-content-button']}>
            {
              isSigned ? '已签到' : <SignButton history={this.props.history} onReloadPage={this.onReloadPage} />
            }
          </div>
        </div>

        <div className={style['sign-content-description-container']}>
          <div className={style['sign-content-description-button']} onClick={this.onDirectToDescription}> 签到说明 </div>
        </div>

      </div>
    );
  }

  render() {
    return (
      <div className={style['sign-container']}>
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
