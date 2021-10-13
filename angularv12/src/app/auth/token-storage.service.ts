import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const EMAIL_KEY = 'AuthEmail';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  // log out and destroy token
  signOut() {
    window.sessionStorage.clear();
  }

  // save token
  public saveToken(token: string | undefined) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    if (typeof token === "string") {
      window.sessionStorage.setItem(TOKEN_KEY, token);
    }
  }

  // get token
  public getToken(): string {
    return <string>sessionStorage.getItem(TOKEN_KEY);
  }

  // save email
  public saveEmail(email: string | undefined) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    if (typeof email === "string") {
      window.sessionStorage.setItem(EMAIL_KEY, email);
    }
  }

  // get email
  public getEmail(): string {
    return <string>sessionStorage.getItem(EMAIL_KEY);
  }

}
