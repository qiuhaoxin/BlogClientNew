import React,{useState} from 'react';
import Styles from './lineEditor.less';
import PairIcon from './PairIcon';
import LinkInput from './LinkInput';
import {insertText,toggleSelectionLink,isSelectionCollapsed,getSelectionEntityData} from '../../../utils/EidtorUtils';
const initLinkArr=[
    {iconName:'icon-link',iconId:1,iconType:'link',disabled:false,tipText:'链接'},
    {iconName:'icon-cancel_link',iconId:2,iconType:'unlink',disabled:true,tipText:'取消链接'}
]

class LinkEditor extends React.Component{
    constructor(props){
        super(props);
        this.state={
            linkArr:initLinkArr,
            visible:false,
        }
        this.handleClick=this._handleClick.bind(this);
        this.handleCancelLink=this._handleCancelLink.bind(this);
        this.handleAddLink=this._handleAddLink.bind(this);
        this.handleLinkInputVisible=this._handleLinkInputVisible.bind(this);
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {href}=getSelectionEntityData(nextProps.editorState,'LINK');
        if(href){
            this.setState({
                linkArr:[
                    {iconName:'icon-link',iconId:1,iconType:'link',disabled:false},
                    {iconName:'icon-cancel_link',iconId:2,iconType:'unlink',disabled:false}
                ]
            })
        }else{
            this.setState({
                linkArr:initLinkArr
            })
        }

    }
    _handleClick(iconType){
        if(iconType=='link'){
           this.setState({
               visible:true,
           })
        }else if(iconType=='unlink'){

        }
    }
    _handleCancelLink(linkOption,callback){
        const {href,target}=linkOption;
    }
    _dealLink(linkOption,callback){
        const {href,target,text,textSelected}=linkOption;
        const {onToggle,editorState}=this.props;
        if(textSelected){
            if(href){
                onToggle && onToggle(
                    toggleSelectionLink(editorState,href,target),
                    callback,
                );
            }else{
                onToggle && onToggle(
                    toggleSelectionLink(
                        editorState,
                        false,
                    ),
                    callback,
                )
            }

        }else{
           onToggle && onToggle(
               insertText(editorState,text || '',null,{
                   type:'LINK',
                   data:{
                       href,
                       target,
                   }
               }),
               callback,
           );
        }
    }
    _handleAddLink(linkOption,callback){
        console.log("_deal add link!!");
        this.setState({
            visible:false,
        },()=>{
            this._dealLink(linkOption,callback);
        })

    }
    _handleLinkInputVisible(visible){
        this.setState({
            visible,
        })
    }
    render(){
        const {linkArr,visible}=this.state;
        const {editorState}=this.props;
        return <div>
            <PairIcon iconArr={linkArr} onToggleClick={this.handleClick} iconStyle={{fontSize:18}} />
            <LinkInput onAddLink={this.handleAddLink} editorState={editorState} 
            onRemoveLink={this.handleCancelLink} onVisible={this.handleLinkInputVisible} visible={visible}/>
        </div>
    }
}
export default LinkEditor;