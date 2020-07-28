/* eslint-disable no-console */
/**
 * 积分排行
 */
import React from 'react';
import dot from 'dot-prop';
import { connect } from 'dva';

import Styles from './style.less';
import { CoreNavigation } from '../../../components/index';
import { mobile } from '../../../application/index';

const { CoreNavigationItemType, CoreNavigationAction } = CoreNavigation;

class ScoreRank extends React.Component {
  constructor(props) {
    super();
    this.state = {
      navigationAction: dot.get(props, 'location.query.action', 'quit'),
      dataSource: [],   // 排行数据
      selfRank: 0,                                // 个人排名
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'score/fetchScoreRank' });         // 积分总排名列表
    this.props.dispatch({ type: 'score/fetchScoreRankSelf' });     // 个人积分排名

    // 隐藏tabs
    mobile.updateTabsDisplayState({ isHide: true }, undefined, () => {
      console.log('更新tabs隐藏失败');
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: dot.get(nextProps, 'score.scoreRank.data', []),
      selfRank: dot.get(nextProps, 'score.scoreRankSelf', 0),
    });
  }

  componentWillUnmount() {
    // 显示tabs
    mobile.updateTabsDisplayState({ isHide: false }, undefined, () => {
      console.log('更新tabs显示失败');
    });
  }

  getPhone = (phone) => {
    if (phone) {
      return `${phone.slice(0, 3)}****${phone.slice(-4)}`;
    }
    return phone;
  }

  getName = (name) => {
    if (name) {
      return `${name.slice(0, 1)}**`;
    }
    return name;
  }

  // 渲染导航栏
  renderNavigation = () => {
    // 判断导航栏使用返回还是原生的退出
    const { navigationAction } = this.state;
    // 左侧行为
    const leftActionCustom = {
      type: CoreNavigationItemType.icon,
      icon: 'left',
      action: CoreNavigationAction.back,
    };

    const props = {
      title: <span style={{ color: '#000', fontSize: '.15rem' }}>积分排行榜</span>,
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
    const { dataSource, selfRank } = this.state;
    if (dataSource.length <= 0) {
      return (
        <div className={Styles['account-score-rank-no-data']}>
          <img src={require('./static/images/no-data.png')} alt="" />
          <span>暂无数据</span>
        </div>
      );
    }
    return dataSource.map((item, index) => {
      let bg;
      if (index + 1 === selfRank) {
        bg = Styles['account-score-rank-li-bg'];
      }
      return (
        <li key={index} className={bg}>
          <div className={Styles['account-score-rank-li-number']}>
            <div className={Styles['account-score-rank-li-number-img']}>
              <img src={require(`./static/images/${index + 1}.png`)} alt="" />
            </div>
          </div>
          <div className={Styles['account-score-rank-li-info']}>
            <div className={Styles['account-score-rank-li-info-name']}>{this.getName(item.name)}</div>
            <div className={Styles['account-score-rank-li-info-phone']}>{this.getPhone(item.phone)}</div>
          </div>
          <div className={Styles['account-score-rank-li-score']}>{item.total_score}</div>
        </li>
      );
    });
  }

  render() {
    return (
      <div className={Styles['account-score-rank-wrap']}>
        {/* 渲染导航栏 */}
        {this.renderNavigation()}
        <ul className={Styles['account-score-rank-content']}>
          {this.renderLi()}
        </ul>
      </div>
    );
  }
}
function mapStateToProps({ score }) {
  return { score };
}

export default connect(mapStateToProps)(ScoreRank);
