/* eslint-disable no-console */
/**
 * 首页
 */
import is from 'is_js';
import dot from 'dot-prop';
import { connect } from 'dva';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DailySignComponent from './components/dailySignComponent';
import PayInAdvanceComponent from './components/payInAdvanceComponent';
import AppointmentComponent from './components/appointmentComponent';

import { ApplicationAnalysisKey } from '../../../application/define/index';
import { CoreNavigation } from '../../../components/index';
import style from './style.less';

import ImgDayDayMoney from './static/dayDayMoney.png';

class Index extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super();
    this.state = {};

    // 统计首页浏览
    props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageHomeOpened } });
  }

  componentDidMount() {
    // 统计首页浏览
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageHomeViewed } });
  }

  // 点击天天赚钱图片
  onDailyMakeMoney = () => {
    // 统计首页跳转到天天赚钱页面
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromDayDayMoneyToDayDayMoneyRule } });
    this.props.history.push('/Manage/DayDayMoney');
  }

  // 渲染导航栏
  renderNavigation = () => {
    const props = {
      title: 'BOSS骑士',
      history: this.props.history,
      style: {
        borderBottom: '0.01rem solid #E5E5EE',
      },
    };
    return (
      <CoreNavigation {...props} />
    );
  }

  // 渲染卡片内容
  renderContent = () => (
    <div style={{ padding: '.1rem 0' }}>

      {/* 签到卡片 */}
      <DailySignComponent history={this.props.history} dispatch={this.props.dispatch} />

      {/* 服务费预支 */}
      <PayInAdvanceComponent history={this.props.history} dispatch={this.props.dispatch} />

      <div className={style['day-day-money-wrap']}>
        <img src={ImgDayDayMoney} alt="" onClick={this.onDailyMakeMoney} />
      </div>
      {/* 预约任务 */}
      <AppointmentComponent history={this.props.history} dispatch={this.props.dispatch} />
    </div>
  )

  render() {
    return (
      <div className={style['home-card']}>
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
