import Axios, { AxiosResponse, AxiosError } from "axios";
import { get } from "lodash";
interface IResponse<T> {
  count: number;
  errorCode: number;
  hasError: boolean;
  messageId: number;
  ott: string;
  referenceNumber: string;
  result: any;
}

const handleError = (error: AxiosError) => {
  const errorMessage = get(error, "response.data.errorDescription");

  if (errorMessage) return Promise.reject(errorMessage);
  else return Promise.reject("درخواست با خطا مواجه شد");
};

export default class Api {
  static getAll = async <T>(url: string,token:string) => {
    try {
      let config = {
        headers: {
          _token_: token,
          _token_issuer_:1

        }
      }
      const result = (await Axios.get(url,config)) as AxiosResponse<IResponse<T>>;

      if (result.data.hasError) {
        return Promise.reject(result.data.errorCode);
      }
      if (result.data.result && result.data.result.result && JSON.parse(result.data.result.result).error) {
        return Promise.reject( JSON.parse(result.data.result.result).message);
      }
      return result.data;
    } catch (error) {
      return handleError(error);
    }
  };

  static update = async <T>(url: string,token:string) => {
    try {
      let config = {
        headers: {
          _token_: token,
          _token_issuer_:1

        }
      }
 
      const result = (await Axios.post(url,{},config)) as AxiosResponse<IResponse<T>>;

      if (result.data.hasError) {
        return Promise.reject(result.data.errorCode);
      }
      return {  ...result.data };
    } catch (error) {
      return handleError(error);
    }
  };
  static create = async <T>(token:string,url: string) => {
      try {
        let config = {
          headers: {
            _token_: token,
            _token_issuer_:1
          }
        }
        const result = (await Axios.get(url,config)) as AxiosResponse<
          IResponse<T>
        >;
        if (result.data.hasError) {
          return Promise.reject(result.data.errorCode);
        }

        return result.data
         
      } catch (error) {
        return handleError(error);
      }
    };

}
