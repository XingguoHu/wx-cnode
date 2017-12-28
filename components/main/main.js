//main.js

Component({
  properties: {
    tab: {
      type: String,
    }
  },
  data: {
    article: [],
    tabs: {
      'ask': '问答',
      'job': '招聘',
      'share': '分享',
      'good': '精华'
    },
    query: {
      page: 1,
      tab: '',
      limit: 20,
      mdrender: true
    },
    loading: false,
    finish: false
  },
  ready() {
    this.setData({
      query: Object.assign(this.data.query, {
        tab: this.properties.tab
      })
    })
    this.getAllArticle()
  },
  methods:{
    jump(e) {
      wx.navigateTo({
        url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}`
      })
    },
    getAllArticle() {
      if(this.data.loading || this.data.finish){
        return
      }
      this.setData({
        loading: true
      })
      wx.showLoading({
        title: '加载中',
      })
    wx.$http.get('topics', this.data.query)
      .then((res) => {
        res.data.length && this.data.query.page++
        this.setData({
          article: [...this.data.article, ...res.data],
          query: this.data.query,
          loading: false,
          finish: !res.data.length
        })
        wx.hideLoading()
      })
      .catch(e => {
        this.setData({
          loading: false
        })
        wx.hideLoading()
        console.error('err message', e)
      })
  }}
})