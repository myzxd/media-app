/* eslint-disable no-console */
/**
 * 首页 - 签到组件
 */
import moment from 'moment';
import { connect } from 'dva';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { ApplicationAnalysisKey } from '../../../../application/define/index';
import style from '../style.less';

import BannerImage from '../static/dailySignBanner.png';

class DailySignComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  // 跳转到签到页面
  onDirectToSign = () => {
    // 首页跳转到签到页
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromHomeToSignPage } });

    const { privateHistory } = this.props.history;
    privateHistory.push('/Manage/Sign');
  }

  render() {
    return (
      <div className={style['home-card-container']} onClick={this.onDirectToSign}>
        {/* 日期 */}
        <div className={style['home-card-content-date-container']}>
          <span className={style['home-card-content-date-month']}>{`${moment().format('MM')}月`}</span>
          <span className={style['home-card-content-date-daily']}>{moment().format('DD')}</span>
        </div>

        <img className={style['home-card-container-image']} src={BannerImage} alt="" />
      </div>
    );
  }
}

export default connect()(DailySignComponent);
