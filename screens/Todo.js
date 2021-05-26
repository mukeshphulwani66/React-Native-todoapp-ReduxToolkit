import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,Button,TextInput,FlatList,TouchableOpacity} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {logout} from '../reducers/authReducer'
import {useDispatch,useSelector} from 'react-redux'
import {createTodo,deleteTodo,fetchTodo} from '../reducers/todoReducer' 

const Todo = () => {
    const [mytodo,setTodo] = useState("")
    const dispath = useDispatch()
    const todos = useSelector(state => state.todos)
    useEffect(()=>{
        dispath(fetchTodo())
    },[])
    const ItemList = ({title,id})=>{
        return(
            <View style={styles.list}>
                <Text style={{fontSize:20}}>{title}</Text>
                <Feather name="delete" size={30} color="#ff4081" onPress={()=>dispath(deleteTodo(id))}/>
            </View>
        )
    }
    return (
        <View style={styles.con}>
            <TextInput 
             placeholder="write todo"
             onChangeText={text=>setTodo(text)}
             style={styles.textinp}
             value={mytodo}
            />
            <Button 
             title="Add Todo"
             color="#ff4081"
             onPress={()=>dispath(createTodo({todo:mytodo}))}
            />
           <TouchableOpacity style={{marginVertical:5}}>
            <Button 
             title="Logout"
             color="#ff4081"
        
             onPress={()=>dispath(logout())}
            />
            </TouchableOpacity>

            <FlatList
             data={todos}
             renderItem={({item})=> { return <ItemList title={item.todo} id={item._id} />}  }
             keyExtractor={item=>item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    con:{
        marginHorizontal:20
    },
    text:{
        fontSize:24,
        textAlign:"center"
    },
    list:{
        padding:15,
        borderBottomColor:"grey",
        borderBottomWidth:1,
        flexDirection:"row",
        justifyContent:"space-between"
    },
    textinp:{
        height:50,
        borderColor:"#ff4081",
        borderWidth:2,
        marginVertical:10
    }

})
export default Todo
