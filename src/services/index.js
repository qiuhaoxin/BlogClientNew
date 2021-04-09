
import request from './request';


let urlPrefix="/api";

export function fetchBlogsData(params){
    return request(
        urlPrefix+'/blog/list',
        {
            method:'GET',
        }
    )
}

export function fetchBlogCatalog(params){
    return request(
        urlPrefix + '/blog/getSubjectData',
        {
            method:'GET',
        }
    )
}

export function publish(params){
    return request(
        urlPrefix + '/blog/publish',
        {
            method:'POST',
            body:params,
        }
    )
}
//获取某个主题所有文章列表（展示简介）
export function getArticleList(params){
    return request(
        urlPrefix + '/blog/getArticles',
        {
            method:'POST',
            body:params,
        }
    )
}
//删除文章
export function deleteArticle(params){
    return request(
        urlPrefix + '/blog/delArticle',
        {
            method:'POST',
            body:params
        }
    )
}
//获取文章详情
export function getArticleById(params){
    return request(
        urlPrefix+'/blog/getArticle',
        {
            method:'POST',
            body:params
        }
    )
}

//获取主题
export function getDomainList(params){
    
     return request(
         urlPrefix + '/blog/getDomain',
         {
             method:'POST',
             body:params,
         }
     )
}

export function saveDomain(params){
    return request(
        urlPrefix + '/blog/saveDomain',
        {
            method:'POST',
            body:params,
        }
    )
}

export function removeDomain(params){
    return request(
        urlPrefix + '/blog/delDomain',
        {
            method:'POST',
            body:params,
        }
    )
}
//获取二级主题
export function getSubDomainList(params){
    return request(
        urlPrefix + '/blog/getSubDomain',
        {
            method:'POST',
            body:params,
        }
    )
}

//保存二级主题
export function saveSubDomain(params){
    return request(
        urlPrefix + '/blog/saveSubDomain',
        {
            method:'POST',
            body:params
        }
    )
}
//更新文章 只做文章内容的修改，而不做主题的转换
export function updateArticle(params){
    return request(
        urlPrefix + '/blog/updateArticle',
        {
            method:'POST',
            body:params,
        }
    )
}