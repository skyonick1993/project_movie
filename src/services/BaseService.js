import axios from "axios";
import { DOMAIN, TOKEN, TOKEN_CYBERSOFT } from "../util/settings/config";

export default class BaseService {
  put = (url, model) => {
    return axios({
      method: "PUT",
      url: `${DOMAIN + url}`,
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  };

  post = (url, model) => {
    return axios({
      method: "POST",
      url: `${DOMAIN + url}`,
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  };

  get = (url) => {
    return axios({
      method: "GET",
      url: `${DOMAIN + url}`,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  };

  delete = (url, model) => {
    return axios({
      method: "DELETE",
      url: `${DOMAIN + url}`,
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN),
        TokenCybersoft: TOKEN_CYBERSOFT,
      },
    });
  };
}
