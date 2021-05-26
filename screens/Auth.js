import React,{useState} from 'react'
import { View, Text,TextInput,Button ,StyleSheet,TouchableOpacity} from 'react-native'
import {useDispatch,useSelector} from 'react-redux'
import {signinUser,signupUser} from '../reducers/authReducer'
const Auth = () => {
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [auth,setAuth] = useState("signin")
    const dispatch  = useDispatch()
    const Authenticate = ()=>{
        if(auth=='signin'){
             dispatch(signinUser({email,password}))
        }else{
            dispatch(signupUser({email,password}))
        }
    }
    return (
        <View style={styles.con}>
            <Text style={styles.text}>please {auth} !!</Text>
             <TextInput 
              keyboardType="email-address"
              placeholder="email"
              value={email}
              style={styles.textinp}
              onChangeText={text=>setEmail(text)}
             />
             <TextInput 
              secureTextEntry
              placeholder="password"
              style={styles.textinp}
              value={password}
              onChangeText={text=>setPassword(text)}
             />
             {
                 auth=="signin"?
                 <TouchableOpacity onPress={()=>setAuth("signup")}><Text style={{textAlign:"center",fontSize:18}}>Dont have an account ?</Text></TouchableOpacity>
                 : <TouchableOpacity onPress={()=>setAuth("signin")}><Text style={{textAlign:"center",fontSize:18}}>Already have an account ? ?</Text></TouchableOpacity>

             }
            
             <Button 
              title={auth}
              color="#ff4081"
              onPress={()=>Authenticate()}
             />
        </View>
    )
}
 const styles = StyleSheet.create({
     con:{
         height:"50%",
         justifyContent:"space-around",
         marginHorizontal:20
     },
     text:{
         fontSize:24,
         textAlign:"center"
     },
     textinp:{
         height:50,
         borderColor:"#ff4081",
         borderWidth:2
     }

 })
export default Auth
