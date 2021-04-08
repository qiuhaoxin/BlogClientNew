import React from 'react';
import Styles from './BlockStyleCtls.less';
import HeadingPicker from './Controlls/Headings';
import Divider from '../Divider';
import LetterSpacePicker from './Controlls/LetterSpace';
// import FontSize from './Controlls/FontSize';
import LineHeightPicker from './Controlls/LineHeight';
import FontSizePicker from './Controlls/FontSize'
import SingleIcon from './Controlls/SingleIcon';
import PairIcon from './Controlls/PairIcon';
import TextIndentPicker from './Controlls/TextIndent';
import LinkEditorPicker from './Controlls/LinkEditor';
import Upload from './Upload';
import Image from './Controlls/Image';
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
        const {editorState,onToggle,onToggleOtherStyle,onToggleInlineType,visible}=this.props;
        const selection=editorState.getSelection();
        const blockType=editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        const inlineStyle=editorState.getCurrentInlineStyle();
        return <div className={Styles.wrapper} style={{display:visible ? 'flex' : 'none'}}>
            <FontSizePicker tipText="字体大小" editorState={editorState} onToggle={onToggleOtherStyle}></FontSizePicker>
            <LineHeightPicker tipText="行高" editorState={editorState} onToggle={onToggleOtherStyle}></LineHeightPicker>
            <LetterSpacePicker tipText="字间距" editorState={editorState} onToggle={onToggleOtherStyle}></LetterSpacePicker>
            <Divider/>
            <SingleIcon tipText="粗体" inlineStyle={inlineStyle} iconType={'BOLD'} iconName="icon-bold" iconStyle={{fontSize:14}} 
                        onToggleClick={()=>onToggleInlineType('BOLD')}></SingleIcon>
            <SingleIcon tipText="斜体" inlineStyle={inlineStyle} iconType={'Italic'} iconName="icon-italics" iconStyle={{fontSize:16}} 
                        onToggleClick={()=>onToggleInlineType('Italic')}></SingleIcon>
            <SingleIcon tipText="下划线" inlineStyle={inlineStyle} iconType={'UNDERLINE'} iconName="icon-under_line" iconStyle={{fontSize:14}} 
                        onToggleClick={()=>onToggleInlineType('UNDERLINE')}></SingleIcon>
            <Divider />
            <HeadingPicker editorState={editorState} curBlockType={blockType} onToggle={onToggle}></HeadingPicker>
            <SingleIcon tipText="引用" blockType={blockType} iconType={'blockquote'} iconName='icon-quote' onToggleClick={()=>onToggle('blockquote')}></SingleIcon>
            <SingleIcon tipText="代码" blockType={blockType} iconType={'code-block'} iconName='icon-code' onToggleClick={()=>onToggle('code-block')}></SingleIcon>
            <SingleIcon tipText="无序列表" blockType={blockType} iconType={'unordered-list-item'} iconName='icon-ul' onToggleClick={()=>onToggle('unordered-list-item')}></SingleIcon>
            <SingleIcon tipText="有序列表" blockType={blockType} iconType={'ordered-list-item'} iconName='icon-ol' onToggleClick={()=>onToggle('ordered-list-item')}></SingleIcon>
            <Divider/>
            <TextIndentPicker tipText="缩进" editorState={editorState} onToggle={onToggleOtherStyle}></TextIndentPicker>
            <Divider />
            <LinkEditorPicker tipText="缩进" editorState={editorState} onToggle={onToggleOtherStyle}></LinkEditorPicker>
            <Divider />
            <Image tipText="上传图片" editorState={editorState} onToggle={onToggleOtherStyle}/>
        </div>
    }
}

export default BlockStyleCtls;