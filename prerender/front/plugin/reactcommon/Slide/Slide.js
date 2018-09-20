/* react common plugin
*  author : nero 
*/

import './Slide.less';

//Slide
class Slide extends React.Component{
    render(){
        return(
            <div className={this.props.className || Slide.init.className}>
                <SlideCont children={this.props.children} scrollwidth={this.props.scrollwidth}></SlideCont>
            </div>
        )
    }
}

class SlideCont extends React.Component{
    componentDidMount(){
        this.myruntimer();
    }
    constructor(props) {
        super(props);
        this.state = {type:["curr","",""],currimg:1,activetimer:false};
        this.timer=null;
        this.stop();
    }
    stop(){
        clearInterval(this.timer);
        this.state.activetimer=false;
    }
    myruntimer(){
        var that=this;
        (function getseam() {
            that.timer=setTimeout(getseam,4000);
            if(that.state.activetimer){
                that.setState({currimg:that.state.currimg<that.props.children.length?that.state.currimg+=1:that.state.currimg=1});
                //seamless
                that.seamless();
                //update index type
                that.changeindex(that.state.currimg-1);
            }
            that.state.activetimer=true;
        })();
    }
    seamless(){
        var myitem=this.refs["slideitem"];
        var isfirst=myitem?myitem.getAttribute("data-first")!="0":false;
        if(this.state.currimg>1 && isfirst){
            var node=myitem.childNodes[this.props.children.length-1].cloneNode(true);
            myitem.appendChild(node);
            myitem.setAttribute("data-first",0);
            var newitem=myitem.childNodes[this.props.children.length];
            var width=this.props.scrollwidth;
            newitem.style.position="absolute";
            newitem.style.left=-width+"px";
            var that=this;
            myitem.addEventListener("transitionend",function () {
                if(that.state.currimg==that.props.children.length && Slide.init.seamless){
                    myitem.style.transition="none";
                    myitem.style.left=width+"px";
                }
            })
        }
        myitem?myitem.style.transition="left 0.5s ease-in":"";
    }
    slide(turn,e){
        e.preventDefault();
        if(turn=="right"){
            this.setState({currimg:this.state.currimg<this.props.children.length?this.state.currimg+=1:this.state.currimg=1});
        }else if(turn=="left"){
            this.setState({currimg:this.state.currimg>1?this.state.currimg-=1:this.state.currimg=this.props.children.length});
        }
        this.changeindex(this.state.currimg-1);
    }
    changeindex(index){
        this.state.type=[];
        this.state.type[index]="curr";
        this.setState({type:this.state.type});
    }
    index(index){
        if(this.state.currimg>index){
            this.setState({currimg:this.state.currimg=index+1});
        }else{
            this.setState({currimg:this.state.currimg=index+1});
        }
        this.changeindex(index);
    }
    render() {
        var that=this;
        var scrollwidth=this.props.scrollwidth;
        return (
            <div className="slidebox">
                <div className="slideitem" ref="slideitem" data-first="1" style={{
                    left: -(this.state.currimg - 1) * scrollwidth,
                    width: scrollwidth * this.props.children.length
                }} onMouseOver={this.stop.bind(this)} onMouseLeave={this.myruntimer.bind(this)}>
                    {this.props.children}
                </div>
                <div className="buttbox">
                    <div className="turn">
                        <a href="#" className="left" onClick={this.slide.bind(this, 'left')}></a>
                        <a href="#" className="right" onClick={this.slide.bind(this, 'right')}></a>
                    </div>
                    <div className="index">
                        {this.props.children.map(function (value, key) {
                            return <span className={that.state.type[key]}
                                         onClick={that.index.bind(that, key)}>{key + 1}</span>
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

// init
Slide.init = {
    className:"slide",//class
    start:"left",//default direction
    seamless:true,//seamless
};

// check
Slide.propTypes={
    className:React.PropTypes.string
};

module.exports=Slide;

//<Slide className="slide" />