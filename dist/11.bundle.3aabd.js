(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{625:function(e,t,n){"use strict";n.d(t,"b",function(){return i}),n.d(t,"a",function(){return a});var i={sign:10,lottery:20,description:function(e){switch(Number(e)){case this.sign:return"每日签到领奖(签到)";case this.lottery:return"抽奖奖励(活动)";default:return"未定义"}}},a={PageHomeOpened:"PageHomeOpened",PageHomeViewed:"PageHomeViewed",PageSignOpened:"PageSignOpened",PageSignViewed:"PageSignViewed",PageScoreOpened:"PageScoreOpened",PageScoreViewed:"PageScoreViewed",PageScoreDetailOpened:"PageScoreDetailOpened",PageScoreDetailViewed:"PageScoreDetailViewed",PageScoreRankOpened:"PageScoreRankOpened",PageScoreRankViewed:"PageScoreRankViewed",PageSignDescriptionOpened:"PageSignDescriptionOpened",PageSignDescriptionViewed:"PageSignDescriptionViewed",PageAppointmentOpened:"PageAppointmentOpened",PageAppointmentViewed:"PageAppointmentViewed",PageActivity20191204Opened:"PageActivity20191204Opened",PageActivity20191204Viewed:"PageActivity20191204Viewed",PageActivity20191212Opened:"PageActivity20191212Opened",PageActivity20191212Viewed:"PageActivity20191212Viewed",PageActivity20191224Opened:"PageActivity20191224Opened",PageActivity20191224Viewed:"PageActivity20191224Viewed",PageDayDayMoneyOpened:"PageDayDayMoneyOpened",PageDayDayMoneyViewed:"PageDayDayMoneyViewed",PageDayDayMoneyRuleOpened:"PageDayDayMoneyOpened",PageDayDayMoneyRuleViewed:"PageDayDayMoneyViewed",RedirectFromHomeToSignPage:"RedirectFormHomeToSignPage",RedirectFromHomeToActivity20191204:"RedirectFromHomeToActivity20191204",RedirectFromHomeToActivity20191212:"RedirectFromHomeToActivity20191212",RedirectFromScoreToSignPage:"RedirectFromScoreToSignPage",RedirectFromActivity20191204ToScore:"RedirectFromActivity20191204ToScore",RedirectFromActivity20191204ToPuShu:"RedirectFromActivity20191204ToPuShu",RedirectFromActivity20191212ToScore:"RedirectFromActivity20191212ToScore",RedirectFromActivity20191224ToScore:"RedirectFromActivity20191224ToScore",RedirectFromHomeToDayDayMoney:"RedirectFromHomeToDayDayMoney",RedirectFromDayDayMoneyToDayDayMoneyRule:"RedirectFromDayDayMoneyToDayDayMoneyRule",ActionDailySign:"ActionDailySign",ActionAppointmentPayment:"ActionAppointmentPayment",ActionAppointmentTasks:"ActionAppointmentTasks",ActionAppointmentMoneyMaker:"ActionAppointmentMoneyMaker",ActionAppointmentAdvertisement:"ActionAppointmentAdvertisement",ActionActivity20191204:"ActionActivity20191204",ActionActivity20191212:"ActionActivity20191212",ActionActivity20191224:"ActionActivity20191224",ActionDayDayMoneyApplication:"ActionDayDayMoneyApplication"}},626:function(e,t,n){var i,a=(i=n(627))&&i.__esModule?i:{default:i};Object.defineProperty(t,"CoreNavigation",{enumerable:!0,get:function(){return a.default}})},627:function(e,t,n){"use strict";n.r(t);n(628);var i=n(629),a=n(8),o=n.n(a),r=(n(630),n(631)),c=(n(369),n(151)),s=(n(152),n(51)),l=n(22),d=n.n(l),p=n(34),u=n.n(p),g=n(622),m=n.n(g),y=n(623),f=n.n(y),v=n(621),h=n.n(v),P=n(624),A=n.n(P),b=n(43),S=n.n(b),D=n(2),x=n.n(D),F=n(0),k=n.n(F),C=n(4),I=n.n(C),z=n(15),E={icon:"icon",text:"text",button:"button"},R={quit:"quit",back:"back",push:"push",custom:"custom"},T={QuitTextAction:{type:E.text,text:"取消",action:R.quit},QuitIconAction:{type:E.icon,icon:"left",action:R.quit},BackIconAction:{type:E.icon,icon:"left",action:R.back},CustomPushAction:{type:E.text,text:"编辑",url:"/Update",action:R.push},CustomTextAction:{type:E.text,text:"提交/编辑/保存",action:R.custom,callback:function(e){console.log(e)}}},M=function(e){function t(e){var n;return d()(this,t),n=m()(this,f()(t).call(this)),S()(h()(n),"onGoBack",function(){z.b.navigationGoBack({},void 0,function(){console.log("移动端尚未初始化，退出功能未注册")}),n.props.history.privateHistory.goBack()}),S()(h()(n),"onGoPush",function(e){n.props.history.privateHistory.push(e)}),S()(h()(n),"onQuit",function(){z.b.quitToNavigation({},void 0,function(){s.a.fail("移动端尚未初始化，退出功能未注册")})}),S()(h()(n),"renderItemAction",function(e){var t=e.action,i=e.url,a=e.callback;return t===R.quit?n.onQuit:t===R.back?n.onGoBack:t===R.push&&x.a.not.empty(i)?function(){n.onGoPush(i)}:t===R.custom&&x.a.existy(a)?a:function(){}}),S()(h()(n),"renderItemContent",function(e){var t=e.type;return t===E.icon&&x.a.not.empty(e.icon)?I.a.createElement(c.a,{type:e.icon,size:"lg"}):t===E.text&&x.a.not.empty(e.text)?I.a.createElement("span",null,e.text):t===E.button&&x.a.not.empty(e.text)?I.a.createElement(r.a,{type:e.buttonType,size:"small"},e.text):I.a.createElement("span",null)}),S()(h()(n),"renderNavigationItem",function(e){if(!x.a.not.existy(e)&&!x.a.empty(e))return I.a.createElement("div",{role:"presentation",onClick:n.renderItemAction(e)},n.renderItemContent(e))}),S()(h()(n),"render",function(){var e=n.state,t=e.title,a=e.leftItem,r=e.rightItem,c=e.style,s={mode:"light",leftContent:n.renderNavigationItem(a),rightContent:n.renderNavigationItem(r),style:o()({position:"fixed",zIndex:999,left:0,top:0,right:0},c)};return I.a.createElement(i.a,s,t)}),n.state={title:e.title?e.title:"",leftItem:e.leftItem?e.leftItem:void 0,rightItem:e.rightItem?e.rightItem:void 0,style:e.style?e.style:{}},n}return A()(t,e),u()(t,[{key:"componentWillReceiveProps",value:function(e){var t={title:e.title?e.title:"",leftItem:e.leftItem?e.leftItem:void 0,rightItem:e.rightItem?e.rightItem:void 0,style:e.style?e.style:{}};this.setState(t)}}]),t}(C.Component);S()(M,"propTypes",{history:k.a.object.isRequired,leftItem:k.a.object,rightItem:k.a.object,title:k.a.string,style:k.a.object}),S()(M,"defaultProps",{leftItem:{},rightItem:{},title:"",style:{}}),M.CoreNavigationItemType=E,M.CoreNavigationAction=R,M.CoreNavigationItems=T,t.default=M},715:function(e,t,n){e.exports=n.p+"5221e0398cb969e94b25e95731b72a2e.png"},716:function(e,t,n){e.exports=n.p+"ec6ed47d3b27c59890f960ce8fa6b7e3.png"},717:function(e,t,n){e.exports=n.p+"989a44f4e84d23d5cfb488762bd15ad1.png"},718:function(e,t,n){e.exports=n.p+"08812771be1e40241bfd93bae603ae76.png"},719:function(e,t,n){e.exports=n.p+"58f58de0188828c9a42bdb557ed0b58e.png"},720:function(e,t,n){e.exports=n.p+"35d4eacf5fccf3653042e476215cd2ed.png"},721:function(e,t,n){var i=n(722);"string"==typeof i&&(i=[[e.i,i,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(66)(i,a);i.locals&&(e.exports=i.locals)},722:function(e,t,n){(t=e.exports=n(65)(!1)).push([e.i,".Tn0Q4wSbbnVDVNv8d7BQj {\n  background-color: #FED783;\n}\n.APxj6kWsKYQBNCfg1JG5f {\n  position: absolute;\n  margin-top: 143.5%;\n  width: 100%;\n  display: flex;\n  height: fit-content;\n}\n._1oM4wMqVQ6GMrJVVzTimpW {\n  padding: 3% 5%;\n  font-family: PingFangSC-Medium;\n  font-size: 0.2rem;\n  color: #FF1614;\n  letter-spacing: 0;\n  text-align: center;\n  background-color: #F8EA15;\n  border-radius: 0.04rem;\n  width: 82%;\n  margin: auto;\n}\n._1oM4wMqVQ6GMrJVVzTimpW:hover {\n  padding: 3% 5%;\n  font-family: PingFangSC-Medium;\n  font-size: 0.2rem;\n  color: #FF1614;\n  letter-spacing: 0;\n  text-align: center;\n  background-color: #f5f2ce;\n  border-radius: 0.03rem;\n  width: 80%;\n  margin: auto;\n}\n.DFatsUaf6kgyesJh3FEd4 {\n  padding: 3% 5%;\n  font-family: PingFangSC-Medium;\n  font-size: 0.2rem;\n  color: #FF1614;\n  letter-spacing: 0;\n  text-align: center;\n  background-color: #F8EA15;\n  border-radius: 0.01rem;\n  width: 30%;\n}\n._3hiGD4KGhqi51xgNb0fPLJ {\n  padding: 3% 5%;\n  font-family: PingFangSC-Medium;\n  font-size: 0.2rem;\n  color: #FFF;\n  letter-spacing: 0;\n  text-align: center;\n  background-color: #ddd;\n  border-radius: 0.01rem;\n  width: 30%;\n}\n.DFatsUaf6kgyesJh3FEd4:hover {\n  padding: 3% 5%;\n  font-family: PingFangSC-Medium;\n  font-size: 0.2rem;\n  color: #FF1614;\n  letter-spacing: 0;\n  text-align: center;\n  background-color: #f5f2ce;\n  border-radius: 0.01rem;\n  width: 30%;\n}\n.Za2H0aQJ3jdTIfGVF8kl2 {\n  position: absolute;\n  margin-top: 128%;\n  width: 100%;\n  font-family: PingFangSC-Medium;\n  font-size: 0.16rem;\n  color: #FFFFFF;\n  letter-spacing: -0.39px;\n  text-align: center;\n  line-height: 0.16rem;\n}\n.yd97uxGM5kJQqR0YcFsxx {\n  position: absolute;\n  margin: 87% auto auto;\n  width: 100%;\n  text-align: center;\n  height: 19%;\n  display: flex;\n}\n.g21F_vKAS-EAqkSJqi_Dx {\n  width: 33%;\n  height: 100%;\n}\n._9fQr8l4DGvdTzAkKxDCqV {\n  width: 34%;\n  height: 100%;\n}\n._2jDJiDZKGd1zdMG92RAnNH {\n  width: 33%;\n  height: 100%;\n}\n._1XWx7RbaGYbTUbqJvvQ4gP {\n  position: absolute;\n  margin-top: 66%;\n  width: 100%;\n  font-family: PingFangSC-Medium;\n  font-size: 0.38rem;\n  color: #E00002;\n  letter-spacing: 0;\n  text-align: center;\n  line-height: 0.5rem;\n}\n._2QXRm6265GESGEEtytAXWk {\n  position: absolute;\n  margin-top: 174%;\n  width: 80%;\n  padding: 0 10%;\n}\n._3RmvH4aE82lcZIPT76vfoi {\n  opacity: 0.9;\n  font-family: PingFangSC-Regular;\n  font-size: 0.14rem;\n  color: #FE1313;\n  line-height: 0.7em;\n}\n",""]),t.locals={"page-container":"Tn0Q4wSbbnVDVNv8d7BQj","page-button-container":"APxj6kWsKYQBNCfg1JG5f","page-button-first-button":"_1oM4wMqVQ6GMrJVVzTimpW","page-button-second-button":"DFatsUaf6kgyesJh3FEd4","page-button-second-button-disabled":"_3hiGD4KGhqi51xgNb0fPLJ","page-prize-tips":"Za2H0aQJ3jdTIfGVF8kl2","page-pirze-container":"yd97uxGM5kJQqR0YcFsxx","page-prize-first-button":"g21F_vKAS-EAqkSJqi_Dx","page-prize-second-button":"_9fQr8l4DGvdTzAkKxDCqV","page-prize-third-button":"_2jDJiDZKGd1zdMG92RAnNH","page-count-down-font":"_1XWx7RbaGYbTUbqJvvQ4gP","page-info-content":"_2QXRm6265GESGEEtytAXWk","page-info-content-text":"_3RmvH4aE82lcZIPT76vfoi"}},750:function(e,t,n){"use strict";n.r(t);n(152);var i=n(51),a=n(22),o=n.n(a),r=n(34),c=n.n(r),s=n(622),l=n.n(s),d=n(623),p=n.n(d),u=n(621),g=n.n(u),m=n(624),y=n.n(m),f=n(43),v=n.n(f),h=n(2),P=n.n(h),A=n(11),b=n.n(A),S=n(1),D=n.n(S),x=n(150),F=n(4),k=n.n(F),C=n(0),I=n.n(C),z=n(715),E=n.n(z),R=n(716),T=n.n(R),M=n(717),w=n.n(M),B=n(718),N=n.n(B),V=n(625),_=(n(639),n(640)),G=n(15),O=n(719),q=n.n(O),H=n(720),Q=n.n(H),J={score6:"20191204_activity_surprise_eggs_prize_score_6",score66:"20191204_activity_surprise_eggs_prize_score_66",coupon:"20191204_activity_surprise_eggs_prize_coupon"};var j=function(e){function t(e){var n;return o()(this,t),n=l()(this,p()(t).call(this,e)),v()(g()(n),"onDisplay",function(){return function(e){e.preventDefault();var t=n.onGeneratePrizeByRandom();n.setState({prize:t},function(){var e={accountId:b.a.get(G.a,"AccountId",""),prize:t,onSuccessCallback:n.onSuccessCallback,onFailureCallback:n.onFailureCallback};n.props.dispatch({type:"activity20191204/updateActivityPrizeInfo",payload:e}),n.props.dispatch({type:"applicationAnalysis/createEventRecord",payload:{key:V.a.ActionActivity20191204}})})}}),v()(g()(n),"onSuccessCallback",function(){var e=n.state.onChangeBannerByIndex;e&&e(),n.setState({isDisplay:!0})}),v()(g()(n),"onFailureCallback",function(){console.log("抽奖失败"),n.setState({isDisplay:!1,prize:void 0})}),v()(g()(n),"onClose",function(){return function(){n.setState({isDisplay:!1})}}),v()(g()(n),"onDirect",function(){return function(){n.setState({isDisplay:!1}),n.props.dispatch({type:"applicationAnalysis/createEventRecord",payload:{key:V.a.RedirectFromActivity20191204ToPuShu}}),console.log("onDirectToPuShu"),G.b.payInAdvance({},void 0,function(){i.a.fail("移动端尚未初始化，操作失败")})}}),v()(g()(n),"onCloseFinished",function(){console.log("弹窗关闭后的调用");var e=n.props.onReloadPage;e&&(console.log("抽奖后重新加载页面"),e())}),v()(g()(n),"onWrapTouchStart",function(e){/iPhone|iPod|iPad/i.test(navigator.userAgent)&&(function(e,t){for(var n=e.matches||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector;e;){if(n.call(e,t))return e;e=e.parentElement}return null}(e.target,".am-modal-content")||e.preventDefault())}),v()(g()(n),"onGeneratePrizeByRandom",function(){return 10*Math.random()<8?J.score6:J.score66}),v()(g()(n),"renderPrizeModal",function(){var e=n.state.prize,t="",i=[];return e===J.score6?(t=k.a.createElement("div",null,k.a.createElement("img",{style:{width:".56rem",margin:"auto"},src:q.a,alt:""}),k.a.createElement("div",null,k.a.createElement("span",{style:{fontSize:".4rem",color:"rgba(239,61,49,1)",marginRight:".05rem"}},"+6"),k.a.createElement("span",{style:{fontSize:".14rem",color:"rgba(0,0,0,1)"}},"积分"))),i=[{text:"我知道了",onPress:function(){n.onClose()()}}]):e===J.score66?(t=k.a.createElement("div",null,k.a.createElement("img",{style:{width:".56rem",margin:"auto"},src:q.a,alt:""}),k.a.createElement("div",null,k.a.createElement("span",{style:{fontSize:".4rem",color:"rgba(239,61,49,1)",marginRight:".05rem"}},"+66"),k.a.createElement("span",{style:{fontSize:".14rem",color:"rgba(0,0,0,1)"}},"积分"))),i=[{text:"我知道了",onPress:function(){n.onClose()()}}]):e===J.coupon&&(t=k.a.createElement("div",null,k.a.createElement("img",{style:{width:"1.3rem",margin:"auto"},src:Q.a,alt:""}),k.a.createElement("div",null,k.a.createElement("span",{style:{fontSize:".14rem",color:"rgba(0,0,0,1)"}},"获得服务费预支抵用券"))),i=[{text:"马上领取",onPress:function(){n.onDirect()()}}]),k.a.createElement(_.a,{visible:n.state.isDisplay,transparent:!0,maskClosable:!1,onClose:n.onClose(),title:"恭喜您！",footer:i,wrapProps:{onTouchStart:n.onWrapTouchStart},afterClose:n.onCloseFinished},k.a.createElement("div",{style:{height:"1.3rem",overflow:"scroll"}},t))}),n.state={isDisplay:!1,prize:"",className:b.a.get(e,"className",[]),activityPrizes:b.a.get(e,"activityPrizes",[]),onChangeBannerByIndex:e.onChangeBannerByIndex?e.onChangeBannerByIndex:void 0},n}return y()(t,e),c()(t,[{key:"componentWillReceiveProps",value:function(e){var t={className:b.a.get(e,"className",[]),activityPrizes:b.a.get(e,"activityPrizes",[]),onChangeBannerByIndex:e.onChangeBannerByIndex?e.onChangeBannerByIndex:void 0};this.setState(t)}},{key:"render",value:function(){var e=this.state.className;return k.a.createElement("div",{className:e},k.a.createElement("div",{style:{width:"100%",height:"100%"},onClick:this.onDisplay()}),this.renderPrizeModal())}}]),t}(F.Component);v()(j,"propTypes",{dispatch:I.a.func.isRequired,onReloadPage:I.a.func,onChangeBannerByIndex:I.a.func});var W=Object(x.connect)()(j),K=n(626),U=n(721),X=n.n(U),Y=K.CoreNavigation.CoreNavigationItemType,Z=K.CoreNavigation.CoreNavigationAction,L={first:"first",second:"second",third:"third",backgroundImageByIndex:function(e){switch(e){case this.first:return T.a;case this.second:return w.a;case this.third:return N.a;default:return E.a}}},$=function(e){function t(e){var n;return o()(this,t),n=l()(this,p()(t).call(this)),v()(g()(n),"onFetchActivityPermission",function(e){(0,n.props.dispatch)({type:"activity20191204/fetchActivityPermission",payload:{accountId:e}})}),v()(g()(n),"onReloadPage",function(){var e=n.state.reloadCount,t=G.a.AccountId;n.setState({reloadCount:e+1}),n.onFetchActivityPermission(t)}),v()(g()(n),"onDirectToScore",function(){n.props.dispatch({type:"applicationAnalysis/createEventRecord",payload:{key:V.a.RedirectFromActivity20191204ToScore}}),n.props.history.privateHistory.push("/Manage/Score?action=back")}),v()(g()(n),"onDirectToPuShu",function(){n.props.dispatch({type:"applicationAnalysis/createEventRecord",payload:{key:V.a.RedirectFromActivity20191204ToPuShu}}),console.log("onDirectToPuShu"),G.b.payInAdvance({},void 0,function(){i.a.fail("移动端尚未初始化，操作失败")})}),v()(g()(n),"onChangeBannerByIndex",function(e){n.setState({prizeSelectedIndex:e})}),v()(g()(n),"renderNavigation",function(){var e={type:Y.icon,icon:"left",action:Z.back},t={title:k.a.createElement("span",{style:{color:"#FFFDE6"}},"预支服务费"),history:n.props.history,leftItem:e,style:{backgroundColor:"#E34E3E",color:"#FFFDE6"}};return k.a.createElement(K.CoreNavigation,t)}),v()(g()(n),"renderPrizeButtons",function(){var e=n.state,t=e.hasActivityPermission,i=e.activityPrizes;return!0!==t?(console.log("没有活动抽奖的权限"),""):P.a.empty(i)?(console.log("奖品池信息为空, 不能抽奖"),""):k.a.createElement("div",{className:X.a["page-pirze-container"]},k.a.createElement(W,{activityPrizes:i,className:X.a["page-prize-first-button"],onChangeBannerByIndex:function(){n.onChangeBannerByIndex(L.first)},onReloadPage:n.onReloadPage}),k.a.createElement(W,{activityPrizes:i,className:X.a["page-prize-second-button"],onChangeBannerByIndex:function(){n.onChangeBannerByIndex(L.second)},onReloadPage:n.onReloadPage}),k.a.createElement(W,{activityPrizes:i,className:X.a["page-prize-third-button"],onChangeBannerByIndex:function(){n.onChangeBannerByIndex(L.third)},onDirectToPuShu:n.onDirectToPuShu,onReloadPage:n.onReloadPage}))}),v()(g()(n),"renderActionButtons",function(){return k.a.createElement("div",{className:X.a["page-button-container"]},k.a.createElement("div",{className:X.a["page-button-first-button"],onClick:n.onDirectToScore},"查看积分"))}),v()(g()(n),"renderActivityBackground",function(){var e=n.state.prizeSelectedIndex,t=L.backgroundImageByIndex(e);return k.a.createElement("img",{src:t,alt:"",style:{width:"100%"}})}),v()(g()(n),"renderPrizeTips",function(){return!0!==n.state.hasActivityPermission?k.a.createElement("div",{className:X.a["page-prize-tips"]},"今日抽奖机会已使用，明天再来吧"):k.a.createElement("div",{className:X.a["page-prize-tips"]},"您还有一次抽奖机会")}),v()(g()(n),"renderPrizeInfo",function(){var e=function(e,t){return Math.floor(Math.random()*(t-e))+e},t="134,147,150,151,152,157,158,159,178,182,183,184,187,188,130,131,132,145,155,156,185,186,176,175,133,149,153,180,181,189,177".split(","),n="".concat(t[Math.floor(Math.random()*t.length)],"xxxxx").concat(e(100,999)),i=D()().format("MM月DD日"),a=D()().subtract(Math.floor(5*Math.random()+1),"hour").format("HH"),o=D()().subtract(Math.floor(59*Math.random()+1),"minute").format("mm"),r=D()().subtract(Math.floor(59*Math.random()+1),"second").format("mm"),c=e(1,999),s="6积分";return c>600&&(s="优惠券"),c>300&&s<=600&&(s="66积分"),"".concat(n," ").concat(i," ").concat(a,":").concat(o,":").concat(r," 获得").concat(s)}),v()(g()(n),"renderFakeInfo",function(){return k.a.createElement("div",{className:X.a["page-info-content"]},k.a.createElement("p",{className:X.a["page-info-content-text"]},n.renderPrizeInfo()),k.a.createElement("p",{className:X.a["page-info-content-text"]},n.renderPrizeInfo()),k.a.createElement("p",{className:X.a["page-info-content-text"]},n.renderPrizeInfo()))}),v()(g()(n),"renderContent",function(){return k.a.createElement("div",null,n.renderPrizeButtons(),n.renderActionButtons(),n.renderPrizeTips(),n.renderFakeInfo(),n.renderActivityBackground())}),n.state={reloadCount:0,prizeSelectedIndex:0,activityPrizes:b.a.get(e,"activity20191204.activityPrizes",[]),hasActivityPermission:b.a.get(e,"activity20191204.hasActivityPermission",!1),canDriectToPuShu:b.a.get(e,"applicationSystem.canDriectToPuShu",!1)},e.dispatch({type:"applicationAnalysis/createEventRecord",payload:{key:V.a.PageActivity20191204Opened}}),n}return y()(t,e),c()(t,[{key:"componentDidMount",value:function(){var e=G.a.AccountId;P.a.not.empty(e)&&P.a.existy(e)&&this.onFetchActivityPermission(e),G.b.updateStateBarColor({color:"e34e3e"},void 0,function(){console.log("componentDidMount updateStateBarColor 移动端尚未初始化，操作失败")}),G.b.updateTabsDisplayState({isHide:!0},void 0,function(){console.log("更新tabs隐藏失败")}),this.props.dispatch({type:"applicationAnalysis/createEventRecord",payload:{key:V.a.PageActivity20191204Viewed}})}},{key:"componentWillReceiveProps",value:function(e){var t={activityPrizes:b.a.get(e,"activity20191204.activityPrizes",[]),hasActivityPermission:b.a.get(e,"activity20191204.hasActivityPermission",!1),canDriectToPuShu:b.a.get(e,"applicationSystem.canDriectToPuShu",!1)};this.setState(t)}},{key:"componentWillUnmount",value:function(){G.b.updateStateBarColor({color:"FFFFFF"},void 0,function(){console.log("componentWillUnmount updateStateBarColor 移动端尚未初始化，操作失败")}),G.b.updateTabsDisplayState({isHide:!1},void 0,function(){console.log("更新tabs显示失败")})}},{key:"render",value:function(){var e=this.state.reloadCount;return console.log("页面刷新计数: ".concat(e)),k.a.createElement("div",{className:X.a["page-container"]},this.renderNavigation(),this.renderContent())}}]),t}(F.Component);v()($,"propTypes",{dispatch:I.a.func.isRequired,history:I.a.object.isRequired});t.default=Object(x.connect)(function(e){return{activity20191204:e.activity20191204,applicationSystem:e.applicationSystem}})($)}}]);