import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pages/Index'
import Login from '@/pages/home/Login'
import Reg from '@/pages/home/Reg'
import BindPhone from '@/pages/home/BindPhone'
import BindPhoneCode from '@/pages/home/BindPhoneCode'
import PhoneLogin from '@/pages/home/PhoneLogin'
import PhoneLogintrue from '@/pages/home/PhoneLogintrue'
import PhoneLoginfalse from '@/pages/home/PhoneLoginfalse'
import LoginSuccess from '@/pages/home/LoginSuccess'
// 报名流程
import Apply from '@/pages/apply/Apply'
import ApplyJoin from '@/pages/apply/Join'
import ApplyJoinChoice from '@/pages/apply/JoinChoice'
import ApplyJoinSuccess from '@/pages/apply/JoinSuccess'
import ApplyJoinAgree from '@/pages/apply/JoinAgree'
// 报名流程 over
// 用户中心
import User from '@/pages/user/User'
import UserReport from '@/pages/user/Report'
import UserHonor from '@/pages/user/Honor'
import Invite from '@/pages/user/Invite'
import Inspire from '@/pages/user/Inspire'
import UserCenter from '@/pages/user/UserCenter'
import OtherUserCenter from '@/pages/home/OtherUserCenter'
import OtherUserReport from '@/pages/home/OtherUserReport'
// 用户中心over
import Rule from '@/pages/Rule'
import Award from '@/pages/Award'
import Score from '@/pages/Score'

Vue.use(Router)

export default new Router({
  base: 'zfsg',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/home/login',
      name: 'login',
      component: Login
    },
    {
      path: '/home/reg',
      name: 'reg',
      component: Reg
    },
    {
      path: '/home/bindphone',
      name: 'bindphone',
      component: BindPhone
    },
    {
      path: '/home/bindphonecode',
      name: 'bindphonecode',
      component: BindPhoneCode
    },
    {
      path: '/home/phonelogin',
      name: 'phonelogin',
      component: PhoneLogin
    },
    {
      path: '/home/phonelogintrue',
      name: 'phonelogintrue',
      component: PhoneLogintrue
    },
    {
      path: '/home/phoneloginfalse',
      name: 'phoneloginfalse',
      component: PhoneLoginfalse
    },
    {
      path: '/home/loginsuccess',
      name: 'loginsueecss',
      component: LoginSuccess
    },
    {
      path: '/home/otherusercenter',
      name: 'userotherusercenter',
      component: OtherUserCenter
    },
    {
      path: '/home/otheruserreport',
      name: 'userotheruserreport',
      component: OtherUserReport
    },
    // 报名流程
    {
      path: '/apply',
      component: Apply,
      children: [
        {
          path: 'join',
          name: 'applyjoin',
          component: ApplyJoin
        },
        {
          path: 'joinchoice',
          name: 'applyjoinchoice',
          component: ApplyJoinChoice
        },
        {
          path: 'joinsuccess',
          name: 'applyjoinsuccess',
          component: ApplyJoinSuccess
        },
        {
          path: 'joinagree',
          name: 'applyjoinagree',
          component: ApplyJoinAgree
        }
      ]
    },
    // 用户中心
    {
      path: '/user',
      component: User,
      children: [
        {
          path: 'report',
          name: 'userreport',
          component: UserReport
        },
        {
          path: 'honor',
          name: 'userhonor',
          component: UserHonor
        },
        {
          path: 'invite',
          name: 'userinvite',
          component: Invite
        },
        {
          path: 'inspire',
          name: 'userinspire',
          component: Inspire
        },
        {
          path: 'usercenter',
          name: 'userusercenter',
          component: UserCenter
        }
      ]
    },
    {
      path: '/rule',
      name: 'rule',
      component: Rule
    },
    {
      path: '/award',
      name: 'award',
      component: Award
    },
    {
      path: '/score',
      name: 'score',
      component: Score
    }
  ]
})
