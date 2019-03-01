import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  userDetails: User;
  userProfileForm : FormGroup;
  constructor(private formBuilder: FormBuilder,
            private userService: UserService, 
            private router: Router) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails.displayName)
      },
      err => {}
    );
  }

}
