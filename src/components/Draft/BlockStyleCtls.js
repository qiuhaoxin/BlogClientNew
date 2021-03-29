import React from 'react';
import Styles from './BlockStyleCtls.less';
import Normal from './Controlls/Normal';
import Heading from './Controlls/Headings';
import FontSize from './Controlls/FontSize';
import LineHeight from './Controlls/LineHeight';
import SingleIcon from './Controlls/SingleIcon';
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
    constructor(props){
       super(props);
    }
    render(){
        const {editorState,onToggle}=this.props;
        const selection=editorState.getSelection();
        const blockType=editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        console.log('blockType is ',blockType);
        return <div className={Styles.wrapper}>
            <Normal showText='常规'>
                <Heading curBlockType={blockType} onToggle={onToggle}/>
            </Normal>
            <Normal style={{marginLeft:20}} showText="字号">
                <FontSize editorState={this.props.editorState} onToggle={this.props.onToggleOtherStyle}></FontSize>
            </Normal>
            <Normal style={{marginLeft:20}} showText="行高">
                <LineHeight editorState={this.props.editorState} onToggle={this.props.onToggleOtherStyle}/>
            </Normal>
            <SingleIcon iconName='icon-quote' onToggleClick={()=>onToggle('blockquote')}></SingleIcon>
            <SingleIcon iconName='icon-code' onToggleClick={()=>onToggle('code-block')}></SingleIcon>
            <SingleIcon iconName='icon-ul' onToggleClick={()=>onToggle('unordered-list-item')}></SingleIcon>
            <SingleIcon iconName='icon-ol' onToggleClick={()=>onToggle('ordered-list-item')}></SingleIcon>
       
            <span style={{paddingLeft:20}}>
                <i className="icon-right_indent"></i>
            </span>
            <span style={{paddingLeft:20}}>
                <i className="icon-left_indent"></i>
            </span>
            <span>
                <i className="icon-link"></i>
            </span>
            <span>
                <i className="icon-cancel_link"></i>
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