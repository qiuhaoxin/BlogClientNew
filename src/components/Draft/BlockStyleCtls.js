import React from 'react';
import Styles from './BlockStyleCtls.less';
import Normal from './Controlls/Normal';
import HeadingPicker from './Controlls/Headings';
import Divider from '../Divider';
import LetterSpacePicker from './Controlls/LetterSpace';
// import FontSize from './Controlls/FontSize';
import LineHeightPicker from './Controlls/LineHeight';
import FontSizePicker from './Controlls/FontSize'
import SingleIcon from './Controlls/SingleIcon';
import PairIcon from './Controlls/PairIcon'
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
        const {editorState,onToggle,onToggleOtherStyle,onToggleInlineType}=this.props;
        const selection=editorState.getSelection();
        const blockType=editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
        const inlineStyle=editorState.getCurrentInlineStyle();
        return <div className={Styles.wrapper}>
            <FontSizePicker tipText="字体大小" editorState={editorState} onToggle={onToggleOtherStyle}></FontSizePicker>
            <LineHeightPicker tipText="行高" editorState={editorState} onToggle={onToggleOtherStyle}></LineHeightPicker>
            <LetterSpacePicker tipText="字间距" editorState={editorState} onToggle={onToggleOtherStyle}></LetterSpacePicker>
            <Divider/>
            <SingleIcon inlineStyle={inlineStyle} iconType={'BOLD'} iconName="icon-bold" iconStyle={{fontSize:14}} 
                        onToggleClick={()=>onToggleInlineType('BOLD')}></SingleIcon>
            <SingleIcon inlineStyle={inlineStyle} iconType={'Italic'} iconName="icon-italics" iconStyle={{fontSize:16}} 
                        onToggleClick={()=>onToggleInlineType('Italic')}></SingleIcon>
            <SingleIcon inlineStyle={inlineStyle} iconType={'UNDERLINE'} iconName="icon-under_line" iconStyle={{fontSize:14}} 
                        onToggleClick={()=>onToggleInlineType('UNDERLINE')}></SingleIcon>
            <Divider />
            <HeadingPicker editorState={editorState} curBlockType={blockType} onToggle={onToggle}></HeadingPicker>
            <SingleIcon blockType={blockType} iconType={'blockquote'} iconName='icon-quote' onToggleClick={()=>onToggle('blockquote')}></SingleIcon>
            <SingleIcon blockType={blockType} iconType={'code-block'} iconName='icon-code' onToggleClick={()=>onToggle('code-block')}></SingleIcon>
            <SingleIcon blockType={blockType} iconType={'unordered-list-item'} iconName='icon-ul' onToggleClick={()=>onToggle('unordered-list-item')}></SingleIcon>
            <SingleIcon blockType={blockType} iconType={'ordered-list-item'} iconName='icon-ol' onToggleClick={()=>onToggle('ordered-list-item')}></SingleIcon>
            <Divider/>
            <PairIcon iconArr={[
                {iconName:'icon-right_indent',iconId:1,iconType:'rightIndent'},
                {iconName:'icon-left_indent',iconId:2,iconType:'leftIndent'}
            ]} onToggleClick={onToggleOtherStyle} iconStyle={{fontSize:18}} />
            <Divider />
            <PairIcon iconArr={
                [
                    {iconName:'icon-link',iconId:1,iconType:'link'},
                    {iconName:'icon-cancel_link',iconId:2,iconType:'unlink'}
                ]
            } onToggleClick={onToggleOtherStyle} iconStyle={{fontSize:18}} >

            </PairIcon>
        </div>
    }
}

export default BlockStyleCtls;