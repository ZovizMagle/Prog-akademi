import React from "react";
import './List.css';
import classNames from "classnames";
import Badge from "../Badge";
import X from '../../assets/img/X.svg'
import axios from "axios";


const List = ({ items, isRemovable, onClick, onRemove, onClickItem, activeItem }) => {

   const removeList = item => {
      if (window.confirm("Дійсно хочете видалити список?")) {
         axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
            onRemove(item.id);
         });
      }
   };

   return (
      <ul onClick={onClick} className="todo__list">
      {
         items.map((item, index) => (
            <li key={index}
               className={classNames(item.className, { active: item.active ? item.active : activeItem && activeItem.id === item.id }, 'todo__item')}
               onClick = {onClickItem ? () => onClickItem(item) : null}
            >
         <i>
            {item.icon ? item.icon : <Badge color={item.color.name} />}
         </i>
               <span className="list__name">{item.name}{ item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}</span>
               {isRemovable && (<img
                  onClick={() => removeList(item)}
                  className="list__remove-icon"
                  src={X} alt="close" />
               )}
            </li>
         ))}
      </ul>
   )
}


export default List;

