<template>
  <div class="contain">
    <y-top title="签约授权书"></y-top>
    <div class="inner">
      <div class="title">
        <p>"中富杯"实盘炒股大赛</p>
        <p>参赛选手交易信息授权书</p>
      </div>
      <div class="text">
        <p class="inner-text1">
         中银国际证券有限责任公司（以下简称 “ 贵司 ” ）：
        </p>
        <p class="inner-tex2">
            本人（用户ID/手机： {{ username }}/{{ phone }}）自愿参加中银国际证券有限责任公司杭州庆春路证券营业部与一富财经网一起主办的的 2017 “ 中富杯 ”实盘炒股大赛（以下简称 “ 实盘赛 ”），并在贵司开立参赛所需的证券账户（对应身份证号：{{usersfid}}）
        </p>
        <p class="inner-tex2">
           根据《 2017 年 “ 中富杯 ” 实盘炒股大赛参赛规则》，本人不可撤销地授权贵司向一富财经网（暨杭州碧琢网络科技有限公司）计算并提供本人上述参赛证券账户如下的交易信息（以下简称 “ 授权内容 ”）：
        </p>
        <p class="inner-tex2">
           1.原始数据：每日持仓、每日操作、总资产、交易价格、交易时间及仓位信息。 注：( 原始数据对应参赛账户交易系统内的字段名包括：股票代码、股票名称、成本价、昨日收盘价、盈亏比例、持仓数量、成交时间、成交数量、委托方向、资金余额、总资产、成交价格、成交日期。 )
        </p>
        <p class="inner-tex2"> 2.加工数据：收益率（具体包括总收益率、月收益率、周收益率和日收益率）
          注：加工数据对应参赛账户交易系统内的字段名包括：( 撤销标志、交易类别、成交金额、币种、最新币值、主账户标志、账户类别、状态、总资产、业务类别、转账金额、处理结果。 ) 加工数据系根据原始数据及一富财经网提供的计算公式所得。</p>
        <p class="inner-tex2">
           授权时间为自本授权书签订之日起至 2017 年 08 月 11 日
        </p>
        <p class="inner-tex2">
         本人声明，授权内容的使用用途由一富财经根据本次大赛实际所需而使用，与贵司无关。本人已经完全知悉并充分理解本授权书条款的内容及相应的法律后果，愿意接受本授权书条款的约定，并认可本授权书的签署方式和本次大赛所涉及信息授权事项。
        </p>
        <p class="inner-tex2">
          本授权书自本人签署之日起生效，至授权期间届满之日终止。
        </p>
        <p class="inner-tex2">
          贵司提供的交易数据如超出上述授权内容范围，一切后果及法律责任由贵司承担。
        </p>
        <p class="inner-tex2 text-last">
          授权人：{{ realname }}
        </p>
      </div>
      <div class="btn">
        <a href="javascript:;" @click="onSubmit">同意授权</a>
        <!-- <a class="a2" href="">下载授权书</a> -->
      </div>
        
    </div>
    
  </div>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'joinagree',
  created () {
    const apply = this.$store.state.apply
    if (!apply.realname || !apply.customerid) {
      this.$router.replace('/apply/join')
    } else if (!apply.camp) {
      this.$router.replace('/apply/joinchoice')
    }
  },
  data () {
    return {
      realname: this.$store.state.apply.realname,
      customerid: this.$store.state.apply.customerid,
      username: this.$store.state.user.data.yfNick,
      phone: this.$store.state.user.data.phone
    }
  },
  methods: {
    go: function (path) {
      this.$router.push({ path: path })
    },
    onSubmit () {
      this.apply().then(data => {
        // 报名成功，重新获取数据
        this.getUser({token: this.$store.state.user.token})
        this.go('/apply/joinsuccess')
      }).catch(() => {
        this.go('/apply/join')
      })
    },
    ...mapActions(['apply', 'getUser'])
  },
  computed: {
    ...mapGetters(['usersfid'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
  .contain {width: 100%;height: 100%; display: flex; flex-direction: column;}
  .inner { padding: 0 0.48rem; flex: 1;}
  .inner .title { height:1.4rem;padding-top: 0.48rem; }
  .inner .title p { margin:0;padding: 0; font-size: 0.32rem; text-align: center;line-height: 0.48rem;}
  .text p {margin: 0;padding: 0; font-size: 0.22rem;}
  .text .inner-tex2 {text-indent: 0.5rem; line-height: 0.5rem;}
  .text .text-last {text-indent: 0; margin-top: 0.4rem;}
  .inner .btn {margin-top: 0.34rem; padding-bottom: 0.36rem;}
  .inner .btn a{display: block; text-align: center; text-decoration: none; line-height: 0.88rem; font-size: 0.36rem;background: #e43a3d; color: #FFFFFF;}
  .inner .btn .a2{margin-top: 0.2rem; background: #FFFFFF; color: #9c9c9c; border: 0.02rem solid #cccccc;}
</style>

