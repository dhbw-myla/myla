import axios from 'axios';

const config = {
   headers: {
      'Content-Type': 'application/json',
   },
};

export const get = (url, method) => {
   return axios
      .get(url)
      .then((response) => {
         return response;
      })
      .catch((err) => {
         console.log(method, err);
         return err.response;
      });
};

export const post = (url, method, data) => {
   try {
      return axios
         .post(url, data, config)
         .then((response) => {
            return response;
         })
         .catch(async (err) => {
            console.log(method, err.response);
            return err.response;
         });
   } catch (error) {
      console.log('post error', error);
   }
};

export const put = (url, method, data) => {
   return axios
      .put(url, data, config)
      .then((response) => {
         return response;
      })
      .catch((err) => {
         console.log(method, err);
         return err.response;
      });
};

export const remove = (url, method, data) => {
   return axios
      .delete(url, data, config)
      .then((response) => {
         return response;
      })
      .catch((err) => {
         console.log(method, err);
         return err.response;
      });
};
