import {RichUtils,Modifier,CharacterMetadata, EditorState} from 'draft-js'

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
    console.log("toggleFontSizeStyles ",fontSize);
    // debugger;
    return toggleSelfDefineStyles(editorState,"FONTSIZE-",fontSize);
}
// 行高
export function toggleLineHeightStyles({editorState,lineHeight}){
    console.log("toggleLine height style ",lineHeight);
    return toggleSelfDefineStyles(editorState,"LINEHEIGHT-",lineHeight);
}

//字间距
export function toggleLetterSpaceStyles({editorState,letterSpace}){
    return toggleSelfDefineStyles(editorState,"LETTERSPACE-",letterSpace);
}

export function toggleTextIndentStyles({editorState,textIndent=6}){
    return toggleSelfDefineStyles(editorState,"TEXTINDENT-",textIndent);
}

export function toggleHeadingStyle(){

}
