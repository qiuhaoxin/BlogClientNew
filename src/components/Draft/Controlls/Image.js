import React from 'react';
import Upload from '../Upload';
import TipContent from '../../TipContent';
import Styles from './image.less';
import {toggleAddImage} from '../../../utils/EidtorUtils';
class Image extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tipVisible:false,
        }
        this.handleMouseEnter=this._handleMouseEnter.bind(this);
        this.handleMouseLeave=this._handleMouseLeave.bind(this);
        this.handleAfterUploadImage=this._handleAfterUploadImage.bind(this);
    }
    _handleMouseEnter(){
       this.setState({
           tipVisible:true,
       })
    }         
    _handleMouseLeave(){
       this.setState({
           tipVisible:false,
       })
    }
    _handleAfterUploadImage(info){
        console.log("info is after upload image is ",info);
        const {editorState,onToggle}=this.props;
        const {code,imgPath}=info;
        if(code==0){
            const nextEditorState=toggleAddImage(editorState,{
                imgPath,
            })
            onToggle && onToggle(nextEditorState);
        }
    }
    render(){
        const {tipText}=this.props;
        const {tipVisible}=this.state;
        return <div className={Styles.wrapper} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
           <Upload onCallback={this.handleAfterUploadImage}/>
           <TipContent visible={tipVisible} tipText={tipText}/>
        </div>
    }
}

export default Image;