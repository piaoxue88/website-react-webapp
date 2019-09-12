import React,{Component,Fragment} from 'react'
import {connect} from 'react-redux'
import { getFanAxios} from "./store/actionCreator";
import {getToken} from "../../utils/utils";
import {ActivityIndicator, Icon, NavBar, WingBlank,Button} from "antd-mobile";

import {HashRouter, NavLink} from "react-router-dom";

class MyForum extends Component{
    constructor(props) {
        super(props);

        this.state = {
            isShow:true,
        };
    }
    componentDidMount() {
        this.props.getInit()
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            isShow:false,
        });

    }

    render() {
        const {list} = this.props
        return(
            <Fragment>
                <WingBlank>
                    <ActivityIndicator toast text="正在加载" animating={this.state.isShow}  />
                </WingBlank>
                <div>
                    <NavBar
                        mode="dark"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.goBack()}
                    >我的粉丝</NavBar>


                </div>
                <div className='fan'>
                    {list.results?list.results.map(item=>{
                        return(
                            <div key={item.id} className='fan-main'>
                                <div><img src={item.fan.user_imag?item.fan.user_imag:item.fan.user_image?item.fan.user_image:'https://www.fengjinqi.com/static/img/pc-icon.png'} alt=""/></div>
                                <div className='fan-main-user'>{item.fan.username}</div>
                                <div>{item.access?<Button type='primary'inline size="small" >已关注</Button>:<Button type='primary'inline size="small" >关注</Button>}</div>

                            </div>
                        )
                    }):''}
                </div>

            </Fragment>
        )
    }
}
const mapState = (state)=>({
    list:state.my.myFan,
})
const mapDispatch =(dispatch)=>({
    getInit() {
        dispatch(getFanAxios(getToken()))
    },
})
export default connect(mapState,mapDispatch)(MyForum)