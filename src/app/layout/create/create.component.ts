import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  userForm: FormGroup;

  constructor(private  fb: FormBuilder, public route: ActivatedRoute, public router: Router, public rs: RestService) {
    this.userForm = this.fb.group({

      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      salary: ['', Validators.required],
    });
  }

  get f() {
    return this.userForm.controls;
  }

  ngOnInit(): void {
  }


  createUser() {
    const data = this.userForm.value;
    console.log(this.userForm.value);
    this.rs.add(data).subscribe(res=>{});
    Swal.fire('Success!', 'Create User '+ this.userForm.get('firstName')?.value+' Successfull', 'success');
    this.router.navigateByUrl('/layout/list');
  }
}
