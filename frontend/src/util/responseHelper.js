/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON, status from the response
 */
export default (response) => {
  try {
    return {
      status: response.status,
      ok: response.ok,
      payload: response.data,
    };
  } catch (e) {
    console.log(e);
  }
};
