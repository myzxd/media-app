/**
 * 天天赚钱 - 规则 - 页面
 */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

import Styles from './style.less';

import { mobile } from '../../../application/index';
import { CoreNavigation } from '../../../components';
import { ApplicationAnalysisKey } from '../../../application/define/index';

const { CoreNavigationItemType, CoreNavigationAction } = CoreNavigation;

class Rule extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super();
    // 统计打开
    props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageDayDayMoneyRuleOpened } });
  }

  componentDidMount() {
    mobile.updateStateBarColor({ color: 'FFFFFF' }, undefined, () => {
      console.log('componentDidMount updateStateBarColor 移动端尚未初始化，操作失败');
    });
    // 隐藏tabs
    mobile.updateTabsDisplayState({ isHide: true }, undefined, () => {
      console.log('更新tabs隐藏失败');
    });
    // 统计浏览
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageDayDayMoneyRuleViewed } });
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

  // 渲染导航栏
  renderNavigation = () => {
    // 左侧行为
    const leftActionCustom = {
      type: CoreNavigationItemType.icon,
      icon: 'left',
      action: CoreNavigationAction.back,
    };

    const props = {
      title: <span>任务规则</span>,
      history: this.props.history,
      leftItem: leftActionCustom,
      style: {
        backgroundColor: '#fff',
        color: '#0B0817',
        borderBottom: '.005rem solid #E5E5EE',
      },
    };

    return (
      <CoreNavigation {...props} />
    );
  }

  // 渲染内容
  renderContent = () => {
    return (
      <div className={Styles['day-day-money-rule-content']}>
        <div className={Styles['day-day-money-rule-content-title']}>一、参与要求</div>
        <div className={Styles['day-day-money-rule-content-list']}>BOSS骑士APP的注册用户</div>
        <br />
        <div className={Styles['day-day-money-rule-content-title']}>二、审核规则</div>
        <div className={Styles['day-day-money-rule-content-list']}>1、拍摄指定场馆定位的门头照（含门牌）</div>
        <div className={Styles['day-day-money-rule-content-list']}>2、拍运动场馆前台和场馆环境（场馆有多大）</div>
        <div className={Styles['day-day-money-rule-content-list']}>3、体育场馆内饮料设备检查，检查饮料柜中出售什么饮料？有放饮料吗？要根据问卷回答。</div>
        <div className={Styles['day-day-money-rule-content-list']}>4、回答问卷</div>
        <div className={Styles['day-day-money-rule-content-list']}>5、拍摄照片清晰</div>
        <br />
        <div className={Styles['day-day-money-rule-content-title']}>三、酬金规则</div>
        <div className={Styles['day-day-money-rule-content-list']}>1、每个任务的酬金是不等的，根据任务完成的情况进行相应的核算，具体核算结果由微差事执行。</div>
        <div className={Styles['day-day-money-rule-content-list']}>2、任务审核通过后15个工作日，可以在BOSS骑士APP的钱包提现所得报酬，涉及到的手续费用由用户自己提供。</div>
        <br />
        <div className={Styles['day-day-money-rule-content-title']}>四、其他说明</div>
        <div className={Styles['day-day-money-rule-content-list']}>1、执行该任务，微差事需要获取您的位置信息，用于展示你当前位置的可领取任务。</div>
        <div className={Styles['day-day-money-rule-content-list']}>2、本次活动最终解释权归BOSS骑士APP所属公司所有。</div>
      </div>
    );
  }

  render() {
    return (
      <div className={Styles['day-day-money-rule-wrap']}>
        {/* 渲染导航栏 */}
        {this.renderNavigation()}
        {/* 渲染规则内容 */}
        {this.renderContent()}
      </div>
    );
  }
}
export default connect()(Rule);
