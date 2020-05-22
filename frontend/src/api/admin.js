import * as axiosHelper from './axiosHelper';
import { PATH_ALL_USERS, PATH_BASE_URL } from './constants';

export async function getAllUsers(user) {
   try {
      const url = PATH_BASE_URL + PATH_ALL_USERS;
      const response = await axiosHelper.get(url, 'getAllUsers');
      return response.data;
   } catch (error) {
      console.log('error on getAllUsers', error);
   }
}
