// vote model
export class VoteInfo {
  idVoter: BufferSource;
  idCandidate: number;
  idEvent: number;
  publicVote: string;

  constructor(idVoter: BufferSource, idCandidate: number, idEvent: number, publicVote: string) {
    this.idVoter = idVoter;
    this.idCandidate = idCandidate;
    this.idEvent = idEvent;
    this.publicVote = publicVote;
  }


}
