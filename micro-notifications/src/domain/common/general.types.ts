export interface IChallenge {
    readonly id?: string;
    status: string;
    requestDate: string;
    responseDate?: string;
    realizationDate: string;
    requester: string;
    category: string;
    players: Array<string>;
    match?: string;
}

export interface IPlayer {
    readonly id: string;
    readonly phoneNumber: string;
    readonly email: string;
    name: string;
    ranking: string;
    currentRankingPosition: number;
    profileUrlPhoto: string;
    category: string;
  }