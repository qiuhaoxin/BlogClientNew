import {RichUtils,Modifier,CharacterMetadata, EditorState} from 'draft-js';
import {setBlockData,} from 'draftjs-utils';

export function getSelectionBlock(editorState){
    const selectionState=editorState.getSelection();
    const block=editorState.getCurrentContent().getBlockForKey(selectionState.getAnchorKey());
    return block;
}

export function getSelectionBlockData(editorState,name){
    const blockData=getSelectionBlock(editorState).getData();   // Returns block-level metadata
    return name ? blockData.get(name) : blockData;
}

export function setSelectionBlockData(editorState,blockData,override){
     const newBlockData=override ? blockData : Object.assign({},getSelectionBlockData(editorState).toJS(),blockData);
     Object.keys(newBlockData).forEach(key=>{
         if(newBlockData.hasOwnProperty(key) && newBlockData[key]==undefined){
             delete newBlockData[key];
         }
     })
     return setBlockData(editorState,newBlockData);
}

export function getSelectionBlockType(editorState){
    const block=getSelectionBlock(editorState);
    const type=block.getType();
    return type;
}



function updateEachCharacterOfSelection(editorState,callback){
    //  debugger;
     const contentState=editorState.getCurrentContent();
     const blockMap=contentState.getBlockMap();

     const selectionState=editorState.getSelection();
     const startKey=selectionState.getStartKey();
     const startOffset=selectionState.getStartOffset();
     const endKey=selectionState.getEndKey();
     const endOffset=selectionState.getEndOffset();

     const nextContentBlocks=blockMap.map(block=>{
         const type=block.getType();
         const blockKey=block.getKey();
         let nextCharacterList=null;
         const characterList=block.getCharacterList();
         if(startKey == blockKey && endKey==blockKey){
            nextCharacterList=characterList.map((characterMetaData,index)=>{
                if(startOffset<=index && index <= endOffset){
                    return callback(characterMetaData);
                }
                return characterMetaData;
            });
         }else if(startKey==blockKey){
            nextCharacterList=characterList.map((characterMetaData,index)=>{
                if(startOffset <= index){
                    return callback(characterMetaData);
                }
                return characterMetaData;
            })
         }else if(endKey==blockKey){
            nextCharacterList=characterList.map((characterMetaData,index)=>{
                if(index <= endOffset){
                    return callback(characterMetaData);
                }
                return characterMetaData;
            });
         }else {
             nextCharacterList=characterList.map((characterMetaData,index)=>{
                 return callback(characterMetaData);
             });
         }
         return block.merge({
             'characterList':nextCharacterList,
         })
     });
     const newContentState=contentState.merge({
         blockMap:nextContentBlocks,
         selectionBefore:selectionState,
         selectionAfter:selectionState,
     });
     let nextEditorState=EditorState.push(editorState,newContentState,'update-selection-character-list');
     return nextEditorState;
}

const toggleSelectionLink(editorState,href,target){
    const contentState=editorState.getCurrentContent();
    const selectionState=editorState.getSelection();

    const entityData={href,target};

    if(selectionState.isCollapsed() || getSelectionBlockType(editorState)=='atomic'){
        return editorState;
    }
    if(href==false){
        return RichUtils.toggleLink(editorState,selectionState,null);
    }
    if(target==null){
        delete entityData.href;
    }
    try{
        const nextContentState=contentState.createEntity('LINK','MUTABLE',entityData);
        const entityKey=nextContentState.getLastCreatedEntityKey();

        let nextEditorState=EditorState.set(editorState,{
            currentContent:nextContentState,
        });
        nextEditorState=RichUtils.toggleLink(nextEditorState,selectionState,entityKey);
    }catch(e){

    }

}
const toggleSelfDefineStyles=(editorState,prefix='',style)=>{
    let nextEditorState=editorState;
    style=prefix + style;
    try{
       nextEditorState=updateEachCharacterOfSelection(editorState,(characterMetaData)=>{
           return characterMetaData.toJS().style.reduce((characterMetaData,characterStyle)=>{
              if(characterStyle.indexOf(prefix) === 0 && style!=characterStyle){
                return CharacterMetadata.removeStyle(characterMetaData,characterStyle);
              }else{
                return characterMetaData;
              }
              
           },characterMetaData)
       });
    }catch(e){
        console.log("error is ",e);
    }
    return RichUtils.toggleInlineStyle(nextEditorState,style);
}
//字体大小
export function toggleFontSizeStyles({editorState,fontSize}){
    return toggleSelfDefineStyles(editorState,"FONTSIZE-",fontSize);
}
// 行高
export function toggleLineHeightStyles({editorState,lineHeight}){
    return toggleSelfDefineStyles(editorState,"LINEHEIGHT-",lineHeight);
}

function changeSelectionTextIndent(editorState,changeIndent,maxIndent){
     return changeIndent < 0 || changeIndent > maxIndent || isNaN(changeIndent) 
     ? editorState 
     : setSelectionBlockData(editorState,{textIndent:changeIndent || undefined});
}
export function toggleIncreaseTextIndentStyles({editorState,maxIndent=4}){
    const curIndent=getSelectionBlockData(editorState,"textIndent") || 0;
    return changeSelectionTextIndent(editorState,curIndent + 1,maxIndent);
}

export function toggleDecreaseTextIndentStyles({editorState,maxIndent=4}){
     const curIndent=getSelectionBlockData(editorState,'textIndent');
     if(curIndent){
        return changeSelectionTextIndent(editorState,curIndent - 1,maxIndent);
     }
}

//字间距
export function toggleLetterSpaceStyles({editorState,letterSpace}){
    return toggleSelfDefineStyles(editorState,"LETTERSPACE-",letterSpace);
}

// export function toggleTextIndentStyles({editorState,textIndent=6}){
//     return toggleSelfDefineStyles(editorState,"TEXTINDENT-",textIndent);
// }

export function toggleHeadingStyle(){

}
