export const GET_METHOD = () => {
  return {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const POST_METHOD = (body) => {
  return {
    method: "POST",
    body: JSON.stringify(body),
    //mode: "no-cors",
    headers: new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    }),
  };
};
