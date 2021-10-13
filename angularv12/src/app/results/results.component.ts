import { Component, OnInit } from '@angular/core';
import { UserService } from "../services/user.service";
import { Subscription } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {

  vote: any;
  dateVerified = false;
  message: any;
  event = 0;
  nameEvent: any;
  paramsSubscription: Subscription | undefined;

  constructor(private userService: UserService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    // get the id from event by RouterLink pass
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.event = + params['idEvent'];
      this.nameEvent = params['eventName'];
    });

    // get total votes from event
    this.userService.checkEventDate(this.event).subscribe(
      data => {

        if (data.status === 'ok'){
          this.dateVerified = true;
          this.message = data.message;
        } else {
          this.vote = { data };
        }
      });
  }

  // go back button
  goBack() {
    this.location.back();
  }

}
