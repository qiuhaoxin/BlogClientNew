import React from 'react';
function wrapWithComponent(WrapperComponent,ChildComponent,config){
    console.log("displayName is ",ChildComponent.displayName);
    return class extends React.Component{
        constructor(props){
            super(props);
            this.state={
                showText:config.showText,
                dropDownVisible:false,
            }
        }
        static getDerivedStateFromProps(props,state){
            const {editorState}=props;
            const curInlineStyle=editorState.getCurrentInlineStyle();
            const contentState=editorState.getCurrentContent();
            // console.log("getCurrentContent block is ",block);
            const childrenDisplayName=ChildComponent.displayName;
            const childrenData=config?.childrenSourceData ?? [];
            let showText=null;
            switch(childrenDisplayName){
                case 'FONTSIZE':
                     childrenData.find(item=>{
                         if(curInlineStyle.has(`FONTSIZE-${item}`)){
                             showText=item;
                             return true;
                         }
                         return false;
                     })
                break;
                case 'LINEHEIGHT': //
                childrenData.find(item=>{
                    if(curInlineStyle.has(`LINEHEIGHT-${item}`)){
                        showText=item;
                        return true;
                    }
                    return false;
                })
                break;
                case 'LETTERSPACE':
                    childrenData.find(item=>{
                        if(curInlineStyle.has(`LETTERSPACE-${item}`)){
                            showText=item;
                            return true;
                        }
                        return false;
                    })
                break;
                case 'Heading':
                    const contentState=editorState.getCurrentContent();
                    const selection=editorState.getSelection();
                    const blockType=contentState.getBlockForKey(selection.getStartKey()).getType();
                    console.log("blockType is ",blockType);
                    const targetItem=childrenData.filter(item=>item.style==blockType)[0];
                    if(targetItem)
                       showText=targetItem.label;
                break;
            }
            if(showText){
                return {
                    showText,
                }
            }
            // console.log("Wrapper showText is ",showText);
            return null;
        }
        handleDropDownVisible=(value)=>{
            this.setState({
                dropDownVisible:value,
            })
        }
        handleTextChange=(value)=>{
            this.setState({
                showText:value,
            })
        }
        render(){
            const {showText,dropDownVisible}=this.state;
            const {onToggle,editorState,tipText}=this.props;
            const outerProps={
                showText,
                dropDownVisible,
                tipText,
                onDropDownChange:this.handleDropDownVisible,
            }
            const innerProps={
                onToggle,
                editorState,
                curVal:showText,
                onTextChange:this.handleTextChange,
                onDropDownChange:this.handleDropDownVisible,
            }
            return <WrapperComponent {...outerProps}
            {...this.props} render={()=><ChildComponent {...innerProps}/>}>
            </WrapperComponent>
        }
    }
}

export default wrapWithComponent;
