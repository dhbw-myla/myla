import React from 'react';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

export const trash = () => {
  return <FontAwesomeIcon icon={faTrash} />
}

export const plus = () => {
    return <FontAwesomeIcon icon={faPlusCircle} />
  }