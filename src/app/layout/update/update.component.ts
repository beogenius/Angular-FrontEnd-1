import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../rest.service';
import {Users} from '../../users';
import {UserFetch} from '../../userFetch';
import Swal from "sweetalert2";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(public route:ActivatedRoute, public router: Router, public rs: RestService) { }
  user: UserFetch;
  val: any;
  users: Users[] = [];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.val = params['id'];
    });
    console.log("id: "+this.val);
    this.rs.getUpdateUser(this.val).subscribe(data =>{
      this.user =data;
    });
  }

  update() {
    this.rs.updateUser(this.user).subscribe(data=>{
    });
    Swal.fire('Success!', 'Update User '+ this.user.firstName +' Successfull', 'success');
    this.getAll();
    this.router.navigate(['/layout/list/']);
  }

  getAll(){
    this.rs.getUsers().subscribe((response)=>{
      this.users = response;
    });
  }
  getFirstName(){
    return this.user.firstName;
  }
}
