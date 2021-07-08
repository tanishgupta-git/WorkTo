import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import Login from './screens/login';
import Signup from './screens/signup';
import AddTodo from './screens/addtodo';
import Todo from './screens/todo';


const Stack = createStackNavigator();



export default function App() {
  const [todos,setTodos] = useState();
  return (
// starting of the app
    <NavigationContainer>
      <Stack.Navigator>
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
          <Stack.Screen name="Signup" options={{headerShown: false}} component={Signup}  />
          {/* render home and addtodo screen in a different way becuase of passing props form app component  */}
          <Stack.Screen name="Home" options={{headerShown: false}} >
            {props => <Home {...props} todos={todos} setTodos={setTodos} />}
          </Stack.Screen>
          <Stack.Screen name="AddTodo" options={{  headerTitle:'AddTask',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}} >
            {props => <AddTodo {...props} todos={todos} setTodos={setTodos} />}
          </Stack.Screen>
          <Stack.Screen name="Todo" options={{  headerTitle:'Task',headerStyle: {backgroundColor: '#3450A1',height:60},headerTintColor: '#ffffff'}}>
            {props => <Todo {...props} setTodos={setTodos} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>

  );

}