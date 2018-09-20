import '<%= myless %>'

const imgSrc = window.supervar.imgsrc_cn
const apiUrl = window.supervar.apiURL
const domain = '//www.' + window.supervar.domain
const hrefUrl = domain + '/cn/page/'

/* your logic code */
class Content extends React.Component {
  componentWillMount () {
    document.getElementById('container').style.opacity = 1
  }

  render () {
    return (
      <div>this is your page content</div>
    )
  }
}

const Wrap = window.supervar.Wrap
ReactDOM.render(
  <Wrap content={Content}/>,
  document.getElementById('container')
)