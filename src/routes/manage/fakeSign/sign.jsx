/* eslint-disable no-console */
/**
 * 每日签到
 */
import dot from 'dot-prop';
import { connect } from 'dva';
import React, { Component } from 'react';
import { Modal, Toast } from 'antd-mobile';
import PropTypes from 'prop-types';
import { config } from '../../../application/index';

import GiftImage from './static/gift.png';

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

class Index extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    onReloadPage: PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      isDisplay: false,         // 是否显示弹窗
      isRequestFailure: false,  // 是否请求失败
      score: 0,                 // 签到成功得分
      signCount: 0,             // 签到人数
    };
  }

  // 显示弹窗
  onDisplay = () => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透

    // 获取积分详情
    const { dispatch } = this.props;
    const params = {
      accountId: dot.get(config, 'AccountId', ''),
      onSuccessCallback: this.onSuccessCallback,
      onFailureCallback: this.onFailureCallback,
    };
    dispatch({ type: 'score/updateScoreByDailySign', payload: params });
  }

  onSuccessCallback = (res) => {
    // 签到成功后显示弹窗
    this.setState({
      isDisplay: true,
      score: dot.get(res, 'score_num', 0),
      signCount: dot.get(res, 'today_clock_in_count', 0),
    });

    // 更新总分数据
    const accountId = dot.get(config, 'AccountId', '');
    const { dispatch } = this.props;
    dispatch({ type: 'score/fetchScore', payload: { accountId } });
  }

  // 请求服务器失败
  onFailureCallback = (res) => {
    Toast.fail('签到失败', 3);
  }

  // 关闭弹窗
  onClose = () => () => {
    this.setState({
      isDisplay: false,
    });
  }

  // 弹窗关闭后的调用
  onCloseFinished = () => {
    console.log('弹窗关闭后的调用');
    this.setState({
      score: 0,
    });

    const { onReloadPage } = this.props;
    // 重新加载页面
    if (onReloadPage) {
      console.log('签到后重新加载页面');
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

  renderButton = () => (
    <div onClick={this.onDisplay()}>
      签到
    </div>
  )

  renderModal = () => {
    const { isRequestFailure, score, signCount = 0 } = this.state;
    let title = '签到成功';

    let content = (
      <div>
        <img style={{ width: '.56rem', margin: 'auto' }} src={GiftImage} alt="" />
        <div>
          <span style={{ fontSize: '.4rem', color: 'rgba(239,61,49,1)', marginRight: '.05rem' }}>
+
            {score}
          </span>
          <span style={{ fontSize: '.14rem', color: 'rgba(0,0,0,1)' }}>积分</span>
          <br />
          {
            signCount > 0 ? (
              <span style={{ fontSize: '.12rem', color: 'rgba(0, 0, 0, 0.46)' }}>
                {`已签到${signCount}人`}
              </span>
            ) : ''
          }
        </div>
      </div>
    );

    const footer = [{
      text: '我知道了',
      onPress: () => { this.onClose()(); },
    }];

    // 判断是否请求服务器失败
    if (isRequestFailure) {
      title = '签到失败';
      content = <div>请求服务器失败</div>;
    }

    return (
      <Modal
        visible={this.state.isDisplay}
        transparent
        maskClosable={false}
        onClose={this.onClose()}
        title={title}
        footer={footer}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        afterClose={this.onCloseFinished}
      >
        <div style={{ height: '1.5rem', overflow: 'scroll' }}>
          {content}
        </div>
      </Modal>

    );
  }

  render() {
    return (
      <div>
        {/* 渲染按钮 */}
        {this.renderButton()}

        {/* 渲染弹窗 */}
        {this.renderModal()}
      </div>
    );
  }
}

export default connect()(Index);
