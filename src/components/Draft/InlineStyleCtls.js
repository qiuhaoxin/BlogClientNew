import React from 'react';
import Styles from './InlineStyleCtls.less';

var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
  ];
class InlineStyleCtls extends React.Component{
    render(){
        const {onToggle,editorState}=this.props;
        const currentInlineStyle=editorState.getCurrentInlineStyle();
        
        return <div className={Styles.wrapper}>
           {
               INLINE_STYLES.map(item=><span 
                 className={`${Styles['inline_item']} ${Styles[currentInlineStyle.has(item.style) ? 'active':null]}`} key={item.label} 
                 onClick={()=>onToggle(item.style)}>{item.label}</span>)
           }
        </div>
    }
}

export default InlineStyleCtls;
