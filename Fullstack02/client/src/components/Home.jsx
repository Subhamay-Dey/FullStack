import React from 'react'
import axios, { Axios } from 'axios'
import { useEffect } from 'react';
import { text } from 'body-parser';
import { response } from 'express';
import { set } from 'mongoose';

const Home = () => {

    const [alltodo, setAlltodo] = React.useState([]);
    const [text, setText] = React.useState('');
    const [description, setDescription] = React.useState('');

    const getdata = async() => {
        const response = await Axios.get('http://localhost:8080/todo');
        setAlltodo(response.data);
    }

    useEffect(() => {
        getdata();
    },[])



  return (
    <>

    </>
  )
}

export default Home