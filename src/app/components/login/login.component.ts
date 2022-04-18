import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  toastMsgClass: string = '';
  displayMsg: string = '';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
  });

  onFormSubmit() {
    this.authService.loginUser(this.loginForm.value).subscribe((res) => {
      if (res === 'Failed') {
        this.displayMsg = 'Invalid email/password!';
        this.toastMsgClass = 'bi bi-x-octagon-fill text-danger';
      } else {
        this.authService.setToken(res);
        this.displayMsg = 'Success!';
        this.toastMsgClass = 'bi bi-check-circle text-success';
        this.loginForm.reset();
      }
    });
  }

  get email(): FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
}
