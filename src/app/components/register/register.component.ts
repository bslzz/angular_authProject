import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  confirmPass: string = 'none';
  isAccountCreated: boolean = false;

  constructor(private authService: AuthService) {}

  displayMsg: string = '';
  toastMsgClass: string = '';

  ngOnInit(): void {}

  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ].*'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern('[a-zA-Z ].*'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
      Validators.pattern('[0-9]*'),
    ]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15),
    ]),
    confirmPassword: new FormControl(''),
  });

  onFormSubmit() {
    if (this.password.value === this.confirmPassword.value) {
      this.confirmPass = 'none';
      this.authService
        .registerUser(this.registerForm.value)
        .subscribe((res) => {
          if (res === 'Success') {
            this.displayMsg = 'User registered successfully!';
            this.toastMsgClass = 'bi bi-check-circle text-success';
            this.isAccountCreated = true;
            this.registerForm.reset();
          } else if (res === 'Email already exists!') {
            this.displayMsg = 'Email already exists!';
            this.toastMsgClass = 'bi bi-x-octagon-fill text-danger';
            this.isAccountCreated = false;
          } else {
            this.displayMsg = 'Error occured';
            this.toastMsgClass = 'bi bi-x-octagon-fill text-danger';
            this.isAccountCreated = false;
          }
        });
    } else {
      this.confirmPass = 'block';
    }
  }

  get firstName(): FormControl {
    return this.registerForm.get('firstName') as FormControl;
  }
  get lastName(): FormControl {
    return this.registerForm.get('lastName') as FormControl;
  }
  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get phoneNumber(): FormControl {
    return this.registerForm.get('phoneNumber') as FormControl;
  }
  get gender(): FormControl {
    return this.registerForm.get('gender') as FormControl;
  }
  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get confirmPassword(): FormControl {
    return this.registerForm.get('confirmPassword') as FormControl;
  }
}
