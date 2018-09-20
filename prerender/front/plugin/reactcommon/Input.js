/* react common plugin
*  author : nero 
*/

//input
var Input=React.createClass({
  componentWillUnmount:function(){
    console.log("componentWillUnmount");
  },
  getfocus:function(){
    this.refs.myinput.getDOMNode().remove();
  },
  render:function(){
    return (
      <div>
      <h5 onClick={this.getfocus}>test</h5>
      <input className={this.props.className} value={this.props.value} onChange={this.getfocus} ref={this.props.myref} type={this.props.type} name={this.props.name} />
      </div>
    )
  }
})

module.exports=Input;

//<Input name="123" value="123123" />