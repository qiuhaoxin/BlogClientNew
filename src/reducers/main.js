const initialState={
    articleList:[],
    isLoading:false,
    article:{}
}
import Actions from '../actions'

export default function(state=initialState,action){
    const {type,payload}=action;
    console.log("payload is ",payload);
    switch(type){
        case Actions.SYNC_ARTICLE_LIST:
            return {
                ...state,
                articleList:payload,
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