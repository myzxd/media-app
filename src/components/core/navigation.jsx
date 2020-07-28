/* eslint-disable no-console */
/**
 * 导航栏模块
 */
import is from 'is_js';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  NavBar, Icon, Button, Toast,
} from 'antd-mobile';
import { mobile } from '../../application/index';

// 导航栏展现类型
const CoreNavigationItemType = {
  icon: 'icon',         // 图标
  text: 'text',         // 文本
  button: 'button',     // 按钮
};

// 导航栏行为
const CoreNavigationAction = {
  quit: 'quit',     // 直接退出当前h5页面
  back: 'back',     // 后退到上一个页面 history.pop()
  push: 'push',     // 前进到某页面
  custom: 'custom', // 自定义事件
};

// 默认的items
const CoreNavigationItems = {
  // 文本“取消”，退出当前页面
  QuitTextAction: {
    type: CoreNavigationItemType.text,
    text: '取消',
    action: CoreNavigationAction.quit,
  },
  // 图片“<”，退出当前页面
  QuitIconAction: {
    type: CoreNavigationItemType.icon,
    icon: 'left',
    action: CoreNavigationAction.quit,
  },
  // 图片“<”，页面后退
  BackIconAction: {
    type: CoreNavigationItemType.icon,
    icon: 'left',
    action: CoreNavigationAction.back,
  },

  // 文本“编辑”，页面跳转到指定url，自定义事件（仅作为事例）
  CustomPushAction: {
    type: CoreNavigationItemType.text,
    text: '编辑',
    url: '/Update',
    action: CoreNavigationAction.push,
  },
  // 文本“提交/编辑/保存”，自定义事件（仅作为事例）
  CustomTextAction: {
    type: CoreNavigationItemType.text,
    text: '提交/编辑/保存',
    action: CoreNavigationAction.custom,
    callback: (e) => { console.log(e); },
  },
};

class CoreNavigation extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    leftItem: PropTypes.object,
    rightItem: PropTypes.object,
    title: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    leftItem: {},
    rightItem: {},
    title: '',
    style: {},
  }

  constructor(props) {
    super();
    this.state = {
      title: props.title ? props.title : '',
      leftItem: props.leftItem ? props.leftItem : undefined,
      rightItem: props.rightItem ? props.rightItem : undefined,
      style: props.style ? props.style : {},
    };
  }

  componentWillReceiveProps(props) {
    const state = {
      title: props.title ? props.title : '',
      leftItem: props.leftItem ? props.leftItem : undefined,
      rightItem: props.rightItem ? props.rightItem : undefined,
      style: props.style ? props.style : {},
    };
    this.setState(state);
  }

  // 页面后退
  onGoBack = () => {
    // 调用移动端的功能
    mobile.navigationGoBack({}, undefined, () => {
      console.log('移动端尚未初始化，退出功能未注册');
    });

    const { privateHistory } = this.props.history;
    privateHistory.goBack();
  }

  // 页面跳转到
  onGoPush = (url) => {
    const { privateHistory } = this.props.history;
    privateHistory.push(url);
  }

  // 全部退出
  onQuit = () => {
    // 调用移动端的功能
    mobile.quitToNavigation({}, undefined, () => {
      Toast.fail('移动端尚未初始化，退出功能未注册');
    });
  }

  // 渲染回调事件
  renderItemAction = (item) => {
    const { action, url, callback } = item;

    // 直接退出
    if (action === CoreNavigationAction.quit) {
      return this.onQuit;
    }
    // 页面后退
    if (action === CoreNavigationAction.back) {
      return this.onGoBack;
    }
    // 跳转到某页面
    if (action === CoreNavigationAction.push && is.not.empty(url)) {
      return () => { this.onGoPush(url); };
    }
    // 自定义事件
    if (action === CoreNavigationAction.custom && is.existy(callback)) {
      return callback;
    }

    return () => {};
  }

  // 渲染内容
  renderItemContent = (item) => {
    const { type } = item;
    // 图标类型
    if (type === CoreNavigationItemType.icon && is.not.empty(item.icon)) {
      return <Icon type={item.icon} size="lg" />;
    }
    // 文本类型
    if (type === CoreNavigationItemType.text && is.not.empty(item.text)) {
      return <span>{item.text}</span>;
    }
    // 按钮类型
    if (type === CoreNavigationItemType.button && is.not.empty(item.text)) {
      return <Button type={item.buttonType} size="small">{item.text}</Button>;
    }
    // 默认
    return <span />;
  }

  // 渲染导航栏内容
  renderNavigationItem = (item) => {
    if (is.not.existy(item) || is.empty(item)) {
      return undefined;
    }

    return (
      <div role="presentation" onClick={this.renderItemAction(item)}>
        {this.renderItemContent(item)}
      </div>
    );
  }

  render = () => {
    const {
      title, leftItem, rightItem, style,
    } = this.state;
    const props = {
      mode: 'light',
      leftContent: this.renderNavigationItem(leftItem),
      rightContent: this.renderNavigationItem(rightItem),
      style: {
        position: 'fixed',
        zIndex: 999,
        left: 0,
        top: 0,
        right: 0,
        ...style,
      },
    };
    return (
      <NavBar {...props}>
        {title}
      </NavBar>
    );
  }
}

CoreNavigation.CoreNavigationItemType = CoreNavigationItemType;
CoreNavigation.CoreNavigationAction = CoreNavigationAction;
CoreNavigation.CoreNavigationItems = CoreNavigationItems;

export default CoreNavigation;
