import React, {Component} from 'react'
import PropTypes from 'prop-types'


export class TodoItem extends Component {
    getStyle = () => {
        
        return { 
            background: '#f4f4f4',
            padding: '10px',
            borderBottom: '1px #ccc dotted',
            textDecoration: this.props.liTodo.completed ? 'line-through': 'none'
        }
         
    }


    render(){
        const {id,title} = this.props.liTodo;
        return (
            <div style={ this.getStyle() }>
                <p>
                    <input type="checkbox" defaultChecked={ this.props.liTodo.completed} onChange={this.props.markComplete.bind(this,this.props.liTodo.id)} /> 
                    {' '}
                    { title }
                    <button type="button" onClick={this.props.deleteTodo.bind(this,id)} style={btnStyle}>X</button>
                </p>
            </div>
        )
    }
}

//PropTypes
TodoItem.propTypes = {
    liTodo: PropTypes.object.isRequired, 
    markComplete: PropTypes.func.isRequired, 
    deleteTodo: PropTypes.func.isRequired
}

const btnStyle = {
    background: '#ff0000', 
    color: '#fff', 
    border: 'none', 
    padding: '5px 10px', 
    borderRadius: '100%', 
    cursor: 'pointer', 
    float: 'right'
}

export default TodoItem