#项目名称
运营h5活动

#测试环境
##服务器
ssh root@123.124.17.55

##测试部署目录
root@123.124.17.55:/data/project/web/qa/h5-apps/app/

##测试环境访问地址
https://boss-quhuo.aoaosong.com:9030/app/#/Manage/Home

##线上地址
https://qlife-apps.aoaosong.com/h5/#/Manage/Home

##测试部署负责人
@郭洋

##客户端测试负责人
@张浩

# 项目部署注意事项
- 部署线上和测试前，service/config.js 文件中的 config 配置要配置为空。
- 比较大的图片，需要用 https://tinypng.com/ 在线压缩一下，否则页面访问速度会慢。
- 测试如果不需要客户端发版本，则只需要客户端配合测试下功能即可
