import Actions from '../actions';

const initialState={
    domainList:[],
}

export default function(state=initialState,action){
    const type=action.type;
    switch(type){
        case Actions.SYNC_DOMAIN_LIST:
            return {
                ...state,
                domainList:action.payload
            }
        break;
        default:
            return state;
    }
}