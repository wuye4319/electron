import './order.less'

/* your logic code */
class Content extends React.Component {
  constructor () {
    super()
    this.state = {
      proname: '测试商品',
      proimg: '/logo_big.png',
      surplus: 0,
      order: 0
    }
  }

  componentWillMount () {
    document.getElementById('container').style.opacity = 1
    setTimeout(() => {
      this.shopping()
    }, 3000)
  }

  shopping () {
    this.setState({order: 0})
    // 请求商品池
    this.getpro()
  }

  updatestate (data, count) {
    console.log(data, count)
    let self = this
    if (count) {
      setTimeout(() => {
        console.log('next order')
        self.shopping()
      }, 5000)
    }

    // 更新订单状态
    let updateorder = 'http://www.test.com/daigou-admin/admin/system/virtualBuypool/updateStatus.html'
    fetch(updateorder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.text()
    }).then((res) => {
      console.log(res)
    })
  }

  myorder (data, count) {
    // 自动购买插件
    let buyorder = 'http://localhost:8080/order/'
    fetch(buyorder, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    }).then((res) => {
      // price less 需要补价，失败
      // data anomaly 数据核对失败，已购买
      return res.json()
    }).then((res) => {
      let mydata = res
      let newdata = {}
      newdata.orderNo = mydata.orderNo
      newdata.itemBarcode = mydata.itemBarcode
      if (mydata.state) {
        newdata.orderStatus = 3
        newdata.orderPrice = parseFloat(mydata.price)
        newdata.orderFreightPrice = parseFloat(mydata.postage.replace(/￥/, ''))
        newdata.thirdPartyOrderNo = mydata.order
        this.setState({order: 3})
      } else if (mydata.cont === 'data anomaly') {
        newdata.orderStatus = 5
        this.setState({order: 5})
      } else {
        newdata.orderStatus = 4
        this.setState({order: 4})
      }
      this.updatestate(newdata, count)
    })
  }

  getpro () {
    let getpro = 'http://www.test.com/daigou-admin/admin/system/virtualBuypool/list.html?purchaserId=1'
    fetch(getpro).then((res) => {
      return res.text()
    }).then((res) => {
      let mydata = JSON.parse(res)
      this.setState({
        proname: mydata.items[0].goodsName || '',
        proimg: mydata.items[0].goodsPic || '',
        surplus: mydata.poolCount
      })
      this.myorder(res, mydata.poolCount)
    })
  }

  render () {
    return (
      <div>
        <div className="product">
          <p>正在购买的商品 : </p>
          <img src={this.state.proimg} width={300} height={300} alt=""/>
          <p>{this.state.proname}</p>
          <p>采购池剩余订单量 ：{this.state.surplus}</p>
          <p className='status'>{this.state.surplus > 0 || '采购池为空，系统进入间歇性休眠状态！'}</p>
          <p>{this.state.order ? (this.state.order === 3 ? '购买成功' : '购买失败') : ''}</p>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Content/>,
  document.getElementById('container')
)
