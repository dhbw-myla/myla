import Swal from 'sweetalert2';
import * as swalTypes from './swalTypes';

export const warning = (title, html, btnText) => {
   Swal.fire({
      title: title || swalTypes.WARNING + '!',
      html: html || 'Error',
      icon: swalTypes.WARNING,
      confirmButtonText: btnText || 'OK',
   });
};

export const error = (title, html, btnText) => {
   Swal.fire({
      title: title || swalTypes.ERROR + '!',
      html: html || 'Error',
      icon: swalTypes.ERROR,
      confirmButtonText: btnText || 'OK',
   });
};

export const success = (title, html, isQuick, btnText) => {
   const quick = isQuick
      ? {
           showConfirmButton: false,
           timer: 1500,
        }
      : {};

   Swal.fire({
      title: title || swalTypes.SUCCESS + '!',
      html: html || 'Success',
      icon: swalTypes.SUCCESS,
      confirmButtonText: btnText || 'OK',
      ...quick,
   });
};

export const successTimer = (title, html, endText) => {
   let timerInterval;
   Swal.fire({
      title: title || swalTypes.SUCCESS + '!',
      timer: 1000,
      html: html || 'Success',
      timerProgressBar: true,
      onBeforeOpen: () => {
         Swal.showLoading();
         timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
               const b = content.querySelector('b');
               if (b) {
                  b.textContent = Swal.getTimerLeft();
               }
            }
         }, 100);
      },
      onClose: () => {
         clearInterval(timerInterval);
      },
   }).then((result) => {
      Swal.fire({
         title: endText,
         icon: swalTypes.SUCCESS,
         timer: 1500,
         showConfirmButton: false,
      });
   });
};

export const question = async (title, html, answerTrue, answerFalse, revertButtons) => {
   const result = await Swal.fire({
      title: title,
      html: html,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: answerTrue,
      cancelButtonText: answerFalse,
      reverseButtons: revertButtons,
   }).then((result) => {
      if (result.value) return true;
      else if (result.dismiss === Swal.DismissReason.cancel) return false;
   });

   return result;
};
