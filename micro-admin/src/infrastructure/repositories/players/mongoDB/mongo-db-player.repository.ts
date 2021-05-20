import { Model } from 'mongoose';
import { Inject } from '@nestjs/common';
import { PlayerModel } from './mongo-db-player.schema';
import { Player } from '../../../../domain/players/player.entity';
import { PlayerDBRepository } from '../../../../domain/players/player.repository';
import { PlayerId } from 'src/domain/players/player.types';

export class MongoDbPlayerDBRepository implements PlayerDBRepository {
  constructor(
    @Inject('PlayerModelToken')
    private readonly playerModel: Model<PlayerModel>,
  ) {}

  findAll(): Promise<Player[]> {
    return this.playerModel.find().exec();
  }

  findById(id: PlayerId): Promise<Player> {
    return this.playerModel.findOne({ id }).exec();
  }

  findByEmail(email: string): Promise<Player> {
    return this.playerModel.findOne({ email }).exec();
  }

  create(player: Player): Promise<Player> {
    return this.playerModel.create(player);
  }

  update(id: PlayerId, player: Partial<Player>): void {
    this.playerModel.updateOne({ id: id }, player).exec();
  }

  delete(id: PlayerId): void {
    this.playerModel.deleteOne({ id }).exec();
  }
}
