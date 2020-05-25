import * as axiosHelper from './axiosHelper';
import { PATH_BASE_URL, PATH_CREATE_GROUP, PATH_GET_ALL_OWN_GROUPS } from './constants';

/*
 * Returns
 * 200 [{group_id: ...,
 *     group_name: "...",
 *     username: "..."},
 *   ...
 *   ]
 * 500 { error: "Internal Server Error" }
 */
export async function getAllOwnGroups(user) {
   try {
      const url = PATH_BASE_URL + PATH_GET_ALL_OWN_GROUPS;
      const response = await axiosHelper.post(url, 'getAllOwnGroups', user);
      return response.data;
   } catch (error) {
      console.log('error on getAllOwnGroups', error);
      return error.response.data;
   }
}

/*
 * Returns
 * 201 { groupId: ... }
 * 500 { error: "Internal Server Error" }
 */
export async function createGroup(user, name) {
   try {
      const url = PATH_BASE_URL + PATH_CREATE_GROUP;
      const response = await axiosHelper.post(url, 'createGroup', { ...user, name });
      return response.data;
   } catch (error) {
      console.log('error on createGroup', error);
      return error.response.data;
   }
}
