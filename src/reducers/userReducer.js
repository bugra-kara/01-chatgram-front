import { 
    GET_ALL_CHATS,
    SELECT_USER,
    GET_ONE_CHAT,
    NEW_MESSAGE,
    USER_LOGOUT,
    FRIEND_REQUEST,
    FRIEND_RESPONSE,
    FRIEND_ADDED
} from '../utils.js/actions'

const reducer = (state, action) => {
    if(action.type === GET_ALL_CHATS) {
        return {...state, chats: [...action.payload], isSelect: true, userAdded: false, addedUserId: null}
    }
    if(action.type === NEW_MESSAGE) {
        const newChats = state.chats.map((item)=> {
            if(item.chatId === action.payload[0].chatId) {
                return {...item, lastMessage: action.payload[0]}
            }
            else {
                return {...item}
            }
        })
        return {...state, selectedChat: [...state.selectedChat, ...action.payload], chats: [...newChats], receivedMsg: true}
    }
    if(action.type === GET_ONE_CHAT) {
        return {...state, selectedChat: [...action.payload.data.data], isChat: false, isSelect: false, newMsg: true }
    }
    if(action.type === SELECT_USER) {
        return {...state, selectedUser: action.payload, isChat: true, newMsg: true}
    }
    if(action.type === USER_LOGOUT) {
        return {
            friendsReq: [],
            chats: [],
            isSelect: false,
            isChat: false,
            newMsg: false,
            selectedUser: null,
            selectedChat: [],
            userAdded: false,
            receivedMsg: false,
            addedUserId: null
        }
    }
    if(action.type === FRIEND_REQUEST) {
        return {
            ...state,
            friendsReq: [...action.payload.data.data]
        }
    }
    if(action.type === FRIEND_ADDED) {
        const newU = !state.userAdded
        return {
            ...state,
            userAdded: newU
        }
    }
    if(action.type === FRIEND_RESPONSE) {
        const newList = state.friendsReq.filter((item)=> item.userId !== action.payload)
        return {
            ...state,
            friendsReq: [...newList],
            addedUserId: action.payload
        }
    }
    return state
}
export default reducer