import { createSlice  } from "@reduxjs/toolkit"


const initialState={
    token:null,
    roles:null,
    userId:null,
    userDetails:null,
    entitlements:[],
    tabName:[],
    selectedIds:null,
    studentData:null,
    receiptObj:null,
    userProfilePic:null,
}


export const authSlice=createSlice({
    name:"authdata",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
            state.userId=action.payload.userId;

        },
        setLogout:(state)=>{
            state.token=null;
            state.user=null;
            state.userId=null;
            state.roles=null;
            state.userDetails=null;
            state.studentData=null;
            state.receiptObj=null;
            state.salesRole=null;
            state.entitlements=[];
            state.tabName = [];
        },
        setUserDetails:(state,action)=>{
            state.roles=action.payload.roles;
            state.userDetails=action.payload.userDetails;
            state.entitlements = action.payload.entitlements;
            state.tabName =action.payload.tabName;
        },
       

    }

})


export const {setLogin,setLogout,setUserDetails}=authSlice.actions;


export default authSlice.reducer;