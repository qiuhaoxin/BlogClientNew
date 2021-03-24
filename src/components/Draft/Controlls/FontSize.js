import React from 'react';
import Styles from './fontsize.less';

const fontSizeList=[
    {label: '12', name:'12',style: 'header-one'},
    {label: '14', name:'14',style: 'header-two'},
    {label: '16', name:'16',style: 'header-three'},
    {label: '18', name:'18',style: 'header-four'},
    {label: '20', name:'20',style: 'header-five'},
    {label: '22', name:'22',style: 'header-six'},

    {label: '24', name:'24',style: 'header-one'},
    {label: '26', name:'26',style: 'header-two'},
    {label: '28', name:'28',style: 'header-three'},
    {label: '32', name:'32',style: 'header-four'},
    {label: '34', name:'34',style: 'header-five'},
    {label: '36', name:'36',style: 'header-six'},
];
function FontSize({onToggle}){
    return <ul className={Styles.wrapper}>
    {
        fontSizeList.map(item=><li className={Styles.titleItem} key={item.label} onClick={()=>onToggle(item.style)}>
            {
                React.createElement('span',{},item.name)
            }
        </li>)
    }
</ul>

}


export default FontSize;