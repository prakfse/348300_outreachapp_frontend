import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder,FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  responseMessage: string;
  isSuccess: boolean;
  
  constructor(private formBuilder: FormBuilder, 
  private userService: UserService, 
  private router: Router) { }
  
  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      displayName: ['', [Validators.required]]
    });
   }

   addUser(){
    if (this.signupForm.valid) {
      let data = this.signupForm.value;
      this.userService.addUser(data).subscribe(
        res => {
          this.isSuccess = true;
          this.router.navigate(['/userprofile']);
        },
        err => {
          this.isSuccess = false;
          if(err.status === 422) {
          this.responseMessage = err.error.join('</br>');
          }
          else{
            this.responseMessage = "Something went wrong. Please condact admin.";
          }
        }
    )};
  }
}
