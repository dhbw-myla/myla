import Swal from 'sweetalert2';
import * as swalTypes from './swalTypes';

export const error = (text, btnText) => {
   Swal.fire({
      title: swalTypes.ERROR + '!',
      text: text || 'Error',
      icon: swalTypes.ERROR,
      confirmButtonText: btnText || 'OK',
   });
};

export const success = (text, btnText) => {
   Swal.fire({
      title: swalTypes.SUCCESS + '!',
      text: text || 'Success',
      icon: swalTypes.SUCCESS,
      confirmButtonText: btnText || 'OK',
   });
};
