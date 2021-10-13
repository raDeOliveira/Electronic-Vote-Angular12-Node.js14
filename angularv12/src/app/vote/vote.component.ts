import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { VoteInfo } from "../auth/vote.info";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})

export class VoteComponent implements OnInit {

  form: any = {};
  userInfo: any;
  voteRegistered = false;
  candidate: any;
  idCandidate = 0;
  nameEvent: any;
  event = 0;
  paramsSubscription: Subscription | undefined;
  errorMessage: string | undefined;
  private voteInfo: VoteInfo | undefined;
  message: any;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router,
              private location: Location) { }

  ngOnInit() {
    // get the id from event by RouterLink pass
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.event = + params['idEvent'];
      this.nameEvent = params['eventName'];
    });

    this.userService.getUserBoard().subscribe(
      data => {
        this.userInfo = {
          id: data.user.id,
          name: data.user.name
        };
        // check if user has voted
          this.userService.hasVoted(this.userInfo.id, this.event).subscribe(
            data => {
              if (data.status === 'ok'){
                this.voteRegistered = true;
                this.message = data.message;
              }else {
                this.candidate = { data };
              }
              // check if event has closed
              this.userService.checkEventClosed(this.event).subscribe(
                data => {
                  if (data.status === 'closed'){
                    this.voteRegistered = true;
                    this.message = data.message;
                  }
            },
            error => {
              this.errorMessage = `${error.status}: ${error.error}`;
            })
            })
      },
    );
  }

  onSubmit() {
    // get data for vote
    this.userService.getUserBoard().subscribe(
      data => {
        this.voteInfo = new VoteInfo(
          this.form.idVoter = data.user.id,
          this.idCandidate = this.form.idCandidate,
          this.form.idEvent = this.event,
          this.form.publicVote,
        );
        this.userInfo = {
          email: data.user.email
        }

        // save the user vote
        console.log(this.form.idVoter);
        this.userService.saveVote(this.voteInfo).subscribe();
        this.userService.sendVoteMail(this.userInfo.email, this.voteInfo).subscribe();
        // redirect to home events
        this.router.navigate(['/home']);
      })
  }

  // go back button
  goBack() {
    this.location.back();
  }


}

