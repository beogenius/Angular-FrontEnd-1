import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Users} from './users';
import {Observable, of} from 'rxjs';
import {UserFetch} from './userFetch';
import {map} from 'rxjs/operators';

//make the service class singleton.
@Injectable({
  providedIn: 'root'
})

export class RestService {
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers,
  };
  users: Users[] = [];

  constructor(private http: HttpClient) {
  }

  url: string = 'http://localhost:8080/api/v1/';

  getUsers() {
    return this.http.get<Users[]>(this.url);
  }

  deleteUser(id: number): Observable<Users> {
    const url = `${this.url}/${id}`;
    return this.http.delete<Users>(url, this.httpOptions);
  }

  getUpdateUser(id: number): Observable<Users> {
    const url = `${this.url}/${id}`;
    return this.http.get<Users>(url, this.httpOptions);
  }

  updateUser(user: UserFetch): Observable<Users> {
    const url = `${this.url}/users/${user.id}`;
    return this.http.put<Users>(url, user, this.httpOptions).pipe(
      map(() => user)
    );
  }


  deleteProducts(ids: string[]) {

      const data = {'ids': ids};
      const resp = this.http.post<Users>( `${this.url}/deleteall`,data, this.httpOptions);//.map(resp => {return resp;}).catch(err => {console.log(err);});
      //console.log('resp: ' + resp);
      return resp;
    return of({});
  }

  add(user: Users) {
    return this.http.post(`${this.url}/create`,user,this.httpOptions);
  }
}
