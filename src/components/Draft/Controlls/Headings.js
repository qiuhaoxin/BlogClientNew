import React from 'react';
import Styles from './heading.less';
import wrapWithComponent from './Wrapper';
import Normal from './Normal';
const titleList=[
    {label: 'H1', name:'h1',style: 'header-one'},
    {label: 'H2', name:'h2',style: 'header-two'},
    {label: 'H3', name:'h3',style: 'header-three'},
    {label: 'H4', name:'h4',style: 'header-four'},
    {label: 'H5', name:'h5',style: 'header-five'},
    {label: 'H6', name:'h6',style: 'header-six'},
    {label:'常规',name:'div',style:'unstyled'}
];
function Heading({onToggle,curBlockType,editorState,onDropDownChange}){
    function handleClick(item){
         onToggle && onToggle(item.style);
         onDropDownChange && onDropDownChange(false);
    }
    return <ul>
    {
        titleList.map(item=><li 
            className={`${Styles['titleItem']} ${Styles[item.style==curBlockType ? 'active' : '']}`} 
            key={item.label} onClick={()=>handleClick(item)}>
            {
                React.createElement(item.name,{},item.label)
            }
        </li>)
    }
</ul>

}

Heading.displayName="Heading";
export default wrapWithComponent(Normal,Heading,{
    showText:'标题',
    childrenSourceData:titleList,
});