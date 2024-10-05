import { useState } from 'react'
import './App.css'

export default function App() {
  const [todos, setTodos] = useState([
    {
      title: "Go to gym",
      description: "hit the gym regularly",
      done: false,
    }
  ]);
  
  function addTodo() {
    let newArray = [...todos];
  
    
    newArray.push({
      title: "Eat healthy",
      description: "eat healthy food",
      done: true,
    });
  
    setTodos(newArray); 
  }
  
  return (
    <div>
      <input type="text" placeholder="Title"></input>
      <input type="text" placeholder="description"></input>
      <button onClick={addTodo}>Add todo</button>
      {JSON.stringify(todos)}
    </div>
  );
}  