import React from 'react';
import Styles from './index.less';
import BlogEditor from '../../components/Draft/Editor';
import RcUpload from 'rc-upload';
class Publish extends React.Component{
    constructor(props){
        super(props);
        this.state={
            imgSrc:'',
        }
    }
    getUploadProps(){ 
        return {
            access:'image/*',
            showUploadList:false,
            action:'/api/blog/upload',
            headers:{
                contentType: "multipart/form-data"
            },
            method:'POST',
            onChange:(info)=>{
                if (info.file.status === "done") {
                    const { response:{imgPath} } = info.file;
                    console.log("response is ",imgPath);
                    // updateProfile(response.payload.file);
                    if(imgPath){
                        this.setState((preState)=>({
                            editorState:ContentUtils.insertMedias(preState.editorState,[
                                {
                                    type: 'IMAGE',
                                    url: imgPath, // imgUrl 为上传成功后 后台返回的url地址
                                  }
                            ])
                        }))
                    }
                } else if (info.file.status === "error") {
                    // message.error("Error uploading the file");
                    // props.endLoad();
                }
            },
            beforeUpload:this.beforeUpload,  
    
        }
    }
    render(){
        const _this=this;
        const uploadProps = {
            action:'/api/blog/upload',
            method:'POST',
            access:'image/*',
            multiple: true,
            onStart(file) {
              console.log('onStart', file, file.name);
            },
            onSuccess(ret) {
                const {imgPath,errcode}=ret;
                console.log("errocde ksdfj si ",errcode);
                if(errcode==1){
                    console.log("sdfsdfsdf");
                     _this.setState({
                         imgSrc:imgPath
                     })
                }
              console.log('onSuccess', ret);
            },
            onError(err) {
              console.log('onError', err);
            },
          };
        return <div className={Styles.wrapper}>
            <div className={Styles.upload}>
                <RcUpload style={{width:'100%',height:'50px',outline:'none'}} {...uploadProps}>
                    <img style={{display:this.state.imgSrc ? 'block' : 'none',width:'320px',height:'80px'}} src={this.state.imgSrc}/>
                    <span className={Styles.photo}>
                       <i className={'icon-photo' } style={{fontSize:40}}></i>
                    </span>
                    
                </RcUpload>
            </div>
            <div className={Styles.topic}>
                <input placeholder="请输入标题，最多100字"/>
            </div>
            <div className={Styles.editor}>
              <BlogEditor></BlogEditor>
            </div>
        </div>
    }
}
export default Publish;