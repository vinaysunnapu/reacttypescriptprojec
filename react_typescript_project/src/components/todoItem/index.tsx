import './index.css'


interface TodoItemProps {
    todo: {
      id: string;
      task: string;
    };
    deleteTodo: (id: string) => void;
  }

  

const TodoItem:React.FC<TodoItemProps> = (props) =>{
    const {todo,deleteTodo} = props

    const onDeleteTodo = () =>{
       deleteTodo(todo.id)
    }

    return(
        <li className="list-item">
            <p>{todo.task}</p>
            <button type="button" className="del-button" onClick={onDeleteTodo}>Delete</button>
        </li>
    )

}

export default TodoItem