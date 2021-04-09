const initialState={
    articleList:[],
    pagination:{
        current:1,
        pageSize:15,
        total:0,
    },
    isLoading:false,
    article:{}
}
import Actions from '../actions'

export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case Actions.SYNC_ARTICLE_LIST:
            return {
                ...state,
                articleList:payload.data,
                pagination:payload.pagination
            }
        break;
        case Actions.SYNC_ARTICLE:
            return {
                ...state,
                article:payload
            }
        break;
        default:
          return state;
    }
}