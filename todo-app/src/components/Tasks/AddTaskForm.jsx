import axios from "axios";
import { React, useState } from "react";
import Plus from '../../assets/img/plus.svg'

const AddTaskForm = ({ list, onAddTask }) => {
   const [visibleForm, setFormVisible] = useState(false);
   const [inputValue, setInputValue] = useState('');
   const [isLoading, setIsLoading] = useState('')

   const toggleFormVosible = () => {
      setFormVisible(!visibleForm);
      setInputValue('');
   };
   const addTask = () => {
      const obj = {
         listId: list.id,
         text: inputValue,
         completed: false
      };
      setIsLoading(true);
      axios.post('http://localhost:3001/tasks', obj).then(({ data }) => {
         onAddTask(list.id, data);
         toggleFormVosible();
      })
         .catch((e) => {
            alert('Помилка при добавленні задачи');
         })
         .finally(() => {
         setIsLoading(false);
      })
   };
   return (<div className="tasks__form">
      {!visibleForm ? (<div onClick={toggleFormVosible} className="tasks__form-new">
         <img src={Plus} alt='Add icon' className="form__img" />
         <span className="form__title">Нова задача</span>
      </div>) : (<div className="tasks__form-block">
            <input
               value={inputValue}
               onChange={e => setInputValue(e.target.value)}
            className="field"
            type="text"
            placeholder="Текст задачі" />
            <button disabled={isLoading} onClick={addTask} className="button">{isLoading ? 'Добавлення' : 'Добавити'}</button>
            <button onClick={toggleFormVosible} className="button--grey">Відмінити</button>
      </div>)}
   </div>);
};

export default AddTaskForm;