import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  userInfo: any;
  filterTerm: any;
  event: any;
  errorMessage: string | undefined;

  constructor(private userService: UserService) {  }

  ngOnInit() {
    this.userService.getUserBoard().subscribe(
      data => {
        this.userInfo = {
          id: data.user.id,
          name: data.user.name
        };
        // get events by id
        this.userService.getEventsByUserId(this.userInfo.id).subscribe(
          data => {
            this.event = {
              data
            };
          },
        );
      },
      error => {
        this.errorMessage = `${error.status}: ${error.error}`;
      }
    );
  }

}
