# Dialog 对话框组件


根据web设计规范实现的对话框组件。包含背景遮罩，和框体部分。框体包含标题，关闭按钮，底部按钮。内容部分需要自定义。有三种配色和三个尺寸。

---------------

## 属性 props

### class
> 类型：String
> 说明：为对话框添加样式类名，用于样式覆盖

### style
> 类型：String
> 说明：为对话框添加行内样式，如宽度width

### lang
> 类型：String
> 取值：en | cn  默认cn
> 说明：语言，用于内置按钮上的文字语言

### type
> 类型：String
> 取值：primary | warning | danger  默认primary
> 说明：UI着色，默认蓝色，warning橙色，danger红色

### size
> 类型：String
> 取值：sm | md | lg  默认md
> 说明：框体宽度

### noScroll
> 类型：Boolean
> 说明：显示对话框时是否禁止页面滚动条滚动。默认为true

### show
> 类型：Boolean
> 说明：控制对话框显示。点击对话框按钮时对话框会自动隐藏，因此无需手动控制对话框隐藏。（点击事件返回false,或promise触发reject可取消自动隐藏）

### title
> 类型：String
> 说明：对话框标题

### buttons
> 类型：Array
> 说明：底部按钮配置。
> 预设了两个按钮'cancel'取消按钮，‘confirm'确认按钮，使用方式:['cancel','confirm']
> 自定义按钮：
	{
		name : <String> 显示在按钮上的文字
		type : <String> 用于调用事件，点击按钮时调用on+type（type的第一个字母会被改成大写）为名的函数
	}

### disabledButton
> 类型：Boolean
> 说明：按钮的禁用状态，替换Dialog组件自身的this.state.disabledButton（当自定义底部的时候有用）

### onConfirm
> 类型：Function
> 说明：内置的确认按钮绑定的函数。没有传入此参数的时候绑定onCancel

### onCancel
> 类型：Function
> 说明：内置的取消按钮，关闭按钮绑定的函数

### 其他以on开头的小驼峰命名属性
> 类型：Function
> 说明：用于按钮的自定义事件（对应按钮的type属性，如：按钮的type为cancel，那么此按钮click事件绑定onCancel函数）

-------------


## Q&A

### 如何引入？
```
import Dialog from '../../../../../plugin/reactcommon/Dialog/Dialog';
```

### 如何自定义内容？
```
// 把内容写在Dialog内部。这个例子省略了其他属性。
<Dialog>
	<p>这是我的自定义内容。</p>
</Dialog>
```

### 我的对话框底部有除了‘取消’和‘确定’之外的按钮怎么办？
```
// 配置buttons属性。这个例子会有‘取消’和‘自定义按钮abc’两个按钮。
<Dialog
	buttons={
		[
			'cancel',
			{
				name : '自定义按钮abc',
				type : 'abc'
			}
		]
	}
	onCancel={...关闭对话框函数}
	onAbc={...自定义按钮点击时调用的函数}
>
</Dialog>
```

### 我的对话框底部除了有按钮，还有一些其他乱七八糟的东西怎么办？
```
// 这时需要完全自定义底部。只要给相应元素添加ref="footer"属性就行了，并且不用传buttons属性。(对话框按钮点击时发起了请求，需要禁用按钮时，对话框可能需要disabledButton属性)
<Dialog>
	<p>这是我的自定义内容。</p>
	<div ref="footer">
		<button>按钮1</button>
		<button>按钮2</button>
	</div>
</Dialog>
```

### 我的设计稿上对话框里面有一个大大的提示图标（感叹号，禁止符号），如何实现？
```
// 给包含图标的元素添加className="Dialog-icon-box"
<Dialog>
	<div className="Dialog-icon-box">这个class会在左侧显示一个icon。默认是蓝色感叹号，type:warning是黄色感叹号，type:danger是红色禁止号</p>
</Dialog>
```

-------------


## 示例

```
this.refs.dialog.open();
...
<Dialog
       title="对话框标题"
       type="warning"
       ref="dialog"
       lang={lang}
       onCancel={this.hideDialog.bind(this)}
       onConfirm={this.confirmDialog.bind(this)}
       buttons={['cancel',{name:'自定义按钮文字',type:'confirm'}]}
   >
       <p className="Dialog-icon-box">这里有一个大大的icon</p>
       <p>自定义内容</p>
   </Dialog>
```