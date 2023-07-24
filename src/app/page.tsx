"use client"

import { useState } from "react"
import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  { id: "1001", text: "Passear no shopping", completed: false },
  { id: "1002", text: "Ser maravilhosa", completed: true },
  { id: "1003", text: "Ir às compras", completed: true },
  { id: "1004", text: "Assistir Barbie", completed: false },
  { id: "1005", text: "Ir ao salão de beleza", completed: false },
]

export default function Home() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([...initialTodos])
  const [enableDelete, setEnableDelete] = useState(false)
// No início do componente
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  const handleAddTodo = () => {
    const uuid = uuidv4()
    const todoObject = { id: uuid, text: todo, completed: false }
    setTodos([...todos, todoObject])
    setTodo("")
  }

  const toggleTodo = (uuid: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === uuid ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  const handleEditTodo = (uuid: string, text: string) => {
    setEditingTodoId(uuid);
    setEditedTodo(text);
  };
  
  const handleEditInputChange = (event) => {
    setEditedTodo(event.target.value);
  };
  
  const handleSaveEdit = (uuid: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === uuid ? { ...todo, text: editedTodo } : todo
      )
    );
    setEditingTodoId(null);
  };  

  const handleDeleteTodo = (uuid: string) => {
    setTodos(todos.filter((todo) => todo.id !== uuid))
  }
  return (
    <main className="w-screen h-screen flex items-center justify-center bg-[url('../assets/barbie1.jpg')] bg-right-top object-fill bg-no-repeat ">      
      <div className='bg-pink-400 container max-w-lg p-4 rounded-md flex flex-col gap-6'>
        <h1 className='mx-auto text-2xl uppercase font-black'>To do Barbie Dev </h1>
        <div className='flex w-full justify-between'>
          <input
            type='text'
            className='bg-pink-200 px-4 py-2 rounded-md'
            placeholder='Add a Todo'
            value={todo}
            onChange={(e) => {
              setTodo(e.target.value)
            }}
          />
          <button
            className='px-8 py-2 bg-pink-200 font-black text-slate-900 rounded-md
            cursor-pointer hover:bg-pink-500 hover:text-pink-50
            transition-all ease-in-out'
            onClick={handleAddTodo}
          >
            Add
          </button>
          <button
            className='bg-pink-200 px-4 py-1 rounded-md text-slate-900 hover:bg-pink-500 hover:text-slate-200'
            onClick={() => setEnableDelete(!enableDelete)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              className='w-4 h-4'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
              />
            </svg>
          </button>
        </div>
       <ul className='flex flex-col gap-4 w-full bg-pink-200 rounded-md p-4'>
  {todos.map(({ id, text, completed }) => (
    <li
      className={`w-full px-4 py-2 rounded-md flex justify-between items-center  
      ${
        completed
          ? "bg-pink-400 hover:bg-pink-300 line-through"
          : "bg-pink-50 hover:bg-pink-600"
      } text-slate-900 font-bold`}
      key={id}
    >
      {editingTodoId === id ? (
        // Campo de edição quando estiver no modo de edição
        <>
          <input
            type='text'
            value={editedTodo}
            onChange={handleEditInputChange}
          />
          <button
            className='bg-pink-200 px-2 py-1 rounded-md font-black text-slate-900
            cursor-pointer hover:bg-pink-500 hover:text-pink-50
            transition-all ease-in-out'
            onClick={() => handleSaveEdit(id)}
          >
            Save
          </button>
        </>
      ) : (
        // Item da lista quando não estiver no modo de edição
        <>
          <p className='w-full cursor-pointer' onClick={() => toggleTodo(id)}>
            {text}
          </p>
          <div className='flex'>
            {enableDelete && (
              <button
                className='bg-pink-200 px-2 py-1 z-10 rounded-md text-slate-900 hover:bg-pink-500 hover:text-slate-200 mr-2'
                onClick={() => handleDeleteTodo(id)}
              >
                Delete
              </button>
            )}
            <button
              className='bg-pink-200 px-2 py-1 rounded-md text-slate-900 hover:bg-pink-500 hover:text-slate-200'
              onClick={() => handleEditTodo(id, text)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-4 h-4'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1.5'
                  d='M19 21a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h9m4 4l-4-4m0 0L9 16m4-4V3'
                />
              </svg>
            </button>
            </div>
           </>
         )}
       </li>
      ))}
    </ul>
   </div>
  </main>
  )
}
