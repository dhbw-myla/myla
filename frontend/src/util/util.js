export const checkIfUndefiniedOrNull = (value) => {
   return undefined === value || null === value;
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
