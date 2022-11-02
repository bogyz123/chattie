import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isLoggedIn: null,
    avatar: null,
    nicknameColor: null,
    userObject: null,
    nickname: null,
    onlineCount: null
}
const UserSlice = createSlice({
    name: 'UserSlice',
    initialState,
    reducers: {
        setIsLoggedIn(state, action) {
            state.isLoggedIn = action.payload;
        },
        setUserObject(state, action) {
            state.userObject = action.payload;
        },
        setNickname(state, action) {
            state.nickname = action.payload;
        },
        setOnlineCount(state, action) {
            state.onlineCount = action.payload;
        },
        setAvatar(state, action) {
            state.avatar = action.payload;
        },
        setNicknameColor(state, action) {
            state.nicknameColor = action.payload;
        }

    }
})
export const { setIsLoggedIn, setNicknameColor, setUserObject, setAvatar, setOnlineCount, setNickname } = UserSlice.actions;
export default UserSlice.reducer;