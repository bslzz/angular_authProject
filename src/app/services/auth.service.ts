import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/config/api';
import { JwtHelperService } from '@auth0/angular-jwt';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);

  jwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(SERVER_API_URL);
  }

  registerUser(user: IUser) {
    return this.http.post(
      `${SERVER_API_URL}/createuser`,
      {
        FirstName: user.firstName,
        LastName: user.lastName,
        Email: user.email,
        PhoneNumber: user.phoneNumber,
        Gender: user.gender,
        Password: user.password,
      },
      {
        responseType: 'text',
      }
    );
  }

  loginUser(user: IUser) {
    return this.http.post(
      `${SERVER_API_URL}/loginUser`,
      {
        Email: user.email,
        Password: user.password,
      },
      {
        responseType: 'text',
      }
    );
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.getTokenDetails();
  }

  getTokenDetails() {
    const token = localStorage.getItem('token');

    const userInfo = token && this.jwtHelperService.decodeToken(token);

    const userData = userInfo && {
      id: userInfo.id,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      phoneNumber: userInfo.phoneNumber,
      gender: userInfo.gender,
    };

    this.currentUser.next(userData);
  }
}
