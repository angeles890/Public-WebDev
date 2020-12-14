import React, { Component } from 'react';
import TodoItem from './Todoitem'
import PropTypes from 'prop-types';

/*
    https://www.youtube.com/watch?v=sBws8MSXN7A
*/
class Todos extends Component {



    render() {
        return this.props.lstTodos.map((li) => (

            <TodoItem key={li.id} liTodo={li} markComplete={this.props.markComplete} deleteTodo={this.props.deleteTodo} />
        
        ));
    }
}

Todos.propTypes = {
    lstTodos: PropTypes.array.isRequired,
    markComplete: PropTypes.func.isRequired, 
    deleteTodo: PropTypes.func.isRequired
}
export default Todos;
