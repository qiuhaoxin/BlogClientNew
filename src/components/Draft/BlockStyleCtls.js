import React from 'react';
import Styles from './BlockStyleCtls.less';
import Normal from './Controlls/Normal';
import Heading from './Controlls/Headings';
import FontSize from './Controlls/FontSize';
const blockStyleList=[
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
];
const lineHeightList=[
    {label:''}
]
class BlockStyleCtls extends React.PureComponent{
    render(){
        const {editorState,onToggle}=this.props;
        const selection=editorState.getSelection();
        const blockType=editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        return <div className={Styles.wrapper}>
            <Normal showText='常规'>
                <Heading onToggle={onToggle}/>
            </Normal>
            <Normal showText="字号">
                <FontSize onToggle={onToggle}></FontSize>
            </Normal>
            <span onClick={()=>onToggle('blockquote')} style={{paddingLeft:20}}>
                <i className="icon-quote"></i>
            </span>
            <span onClick={()=>onToggle('code-block')} style={{paddingLeft:20}}>
                <i className="icon-code"></i>
            </span>
            <span onClick={()=>onToggle('unordered-list-item')} style={{paddingLeft:20}}>
                <i className="icon-ul"></i>
            </span>
            <span onClick={()=>onToggle('ordered-list-item')} style={{paddingLeft:20}}>
                <i className="icon-ol"></i>
            </span>
            {/* {
                blockStyleList.map(item=><span 
                    className={`${Styles['block_item']} ${Styles[blockType==item.style ? 'active' : null]}`} 
                    onClick={()=>onToggle(item.style)}  
                    key={item.label}>{item.label}</span>)
            } */}
        </div>
    }
}

export default BlockStyleCtls;