import logo from './logo.svg';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import React, { Component } from 'react';
import './App.css';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
import Axios from 'axios';


class App extends Component
{
   state = 
   {
      todos: [] 
   }

   componentDidMount(){
     Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res=> {this.setState({ todos:res.data})})
   }

   // Toggle Complete
   markComplete = (id) =>{
       this.setState({ todos: this.state.todos.map(todo => {
         if(todo.id === id){
           todo.completed = !todo.completed
         }
         return todo;
       })});
   }

   //Delete Todo
   deleteTodo = (id) =>
   {
      Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(res=> this.setState({todos: [...this.state.todos.filter(todo=> todo.id !== id)]}));
    
   }

   //Add Todo
   addTodo = (title) =>{
     Axios.post('https://jsonplaceholder.typicode.com/todos',
     {title: title, completed:false}).then(res => this.setState({todos:[...this.state.todos,res.data]}));

   }
  render()
  {
    console.log(this.state.todos)
    return (        
     <Router>
        <div me="App">  
          <div className="container">
            <Header/>      
            <Route exact path="/" render={props =>(
              <React.Fragment>
                <AddTodo addTodo={this.addTodo}/>
                <Todos lstTodos={this.state.todos} markComplete={this.markComplete} deleteTodo={this.deleteTodo}/>
                <img src={logo} className="App-logo" alt="logo"/>
              </React.Fragment>
            )}/>

            <Route path="/About" component={About} />
            
          </div>
        </div>   
     </Router>   
    );
  }
 
}

export default App;
