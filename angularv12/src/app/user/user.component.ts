import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ProfileInfo } from "../auth/profile.info";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  userInfo: any;
  form: any = {};
  isSignedUp = false;
  isSignUpFailed = false;
  saveprofileInfo: ProfileInfo | undefined;
  board: string | undefined;
  errorMessage = '';
  disablePassword = true;

  constructor(private userService: UserService, private location: Location, private router: Router) {}

  // get user info
  ngOnInit() {
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
        this.board = data.description;
      },
      error => {
        this.errorMessage = `${error.status}: ${error.error}`;
      }
    );
    // fill inputs with user data profile
    this.getName();
  }

  // update user profile
  onSubmit() {
    console.log(this.form);

    if (this.form.password === ''){
      this.form.password = null;
    }

    this.saveprofileInfo = new ProfileInfo(
      this.form.name,
      this.form.email,
      this.form.password,
      this.form.nidentificacao,
      this.form.type_document
    );

    // update user
    this.userService.updateUser(this.saveprofileInfo, this.userInfo.id).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error;
        this.isSignUpFailed = true;
      }
    );
    this.router.navigate(['/home']);
  }

  // show user profile data on input fields
  getName() {
    this.userService.getUserBoard().subscribe(
      data => {
        // @ts-ignore
        document.getElementById('name').value = data.user.name;
        // @ts-ignore
        document.getElementById('email').value = data.user.email;
        // @ts-ignore
        document.getElementById('nidentificacao').value = data.user.nidentificacao;
        // @ts-ignore
        document.getElementById('type_document').value = data.user.type_document;
      })
  }

  // go back button
  goBack() {
    this.location.back();
  }

  // enable/disable input from update password
  showEditPassword(){
    this.disablePassword = false;
  }

}

