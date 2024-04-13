import {Component} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {lastValueFrom} from "rxjs";
import {FormsModule} from "@angular/forms";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-all-todos',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgForOf
  ],
  templateUrl: './all-todos.component.html',
  styleUrl: './all-todos.component.scss'
})
export class AllTodosComponent {
  todos:any = [];
  error:string | undefined;

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    try {
      this.todos = await this.lodeTodos();
    } catch (error) {
      this.error = "Failed to load todos";
    }

  }

  async lodeTodos() {
    const url = environment.apiUrl + "/todos/";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Token ' + localStorage.getItem("token"));
    return lastValueFrom(this.http.get(url, {headers: headers}));
  }
}
