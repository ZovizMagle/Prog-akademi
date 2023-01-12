import { React, useEffect, useState } from "react";
import axios from "axios";

import List from "../List";
import './AddButtonList.css';
import Badge from "../Badge";
import CloseSvg from '../../assets/img/close.svg'



const AddListButton = ({colors, onAdd}) => {
   const [visiblePopup, setVisiblePopup] = useState(false);
   const [selectedColor, setColor] = useState(3);
   const [isLoading, setIsLoading] = useState(false);
   const [inputValue, setInputValue] = useState('');

   useEffect(() => {
      if (Array.isArray(colors)) {
         setColor(colors[0].id);
      }
   },[colors]);


   const onClose = () => {
      setVisiblePopup(false);
      setInputValue('');
      setColor(colors[0].id)
   }
   
   const addList = () => {
      if (!inputValue) {
         alert('Введіть назву списку');
         return;
      }
      setIsLoading(true);
      axios.post('http://localhost:3001/lists', { name: inputValue, colorId: selectedColor }).then(({ data }) => {
         const color = colors.filter(c => c.id === selectedColor)[0];
         const listObj = { ...data, color, tasks: [] };
         onAdd(listObj);
         onClose();
      })
         .catch(() => {
            alert('Помилка при добавленні списку');
         })
         .finally(() => {
         setIsLoading(false);
      });
   };

   return (<div className="add-list">
      <List
         onClick = {() => setVisiblePopup(true)}
         items={[
         {
            className: 'list__add-button',
            icon: (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
               <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>),
            name: 'Додати список',
         },
      ]}
      />
      {visiblePopup && (
         <div className="add-list__popup">
            <img
               onClick={onClose}
               src={CloseSvg} alt="close" className="add-list__popup-close-btn" />
            <input
               onChange={e => setInputValue(e.target.value)}
               value={inputValue}
               className="field"
               type="text"
               placeholder="Назва списку" />
            <div className="add-list__popup-colors">
               {
                  colors.map(color => (
                     <Badge
                        onClick={() => setColor(color.id)}
                        key={color.id}
                        color={color.name}
                        className={selectedColor === color.id && 'active-point'}
                     />
                  ))
               }
            </div>
            <button onClick={addList} className="button">{isLoading ? 'Добавлення...' : 'Добавити'}</button>
      </div>)}
      </div>
   );
};

export default AddListButton;