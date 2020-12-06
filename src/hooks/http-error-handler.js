import {useState, useEffect} from 'react';


export default httpClient => {

  const [errorExists, setErrorExists] = useState(null);

  const reqInterceptor = httpClient.interceptors.request.use((req) => {
    setErrorExists(null);
    return req;
  });
  const resInterceptor = httpClient.interceptors.response.use(
    (res) => res,
    (err) => {
      setErrorExists(err);
    }
  );

  const errorConfirmedHandler = () => {
    setErrorExists(null);
  };
  const {request, response} = httpClient.interceptors;
  useEffect(() => {
    return () => {
      request.eject(reqInterceptor);
      response.eject(resInterceptor);
    }
  },[request, response, reqInterceptor, resInterceptor]);

  return [errorExists, errorConfirmedHandler];
};