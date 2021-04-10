import React from 'react';
import Styles from './blogEditor.less';
const prefixCls="blog-editor";
import Editor from './Editor';
import BlockStyleCtls from './BlockStyleCtls';
import LabelAndAction from '../LabelAndAction';
import PropTypes from 'prop-types';
class BlogEditor extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const {mode,onActionClick,labelList}=this.props;
        return <div className={Styles[`${prefixCls}-wrapper`]}>
            <BlockStyleCtls visible={mode==0 ? false : true} 
                editorState={editorState} 
                onToggle={this.toggleBlockTypeBtn} 
                onToggleInlineType={this.toggleInlineTypeBtn} 
                onToggleOtherStyle={this.handleOtherStyles} 
            />
            <div style={{display:mode!=0 ? 'none' : 'block'}}>
                 <LabelAndAction onActionClick={onActionClick} iconArr={[{key:1,iconClass:'icon-editor',iconType:'editor'}]} 
                 labelList={labelList}></LabelAndAction>
            </div>
            <Editor></Editor>
        </div>
    }
}

BlogEditor.PropTypes={
    mode:PropTypes.number.isRequired,
}
BlogEditor.defaultProps={
    mode:0,//预览模式
}
export default BlogEditor;