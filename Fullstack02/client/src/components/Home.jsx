import React from 'react'
import axios, { Axios } from 'axios'
import { useEffect } from 'react';
// import { text } from 'body-parser';
// import { response } from 'express';
// import { set } from 'mongoose';

const Home = () => {

    const [alltodo, setAlltodo] = React.useState([]);
    const [text, setText] = React.useState('');
    const [description, setDescription] = React.useState('');

    const getdata = async() => {
        const response = await axios.get('http://localhost:8080/todo');
        setAlltodo(response.data);
    }

    useEffect(() => {
        getdata();
    },[])

    const toaddNewTodo = async() => {
        Axios.get('http://localhost:8080/todo',{
            title: text,
            description: description,
        }).then(response => {
            setAlltodo([...alltodo, response.data]);
            setText('');
            setDescription('');
        })
    }

    const todoDelete = (id) => {
        Axios.delete('http://localhost:8080/:id')
        .then(() => {
            setAlltodo(prevTodo => {
                const afterDelete = prevTodo.filter(todo => todo._id !==id)
                return  afterDelete;
            })
        }).catch(error => console.log(error));
    }

  return (
    <>
        <div className='h-screen w-full flex justify-center items-center bg-slate-800 select-none'>
        <div className='h-full w-full flex justify-center items-center rounded-xl text-white'>
            <div className='block'>
            <h1 className='text-4xl text-center'>Your Todo List</h1>
            <div className='block md:flex gap-4'>
                <input className='bg-slate-800 p-3 text-slate-200 text-xl outline-none border-none' type="text" value={text} onChange={(e)=>setText(e.target.value)} placeholder="Title"/>
                <input className='bg-slate-800 p-3 text-slate-200 text-xl outline-none border-none' type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Description"/>
                <button className='bg-green-600 rounded-xl p-3 cursor-pointer' onClick={toaddNewTodo}>Add Todo</button>
            </div>

                <div className='text-white p-3'>
                    {alltodo.map(todo =>(
                        <div key={todo._id} className='flex mt-3 px-3 py-1 justify-between bg-lime-700 rounded-xl'>
                            <div className='block'><h1 className='text-xl font-bold'>{todo.title}</h1>
                            <p className='text-lg text-gray-300'>{todo.description}</p></div>
                            <button onClick={() => todoDelete(todo._id)} className='bg-red-500 p-3 cursor-pointer w-[50px] h-[50px] rounded-full'>X</button>
                        </div>
                    ))}
                </div>
                </div>
        </div>
    </div>
    </>
  )
}

export default Home