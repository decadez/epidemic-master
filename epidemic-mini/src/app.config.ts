export default defineAppConfig({
  pages: [
    'pages/chat',
    'pages/home',
    'pages/user',
    'pages/health',
    'pages/health-list',
    'pages/feedback',
    'pages/feedback-list',
    'pages/no-permission',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '社区疫帮',
    navigationBarTextStyle: 'black'
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序位置接口的效果展示'
    }
  },
})
