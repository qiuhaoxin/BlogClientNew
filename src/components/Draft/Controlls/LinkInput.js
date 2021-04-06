import React,{useState,useEffect} from 'react';
import Styles from './linkinput.less';
import {getSelectionText,isSelectionCollapsed,getSelectionEntityData, getSelectionBlockType} from '../../../utils/EidtorUtils'


class InputLink extends React.Component{
    constructor(props){
        super(props);
        this.state={
            href:'',
            text:'',
            textSelected:'',
        }
        
        this.handleInputChange=this._handleInputChange.bind(this);
        this.handleBtnClick=this._handleBtnClick.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {href}=getSelectionEntityData(nextProps.editorState,'LINK');
        const textSelected=!isSelectionCollapsed(this.props.editorState) && getSelectionBlockType(this.props.editorState)!=='atomic';
        let selectedText;
        if(textSelected){
            selectedText=getSelectionText(this.props.editorState);
        }
        this.setState({
            href:href ? href : '',
            text:selectedText,
            textSelected,
        })
    }
    _handleInputChange(e){
        const target=e.target;
        const inputValue=target.value;
        this.setState({
            href:inputValue,
        })
    }
    _handleBtnClick(e){
        const target=e.target;
        const {onVisible,onAddLink}=this.props;
        const {href,text,textSelected}=this.state;
        const dataIdAttr=target.getAttribute('data-id');
        if(dataIdAttr=='cancel'){
            onVisible && onVisible(false);
        }else if(dataIdAttr=='sure'){
            const emptyReg=/^\s*$/;
            const result=emptyReg.test(href);
            if(result){
                console.error("链接不能为空！")
                return;
            }
            onAddLink && onAddLink({
                href,
                target:'_blank',
                text,
                textSelected
            },()=>{
                this.setState({
                    href:'',
                    text:'',
                    textSelected:''
                },()=>{
                })
            });
        }
    }
    render(){
        const {visible}=this.props;
        const {href}=this.state;
        return <div className={Styles.wrapper} 
        style={{transform:visible ? 'scale(1)' : 'scale(0)'}}>
            <div className={Styles.innerWrapper}>
                <input value={href} onChange={this.handleInputChange} placeholder="请输入链接地址" />
            </div>
            <footer onClick={this.handleBtnClick}>
                <button  data-id="cancel" className={Styles.cancel}>取消</button>
                <button data-id="sure" className={Styles.sure}>确定</button>
            </footer>
        </div>
    }
}
export default InputLink;