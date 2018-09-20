/**
 * 添加、修改地址话框组件
 * author: MG
 * props:
 *   lang  <String> 语言：cn|en
 * **/
const {util} = window.supervar;
import './src/AddressDialog.less';
import Dialog from '../Dialog/Dialog';

class AddressDialog extends React.Component{
    constructor(){
        super();
    }

    render(){
        return (
            <Dialog
                title="AddressDialog"
            >AddressDialog</Dialog>

        )
    }
}

export default AddressDialog;