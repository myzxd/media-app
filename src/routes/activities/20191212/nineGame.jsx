/**
 * 九宫格游戏 - 组件
 */

import React from 'react';
import { connect } from 'dva';
import { Modal } from 'antd-mobile';

import dot from 'dot-prop';
import Styles from './style.less';
import GiftImg from './static/gift.png';
import { config } from '../../../application/index';


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
      gifts: [],                        // 奖品及概率
      // eslint-disable-next-line react/prop-types
      onReloadPage: props.onReloadPage ? props.onReloadPage : undefined,        // 刷新页面的回调
      // eslint-disable-next-line react/prop-types
      privateHistory: props.privateHistory ? props.privateHistory : undefined,        // 跳转
      isSigned: true,                   // 默认已经签到
      isShowModal: false,               // 默认不显示奖品弹窗
    };
    this.private = {
      boxFiller: [                  // 每个格子填充的物品,数组的顺序即为盒子转圈的顺序（1-8）
        { name: '2积分', reward_amount: 2, no: '20191212_activity_surprise_nine_grids_prize_score_2' },
        { name: '6积分', reward_amount: 6, no: '20191212_activity_surprise_nine_grids_prize_score_6' },
        { name: '2积分', reward_amount: 2, no: '20191212_activity_surprise_nine_grids_prize_score_2' },
        { name: '66积分', reward_amount: 66, no: '20191212_activity_surprise_nine_grids_prize_score_66' },
        { name: '6积分', reward_amount: 6, no: '20191212_activity_surprise_nine_grids_prize_score_6' },
        { name: '2积分', reward_amount: 2, no: '20191212_activity_surprise_nine_grids_prize_score_2' },
        { name: '6积分', reward_amount: 6, no: '20191212_activity_surprise_nine_grids_prize_score_6' },
        { name: '2积分', reward_amount: 2, no: '20191212_activity_surprise_nine_grids_prize_score_2' },
      ],
      played: false,       //  是否已经开始抽奖
    };
  }

  // componentDidMount() {
  //   // 加工每个奖品与概率对象
  //   this.processGiftItem();
  // }

  componentWillReceiveProps(nextProps) {
    const gifts = dot.get(nextProps, 'activity20191212.activityPrizes', []);
    if (gifts.length > 0) {
      gifts.reduce((pre, currentItem, currentIndex) => {
        gifts[currentIndex].start = pre;
        // 做加法运算，让概率先乘以1000；
        gifts[currentIndex].end = pre + currentItem.probability;
        return gifts[currentIndex].end;
      }, 0);
    }
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      gifts,
      isSigned: dot.get(nextProps, 'score.isSigned', true),
      hasActivityPermission: dot.get(nextProps, 'activity20191212.hasActivityPermission', false),
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

  // 给奖品的每一个对象按照自身概率设置区间（用于产生的随机数在哪个区间内，说明就是哪个产品）
  // processGiftItem = () => {
  //   const { gift } = this.private;
  // }

  // 抽奖结束回调
  playedCallBack = () => {
    const { currentPoint } = this.state;
    const { boxFiller } = this.private;
    this.setState({
      prizeInfo: boxFiller[currentPoint - 1],
      isShowModal: true,
    });
    const payload = {
      prize: boxFiller[currentPoint - 1].no,
      accountId: config.AccountId,
      onSuccessCallback: this.onSuccessCallback,
    };
    this.props.dispatch({ type: 'activity20191212/updateActivityPrizeInfo', payload });
    console.log('您的中奖礼品是：', boxFiller[currentPoint - 1]);
  }

  //  抽奖成功更新的回调
  onSuccessCallback = () => {
    const { onReloadPage } = this.state;
    if (onReloadPage) {
      this.private.played = false;
      onReloadPage();
    }
  }

  // 开始抽奖
  onPlayGame = () => {
    const { boxFiller, played } = this.private;
    const { gifts } = this.state;
    if (played) {
      return;
    }
    this.private.played = true;
    // 高速需要转多少个格子（随机3圈到6圈，即随机数24到48）
    let fastBox = Math.floor(Math.random() * 25 + 24);
    //  约定剩余5-10个格子的时候减速转动
    let lessBox = Math.floor(Math.random() * 6 + 5);

    // 判定中奖值（乘以100是为了和每一个gifts子对象的区间进行比较）
    const winningNumber = Math.random() * 100;

    //  计算出已中奖的对象
    let winningObj = null;
    gifts.map((item) => {
      if (item.start <= winningNumber && item.end > winningNumber) {
        winningObj = item;
        return null;
      }
      return null;
    });
    this.fastTimer = setInterval(() => {
      fastBox -= 1;
      // 当高速转动的格子数为0 的时候，就开始减速，并且清除加速的定时器
      if (fastBox === 0) {
        this.lessTimer = setInterval(() => {
          lessBox -= 1;
          // 当减速的格子数为0时，就清除减速的定时器
          if (lessBox === 0) {
            clearInterval(this.lessTimer);
            // 经过加速、减速旋转后，再低速旋转，查找接下来的每一个格子的区间
            this.lessMoreTimer = setInterval(() => {
              this.setState((preState) => {
                if (preState.currentPoint === 8) {
                  return { currentPoint: 1 };
                }
                const now = preState.currentPoint + 1;
                return { currentPoint: now };
              }, () => {
                const { currentPoint } = this.state;
                if (boxFiller[currentPoint - 1].no === winningObj.no) {
                  // 抽奖成功的回调
                  this.playedCallBack();
                  // 标识次轮抽奖已经结束
                  clearInterval(this.lessMoreTimer);
                  return null;
                }
                return null;
              });
            }, 600);
          }
          this.setState((preState) => {
            if (preState.currentPoint === 8) {
              return { currentPoint: 1 };
            }
            const now = preState.currentPoint + 1;
            return { currentPoint: now };
          });
        }, 300);
        clearInterval(this.fastTimer);
      }
      this.setState((preState) => {
        if (preState.currentPoint === 8) {
          return { currentPoint: 1 };
        }
        const now = preState.currentPoint + 1;
        return { currentPoint: now };
      });
    }, 100);
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

  render() {
    const { currentPoint, prizeInfo, isShowModal } = this.state;
    const { boxFiller } = this.private;
    return (
      <div>
        <ul className={Styles['nine-game-wrap']}>
          <li className={currentPoint === 1 ? Styles['nine-game-no-choose'] : ''}>{boxFiller[0].name}</li>
          <li className={currentPoint === 2 ? Styles['nine-game-no-choose'] : ''}>{boxFiller[1].name}</li>
          <li className={currentPoint === 3 ? Styles['nine-game-no-choose'] : ''}>{boxFiller[2].name}</li>
          <li className={currentPoint === 8 ? Styles['nine-game-no-choose'] : ''}>{boxFiller[7].name}</li>
          {this.renderPlayLi() }
          <li className={currentPoint === 4 ? Styles['nine-game-no-choose'] : ''}>{boxFiller[3].name}</li>
          <li className={currentPoint === 7 ? Styles['nine-game-no-choose'] : ''}>{boxFiller[6].name}</li>
          <li className={currentPoint === 6 ? Styles['nine-game-no-choose'] : ''}>{boxFiller[5].name}</li>
          <li className={currentPoint === 5 ? Styles['nine-game-no-choose'] : ''}>{boxFiller[4].name}</li>
        </ul>
        <Modal
          visible={isShowModal}
          transparent
          maskClosable={false}
          title="恭喜您！"
          footer={[{ text: '我知道了', onPress: () => { this.setState({ isShowModal: false }); } }]}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => { this.setState({ prizeInfo: {} }); }}
        >
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
        </Modal>
      </div>
    );
  }
}


function mapStateToProps({ activity20191212, score }) {
  return { activity20191212, score };
}

export default connect(mapStateToProps)(NineGame);
