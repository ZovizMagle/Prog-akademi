import React from "react";
import axios from "axios";

import './Tasks.css';
import Pen from '../../assets/img/pen.svg'
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

const Tasks = ({ lists, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask }) => {
   const editTitle = () => {
      const newTitle = window.prompt('Назва списку', lists.name);
      if (newTitle) {
         onEditTitle(lists.id, newTitle);
         axios.patch('http://localhost:3001/lists/' + lists.id, {
            name: newTitle
         }).catch(() => {
            alert('Не вдалось оновити назву списку');
         });
      }
   };


   return (
   <div className='tasks'>
         <h1 className='tasks__title' style={{color: lists.color.hex}}>{lists.name}<img onClick={editTitle} className="tasks__pen-svg" src={Pen} alt='Pen' /></h1>
         <div className="tasks__items">
            {!withoutEmpty && lists.tasks && !lists.tasks.length && <h2 className="tasks__null">Задачі відсутні</h2>}
            {lists.tasks && lists.tasks.map(task =>
               <Task
                  key={task.id}
                  list={lists}
                  onEdit={onEditTask}
                  onComplete={onCompleteTask}
                  onRemove={onRemoveTask}
                  {...task}
               />
            )}
            <AddTaskForm
               key={lists.id}
               list={lists}
               onAddTask={onAddTask}
            />
         </div>
   </div>
   )
}



export default Tasks;