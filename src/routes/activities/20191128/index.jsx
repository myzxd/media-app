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


import { config, mobile } from '../../../application/index';
import { CoreNavigation } from '../../../components';
import BackgroundImage from './static/background.png';
import CheckImage from './static/check.png';
import SignButton from './sign';
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
      appointmentCount: dot.get(props, 'activities.appointmentCount', 0),
      isAppointment: dot.get(props, 'activities.isAppointment', false),
    };
  }

  componentDidMount() {
    const { AccountId } = config;
    if (is.not.empty(AccountId) && is.existy(AccountId)) {
      this.onFetchAppointmentInfo(AccountId);
    }

    mobile.updateStateBarColor({ color: 'FE552B' }, undefined, () => {
      console.log('componentDidMount updateStateBarColor 移动端尚未初始化，操作失败');
    });
  }

  componentWillReceiveProps(props) {
    const state = {
      appointmentCount: dot.get(props, 'activities.appointmentCount', 0),
      isAppointment: dot.get(props, 'activities.isAppointment', false),
    };
    this.setState(state);
  }

  componentWillUnmount() {
    mobile.updateStateBarColor({ color: 'FFFFFF' }, undefined, () => {
      console.log('componentWillUnmount updateStateBarColor 移动端尚未初始化，操作失败');
    });
  }

  // 获取预约详情
  onFetchAppointmentInfo = (accountId) => {
    const { dispatch } = this.props;
    const params = {
      accountId,
    };
    dispatch({ type: 'activities/fetchAppointmentInfo', payload: params });
    dispatch({ type: 'activities/fetchAppointmentCount', payload: params });
  }

  // 活动是否已经开始了
  isActiveStart = () => {
    const isAfter = moment().isAfter('2019-11-27 23:59:59');
    return isAfter;
  }

  // 活动是否已经结束了
  isActiveFinished = () => {
    const isAfter = moment().isAfter('2019-11-30 23:59:59');
    return isAfter;
  }

  onReloadPage = () => {
    const { reloadCount } = this.state;
    const { AccountId } = config;
    this.setState({
      reloadCount: reloadCount + 1,
    });
    this.onFetchAppointmentInfo(AccountId);
  }

  // 渲染活动结束倒计时
  renderCountDown = () => {
    // 判断活动是否结束
    if (this.isActiveFinished()) {
      return 0;
    }

    // 倒计时时间
    const date = moment().date();
    console.log(date);
    return 30 - date + 1;
  }

  // 渲染预约姓名
  renderName = () => {
    const names = '王,李,张,刘,陈,杨,黄,赵,吴,周,徐,孙,马,朱,胡,郭,何,高,林,郑,梁,谢,宋,唐,许,韩,冯,邓,曹,彭,曾,肖,田,董,袁,潘,于,蔡,余,杜,叶程,苏,魏,吕,丁,沈,姚,卢,姜,崔,谭,汪,范,金'.split(',');
    const name = `${names[Math.floor(Math.random() * names.length)]}xx`;

    const date = moment().format('MM月DD日');
    const hour = moment().subtract(Math.floor((Math.random() * 5) + 1), 'hour').format('HH');
    const minute = moment().subtract(Math.floor((Math.random() * 59) + 1), 'minute').format('mm');
    const second = moment().subtract(Math.floor((Math.random() * 59) + 1), 'second').format('mm');
    return `${name} ${date} ${hour}:${minute}:${second} 预约成功`;
  }

  // 渲染导航栏
  renderNavigation = () => {
    // 左侧行为
    const leftActionCustom = {
      type: CoreNavigationItemType.icon,
      icon: 'left',
      action: CoreNavigationAction.quit,
    };

    const props = {
      title: <span style={{ color: '#FFFDE6' }}>预支服务费</span>,
      history: this.props.history,
      leftItem: leftActionCustom,
      style: {
        backgroundColor: '#FE552B',
        color: '#FFFDE6',
      },
    };

    return (
      <CoreNavigation {...props} />
    );
  }

  renderButton = () => {
    const { isAppointment } = this.state;

    // 如果活动没开始，则不显示按钮
    if (this.isActiveStart() === false) {
      return '';
    }

    if (isAppointment === false) {
      return (
        <SignButton history={this.props.history} onReloadPage={this.onReloadPage} />
      );
    }
    return (
      <div className={style['page-button-selected']}>
        <span style={{
          textAlgin: 'center', lineHeight: '.3rem',
        }}
        >
          <img style={{ width: '.25rem' }} src={CheckImage} alt="" />
        </span>
        <span style={{ marginLeft: '.08rem' }}>预约成功</span>
      </div>
    );
  }

  renderContent = () => {
    const { appointmentCount } = this.state;
    return (
      <div>
        <div className={style['page-button-container']}>
          {this.renderButton()}
        </div>

        <div className={style['page-count-down-font']}>{this.renderCountDown()}</div>
        {
          this.isActiveStart()
            ? (
              <div className={style['page-info-title']}>
                {`已有${appointmentCount}用户预约`}
              </div>
            )
            : <div className={style['page-info-title']}>预约火热筹备中</div>
        }
        {
          this.isActiveStart()
            ? (
              <div className={style['page-info-content']}>
                <p className={style['page-info-content-text']}>{this.renderName()}</p>
                <p className={style['page-info-content-text']}>{this.renderName()}</p>
                <p className={style['page-info-content-text']}>{this.renderName()}</p>
              </div>
            )
            : ''
        }
        <img src={BackgroundImage} alt="" style={{ width: '100%' }} />
      </div>
    );
  }

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

function mapStateToProps({ activities }) {
  return { activities };
}

export default connect(mapStateToProps)(Index);
