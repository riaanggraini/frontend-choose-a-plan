import { makeObservable, observable, computed, action } from "mobx";
import api from "../service/auth";

class AuthStore {
  token = null;
  error = null;

  constructor() {
    makeObservable(this, {
      token: observable,
      error: observable,
      getToken: computed,
      errorMessage: computed,
      login: action,
    });
  }

  login = async (data) => {
    try {
      const authentication = await api.auth.login(data);
      const token = authentication.data.data.token;
      this.token = token;
      await this.setCookie(token);
    } catch (error) {
      this.error = error.response.data.message;
    }
  };

  setCookie = (token) => {
    localStorage.setItem("token", token);
  };

  get getToken() {
    return this.token;
  }

  get errorMessage() {
    return this.error;
  }
}

export const authStore = new AuthStore();
