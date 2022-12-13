const setResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
  return response;
};

const setServerError = (error, response) => {
  response.status(500);
  response.json(error);
  return response;
};

const setRequestError = (error, response) => {
  response.status(400);
  response.json(error);
  return response;
};

export { setResponse, setRequestError, setServerError };
