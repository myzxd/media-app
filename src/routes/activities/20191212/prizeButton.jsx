/* eslint-disable no-console */
/**
 * 抽奖
 */
import is from 'is_js';
import dot from 'dot-prop';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Toast, Modal } from 'antd-mobile';

import { config, mobile } from '../../../application/index';
import { ApplicationAnalysisKey } from '../../../application/define/index';

import GiftImage from './static/gift.png';

// 九宫格的奖品编码
const ActivityPrizeType = {
  score2: '20191212_activity_surprise_nine_grids_prize_score_2',
  score6: '20191212_activity_surprise_nine_grids_prize_score_6',
  score66: '20191212_activity_surprise_nine_grids_prize_score_66',
};

// 兼容（不知道干啥的，直接从demo中粘贴过来的）
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class PrizeButton extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    onReloadPage: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isDisplay: true, // 是否显示弹窗
      prize: '',        // 奖品信息
      className: dot.get(props, 'className', []),           // 样式类名
      activityPrizes: dot.get(props, 'activityPrizes', []), // 奖品类型
    };
  }

  componentWillReceiveProps(props) {
    const state = {
      className: dot.get(props, 'className', []),             // 样式类名
      activityPrizes: dot.get(props, 'activityPrizes', []),   // 奖品类型
    };
    this.setState(state);
  }

  // 显示弹窗
  onDisplay = () => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透

    // 生成奖品
    const prize = this.onGeneratePrizeByRandom();

    // 设置奖品信息
    this.setState({ prize }, () => {
      // 请求接口记录
      const params = {
        accountId: dot.get(config, 'AccountId', ''),
        prize,
        onSuccessCallback: this.onSuccessCallback,
        onFailureCallback: this.onFailureCallback,
      };
      this.props.dispatch({ type: 'activity20191204/updateActivityPrizeInfo', payload: params });
      this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.ActionActivity20191212 } });
    });
  }

  onSuccessCallback = () => {
    // 成功后显示弹窗
    this.setState({
      isDisplay: true,
    });
  }

  // 请求服务器失败
  onFailureCallback = () => {
    console.log('抽奖失败');
    this.setState({
      isDisplay: false,
      prize: undefined,
    });
  }

  // 关闭弹窗
  onClose = () => () => {
    this.setState({
      isDisplay: false,
    });
  }

  // 跳转
  onDirect = () => () => {
    this.setState({
      isDisplay: false,
    });

    // 统计跳转
    this.props.dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: ApplicationAnalysisKey.RedirectFromActivity20191204ToPuShu } });

    console.log('onDirectToPuShu');
    // 服务费预支
    mobile.payInAdvance({}, undefined, () => {
      Toast.fail('移动端尚未初始化，操作失败');
    });
  }

  // 弹窗关闭后的调用
  onCloseFinished = () => {
    console.log('弹窗关闭后的调用');

    const { onReloadPage } = this.props;
    // 重新加载页面
    if (onReloadPage) {
      console.log('抽奖后重新加载页面');
      onReloadPage();
    }
  }

  // 兼容（不知道干啥的，直接从demo中粘贴过来的）
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }

  // 生成随机奖品
  // 66积分10%、6积分40%、2积分50%
  onGeneratePrizeByRandom = () => {
    // 随机80%概率返回6积分
    const random = Math.random() * 10;
    // 概率50%
    if (random <= 5) {
      return ActivityPrizeType.score2;
    }
    // 概率40%
    if (random > 5 && random <= 9) {
      return ActivityPrizeType.score6;
    }
    // 概率10%
    return ActivityPrizeType.score66;
  }

  renderPrizeModal = () => {
    const { prize } = this.state;
    let content = '';
    let footer = [];
    if (prize === ActivityPrizeType.score6) {
      content = (
        <div>
          <img style={{ width: '.56rem', margin: 'auto' }} src={GiftImage} alt="" />
          <div>
            <span style={{ fontSize: '.4rem', color: 'rgba(239,61,49,1)', marginRight: '.05rem' }}>+6</span>
            <span style={{ fontSize: '.14rem', color: 'rgba(0,0,0,1)' }}>积分</span>
          </div>
        </div>
      );
      footer = [{
        text: '我知道了',
        onPress: () => { this.onClose()(); },
      }];
    } else if (prize === ActivityPrizeType.score66) {
      content = (
        <div>
          <img style={{ width: '.56rem', margin: 'auto' }} src={GiftImage} alt="" />
          <div>
            <span style={{ fontSize: '.4rem', color: 'rgba(239,61,49,1)', marginRight: '.05rem' }}>+66</span>
            <span style={{ fontSize: '.14rem', color: 'rgba(0,0,0,1)' }}>积分</span>
          </div>
        </div>
      );
      footer = [{
        text: '我知道了',
        onPress: () => { this.onClose()(); },
      }];
    }
    return (
      <Modal
        visible={this.state.isDisplay}
        transparent
        maskClosable={false}
        onClose={this.onClose()}
        title="恭喜您！"
        footer={footer}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        afterClose={this.onCloseFinished}
      >
        <div style={{ height: '1.3rem', overflow: 'scroll' }}>
          {content}
        </div>
      </Modal>

    );
  }

  render() {
    const { className } = this.state;
    return (
      <div className={className}>
        <div style={{ width: '100%', height: '100%' }} onClick={this.onDisplay()} />

        {/* 渲染弹窗 */}
        {this.renderPrizeModal()}
      </div>
    );
  }
}

export default connect()(PrizeButton);
