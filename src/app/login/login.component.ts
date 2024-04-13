import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../services/auth.service";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string | undefined;
  password: string | undefined;

  constructor(private as:AuthService) { }

  async login() {
    try{
      let response = await this.as.loginWithHttpClient(this.username!, this.password!);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
}
