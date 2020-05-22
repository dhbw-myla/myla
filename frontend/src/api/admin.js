import { POST_METHOD } from './base';
import { PATH_ALL_USERS, PATH_BASE_URL } from './constants';

export async function getAllUsers(user) {
   try {
      const url = PATH_BASE_URL + PATH_ALL_USERS;
      const data = await fetch(url, POST_METHOD(user)).catch((err) => {
         console.log('getAllUsers', err);
      });
      return await data.json();
   } catch (error) {
      console.log('error on getAllUsers', error);
   }
}
