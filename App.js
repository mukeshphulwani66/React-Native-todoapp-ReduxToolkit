import { StatusBar } from 'expo-status-bar';
import React,{useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AuthScreen from './screens/Auth'

import TodoScrren from './screens/Todo'

import {configureStore} from '@reduxjs/toolkit'
import authReducer,{addToken} from './reducers/authReducer'
import todoReducer from './reducers/todoReducer'
import {Provider,useSelector,useDispatch} from 'react-redux'

const store = configureStore({
  reducer:{
    user:authReducer,
    todos:todoReducer
  }
})
function App() {
  const token = useSelector(state => state.user.token)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(addToken())
  },[])
  return (
    <>
    {token ? <TodoScrren /> :<AuthScreen />  }
   
    </>
  );
}

export default ()=>{
  return (
    <Provider store={store}>
      <App/>
     </Provider>
  )
}


