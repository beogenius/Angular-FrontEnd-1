import {Component, OnInit} from '@angular/core';
import {Users} from '../../users';
import {RestService} from '../../rest.service';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rest',
  templateUrl: './rest.component.html',
  styleUrls: ['./rest.component.css']
})
export class RestComponent implements OnInit {
  users: Users[] = [];
  firstName: any;
  id: any;
  p: number = 1;

  constructor(public rs: RestService, private router: Router) {
    this.rs.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  ngOnInit(): void {
    this.rs.getUsers().subscribe((response) => {
      this.users = response;
    });

  }

  Search() {
    if (this.firstName == '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter(res => {
        return res.firstName.toLocaleLowerCase().match(this.firstName.toLocaleLowerCase());
      });
    }
  }

  SearchbyID() {
    if (this.id == '') {
      this.ngOnInit();
    } else {
      this.users = this.users.filter(res => {
        return res.id.toString().match(this.id.toString());
      });
    }
  }

  key: string = 'id';
  reserve: boolean = false;

  sort(key: any) {
    this.key = key;
    this.reserve = !this.reserve;
  }

  sortByFirstName(key: any) {
    this.key = key;
    this.reserve = !this.reserve;
  }

  sortByLastName(key: any) {
    this.key = key;
    this.reserve = !this.reserve;
  }

  sortByEmail(key: any) {
    this.key = key;
    this.reserve = !this.reserve;

  }

  sortBySalary(key: any) {
    this.key = key;
    this.reserve = !this.reserve;

  }

  update(id: any) {
    this.router.navigate(['/layout/update/', id]);
    this.rs.getUsers().subscribe((response) => {
      this.users = response;
    });
  }

  isAllCheckBoxChecked() {
    return this.users.every(user => user.checked);
  }

  // @ts-ignore
  checkAllCheckBox(ev) {
    this.users.forEach(x => x.checked = ev.target.checked);
  }

  msg: string;
  clss: string;

  deleteProducts(): void {
    const selectedUsers: any = this.users.filter(user => user.checked).map(user => user.id);
    console.log(selectedUsers);

    function showErrorAlert() {
      Swal.fire('Bac Si Hai: Co Bug!', 'You must select at least one User', 'error');
    }

    function showSuccessAlert() {
      Swal.fire('Success!', 'Delete User Successfull', 'success');
    }

    if (selectedUsers.length > 0) {
      Swal.fire({
        title: 'Are you sure to Delete User ID : ' + selectedUsers + '?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          {
            this.rs.deleteProducts(selectedUsers)
              .subscribe(res => {
                  this.clss = 'grn';
                  showSuccessAlert();
                  this.rs.getUsers().subscribe((response) => {
                    this.users = response;
                  });
                }, err => {
                  this.clss = 'rd';
                  alert('Something went wrong during deleting products');
                  console.log(err);
                }
              );

          }
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }
      });
    } else {
      this.clss = 'rd';
      showErrorAlert();
    }
  }
}
