/* eslint-disable no-console */
/**
 * 积分明细
 */
import React from 'react';
import dot from 'dot-prop';
import { connect } from 'dva';
import { DatePicker, Icon } from 'antd-mobile';

import Styles from './style.less';
import { CoreNavigation } from '../../../components/index';
import { ScoreDetailMap, ApplicationAnalysisKey } from '../../../application/define';
import { mobile } from '../../../application/index';

const { CoreNavigationItemType, CoreNavigationAction } = CoreNavigation;

class ScoreDetail extends React.Component {
  constructor(props) {
    super();
    const date = new Date();
    this.state = {
      year: date.getFullYear().toString(),  // 默认积分所属于的年份
      month: (date.getMonth() + 1).toString(),    // 积分所属于的月份
      isShowDatePicker: false,         // 是否显示日期控件
      navigationAction: dot.get(props, 'location.query.action', 'quit'),
      dataSource: [],         // 积分数据
    };
    // 统计浏览
    // this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageScoreDetailOpened } });
  }

  componentDidMount() {
    const { year, month } = this.state;
    // 拉取积分详情
    this.props.dispatch({ type: 'score/fetchScoreDetail', payload: { months: [year + month] } });

    // 隐藏tabs
    mobile.updateTabsDisplayState({ isHide: true }, undefined, () => {
      console.log('更新tabs隐藏失败');
    });
    // 统计浏览
    // this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.PageScoreDetailViewed } });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: dot.get(nextProps, 'score.scoreDetail.data', []),
    });
  }

  componentWillUnmount() {
    // 显示tabs
    mobile.updateTabsDisplayState({ isHide: false }, undefined, () => {
      console.log('更新tabs显示失败');
    });
  }

  // 日期控件点击取消
  onCancelDate = () => {
    this.setState({
      isShowDatePicker: false,
    });
  }

  //  日期控件点击确定
  onOkDate = (time) => {
    const year = time.getFullYear().toString();
    let month = time.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const months = [year + month];
    this.props.dispatch({ type: 'score/fetchScoreDetail', payload: { months } });
    this.setState({
      isShowDatePicker: false,
      year,
      month,
    });
  }


  // 转换日期
  getItemDate = (times) => {
    const time = new Date(times);
    const year = time.getFullYear();
    let month = time.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = time.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    let hour = time.getHours();
    if (hour < 10) {
      hour = `0${hour}`;
    }
    let minute = time.getMinutes();
    if (minute < 10) {
      minute = `0${minute}`;
    }
    return `${year}/${month}/${day} ${hour}:${minute}`;
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
      title: <span style={{ color: '#000', fontSize: '.15rem'  }}>积分明细</span>,
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

  // 渲染每条积分详细列表
  renderLi = () => {
    const { dataSource } = this.state;
    if (dataSource.length <= 0) {
      return (
        <div className={Styles['account-score-detail-no-data']}>
          <img src={require('./static/images/no-data.png')} alt="" />
          <span>暂无积分</span>
        </div>
      );
    }
    return dataSource.map((item, index) => (
      <li key={index}>
        <div className={Styles['account-score-detail-content-li-left']}>
          <div className={Styles['account-score-detail-content-li-left-type']}>{ScoreDetailMap.description(item.sub_type)}</div>
          <div className={Styles['account-score-detail-content-li-left-date']}>{this.getItemDate(item.created_at)}</div>
        </div>
        {
            item.type === 10
              ? (
                <div className={Styles['account-score-detail-content-li-right']}>
+
                  {item.score_num}
                </div>
              )
              : (
                <div className={Styles['account-score-detail-content-li-right-pay']}>
-
                  {item.score_num}
                </div>
              )
          }

      </li>
    ));
  }

  render() {
    const { year, month, isShowDatePicker } = this.state;
    return (
      <div className={Styles['account-score-detail-wrap']}>
        {/* 渲染导航栏 */}
        {this.renderNavigation()}
        <div className={Styles['account-score-detail-date']} onClick={() => { this.setState({ isShowDatePicker: true }); }}>
          {year}
年
          {month}
月&nbsp;
          <Icon type="down" />
        </div>
        <div className={Styles['account-score-detail-ul-wrap']}>
          <ul className={Styles['account-score-detail-content']}>
            {this.renderLi()}
          </ul>
        </div>

        <DatePicker
          mode="month"
          visible={isShowDatePicker}
          onChange={this.onOkDate}
          onDismiss={this.onCancelDate}
        />
      </div>
    );
  }
}
function mapStateToProps({ score }) {
  return { score };
}

export default connect(mapStateToProps)(ScoreDetail);
