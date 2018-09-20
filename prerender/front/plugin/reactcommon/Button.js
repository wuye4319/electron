/* react common plugin
*  author : nero 
*/

//button
var Button = React.createClass({
    getInitialState:function(){
      return {name:"button1111"};
    },
    handlelClick:function(){
      this.setState({name:!this.state.name});
      console.log(this.refs.myinput);
    },
    render: function() {
      var name=this.state.name;
      return <button className={this.props.className || Button.init.className} aria-my={this.props.my} disabled={this.props.disabled || Button.init.disabled} type={this.props.type} onClick={this.handlelClick}>{name || Button.init.children}</button>;
    }
});
//button init
Button.init = {
  children:"this is a button",
  className: "button",
  disabled:false,
};
//button check
Button.propTypes={
  className:React.PropTypes.string
};

module.exports=Button;

//<Button name="John3" my="asdf" className="test3" />