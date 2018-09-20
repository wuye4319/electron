/**
 * 对话框组件
 * @author: MG
 * **/
import './src/Dialog.less';
const {util} = window.supervar;
const {PropTypes} = window.React;

const themeMap = {
    primary : 'Dialog-theme1',
    warning : 'Dialog-theme2',
    danger : 'Dialog-theme3'
};
const sizeMap = {
    sm : 'Dialog-size-sm',
    md : 'Dialog-size-md',
    lg : 'Dialog-size-lg'
};

const defaultProps = {
    show: false,
    title: '',
    noScroll: true,
    noHeader : false,
    noCross : false,
    onCancel: () => {},
    onConfirm: () => {}
};

const propTypes = {
    title: PropTypes.string,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
};

class Button extends React.Component{
    constructor(props){
        super();
    }
    render(){
        let link = this.props.link;

        return link && link.href ?
            <a href={link.href} target={link.target || '_self'} {...this.props}>{this.props.children}</a>
            :
            <button {...this.props}>{this.props.children}</button>
    }
}

class Dialog extends React.Component{
    constructor(props){
        super();
        this.state = {
            show : props.show,
            disabledButton : false
        };
    }
    // componentWillReceiveProps(props){
    //     this.setState({show:props.show});
    //     if(props.show && this.props.noScroll){
    //         document.body.style.overflowY = "hidden";
    //     }
    // }
    refresh(){
        let body = [];
        let footer = [];
        if(this.props.children && this.props.children.length){
            this.props.children.forEach((item)=>{
                item.ref === 'footer' ? footer.push(item) : body.push(item);
            });
        }
        return {
            body : body.length > 0 ? body : this.props.children,
            footer : footer.length > 0 ? footer : null
        }
    }
    open(){
        this.setState({show:true});
        if(this.props.noScroll){
            document.body.style.overflowY = "hidden";
        }
    }
    close(){
        this.setState({show:false});
        if(this.props.noScroll){
            document.body.style.overflowY = "auto";
        }
    }
    handleEnableButton(){
        this.setState({disabledButton:false});
    }
    handleButtonClick(event){
        let target = event.currentTarget;
        let type = target.getAttribute('type');
        if(type){
            let name = 'on' + type.substring(0,1).toUpperCase() + type.substring(1);
            if(name === 'onConfirm' && !this.props['onConfirm'] && this.props['onCancel']){
                /** 没有onConfirm，但是有onCancel时， 用onCancel代替onConfirm**/
                name = 'onCancel';
            }
            if(typeof this.props[name] === 'function'){
                let res = this.props[name]();
                if(res === false){
                    /** 返回false不关闭对话框 **/
                    return
                }else if(util.getConstructorName(res) === "Promise"){
                    /** 如果事件函数返回的是promise对象，则开始按钮的禁用流程，resolve关闭对话框，reject不关闭 **/
                    this.setState({disabledButton:true});
                    res.then(()=>{
                        this.handleEnableButton();
                        this.close();
                    },()=>{
                        this.handleEnableButton();
                    })
                }else{
                    this.close();
                }
            }else{
                this.close();
            }

        }
    }
    render(){
        let content = this.refresh();
        let disabledButton = this.props.disabledButton !== undefined ? this.props.disabledButton : this.state.disabledButton;
        let className = (this.props.class || '') + ' ' + (themeMap[this.props.type] || '') + ' ' + (sizeMap[this.props.size] || '');

        return (
            <div className="Dialog-mask" style={{display: this.state.show ? 'block' : 'none'}}>
                <div className={`Dialog ${className}` + (disabledButton ? ' disabled' : '')} style={this.props.style}>
                    {this.props.noHeader === true ?
                        ""
                        :
                        <header>
                            <h3>{this.props.title}</h3>
                            {this.props.noCross === true ?
                                ""
                                :
                                <button disabled={disabledButton} className="Dialog-close" type="cancel" onClick={this.handleButtonClick.bind(this)}></button>
                            }
                        </header>
                    }
                    <div className="Dialog-body">
                        {content.body}
                    </div>
                    {(()=>{
                        if(content.footer){
                            return <footer>{content.footer}</footer>
                        }else{
                            return util.getConstructorName(this.props.buttons) === 'Array' ?
                                <footer>
                                    {this.props.buttons.map(item=>{
                                        if(item === 'cancel'){
                                            return <button disabled={disabledButton} className="Dialog-cancel" type="cancel" onClick={this.handleButtonClick.bind(this)}>{this.props.lang === 'en' ? 'Cancel' : '取 消'}</button>
                                        }else if(item === 'confirm'){
                                            return <button disabled={disabledButton} type="confirm" onClick={this.handleButtonClick.bind(this)}>{this.props.lang === 'en' ? 'Confirm' : '确 定'}</button>
                                        }else if(util.getConstructorName(item) === 'Object'){
                                            return <Button disabled={disabledButton} type={item.type} onClick={this.handleButtonClick.bind(this)} className={(item.type === 'cancel' ? 'Dialog-cancel' : '') + ' button'} link={item.link}>{item.name}</Button>
                                        }
                                    })}
                                </footer>
                                :
                                ''
                        }
                    })()}

                </div>
            </div>

        )
    }
}

Dialog.defaultProps = defaultProps;
Dialog.propTypes = propTypes;

export default Dialog;