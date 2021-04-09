import React from 'react';
import Styles from './index.less';
import Label from '../Label';
import Http_Bg from '../../assets/http-bg.jpg';
import {useHistory} from 'react-router-dom';
import Actions from '../Actions';
import LabelAndAction from '../LabelAndAction';
let iconArr=[
    {key:1,iconClass:'icon-delete',iconType:'del'}
]
function AppCard({title='Http',labelList,appDes,userName,timeStamp,articleId,imgSrc,onActionClick}){
    const history=useHistory();
    function jump(){
        history.push(`/article/${articleId}`);
    }
    function handleActionClick(iconType){
        console.log();
        onActionClick && onActionClick(iconType,articleId)
    }
    
    return <div className={Styles.wrapper}>
        <div className={Styles.title} onClick={jump}>
            <img src={imgSrc ? imgSrc : Http_Bg}/>
            <span>{title}</span>
        </div>
        <div className={Styles.appDes} onClick={jump}>
            <div className={Styles.des} dangerouslySetInnerHTML={{__html: appDes}}>
            </div>
             <div className={Styles.articleInfo}>
                <div className={Styles.timeInfo}>
                    <i className="icon-calendar"></i>
                    <span>{timeStamp.split('T')[0]}</span>
                </div>
                <div className={Styles.userInfo}>
                    <i className="icon-person"></i>
                    <span>{userName}</span>
                </div>
             </div>
        </div>
        <div className={Styles.footer}>
            <LabelAndAction onActionClick={handleActionClick} iconArr={iconArr} labelList={labelList}/>
        </div>
    </div>
}
export default AppCard;