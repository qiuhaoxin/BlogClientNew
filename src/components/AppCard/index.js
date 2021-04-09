import React from 'react';
import Styles from './index.less';
import Label from '../Label';
import Http_Bg from '../../assets/http-bg.jpg';
import {useHistory} from 'react-router-dom';
import Actions from '../Actions'
function AppCard({title='Http',labelList,appDes,userName,timeStamp,articleId,imgSrc}){
    const history=useHistory();
    function jump(){
        history.push(`/article/${articleId}`);
    }
    function handleActionClick(){

    }
    
    return <div className={Styles.wrapper} onClick={jump}>
        <div className={Styles.title}>
            <img src={imgSrc ? imgSrc : Http_Bg}/>
            <span>{title}</span>
        </div>
        <div className={Styles.appDes}>
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
             <div className={Styles.labelList}>
             {
                 labelList.map((item,index)=><Label key={index} labelText={item}/>)
             }
             </div>
             <Actions onActionClick={handleActionClick}/>
        </div>
    </div>
}
export default AppCard;