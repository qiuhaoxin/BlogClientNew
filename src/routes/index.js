import React from 'react';
import {HashRouter as Router,Switch,Route,Redirect} from 'react-router-dom';
import Header from '../components/Header';
import BGroundImg from '../components/BGroundImg';
import Styles from './index.less';
import RouterData from '../common/routerData';
import {Suspense} from 'react';
class RouteApp extends React.Component{
    render(){
        return <div className={Styles.wrapper}>

            <Router>
                <Header />
                <BGroundImg />
                <Switch>
                    <Suspense fallback={<div>loading...</div>}>
                        {
                            RouterData.map(item=><Route key={item.path} path={item.path} component={item.component}></Route>)
                        }
                    </Suspense>
                    <Redirect from="/" to="/main"/>
                </Switch>
            </Router>
        </div>
    }
}

export default RouteApp;