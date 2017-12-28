// components/nav.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    active: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    navLists: [
      {
        label: '全部',
        value: '',
        url: '/pages/index/index'
      },
      {
        label: '精华',
        value: 'good',
        url: '/pages/good/good'
      },
      {
        label: '分享',
        value: 'share',
        url: '/pages/share/share'

      },
      {
        label: '问答',
        value: 'ask',
        url: '/pages/ask/ask'

      },
      {
        label: '招聘',
        value: 'job',
        url: '/pages/job/job'

      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
   
  },

  attached() {
    let lists = this.data.navLists.map(i => {
      i.class = i.value === this.properties.active ? 'active' : ''
      return i
    })
    this.setData({
      navLists: lists
    })
  }
})
