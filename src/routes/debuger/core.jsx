/* eslint-disable no-console */
/**
 * 调试 - 接口调试
 */
import dot from 'dot-prop';
import { connect } from 'dva';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, WingBlank, Toast } from 'antd-mobile';

import { mobile } from '../../application/index';
import routes from '../../application/define/routes';

class DebugerRequest extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor() {
    super();
    this.state = {
    };
  }

  componentWillReceiveProps(props) {
    const state = {
    };
    this.setState(state);
  }

  // 请求接口
  onRequest = ({ request, params }) => {
    console.log(request, params);
    this.props.dispatch({ type: request, payload: params });
  }

  // 路由跳转
  onRoute = ({ path }) => {
    console.log(path);
    const { privateHistory } = this.props.history;
    privateHistory.push(path);
  }

  // 手机功能调试
  onMobileAction = ({
    text, action, params, onSuccessCallback,
  }) => {
    const onFailureCallback = () => {
      Toast.fail(`移动端尚未初始化，${text}失败`);
    };
    action(params, onSuccessCallback, onFailureCallback);
  }

  // 渲染请求列表
  renderRequest = () => {
    const data = [
      {
        request: 'meeting/fetchList',
        params: {
          team_id: '5cf5fb2ece6d2a1c7f9b4e5d',
        },
        text: '会议列表',
      },
    ];
    return this.renderContent('接口请求', data, this.onRequest);
  }

  // 渲染页面列表
  renderPages = () => {
    const data = routes.map(item => ({
      text: item.title,
      path: item.path,
    }));
    return this.renderContent('页面导航', data, this.onRoute);
  }

  // 渲染手机调试列表
  renderMobile = () => {
    const data = [
      {
        text: '获取配置',
        action: mobile.applicationConfig,
        params: {
          getConfig: true,
        },
        onSuccessCallback: (response) => {
          console.log('onSuccessCallback', response);
          Toast.success(JSON.stringify(response));
        },
      },
      {
        text: '退出',
        action: mobile.quitToNavigation,
        params: {},
        onSuccessCallback: () => {},
      },
      {
        text: '全屏',
        action: mobile.displayFullScreen,
        params: {
          isFullScreen: true,
        },
        onSuccessCallback: () => {},
      },
      {
        text: '取消全屏',
        action: mobile.quitFullScreen,
        params: {
          isFullScreen: false,
        },
        onSuccessCallback: () => {},
      },
      {
        text: '圆角',
        action: mobile.displayCornerRadius,
        params: {},
        onSuccessCallback: () => {},
      },
      {
        text: '取消圆角',
        action: mobile.quitCornerRadius,
        params: {},
        onSuccessCallback: () => {},
      },
      {
        text: '打开普树页面',
        action: mobile.payInAdvance,
        params: {},
        onSuccessCallback: () => {},
      },
    ];
    return this.renderContent('手机功能', data, this.onMobileAction);
  }

  // 渲染内容的模块
  renderContent = (text, data, onClick) => {
    const style = {
      padding: '.15rem 0 .09rem .15rem',
      color: '#000',
      fontSize: '.16rem',
      lineHeight: '.16rem',
      height: '.16rem',
      fontWeight: 'bolder',
      position: 'relative',
    };
    return (
      <div>
        <div style={style}>
          {text}
        </div>
        <WingBlank>
          <Grid data={data} activeStyle={false} onClick={info => onClick(info)} />
        </WingBlank>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderPages()}

        {this.renderMobile()}

        {this.renderRequest()}
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(DebugerRequest);
