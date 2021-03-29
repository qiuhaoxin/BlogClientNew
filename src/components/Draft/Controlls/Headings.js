import React from 'react';
import Styles from './heading.less';

const titleList=[
    {label: 'H1', name:'h1',style: 'header-one'},
    {label: 'H2', name:'h2',style: 'header-two'},
    {label: 'H3', name:'h3',style: 'header-three'},
    {label: 'H4', name:'h4',style: 'header-four'},
    {label: 'H5', name:'h5',style: 'header-five'},
    {label: 'H6', name:'h6',style: 'header-six'},
];
function Heading({onToggle,curBlockType}){
    return <ul>
    {
        titleList.map(item=><li 
            className={`${Styles['titleItem']} ${Styles[item.style==curBlockType ? 'active' : '']}`} 
        key={item.label} onClick={()=>onToggle(item.style)}>
            {
                React.createElement(item.name,{},item.name)
            }
        </li>)
    }
    <li className={Styles.titleItem}>
        <span>常规</span>
    </li>
</ul>

}


export default Heading;