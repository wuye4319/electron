/**
 * Paging分页组件
 * author: MG
 * props:
 *   style            : <object> 应用到Paging组件的样式(默认{marginTop:"30px"})
 *   language         : <string> 英文版:en;中文版:cn(默认)
 *   totalPage        : <number> 总页数
 *   totalRow         : <number> 总条数
 *   pageNo           : <Number> 当前页
 *   size             : <number> 尺寸，传入'sm'显示小尺寸，默认大尺寸
 *   handleChangePage : <function> 分页时调用,传入目标页码(number)
 *
 * 注意:
 *   传入的handleChangePage函数必须返回一个Promise对象,
 *   调用handleChangePage时,分页组件会被禁用,当promise触发resolve或reject时解除禁用,
 *   如果分页成功(resolve),可给resolve传入一个数字,滚动条会滚动到数字位置(scrollTop)
 *   例如:
 *   handleChangePage(n){
 *       return new Promise((resolve,reject) => {
 *           util.fetch('url',{page:n}).then(data=>{
 *               if(data.state === 0){
 *                   resolve(0);
 *               }else{
 *                   reject();
 *               }
 *           }).catch(err=>{
 *               reject();
 *           });
 *       });
 *   }
 */

import './src/Paging.less';

const {util} = window.supervar;

let modelCN = {
    prev : '上一页',
    next : '下一页',
    page : ['共','页，到第','页'],
    confirm : '确认'
};

let modelEN = {
    prev : 'Previous',
    next : 'Next',
    page : ['Total ',' page, to page ',''],
    confirm : 'Go'
};

class Paging extends React.Component{
    constructor(){
        super();
        this.state ={
            loading : false, //调用handleChangePage时被设置为true(组件被禁用),handleChangePage返回的Promise返回结果时被设置为false(组件解除禁用)
            inputPage : '' //页码输入框内的值
        };

    }

    /** 设置loading, 并且当loading成功时inputPage被设置为''(清空页码输入框)**/
    setLoading(b){
        this.setState((state)=>({
            loading : b,
            inputPage : b ? state.inputPage : ''
        }));
    }

    /** 分页动作,参数n代表跳转到第几页(pageNo) **/
    handleChangePage(n){
        if(n != this.props.pageNo && n != '' && n >= 1 && n <= this.props.totalPage){
            let loading = this.props.handleChangePage(n);
            this.setLoading(true);

            loading.then(data => {
                if(util.getConstructorName(data) === 'Number'){
                    util.setScrollTop(data); //设置滚动条高度
                }
                this.setLoading(false);
            }).catch(err => {
                this.setLoading(false);
            })
        }
    }

    /** 设置inputPage(页码输入框的值)**/
    handleChangeInputPage(event){
        let value = event.target.value.trim();
        if(value !== ''){
            value = parseInt(value);
            if(value > this.props.totalPage) value = this.props.totalPage;
            if(value < 1) value = 1;
            if(isNaN(value)) value = '';
        }

        this.setState(()=>({
            inputPage : value
        }))
    }

    /** 格式化页码按钮组(参考京东分页逻辑) **/
    formatButtonGroup(){
        let buttonGroup = []; //得到的结果是类似[1,2,null,6,7,8,9,10,null]这样的数组,数字表示页码,null表示省略号
        let totalPage = this.props.totalPage;
        let pageNo = this.props.pageNo;

        /** 总页数小于等于5, 把所有页码都渲染出来 **/
        if(totalPage <= 5){
            for(var i=0; i<totalPage; i++){
                buttonGroup.push(i + 1);
            }

        /**
         * 总页数大于5页, 只渲染部分页码:
         *   1.当前页大于等于5页,始终渲染1,2,3页,当前页(pageNo)及左右各2页:
         *      最右的页码小于总页码数,在右边添加省略号
         *      左侧的页码大于4,在左边添加省略号
         *   2.当前页小于5页,渲染前5页,右侧添加省略号
         * **/
        }else{
            buttonGroup = [1,2,3];
            if(pageNo - 3 >= 4) buttonGroup.push(null);
            for(let i=0; i<5; i++){
                let cachePage = pageNo - 2 + i;
                if(cachePage <= totalPage && cachePage > 3) buttonGroup.push(cachePage);
            }
            if(pageNo == 1){
                buttonGroup = buttonGroup.concat([4,5])
            }
            if(pageNo == 2){
                buttonGroup.push(5)
            }

            if(buttonGroup[buttonGroup.length - 1] < totalPage) buttonGroup.push(null);
        }

        return buttonGroup;
    }

    componentWillMount(){
        this.model = this.props.language === 'en' ? modelEN : modelCN;
    }

    render(){
        let buttonGroup = this.formatButtonGroup();
        let pageNo = this.props.pageNo;
        let totalPage = this.props.totalPage;
        let totalRow = this.props.totalRow;

        return (
            <div className={(this.state.loading ? "paging-loading" : "") + (this.props.size === 'sm' ? " Paging-sm" : "") + " Paging"} style={this.props.style}>
                <div className="paging-mask"></div>
                {
                    totalRow !== undefined ?
                        this.props.language === "en" ? <span>total {totalRow||0}</span> : <span>共{totalRow||0}条</span>
                        :
                        ""
                }
                <button className="button-edge button-prev" disabled={pageNo <= 1} onClick={this.handleChangePage.bind(this,pageNo - 1)}>{this.model.prev}</button>
                <ul className="button-group">
                    {buttonGroup.map(page=>{
                        if(page){
                            return <li><button className={page == pageNo ? 'active' : ''} onClick={this.handleChangePage.bind(this,page)}>{page}</button></li>;
                        }else{
                            return <li><span>...</span></li>;
                        }
                    })}
                </ul>
                <button className="button-edge button-next" disabled={pageNo >= totalPage} onClick={this.handleChangePage.bind(this,pageNo + 1)}>{this.model.next}</button>
                <span>{this.model.page[0]}{totalPage}{this.model.page[1]}</span>
                <input type="number" min="1" value={this.state.inputPage} onChange={this.handleChangeInputPage.bind(this)}/>
                <span>{this.model.page[2]}</span>
                <button className="button-confirm" onClick={this.handleChangePage.bind(this,this.state.inputPage)}>{this.model.confirm}</button>
            </div>
        )
    }
}

Paging.defaultProps = {
    style : {marginTop:'30px'},
    language : 'cn',
    totalPage : 0,
    pageNo : 0,
    handleChangePage (){
        return new Promise((resolve,reject)=>{
            reject();
        })
    }
};

export default Paging;