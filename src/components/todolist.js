import React from 'react';
import Todo from './todo';

export default function todolist({todolist, onCheckBtnCheck}) {
  return (
    <>
        {
            todolist.map(todo => 
                <Todo key={todo.id} todo={todo} 
                    onCheckBtnCheck={onCheckBtnCheck}/>)
        }
    </>
  )
}
