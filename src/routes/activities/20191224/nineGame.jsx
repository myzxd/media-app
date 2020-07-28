/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
/**
 * 九宫格游戏 - 组件
 */

import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd-mobile';

import dot from 'dot-prop';
import Styles from './style.less';
import GiftImg from './static/gift.png';
import MoneyImg from './static/money.png';
import { config } from '../../../application/index';
import { ApplicationAnalysisKey } from '../../../application/define/index';


function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    // eslint-disable-next-line no-param-reassign
    el = el.parentElement;
  }
  return null;
}

class NineGame extends React.Component {
  constructor(props) {
    super();
    this.state = {
      currentPoint: 1,             // 当前位置
      hasActivityPermission: false,               // 是否可以抽奖
      prizeInfo: {},                // 中奖信息
      onReloadPage: props.onReloadPage ? props.onReloadPage : undefined,        // 刷新页面的回调
      privateHistory: props.privateHistory ? props.privateHistory : undefined,        // 跳转
      isSigned: true,                   // 默认已经签到
      isShowModal: false,               // 默认不显示奖品弹窗
      gifts: [],                 // 每个格子填充的物品,数组的顺序即为盒子转圈的顺序（1-8）
    };
    this.private = {
      played: false,       //  是否已经开始抽奖
    };
  }

  componentWillReceiveProps(nextProps) {
    const gifts = dot.get(nextProps, 'activity20191224.activityPrizes', []);
    this.setState({
      gifts,
      isSigned: dot.get(nextProps, 'score.isSigned', true),
      hasActivityPermission: dot.get(nextProps, 'activity20191224.hasActivityPermission', false),
    });
  }

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    // eslint-disable-next-line no-undef
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  //  抽奖成功更新的回调
  onSuccessCallback = () => {
    const { onReloadPage } = this.state;
    if (onReloadPage) {
      this.private.played = false;
      onReloadPage();
    }
  }

  // 拿到奖品的回调
  onSuccessPlay = (giftNo) => {
    const { gifts } = this.state;
    let indexNumber = 9;
    gifts.find((item, index) => { if (item.no === giftNo) { indexNumber = index; } });
    setTimeout(() => {
      // 清除正在进行的定时器
      clearInterval(this.fastTimer);
      // 开启一个缓慢的定时器，根据奖品信息查找每一个格子，找出符合中奖奖品的格子
      this.lowerTimer = setInterval(() => {
        this.setState((preState) => {
          if (preState.currentPoint === 8) {
            return { currentPoint: 1 };
          }
          const now = preState.currentPoint + 1;
          return { currentPoint: now };
        }, () => {
          const { currentPoint } = this.state;
          if (currentPoint === indexNumber + 1) {
            // 找到了中奖格子，清除缓慢的定时器
            clearInterval(this.lowerTimer);
            this.setState({
              prizeInfo: gifts[indexNumber],
              isShowModal: true,
            });
            // 标识已经不在游戏中了，可以下一轮抽奖
            this.private.played = false;
            // 一轮游戏后的回调
            this.onSuccessCallback();
          }
        });
      }, 100);
    }, 2000);
  }

  // 开始抽奖
  onPlayGame = () => {
    const { played } = this.private;
    // 如果是在抽奖中，则禁止再抽奖
    if (played) {
      return;
    }
    this.private.played = true;
    // 发送获取奖品请求
    this.props.dispatch({ type: 'activity20191224/fetchActivityPrizeInfo', payload: { accountId: config.AccountId, onSuccessPlay: this.onSuccessPlay } });
    // 统计抽奖
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.ActionActivity20191224 } });
    this.fastTimer = setInterval(() => {
      this.setState((preState) => {
        if (preState.currentPoint === 8) {
          return { currentPoint: 1 };
        }
        const now = preState.currentPoint + 1;
        return { currentPoint: now };
      });
    }, 60);
  }


  // 渲染中间抽奖按钮
  renderPlayLi = () => {
    const { hasActivityPermission, isSigned, privateHistory } = this.state;
    if (hasActivityPermission) {
      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <li className={Styles['nine-game-start-btn']} onClick={this.onPlayGame}>
          开始
          <br />
          抽奖
        </li>
      );
    }
    if (isSigned) {
      return (
        <li className={Styles['nine-game-start-btn-noplay']}>
          明天
          <br />
          再来
        </li>
      );
    }
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <li className={Styles['nine-game-start-btn-sign']} onClick={() => { privateHistory.push('/Manage/Sign'); }}>去签到</li>
    );
  }

  renderModal = (prizeInfo) => {
    if (prizeInfo.reward_type === 10) {
      return (
        <div className={Styles['nine-game-modal-wrap']}>
          <img src={GiftImg} alt="" />
          <div className={Styles['nine-game-modal-text']}>
            <span>
              +
              {prizeInfo.reward_amount}
            </span>
            积分
          </div>
        </div>
      );
    }
    if (prizeInfo.reward_type === 30) {
      return (
        <div className={Styles['nine-game-modal-wrap']}>
          <img src={MoneyImg} alt="" />
          <div className={Styles['nine-game-modal-text']}>
            <span>
              +
              {prizeInfo.reward_amount / 100}
            </span>
            元
          </div>
          <div>已存入您的钱包</div>
        </div>
      );
    }
    return null;
  }

  render() {
    const { currentPoint, prizeInfo, isShowModal, gifts } = this.state;
    if (gifts.length <= 0) {
      return null;
    }
    return (
      <div>
        <ul className={Styles['nine-game-wrap']}>
          <li className={currentPoint === 1 ? Styles['nine-game-no-choose'] : ''}>{gifts[0].name}</li>
          <li className={currentPoint === 2 ? Styles['nine-game-no-choose'] : ''}>{gifts[1].name}</li>
          <li className={currentPoint === 3 ? Styles['nine-game-no-choose'] : ''}>{gifts[2].name}</li>
          <li className={currentPoint === 8 ? Styles['nine-game-no-choose'] : ''}>{gifts[7].name}</li>
          {/* 渲染九宫格中心格子 */}
          {this.renderPlayLi()}
          <li className={currentPoint === 4 ? Styles['nine-game-no-choose'] : ''}>{gifts[3].name}</li>
          <li className={currentPoint === 7 ? Styles['nine-game-no-choose'] : ''}>{gifts[6].name}</li>
          <li className={currentPoint === 6 ? Styles['nine-game-no-choose'] : ''}>{gifts[5].name}</li>
          <li className={currentPoint === 5 ? Styles['nine-game-no-choose'] : ''}>{gifts[4].name}</li>
        </ul>
        {/* 渲染中奖信息弹窗 */}
        <Modal
          visible={isShowModal}
          transparent
          maskClosable={false}
          title="恭喜您！"
          footer={[{ text: '我知道了', onPress: () => { this.setState({ isShowModal: false }); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => { this.setState({ prizeInfo: {} }); }}
        >
          {this.renderModal(prizeInfo)}
        </Modal>
      </div>
    );
  }
}


function mapStateToProps({ activity20191224, score }) {
  return { activity20191224, score };
}

export default connect(mapStateToProps)(NineGame);
