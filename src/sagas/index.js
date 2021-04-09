import {fork,call,put,takeEvery,takeLatest} from 'redux-saga/effects';
import Actions from '../actions';
import {fetchBlogsData,fetchBlogCatalog,publish,getArticleList,getArticleById,
   getDomainList,getSubDomainList,saveSubDomain,saveDomain,
   removeDomain,updateArticle} from '../services';
function* watchGetBlogsList(){
   yield takeLatest(Actions.GET_BLOG_LIST,getBlogsList);
}
function* getBlogsList(payload){
   const result=yield call(fetchBlogsData,payload);
}

function* watchGetBlogCatalog(){
   yield takeLatest(Actions.GET_BLOG_CATALOG,getBlogCatalog);
}
function* getBlogCatalog(payload){
   const result=yield call(fetchBlogCatalog,payload);
   const {errcode,data}=result;
   if(errcode==1){

      yield put({
         type:Actions.SYNC_BLOG_CATALOG,
         payload:data
      })
   }
}

function* watchPublish(){
   yield takeEvery(Actions.PUBLISH,publishArticle);
}
function* publishArticle(payload){
   const {callback}=payload;
   const result=yield call(publish,payload.payload);
   const {errcode}=result;
   if(errcode==1){
      callback && callback(result);
   }
}
//获取某个模块的文章列表
function* watchGetArticleList(){
   yield takeLatest(Actions.GET_ARTICLE_LIST,fetchArticleList);
}
function* fetchArticleList(payload){
   const {callback}=payload;
   const result=yield call (getArticleList,payload.payload);
   const {errcode,data,pagination}=result;
   if(errcode==1){
      yield put({
         type:Actions.SYNC_ARTICLE_LIST,
         payload:{
            data,
            pagination
         }
      })
   }
   callback && callback(result);
}

function* watchGetArticleById(){
    yield takeEvery(Actions.GET_ARTICLE,fetchArticleById);

}
function* fetchArticleById(payload){
   const {callback}=payload;
   const result=yield call(getArticleById,payload.payload);
   const {errcode,data}=result;
   if(errcode==1){
      yield put({
         type:Actions.SYNC_ARTICLE,
         payload:data[0],
      })
   }
   callback && callback(result);
}

function* watchFetchDomainList(){
    yield takeLatest(Actions.GET_DOMAIN_LIST,fetchDomainList);
}
function* fetchDomainList(payload){
   const {callback}=payload;
   const result=yield call(getDomainList,payload.payload);
   const {errcode,data}=result;
   console.log("fetchDomainList is ",result);
   if(errcode==1){
      yield put({
         type:Actions.SYNC_DOMAIN_LIST,
         payload:data,
      })
   }
   callback && callback(result);
}

function* watchSaveDomain(){
   yield takeEvery(Actions.SAVE_DOMAIN,saveDomainAPI);
}
function* saveDomainAPI(payload){
   const {callback}=payload;
   const result=yield call(saveDomain,payload.payload);
   callback && callback(result);
}

function* watchRemoveDomain(){
    yield takeLatest(Actions.REMOVE_DOMAIN,removeDomainAPI);
}
function* removeDomainAPI(payload){
   const {callback}=payload;
   const result=yield call(removeDomain,payload.payload);
   callback && callback(result);
}

function* watchFetchSubDomainList(){
   yield takeLatest(Actions.GET_SUBDOMAIN,fetchSubdomainList);
}
function* fetchSubdomainList(payload){
   const {callback}=payload;
   const result=yield call(getSubDomainList,payload.payload);
   const {errcode,data}=result;
   if(errcode==1){
      yield put({
         type:Actions.SYNC_SUBDOMAIN,
         payload:data,
      })
   }
   callback && callback(result);
}

function* watchSaveSubDomain(){
   yield takeLatest(Actions.SAVE_SUBDOMAIN,saveSubDomainAPI);
}
function* saveSubDomainAPI(payload){
   const {callback}=payload;
   const result=yield call(saveSubDomain,payload.payload);
   console.log("result is ",result);
   callback && callback(result);
}

function* watchUpdateArticle(){
   yield takeLatest(Actions.SAVE_ARTICLE,updateArticleAPI);
}
function* updateArticleAPI(payload){
   const {callback}=payload;
   const result=yield call(updateArticle,payload.payload);
   callback && callback(result);
}


 export default function* rootSaga(){
    try{
       yield fork(watchGetBlogsList);
       yield fork(watchGetBlogCatalog);
       yield fork(watchPublish);
       yield fork(watchGetArticleById);
       yield fork(watchGetArticleList);
       yield fork(watchFetchDomainList);
       yield fork(watchFetchSubDomainList);
       yield fork(watchSaveSubDomain);
       yield fork(watchSaveDomain);
       yield fork(watchRemoveDomain);
       yield fork(watchUpdateArticle);
    }catch(e){

    }
}