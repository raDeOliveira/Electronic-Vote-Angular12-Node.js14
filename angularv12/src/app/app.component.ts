import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  authority: string | undefined;
  info: any;
  userInfo: any;
  errorMessage: string | undefined;

  constructor(private tokenStorage: TokenStorageService, private token: TokenStorageService,
              private userService: UserService) { }

  // @ts-ignore
  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.authority = 'user';
      this.info = {
        token: this.token.getToken(),
        email: this.token.getEmail(),
      };
      // get user info
      this.userService.getUserBoard().subscribe(
        data => {
          this.userInfo = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            password: data.user.password,
            nidentificacao: data.user.nidentificacao,
            type_document: data.user.type_document,
            access_code: data.user.access_code,
          };
        },
        error => {
          this.errorMessage = `${error.status}: ${error.error}`;
        }
      );
      return true;
    }
  }

  // log out
  logout() {
    this.token.signOut();
    // redirect and reload page
    window.location.href="/home"
  }
}
