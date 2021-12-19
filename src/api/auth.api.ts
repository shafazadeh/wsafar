
interface IResponse<T> {
  hasError: boolean;
  errorDescription: string;
  errorCode: number;
  content: T[] | T;
  totalCount: number;
}

export default class AuthApi {
  static getToken = async (code: string, code_verifier: string) => {
    const BASE_URL = process.env.REACT_APP_POD_SSO_TOKEN || "";

    const params = [
      ["grant_type", "authorization_code"],
      ["client_id", process.env.REACT_APP_CLIENT_ID || ""],
      ["code", code],
      ["code_verifier", code_verifier],
      [
        "redirect_uri",
        window.location.href.slice(0, window.location.href.indexOf("?")) ||
          process.env.REACT_APP_REDIRECT_URI ||
          ""
      ]
    ];
    const url = new URL(BASE_URL);
    url.search = new URLSearchParams(params).toString();
    

    return fetch(url.toString(), {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/x-www-form-urlencoded"
      })
    }).then(res => res.json());
  };

  static refreshToken = async (
    refresh_token: string,
    code_verifier: string
  ) => {
    const BASE_URL = process.env.REACT_APP_POD_SSO_TOKEN || "";
    if(refresh_token && refresh_token !== "undefined" && code_verifier && code_verifier !== "undefined"){
      const params = {
        grant_type: "refresh_token",
        client_id: process.env.REACT_APP_CLIENT_ID || "",
        refresh_token: refresh_token || "",
        code_verifier: code_verifier || ""
      };
      const url = new URL(BASE_URL);
      url.search = new URLSearchParams(params).toString();
      return fetch(url.toString(), {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded"
        })
      }).then(res => res.json());
    }
   
  };

  static getUser = async (access_token: string) => {
    const url = process.env.REACT_APP_POD_SSO;
    return fetch("https://accounts.pod.ir/users", {
      headers: new Headers({ Authorization: `Bearer ${access_token}` })
    }).then(res => res.json());
  };

}
