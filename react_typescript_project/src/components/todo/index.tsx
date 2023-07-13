import './index.css'
import {useState,useEffect} from 'react'
import TodoItem from '../todoItem'

type Todo = {
    id: string,
    task: string
}

const getItemsForLocalStorage = (): Todo[] =>{
    const storedTodoList: string | null = localStorage.getItem('todoList');
    return storedTodoList ? (JSON.parse(storedTodoList) as Todo[]) : []; // error here
}

const Todo = () =>{
const [todo,setTodo] = useState('')
const [todoList,setTodoList] = useState<Todo[]>(getItemsForLocalStorage()) 


  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

const onChangeTodo = (event:React.ChangeEvent<HTMLInputElement>) =>{
    setTodo(event.target.value)
}

const onSubmitAddTodo = (event:React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const newTodo:Todo = {
        id: new Date().getTime().toString(),
        task: todo
    }

    setTodoList([...todoList,newTodo])
    setTodo('')    
    
}

const deleteTodo = (id : string) =>{
    const filterdTodo = todoList.filter(each=>each.id!==id)
    setTodoList(filterdTodo)
}

    return(
        <div className="container">
        <form className="form-container" onSubmit={onSubmitAddTodo}>
            <input value={todo} type="text" id="input" className="input" onChange={onChangeTodo}/>
            <button type="submit" className="add-button">Add</button>     
        </form>
        <ul>
            {todoList.map(each=>{
                return(
                <TodoItem key={each.id} todo={each} deleteTodo={deleteTodo}/>
                )
            })}
        </ul>
        </div>
    )
}

export default Todo