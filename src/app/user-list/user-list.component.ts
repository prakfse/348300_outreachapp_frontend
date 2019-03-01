import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService, 
              private router: Router) { }


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
  
    userData: MatTableDataSource<User> ;
    users: User[];
    displayedColumns: string[] = ['firstName','lastName', 'displayName', 'email', 'action'];
  
    ngOnInit() {
      this.getUserList();
    }
  
    getUserList(){
      return this.userService.getUserList()
              .subscribe((userDet: User[]) => {               
                this.userData = new MatTableDataSource();
                this.userData.data = userDet;
                this.userData.paginator = this.paginator;
                this.userData.sort = this.sort;
      });
    }

    applyFilter(filterValue: string) {
    this.userData.filter = filterValue.trim().toLowerCase();
  }
  
  }