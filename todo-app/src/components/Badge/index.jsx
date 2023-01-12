import React from 'react';
import './Badge.css';
import classNames from 'classnames';



const Badge = ({ color, onClick, className }) => (
   <i
      onClick={onClick}
      className={classNames('badge', { [`badge--${color}`]: color }, className)}>
   </i>
);
   

export default Badge