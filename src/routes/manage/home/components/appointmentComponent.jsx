/* eslint-disable no-console */
/**
 * 首页 - 任务卡片
 */
import is from 'is_js';
import dot from 'dot-prop';
import { connect } from 'dva';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Toast } from 'antd-mobile';

import { ApplicationAnalysisKey } from '../../../../application/define/index';
import { config, mobile } from '../../../../application/index';

import taskImage2 from '../static/signTask2.png';
import taskImage3 from '../static/signTask3.png';
import taskImage4 from '../static/signTask4.png';
import taskImage2Selected from '../static/signTask2Selected.png';
import taskImage3Selected from '../static/signTask3Selected.png';
import taskImage4Selected from '../static/signTask4Selected.png';

const Tasks = {
  makeAppointmentForTask: 'makeAppointmentForTask',                   // 任务大厅
  makeAppointmentForMoneyMaker: 'makeAppointmentForMoneyMaker',       // 赚外快
  makeAppointmentForAdvertisement: 'makeAppointmentForAdvertisement', // 看广告
};

class AppointmentComponent extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super();
    this.state = {
      reloadCount: 0, // 刷新页面使用
      appointmentInfo: dot.get(props, 'score.appointmentInfo', {}),
    };
  }

  componentDidMount() {
    const { AccountId } = config;
    if (is.not.empty(AccountId) && is.existy(AccountId)) {
      this.onFetchAppointmentInfo();
    }
  }

  componentWillReceiveProps(props) {
    const state = {
      appointmentInfo: dot.get(props, 'score.appointmentInfo', {}),
    };
    this.setState(state);
  }

  // 获取计数
  getCountByType = (type) => {
    const { appointmentInfo } = this.state;
    let count = 0;
    dot.get(appointmentInfo, 'data', []).forEach((item) => {
      if (dot.get(item, 'sub_type', 0) === type) {
        count = dot.get(item, 'num', 0);
      }
    });
    return count;
  }

  // 获取预约状态
  getStateByType = (type) => {
    const { appointmentInfo } = this.state;
    let state = 0;
    dot.get(appointmentInfo, 'data', []).forEach((item) => {
      if (dot.get(item, 'sub_type', 0) === type) {
        state = dot.get(item, 'ok', false);
      }
    });
    return state;
  }

  // 获取预约详情
  onFetchAppointmentInfo = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'score/fetchAppointmentInfo' });
  }

  // 创建预约
  onCreateAppointmentInfo = (type) => {
    const { AccountId } = config;
    const { dispatch } = this.props;
    if (is.not.empty(AccountId) && is.existy(AccountId)) {
      dispatch({ type: 'score/createAppointmentInfo', payload: { type, onSuccessCallback: this.onFetchAppointmentInfo } });
    }
  }

  // 任务点击
  onClickTaskCard = (task) => {
    const { dispatch } = this.props;
    const { reloadCount } = this.state;
    const { tag, key, analysisKey } = task;

    // 任务点击统计
    dispatch({ type: 'applicationAnalysis/createEventRecord', payload: { key: analysisKey } });

    // 预约
    mobile.makeAppointment({ type: tag }, () => {
      console.log(`设置window.localStorage ${tag} true`);
      window.localStorage.setItem(tag, true);
      console.log(`获取${tag}结果为： ${window.localStorage.getItem(tag)}`);

      this.setState({
        reloadCount: reloadCount + 1,
      });
    }, () => {
      Toast.fail('移动端尚未初始化，操作失败');
    });

    this.onCreateAppointmentInfo(key);
    this.onFetchAppointmentInfo();
  }

  renderTaskImage = (task) => {
    const {
      image,
      imageSelected,
      appointmentCount = 0,
      isSelected,
    } = task;

    // 判断是否预约过
    let displayImage = image;
    let clickEvent = () => { this.onClickTaskCard(task); };
    if (isSelected === true) {
      displayImage = imageSelected;
      clickEvent = () => {};
    }

    return (
      <div style={{ width: '100%', marginBottom: '-.16rem' }} onClick={clickEvent}>
        {
          appointmentCount > 0
            ? (
              <div style={{
                position: 'absolute', marginTop: '26.5%', marginLeft: '29%', color: 'rgba(0, 0, 0, 0.33)', fontSize: '.12rem',
              }}
              >
                {`已预约${appointmentCount}人`}
              </div>
            ) : ''
        }

        <img style={{ width: '100%' }} src={displayImage} alt="" />
      </div>
    );
  }

  render() {
    const tasks = [
      {
        title: '任务大厅',
        content: '完成每日任务，轻松攒积分',
        subContent: '点击按钮立即预约新功能',
        image: taskImage2,
        imageSelected: taskImage2Selected,
        tag: Tasks.makeAppointmentForTask,
        key: 10,
        appointmentCount: this.getCountByType(10),
        isSelected: this.getStateByType(10),
        analysisKey: ApplicationAnalysisKey.ActionAppointmentTasks,
      },
      {
        title: '赚外快',
        content: '微任务等你来领，轻松赚外快',
        subContent: '点击按钮立即预约新功能',
        image: taskImage3,
        imageSelected: taskImage3Selected,
        tag: Tasks.makeAppointmentForMoneyMaker,
        key: 20,
        appointmentCount: this.getCountByType(20),
        isSelected: this.getStateByType(20),
        analysisKey: ApplicationAnalysisKey.ActionAppointmentMoneyMaker,
      },
      {
        title: '看广告 赚积分',
        content: '让你的闲暇时间变现啦',
        subContent: '点击按钮立即预约新功能',
        image: taskImage4,
        imageSelected: taskImage4Selected,
        tag: Tasks.makeAppointmentForAdvertisement,
        key: 30,
        appointmentCount: this.getCountByType(30),
        isSelected: this.getStateByType(30),
        analysisKey: ApplicationAnalysisKey.ActionAppointmentAdvertisement,
      },
    ];

    return tasks.map((task, idx) => {
      const key = `task-${idx}`;
      return <div key={key}>{this.renderTaskImage(task)}</div>;
    });
  }
}

function mapStateToProps({ score }) {
  return { score };
}

export default connect(mapStateToProps)(AppointmentComponent);
