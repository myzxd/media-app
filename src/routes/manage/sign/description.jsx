/* eslint-disable no-console */
/**
 * 签到说明
 */
import { connect } from 'dva';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { ApplicationAnalysisKey } from '../../../application/define/index';
import { mobile } from '../../../application/index';
import { CoreNavigation }  from '../../../components';
import style from './style.less';

const { CoreNavigationItemType, CoreNavigationAction } = CoreNavigation;

class Index extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};

    // 页面打开
    props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageSignDescriptionOpened } });
  }

  componentDidMount() {
    // 隐藏tabs
    mobile.updateTabsDisplayState({ isHide: true }, undefined, () => {
      console.log('更新tabs隐藏失败');
    });

    // 页面浏览
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageSignDescriptionViewed } });
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
      title: '签到说明',
      history: this.props.history,
      leftItem: leftActionCustom,
      style: {
        borderBottom: '.01rem solid #E5E5EE',
      },
    };

    return (
      <CoreNavigation {...props} />
    );
  }

  renderContent = () => {
    const titleStyle = {
      fontSize: '.16rem',
      lineHeight: '.16rem',
      fontWeight: 'bold',
    };
    const contentStyle = {
      fontSize: '.16rem',
      lineHeight: '.3rem',
    };
    return (
      <div className={style['sign-description']}>
        <p style={titleStyle}>签到对象</p>
        <p style={contentStyle}>BOSS骑士APP注册用户</p>
        <p style={titleStyle}>签到说明</p>
        <p style={contentStyle}>1. 每日签到，签到成功后由系统发放积分奖励，每人每天仅能签到一次，正常每次获得2积 分，连续签到第三天可获得10积分，连续签到第15天可获得50积分奖励，连续签到第30 天可获得100积分奖励。</p>
        <p style={contentStyle}>2. 总积分可在【我的】-【我的积分】中查看。</p>
        <p style={titleStyle}>活动细节</p>
        <p style={contentStyle}>1. 参与签到请使用APP最新版本。</p>
        <p style={contentStyle}>2. 每天完成一次签到，即可领取当天对应的积分奖励，连续签到可获得积分礼包。 </p>
        <p style={contentStyle}>3. 本签到活动最终解释权归BOSS骑士APP所属公司所有。</p>
      </div>
    );
  }

  render() {
    return (
      <div className={style['sign-description-container']}>
        {/* 渲染导航栏 */}
        {this.renderNavigation()}

        {/* 渲染内容 */}
        {this.renderContent()}
      </div>
    );
  }
}

export default connect()(Index);
