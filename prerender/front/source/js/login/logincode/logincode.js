import './logincode.less'

/* your logic code */
class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      // machinelist: [{'p1': '120.79.34.227'}, {'p2': '120.79.160.242'}, {'p4': '119.23.228.230'}],
      browser: 0,
      img: 'loading.gif'
    }
  }

  componentWillMount () {
    document.getElementById('container').style.opacity = 1

    let apiurl = 'http://localhost:8080/logincode/self/' + this.state.browser
    fetch(apiurl).then((res) => {
      return res.text()
    }).then((res) => {
      this.setState({img: res})
    })
  }

  render () {
    let rand = Math.ceil(Math.random() * 1000000000)
    return (
      <div>
        <img src={'/source/img/warmachine/codeimg/' + this.state.img + '?' + rand}/>
        <p><a href={'http://localhost:8080/warmachine/loginstatus/' + this.state.browser}>click to check login status</a></p>
      </div>
    )
  }
}

// const Wrap = window.supervar.Wrap
ReactDOM.render(
  <Content/>,
  document.getElementById('container')
)