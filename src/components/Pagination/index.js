import React from 'react';
import Styles from './index.less';


function Pagination({total,pageSize,current,onPaginationChange}){
    console.log("total is "+total+" and pageSize is "+pageSize+" adn result is "+Math.ceil(total / pageSize));
    let style={};
    if(total < pageSize){
        style.display="none";
    }else{
        style.display="inline-flex";
    }
    let maxPageIdx=Math.ceil(total / pageSize);
    let leftDisabled=current > 1 ? false : true;
    let rightDisabled=current < maxPageIdx ? false : true;
    function handleClick(e){
        const target=e.target;
        const tagName=target.tagName;
     
        if(tagName && tagName=='DIV'){
            const dataId=target.getAttribute('data-id');
            let pageIdx;
            if(dataId=='left-arrow'){
               if(leftDisabled)return;
               pageIdx=current - 1;
            }else if(dataId=='right-arrow'){
               if(rightDisabled)return;
               pageIdx=current + 1;
            }
            console.log("pageIdx is ",pageIdx);
            onPaginationChange && onPaginationChange(pageIdx);
        }
    }
   
    return <div onClick={handleClick} style={style} className={Styles.wrapper}>
        <div data-id="left-arrow" className={`${Styles.arrow} ${Styles.leftArrow} ${Styles[leftDisabled ? 'no_active' : 'active']}`}></div>
        <div data-id="indicator" className={Styles.indicator}>
            <span>{current}</span>
            <span>/</span>
            <span>{maxPageIdx}</span>
        </div>
        <div data-id="right-arrow" className={`${Styles.arrow} ${Styles.rightArrow} ${Styles[rightDisabled ? 'no_active' : 'active']}`}></div>
    </div>
}

export default Pagination;