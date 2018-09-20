import './home.less'
import { tmall } from './website/tmall'

// const imgSrc = window.supervar.imgsrc_cn
// const apiUrl = window.supervar.apiURL
// const domain = '//www.' + window.supervar.domain
// const hrefUrl = domain + '/cn/page/'

/* your logic code */
class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      winbox: [
        {
          view: 'view0',
          url: 'https://www.tmall.com/',
          title: ''
        }
      ],
      currwin: 0
    }
  }

  componentWillMount () {
    document.getElementById('container').style.opacity = 1
  }

  componentDidMount () {
    window.addEventListener('online', this.alertOnlineStatus)
    window.addEventListener('offline', this.alertOnlineStatus)
    this.alertOnlineStatus()
    let self = this

    let webview = document.getElementById('view0')
    webview.addEventListener('did-start-loading', this.loadstart)
    webview.addEventListener('did-stop-loading', this.loadstop)
    webview.addEventListener('dom-ready', function () {
      console.log(webview.getURL())
      self.setState(state => {
        state.winbox[0].title = webview.getTitle()
        return state
      })
    })
    webview.addEventListener('did-finish-load', function () {
      if (webview.getURL().indexOf('detail.tmall.com/item.htm') !== -1) {
        console.log(tmall.init)
        let str = tmall.init + ';init()'
        webview.executeJavaScript(str, false, function () {})
      }
    })
    webview.addEventListener('new-window', function (e) {
      webview.loadURL(e.url)
    })
  }

  loadstop () {
    document.title = 'superbuy购物小助手bate版'
  }

  loadstart () {
    document.title = 'superbuy购物小助手bate版 - loading...'
  }

  alertOnlineStatus () {
    console.log(navigator.onLine ? 'online' : 'offline')
  }

  goback () {
    let currid = 'view' + this.state.currwin
    let webview = document.getElementById(currid)
    webview.goBack()
  }

  goforward () {
    let currid = 'view' + this.state.currwin
    let webview = document.getElementById(currid)
    webview.goForward()
  }

  reload () {
    let currid = 'view' + this.state.currwin
    let webview = document.getElementById(currid)
    webview.reload()
  }

  render () {
    return (
      <div>
        <div className='nav'>
          <button onClick={e => {this.goback()}}>后退</button>
          <button onClick={e => {this.goforward()}}>前进</button>
          <button onClick={e => {this.reload()}}>刷新</button>
          <button>+</button>
          <div className="label">
            <ul>
              {
                this.state.winbox.map((data, index) => {
                  return <li key={index}>{data.title || index}</li>
                })
              }
            </ul>
          </div>
        </div>
        <div className="viewbox">
          <ul>
            {
              this.state.winbox.map((data, index) => {
                return (
                  <li key={index}>
                    <webview id={data.view} src={data.url}
                             useragent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36"
                             style={{height: 780 + 'px'}} autosize="on" minwidth="1000" minheight="800">123
                    </webview>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

// const Wrap = window.supervar.Wrap
ReactDOM.render(
  <Content/>,
  document.getElementById('container')
)