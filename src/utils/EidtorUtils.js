import {RichUtils,Modifier,CharacterMetadata, EditorState,AtomicBlockUtils} from 'draft-js';
import {setBlockData,getSelectionEntity} from 'draftjs-utils';


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

export function isSelectionCollapsed(editorState){
    return editorState.getSelection().isCollapsed();
}

export function insertText(editorState,text,inlineStyle,entity){
    const selectionState=editorState.getSelection();
    const blockType=getSelectionBlockType(editorState);
    if(blockType=='atomic'){
        return editorState;
    }
    let contentState=editorState.getCurrentContent();
    let entityKey;
    if(entity && entity.type){
       contentState=contentState.createEntity(entity.type,entity.mutability || 'MUTABLE',entity.data);
       entityKey=contentState.getLastCreatedEntityKey();
    }
    if(!selectionState.isCollapsed()){
        return EditorState.push(editorState,Modifier.replaceText(contentState,selectionState,text,inlineStyle,entityKey),"replace-text");
    }else{
        return EditorState.push(editorState,Modifier.insertText(contentState,selectionState,text,inlineStyle,entityKey),"insert-text");
    }
}

export function getSelectionText(editorState){
   
    const selectionState=editorState.getSelection();
    if(selectionState.isCollapsed() || getSelectionBlockType(editorState)=='atomic')return '';

    const contentState=editorState.getCurrentContent();
    const currentContentBlock=contentState.getBlockForKey(selectionState.getAnchorKey());
    const start=selectionState.getStartOffset();
    const end=selectionState.getEndOffset();

    return currentContentBlock.getText().slice(start,end);
}

export function getSelectionBlockType(editorState){
    const block=getSelectionBlock(editorState);
    const type=block.getType();
    return type;
}

export function getSelectionEntityData(editorState,type){
    
    const entityKey=getSelectionEntity(editorState);
    if(entityKey){
        const contentState=editorState.getCurrentContent();
        const entityData=contentState.getEntity(entityKey);
        console.log("getSelectionEntityData result is ",entityData);
        if(entityData && entityData.get('type')==type){
            return entityData.getData();
        }else{
            return {}
        }
    }
    return {};
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
//上传图片
export function toggleAddImage(editorState,imgInfo){
    const {imgPath}=imgInfo;
    try{
        const contentState=editorState.getCurrentContent();
        const nextContentState=contentState.createEntity("image","MUTABLE",{
            src:imgPath,
        });
        const lastEntityKey=nextContentState.getLastCreatedEntityKey();
        let nextEditorState=EditorState.set(editorState,{
            currentContent:nextContentState,
        });
        return AtomicBlockUtils.insertAtomicBlock(nextEditorState,lastEntityKey,' ');
    }catch(err){
        console.error("toggleAddImage error is ",err);
        return editorState;
    }
}
// 添加Code Pen 
export function toggleAddCodePen(editorState,codePenCode){
    try{
        const contentState=editorState.getCurrentContent();
        const nextContentState=contentState.createEntity("codePen","MUTABLE",{
            codePenInfo:codePenCode
        });
        const lastEntityKey=nextContentState.getLastCreatedEntityKey();
        let nextEditorState=EditorState.set(editorState,{
            currentContent:nextContentState,
        });
        return AtomicBlockUtils.insertAtomicBlock(nextEditorState,lastEntityKey,' ');
    }catch(ex){
        console.error("toggleAddCodePen error is ",ex);
        return editorState;
    }
}
export function toggleSelectionLink(editorState,href,target){
    console.log("togglesSelectionList ",href+" and target is ",target);
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
        const nextContentState=contentState.createEntity('LINK','MUTABLE',entityData);
        const entityKey=nextContentState.getLastCreatedEntityKey();

        let nextEditorState=EditorState.set(editorState,{
            currentContent:nextContentState,
        });
        nextEditorState=RichUtils.toggleLink(nextEditorState,selectionState,entityKey);
        nextEditorState=EditorState.forceSelection(nextEditorState,selectionState.merge({
            anchorOffset:selectionState.getEndOffset(),
            focusOffset:selectionState.getEndOffset(),
        }))
        nextEditorState=EditorState.push(nextEditorState,Modifier.insertText(
            nextEditorState.getCurrentContent(),
            nextEditorState.getSelection(),
            ''
        ),"insert-text");
        return nextEditorState;
    }catch(e){
        console.error("toggle Selection link err",e);
        return editorState;
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
