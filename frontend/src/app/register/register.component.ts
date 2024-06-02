import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    pic: '',
  };
  userPhoto = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  backgorund = document.getElementById('bkg');
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.backgorund.style.backgroundImage = 'url(../assets/register.png)';
    this.backgorund.style.backgroundSize = 'cover';
  }
  ngOnDestroy(): void {
    this.backgorund.style.backgroundImage = '';
  }

  onSubmit(): void {
    const { username, email, password, pic } = this.form;

    this.authService.register(username, email, password, pic).subscribe({
      next: (data) => {
        console.log(pic);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
    });
  }


}
