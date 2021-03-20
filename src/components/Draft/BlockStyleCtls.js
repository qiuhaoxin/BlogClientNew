import React from 'react';
import Styles from './BlockStyleCtls.less';

const blockStyleList=[
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
]
class BlockStyleCtls extends React.PureComponent{
    render(){
        const {editorState,onToggle}=this.props;
        const selection=editorState.getSelection();
        const blockType=editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        return <div className={Styles.wrapper}>
            {
                blockStyleList.map(item=><span 
                    className={`${Styles['block_item']} ${Styles[blockType==item.style ? 'active' : null]}`} 
                    onClick={()=>onToggle(item.style)}  
                    key={item.label}>{item.label}</span>)
            }
        </div>
    }
}

export default BlockStyleCtls;