import React from 'react';
import {HashRouter as Router,Switch,Route,Link,Redirect} from 'react-router-dom';
import Header from '../components/Header';
import MainPage from '../views/MainPage'; 
import BGroundImg from '../components/BGroundImg';
class RouteApp extends React.Component{
    render(){
        return <div>
            <Header />
            <BGroundImg />
            <Router>
                <Switch>
                    <Route path="/main" component={MainPage}></Route>
                    <Redirect from="/" to="/main"/>
                </Switch>
            </Router>
        </div>
    }
}

export default RouteApp;