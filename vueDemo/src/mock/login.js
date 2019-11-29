import { param2Obj } from '@/utils'
// 配置用户在登录页需要做验证，所以要在utils/validate中添加用户名
const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  geree: {
    roles: ['geree'],
    token: 'geree',
    introduction: '格力项目',
    avatar: '/static/userLogo/gereeLogo.jpg',
    name: 'geree'
  },
  ehr: {
    roles: ['ehr'],
    token: 'ehr',
    introduction: '格力项目',
    avatar: '/static/userLogo/ehrLogo.jpg',
    name: 'ehr'
  },
  jdh: {
    roles: ['jdh'],
    token: 'jdh',
    introduction: '简单汇',
    avatar: '/static/userLogo/jdh.png',
    name: 'jdh'
  },
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    return userMap[username]
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return userMap[token]
    } else {
      return false
    }
  },
  logout: () => 'success'
}
