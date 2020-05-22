import { faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export const trash = () => {
   return <FontAwesomeIcon icon={faTrash} />;
};

export const plus = () => {
   return <FontAwesomeIcon icon={faPlusCircle} />;
};
