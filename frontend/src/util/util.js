export const checkIfUndefiniedOrNull = (value) => {
   return undefined === value || null === value;
};

export const create_UUID = () => {
   var dt = new Date().getTime();
   var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
   });
   return uuid;
};

export const parseToJsonObject = (obj) => {
   try {
      return JSON.parse(obj);
   } catch (error) {
      console.log(error);
      return undefined;
   }
};

export const getFading = (type) => {
   if (type === 1) return 'fadeInLeft';
   else if (type === 2) return 'fadeInUp';
   else if (type === 3) return 'fadeInRight';
};
