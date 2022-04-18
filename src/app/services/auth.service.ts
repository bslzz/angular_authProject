import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from 'src/config/api';

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
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(SERVER_API_URL);
  }

  registerUser(user: IUser) {
    return this.http.post(
      SERVER_API_URL + '/user/createuser',
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
}
