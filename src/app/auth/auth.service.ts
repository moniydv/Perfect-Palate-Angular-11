import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { User } from './user.model';

export interface authResponse {
  "idToken": string,
  "email": string,
  "refreshToken": string,
  "expiresIn": string,
  "localId": string,
  "registered"?: boolean
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUser = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;


  constructor(private http: HttpClient) { }

  signup(email: string, password: string): Observable<any> {
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCUQC9N_PlM2jqg_ITyu3pdgTCQvDsBZNY',
    {
      'email' : email,
      'password' : password,
      'returnSecureToken': true
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<authResponse>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCUQC9N_PlM2jqg_ITyu3pdgTCQvDsBZNY',
    {
      'email' : email,
      'password' : password,
      'returnSecureToken': true
    }).pipe(
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }
  
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    console.log(userData);
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      console.log('inside');
      this.loggedInUser.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      //this.autoLogout(expirationDuration);
    }
  }
  
  logout() {
    this.loggedInUser.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.loggedInUser.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
}
