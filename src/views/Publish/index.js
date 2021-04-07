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
import LabelInput from '../../components/LabelInput';

const testList=[
    {fid:1,fname:'qiuhaoxin'}
]

function Footer(props){
    return <div className={Styles.footer}>
        <span className={Styles.save} onClick={props.onSave}>保存</span>
        <span className={Styles.cancel} onClick={props.onCancel}>取消</span>
    </div>
}
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
            subId:0,
        }
        this.labelArr=[];
        this.labelInputRef=React.createRef();
        this.blogEditor=React.createRef();
        this.handleFocus=this._handleFocus.bind(this);
        this.handleDeletePic=this._handleDeletePic.bind(this);
        this.handleInputChange=this._handleInputChange.bind(this);
        this.handlePublish=this._handlePublish.bind(this);
        this.handleCloseDialog=this._handleCloseDialog.bind(this);
        this.handleLabelChecked=this._handleLabelChecked.bind(this);
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

        if(this._verify()){
            this.setState({
                dialogVisible:true,
            })
        }
    }
    handleSave=()=>{
        const {dispatch}=this.props;
        const {title,imgSrc,bgImg,subId}=this.state;
        console.log("bgImg is ",bgImg);
        const _this=this;
        let labelInputList=null;
        if(this.labelInputRef){
            labelInputList=this.labelInputRef.current.getLabelData();
            labelInputList=labelInputList.map(item=>item.name);

            console.log("labelInputList is ",labelInputList);
        }
        console.log("labelArr is ",this.labelArr);
        if(this.blogEditor){
            const editor=this.blogEditor.current.getJsonFromEditor();
            dispatch({
                type:Actions.PUBLISH,
                payload:{
                    title,
                    body:JSON.stringify(editor),
                    subId,
                    userId:1,
                    bgImg,
                    labelList:labelInputList
                },
                callback:function(res){
                    const {errcode,message}=res;
                    if(errcode==1){
                        _this.setState({
                            dialogVisible:false,
                        })
                    }
                }
            })
        }
    }
    handleCancel=()=>{
        this.setState({
            dialogVisible:false,
        })
    }
    _handleLabelChecked(labelKey){
        this.setState({
            subId:labelKey,
        })
        // const idx=this.labelArr.findIndex(item=>item==labelKey);
        // if(idx > -1){
        //     this.labelArr.splice(idx,1);
        // }else{
        //     this.labelArr.push(labelKey);
        // }
    }
    render(){
        const {rect,dialogVisible,subId}=this.state;
        const {domainList}=this.props;
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
            <Dialog footer={<Footer onSave={this.handleSave} onCancel={this.handleCancel}></Footer>} onClose={this.handleCloseDialog} 
            animation="zoom" visible={dialogVisible} title="发布文章">
                  <p style={{color:'#d9d9d9',marginBottom:20}}>为了快速检索到您的文章，请配置主题和标签</p>
                  <p style={{margin:10}}>请选择主题：</p>
                  <div className={Styles.labelList}>
                      {
                          domainList.map(item=><Label mode={1} labelKey={item.fid} labelText={item.fname} 
                            className={Styles.label} checked={item.fid==subId} key={item.fid} onChecked={this.handleLabelChecked}></Label>)
                      }
                  </div>
                  <p style={{margin:10}}>请填写文章标签(可多个，按enter)</p>
                  <LabelInput ref={this.labelInputRef}></LabelInput>
            </Dialog>
        </div>
    }
}
export default connect((state)=>{
    return {
        domainList:state.Global.domainList,
    }
})(Publish);