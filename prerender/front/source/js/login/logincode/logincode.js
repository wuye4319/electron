import './logincode.less'

/* your logic code */
class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      // machinelist: [{'p1': '120.79.34.227'}, {'p2': '120.79.160.242'}, {'p4': '119.23.228.230'}],
      browser: 0,
      img: 'loading.gif',
      loginacc: false,
      accid: 1
    }
  }

  componentWillMount () {
    document.getElementById('container').style.opacity = 1

    let apiurl = 'http://localhost:8080/logincode/self/' + this.state.browser
    fetch(apiurl).then((res) => {
      return res.text()
    }).then((res) => {
      console.log(res)
      this.setState({img: res})
    })
  }

  componentDidMount () {
    this.getlogin()
  }

  getlogin () {
    let apiurl = 'http://localhost:8080/apidata/machine/'
    fetch(apiurl).then((res) => {
      return res.text()
    }).then((res) => {
      res = JSON.parse(res)
      let tempacc = res.browser[0].loginacc
      if (tempacc) {
        this.state.loginacc = tempacc
        this.setState({loginacc: this.state.loginacc})
      } else {
        let self = this
        setTimeout(function () {
          self.getlogin()
        }, 1000)
      }
    })
  }

  getaccid (e) {
    this.setState({accid: e.target.value})
    console.log(e.target.value)
  }

  render () {
    let rand = Math.ceil(Math.random() * 1000000000)
    return (
      <div className='order'>
        <img src={this.state.loginacc ? '/logo.png' : '/source/img/warmachine/codeimg/' + this.state.img + '?' + rand}/>
        <p>{this.state.loginacc ? '登录成功：' + this.state.loginacc + '，欢迎使用' : '请扫描上方二维码登录淘宝账号！'}</p>
        <p>请填写你的采购账号ID：<input type="text" defaultValue={1} onChange={(e) => {this.getaccid(e)}}/></p>
        {!this.state.loginacc || <a href={'/order/?' + this.state.accid}>开始自动购买</a>}
      </div>
    )
  }
}

// const Wrap = window.supervar.Wrap
ReactDOM.render(
  <Content/>,
  document.getElementById('container')
)