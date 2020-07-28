/* eslint-disable no-console */
/**
 * 首页 - 服务费预支组件
 */
import moment from 'moment';
import { connect } from 'dva';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile';

import { ApplicationAnalysisKey } from '../../../../application/define/index';
import { mobile } from '../../../../application/index';

import BannerImage from '../static/payInAdvanceBanner.png';
import BannerImageCountDown from '../static/payInAdvanceCountDownBanner.png';
import BannerImageActivity from '../static/payInAdvanceActivityBanner.png';
import BannerActivityNineGame from '../static/payInAdvanceActivityNineGame.png';

class PayInAdvanceComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super();
    this.state = {
      history: props.history,
    };
  }

  // 跳转到app内置页
  onDirectToAppView = () => {
    // 任务点击统计
    this.props.dispatch({
      type: 'applicationAnalysis/createEventRecord',
      payload: {
        key: ApplicationAnalysisKey.ActionAppointmentPayment,
      },
    });

    // 服务费预支
    mobile.payInAdvance({}, undefined, () => {
      Toast.fail('移动端尚未初始化，操作失败');
    });
  }

  // 跳转到砸金蛋页面
  onDirectToActivity20191204 = () => {
    // 首页跳转到签到页
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromHomeToActivity20191204 } });

    const { privateHistory } = this.state.history;
    privateHistory.push('/Manage/Activities/20191204');
  }

  // 跳转到九宫格页面
  onDirectToActivity20191212 = () => {
    // 首页跳转到签到页
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromHomeToActivity20191212 } });

    const { privateHistory } = this.props.history;
    privateHistory.push('/Manage/Activities/20191212');
  }

  // 跳转到九宫格第二版页面
  onDirectToActivity20191224 = () => {
    // 首页跳转到签到页
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromHomeToActivity20191224 } });

    const { privateHistory } = this.props.history;
    privateHistory.push('/Manage/Activities/20191224');
  }

  // 点击banner之后的跳转事件
  onClickBanner = () => {
    // 服务费预支
    mobile.payInAdvance({}, undefined, () => {
      Toast.fail('移动端尚未初始化，操作失败');
    });
  }

  // 是否渲染倒计时banner
  isRenderCountDown = () => moment().isAfter('2019-11-30 23:59:59')

  // 是否渲染砸金蛋banner
  isRenderActivity = () => moment().isAfter('2019-11-30 23:59:59') && moment().isBefore('2020-01-24 00:00:00')

  // 渲染倒计时的banner图片
  renderCountDownContent = () => {
    // 活动结束倒计时
    const countDownNumber = () => {
      // 倒计时时间
      const date = moment().date();
      return 30 - date + 1;
    };

    return (
      <div style={{ width: '100%', marginBottom: '-.16rem' }} onClick={this.onDirectToAppView}>
        {/* 活动倒计时 */}
        <div style={{
          position: 'absolute', marginTop: '19%', marginLeft: '42%', color: '#FFFFFF', fontSize: '.45rem', textAlign: 'center', width: '12%',
        }}
        >
          {countDownNumber()}
        </div>

        <img style={{ width: '100%' }} src={BannerImageCountDown} alt="" />
      </div>
    );
  }

  // 渲染活动的banner图片（砸金蛋）
  renderActivity20191204Content = () => (
    <div style={{ width: '100%', marginBottom: '-.16rem' }} onClick={this.onDirectToActivity20191204}>
      <img style={{ width: '100%' }} src={BannerImageActivity} alt="" />
    </div>
  )

  // 渲染活动的banner图片（九宫格）
  renderActivity20191212Content = () => (
    <div style={{ width: '100%', marginBottom: '-.16rem' }} onClick={this.onDirectToActivity20191212}>
      <img style={{ width: '100%' }} src={BannerImageActivity} alt="" />
    </div>
  )

  // 渲染活动的banner图片（九宫格第二版）
  renderActivity20191224Content = () => (
    <div style={{ margin: '.05rem .14rem 0' }} onClick={this.onDirectToActivity20191224}>
      <img style={{ width: '100%' }} src={BannerActivityNineGame} alt="" />
    </div>
  )

  // 渲染默认的banner图片
  renderBannerContent = () => (
    <div style={{ margin: '0.06rem 0.14rem 0.06rem' }} onClick={this.onClickBanner}>
      <img style={{ width: '100%' }} src={BannerImage} alt="" />
    </div>
  )

  // 渲染预约倒计时
  render() {
    // 判断是否渲染倒计时的功能
    if (this.isRenderCountDown() && false) {
      return this.renderCountDownContent();
    }

    // 判断是否渲染活动的功能
    if (this.isRenderActivity()) {
      // 砸金蛋活动
      // return this.renderActivity20191204Content();

      // 九宫格活动
      // return this.renderActivity20191212Content();

      // 九宫格第二版活动
      return this.renderActivity20191224Content();
    }

    return this.renderBannerContent();
  }
}

export default connect()(PayInAdvanceComponent);
