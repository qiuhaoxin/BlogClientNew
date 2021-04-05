import React,{useState} from 'react';
import Styles from './lineEditor.less';
import PairIcon from './PairIcon';
import LinkInput from './LinkInput';
const initLinkArr=[
    {iconName:'icon-link',iconId:1,iconType:'link',disabled:false},
    {iconName:'icon-cancel_link',iconId:2,iconType:'unlink',disabled:true}
]

function LinkEditor({editorState,onToggle}){
    const [linkArr,setLinkArr]=useState(initLinkArr);
    const [visible,setVisible]=useState(false);
    function handleClick(iconType){
        console.log("iconType linkEditor is ",iconType);
        if(iconType=='link'){
            console.log('sdfsdfsfsdfs');
           setVisible(true);
        }else if(iconType=='unlink'){


        }
    }
    function handleLinkInputVisible(visible){
        setVisible(visible);
    }
    return <div>
        <PairIcon iconArr={linkArr} onToggleClick={handleClick} iconStyle={{fontSize:18}} />
        <LinkInput onVisible={handleLinkInputVisible} visible={visible}/>
    </div>
}

export default LinkEditor;