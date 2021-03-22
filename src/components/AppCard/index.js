import React from 'react';
import Styles from './index.less';
import Label from '../Label';
import Http_Bg from '../../assets/http-bg.jpg';
function AppCard({title='Http',labelList,appDes,userName,timeStamp}){
    return <div className={Styles.wrapper}>
        <div className={Styles.title}>
            <img src={Http_Bg}/>
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
             {
                 labelList.map(item=><Label key={item.key} labelText={item.name}/>)
             }
        </div>
    </div>
}
export default AppCard;