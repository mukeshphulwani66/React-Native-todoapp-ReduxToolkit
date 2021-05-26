import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {fetch2} from '../helpers/fetch2'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    token:null,
    loading:false,
    error:""
}



export const signupUser = createAsyncThunk(
    'signupuser',
    async (body)=>{
       const result =  await fetch2('/signup',body)
       return result  
    }
)

export const signinUser = createAsyncThunk(
    'signinuser',
    async (body)=>{
       const result =  await fetch2('/signin',body)
       return result  
    }
)
export const addToken = createAsyncThunk(
    'addtoken',
    async ()=>{
       const result =  await AsyncStorage.getItem('token') 
       return result  
    }
)



const authReducer = createSlice({
    name:"user",
    initialState,
    reducers:{
        logout:(state,action)=>{
            state.token = null
            AsyncStorage.removeItem('token')
        }
    },
    extraReducers:{
        [signupUser.fulfilled]:(state,{payload:{error,message}})=>{
          state.loading = false
          if(error){
              state.error =error
              alert(error)
          }else{
              state.error = message
             alert(message)
          }
        },
        [addToken.fulfilled]:(state,action)=>{
            state.token = action.payload
        },
        [signupUser.pending]:(state,action)=>{
            state.loading = true
        },
        [signinUser.pending]:(state,action)=>{
            state.loading = true
        },
        [signinUser.fulfilled]:(state,{payload:{error,token}})=>{
            state.loading = false
            if(error){
                state.error =error
                alert(error)
            }else{
                state.token = token
                AsyncStorage.setItem('token',token)
            }
          },
    }

})

export const {logout}  = authReducer.actions
export default authReducer.reducer