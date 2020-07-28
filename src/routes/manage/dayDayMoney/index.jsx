/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prefer-stateless-function */
/**
 * 天天赚钱 - 页面
 */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';

import Styles from './style.less';
import { mobile } from '../../../application/index';
import { CoreNavigation } from '../../../components';
import { ApplicationAnalysisKey } from '../../../application/define/index';

import Image01 from './static/01.png';
import Image02 from './static/02new.png';
import Image03 from './static/03.png';
import Image04 from './static/04.png';
import Image05 from './static/05.png';
import Image06 from './static/06.png';

const { CoreNavigationItemType, CoreNavigationAction } = CoreNavigation;

class Index extends React.Component {

  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super();
    this.private = {
      hasButton: false,               // 默认没有点击立即申请
      flag: false,                     // 按钮点击延迟500ms标识
    };
    // 统计打开
    props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageDayDayMoneyOpened } });
  }

  componentDidMount() {
    mobile.updateStateBarColor({ color: 'F10D56' }, undefined, () => {
      console.log('componentDidMount updateStateBarColor 移动端尚未初始化，操作失败');
    });
    // 隐藏tabs
    mobile.updateTabsDisplayState({ isHide: true }, undefined, () => {
      console.log('更新tabs隐藏失败');
    });
    // 统计浏览
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageDayDayMoneyViewed } });
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

  onMobileLocation = () => {
    const { hasButton, flag } = this.private;
    // 禁止连续点击
    if(hasButton || flag) {
      return ;
    }
    this.private.hasButton = true;
    this.private.flag = true;
    // 500ms内不能继续点击
    setTimeout(() => {
      this.private.flag = false;
    }, 500);
    // 统计点击了申请
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.ActionDayDayMoneyApplication } });
    console.log('调用地理位置');
    mobile.getLocationService({}, () => {
      this.private.hasButton = false;
      console.log('调用成功');
    }, () => {
      this.private.hasButton = false;
      console.log('调用失败');
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

    // 右侧行为
    const rightActionCustom = {
      type: CoreNavigationItemType.text,
      text: '规则',
      action: CoreNavigationAction.push,
      url: '/Manage/DayDayMoney/Rule',
    };

    const props = {
      title: <span style={{ color: '#FFFDE6' }}>任务攻略</span>,
      history: this.props.history,
      leftItem: leftActionCustom,
      rightItem: rightActionCustom,
      style: {
        backgroundColor: '#F10D56',
        color: '#FFFDE6',
      },
    };

    return (
      <CoreNavigation {...props} />
    );
  }

  //
  renderContent = () => {
    return (
      <div className={Styles['day-day-money-content-img']}>
        <img src={Image01} alt="" />
        <img src={Image02} alt="" />
        <img src={Image03} alt="" />
        <img src={Image04} alt="" />
        <img src={Image05} alt="" />
        <img src={Image06} alt="" />
        <div className={Styles['day-day-money-content-footer']} />
      </div>
    );
  }

  //
  renderButton = () => {
    return (
      <div className={Styles['day-day-money-footer']}>
        <div className={Styles['day-day-money-footer-btn-2']} onClick={this.onMobileLocation}>
          立即申请
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={Styles['day-day-money-wrap']}>
        {/* 渲染导航栏 */}
        {this.renderNavigation()}
        {/* 渲染内容 */}
        {this.renderContent()}
        {/* 渲染底部按钮 */}
        {this.renderButton()}
      </div>
    );
  }
}
export default connect()(Index);
