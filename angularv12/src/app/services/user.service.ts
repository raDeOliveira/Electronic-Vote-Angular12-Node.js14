import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { ProfileInfo} from "../auth/profile.info";
import { VoteInfo } from "../auth/vote.info";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  // get url requests from server
  private checkEventDateUrl = 'http://localhost:8080/api/checkEvent/';
  private checkEventClosedUrl = 'http://localhost:8080/api/checkEventClosed/';
  private eventsByIdUrl = 'http://localhost:8080/api/getEvents/';
  private sendVoteMaildUrl = 'http://localhost:8080/api/sendVoteMail/';
  private updateUserUrl = 'http://localhost:8080/api/update/user/';
  private saveVoteUrl = 'http://localhost:8080/api/saveVote';
  private hasVotedUrl = 'http://localhost:8080/api/voteController';
  private userUrl = 'http://localhost:8080/api/test/user';

  constructor(private http: HttpClient) { }

  // go to user page
  getUserBoard(): Observable<any> {
    return this.http.get(this.userUrl);
  }

  // get candidates by id
  getEventsByUserId(idUser: number): Observable<any> {
    return this.http.get(this.eventsByIdUrl+idUser);
  }

  // update user
  updateUser(info: ProfileInfo, idUser: number): Observable<any> {
    return this.http.put<string>(this.updateUserUrl+idUser, info, httpOptions);
  }

  // save user vote
  saveVote(info: VoteInfo): Observable<any> {
    return this.http.post<string>(this.saveVoteUrl, info, httpOptions);
  }

  // check if event it's still open and get count votes
  checkEventDate(idEvent: number): Observable<any> {
    return this.http.get(this.checkEventDateUrl+idEvent);
  }

  // check if event has closed
  checkEventClosed(idEvent: number): Observable<any> {
    return this.http.get(this.checkEventClosedUrl+idEvent);
  }

  // check if user has voted
  hasVoted(idVoter: number, idEvent: number): Observable<any> {
    let params = new HttpParams();
    // assign parameters
    params = params.append('voter', idVoter);
    params = params.append('event', idEvent);
    return this.http.get<any>(this.hasVotedUrl, {params: params});
  }

  // send vote mail confirmation
  sendVoteMail(email: number, vote: VoteInfo): Observable<any> {
    return this.http.post<string>(this.sendVoteMaildUrl+email, vote, httpOptions);
  }

}
