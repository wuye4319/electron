/**
 * Author: Code Lai （赖传峰）
 * Email: codelai@staritgp.com
 * Desc:
 */
const { Component, PropTypes }=window.React;

export default class DefaultImg extends Component {
  static version = '1.0.0';

  static propTypes = {
    defaultImg: PropTypes.string,
    onLoad: PropTypes.func,
    size: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    circle: PropTypes.bool,
  };

  static defaultProps = {
    // img/orion/default_gray_80.png,
    defaultImg: 'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAAflBMVEUAAADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMwonIReAAAAKXRSTlMA0/kc67MD4WstpSesmYd4D9qEUUU9IxMGxXEYCfC9kTbMoYx/WPNh46AnziUAAAFiSURBVFjD7dDZbqswFIXhZWPADGGeSkgg81nv/4LHtE3vSHNbaX83S8bSL2EIIYQQQgjxdzUnTZoOL/Q53pfof3M2L3jFV3if5Q2rvgtQdAOwbyKsoibBqqsLX3mfB89z1946brf+qWZpPbcZPeSMYDWZThhSuh1Q+GTra/cxHqAU8BHirHtMxt8IBjHJj+UZbHmsL7ygovUeusKZ/m3vc5eMzJ/BliMsW2yJKkUzfQdnFoAfojykaWoUzH1yZxMAR/UMQpVDecILgc8oY+KCXawDIDYIw51zwUEBSD+DpQu5oAIsd7zhhf2J/YPjcNRTzGuw6DPO9wXJLfgKPjgnljNSnXiHI1DcWQbY0Bk6FYrQzQUxqal6eCENTeKCP+9coNXutgGwo8WWfJdl1xZAP1Y1EIfLWA8ACpvZPVA3WLVjHbiJrtcIjm8mvMcF8buIFd5VNfhdfuohhBBCCCHEH/YfL4ob72lBqHgAAAAASUVORK5CYII=',
    onLoad: () => {},
    size: 80,
    style: {},
    circle: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      border: 'none',
      background: `url("${props.defaultImg}") no-repeat`,
      opacity: 0,
    };
  }

  loadHandler = () => {
    this.setState({
      background: 'none',
      opacity: 1,
    });
    this.props.onLoad();
  };

  render() {
    const { onLoad, defaultImg, size, style, className, circle, ...rest }=this.props;
    const wrapStyle = {
      height: size,
      width: size,
      display: 'inline-block',
      verticalAlign: 'top',
      border: '1px solid #eee',
      ...style,
      overflow: 'hidden',
      background: this.state.background,
      backgroundSize: 'contain',
      borderRadius: circle ? '50%' : 0,
    };
    const imgStyle = {
      opacity: this.state.opacity,
      borderRadius: circle ? '50%' : 0,
    };
    return (
      <div
        style={wrapStyle}
        className={className}
      >
        <img
          {...rest}
          height="100%"
          width="100%"
          style={imgStyle}
          onLoad={this.loadHandler}
        />
      </div>
    );
  }
}