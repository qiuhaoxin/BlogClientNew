import React from 'react';
import Styles from './index.less';
import BlogEditor from '../../components/Draft/Editor';
import Upload from '../../components/Draft/Upload';
import {connect} from 'react-redux';
import Actions from '../../actions';
import Dialog from 'rc-dialog';
import 'rc-dialog/assets/index.css';
import Select,{Option} from 'rc-select';
import 'rc-select/assets/index.less';
import Label from '../../components/Label';

const testList=[
    {fid:1,fname:'qiuhaoxin'}
]
class Publish extends React.Component{
    constructor(props){
        super(props);
        this.inputRef=React.createRef();
        this.state={
            imgSrc:'',
            rect:{height:1,width:1},
            title:'',//主题
            bgImg:'',//背景图
            dialogVisible:false,
        }
        this.blogEditor=React.createRef();
        this.handleFocus=this._handleFocus.bind(this);
        this.handleDeletePic=this._handleDeletePic.bind(this);
        this.handleInputChange=this._handleInputChange.bind(this);
        this.handlePublish=this._handlePublish.bind(this);
        this.handleCloseDialog=this._handleCloseDialog.bind(this);
    }
    componentDidMount(){
        this._fetchDomainData();
    }
    _fetchDomainData(){
        const {dispatch}=this.props;
        dispatch({
            type:Actions.GET_DOMAIN_LIST,
            payload:{},
            callback:function(res){
                console.log("fetchDomain result is ",res);
            }
        })
    }
    _handleFocus(){
        if(this.inputRef){
            this.inputRef.current.focus();
        }
    }
    handleUpload=({code,imgPath,imgRect,imgName})=>{
        if(code==0){
            this.setState({
                rect:imgRect,
                imgSrc:imgPath,
                bgImg:imgName
            })
        }
    }
    _handleDeletePic(){
        this.setState({
            rect:{width:1,height:1},
            imgSrc:'',
        })
    }
    _handleInputChange(e){
        const inputValue=e.target.value;
        this.setState({
            title:inputValue
        })
    }
    _verify(){
        const {title}=this.state;
        const isEmptyReg=/^\s*$/;
        if(isEmptyReg.test(title)){
            return false;
        }
        return true;
    }
    _handleCloseDialog(){
        this.setState({
            dialogVisible:false
        })
    }
    _handlePublish(){
        const {title,imgSrc,bgImg}=this.state;
        const {dispatch}=this.props;
        if(this._verify()){
            this.setState({
                dialogVisible:true,
            })
        }
        // if(this.blogEditor){
        //     const editor=this.blogEditor.current.getHTMLFromRaw();
        //     console.log("after convert to string is ",JSON.stringify(editor));
        //     dispatch({
        //         type:Actions.PUBLISH,
        //         payload:{
        //             title,
        //             body:JSON.stringify(editor),
        //             domain:1,
        //             userId:1,
        //             bgImg
        //         },
        //         callback:function(res){

        //         }
        //     })
        // }
    }
    render(){
        const {rect,dialogVisible}=this.state;
        const {domainList}=this.props;
        console.log("domainList is ",domainList);
        return <div className={Styles.wrapper}>
            <div className={Styles.row}>
                <span onClick={this.handlePublish}>发表</span>
            </div>
            <div className={Styles.upload} style={{display:rect.width==1 ? 'flex' : 'none'}}>
                <Upload iconSize={'30px'} onCallback={this.handleUpload}/>
            </div>
            <div className={Styles.imgWrapper} style={{display:rect.width!=1 ? 'block' : 'none'}}>
                <img style={{display:this.state.imgSrc ? 'block' : 'none',width:'100%',
                    height:`${680 * rect.height / rect.width}px`}} src={this.state.imgSrc}/>
                <div className={Styles.exact}>
                    <Upload onCallback={this.handleUpload}/>
                    <span>
                        <i className="icon-delete" onClick={this.handleDeletePic}></i>
                    </span>
                </div>
            </div>
            <div className={Styles.topic} onClick={this.handleFocus}>
                <input onChange={this.handleInputChange} ref={this.inputRef} placeholder="请输入标题，最多100字"/>
            </div>
            <div className={Styles.editor}>
              <BlogEditor ref={this.blogEditor}></BlogEditor>
            </div>
            <Dialog onClose={this.handleCloseDialog} animation="zoom" visible={dialogVisible} title="发布文章">
                  <p>为了快速检索到您的文章，请配置主题和标签</p>
                  <label style={{marginTop:40}}>请选择主题：</label>
                  <div className={Styles.labelList}>
                      {
                          domainList.map(item=><Label labelText={item.fname} className={Styles.label} key={item.fid}></Label>)
                      }
                  </div>
                  <label>请填写文章标签(可多个，按enter)</label>
                  <div className={Styles.labels}>
                      <div>
                         
                      </div>
                      <input placeholder="请输入"/>
                  </div>
            </Dialog>
        </div>
    }
}
export default connect((state)=>{
    return {
        domainList:state.Global.domainList,
    }
})(Publish);