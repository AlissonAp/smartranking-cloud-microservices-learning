import { Injectable } from '@nestjs/common';
import { Player } from '../../domain/players/player.entity';
import { PlayerDTO } from 'src/application/players/player.dto';
import { PlayerId } from 'src/domain/players/player.types';
import { FindPlayerByIdUseCase } from '../../domain/players/usecases/find-player-by-id';
import { FindPlayerByEmailUseCase } from '../../domain/players/usecases/find-player-by-email';
import { FindAllPlayersUseCase } from '../../domain/players/usecases/find-all-players';
import { CreatePlayerUseCase } from '../../domain/players/usecases/create-player';
import { UpdatePlayerByIdUseCase } from '../../domain/players/usecases/update-player-by-id';
import { DeletePlayerByIdUseCase } from '../../domain/players/usecases/delete-player-by-id';
import { MongoDbPlayerDBRepository } from '../../infrastructure/repositories/players/mongoDB/mongo-db-player.repository';
import { UploadPlayerProfilePhoto } from 'src/domain/players/usecases/upload-profile-photo';

@Injectable()
export class PlayerService {
  constructor(private readonly playerDBRepository: MongoDbPlayerDBRepository) {}

  findById(id: PlayerId): Promise<Player> {
    const findPlayerById = new FindPlayerByIdUseCase(this.playerDBRepository);
    return findPlayerById.execute(id);
  }

  findByEmail(email: string): Promise<Player> {
    const findPlayerByEmail = new FindPlayerByEmailUseCase(
      this.playerDBRepository,
    );
    return findPlayerByEmail.execute(email);
  }

  findAll(): Promise<Player[]> {
    const findAllPlayers = new FindAllPlayersUseCase(this.playerDBRepository);
    return findAllPlayers.execute();
  }

  create(player: PlayerDTO): Promise<Player> {
    const createPlayer = new CreatePlayerUseCase(this.playerDBRepository);
    return createPlayer.execute(player);
  }

  updateById(id: PlayerId, player: PlayerDTO): Promise<void> {
    const updatePlayer = new UpdatePlayerByIdUseCase(this.playerDBRepository);
    return updatePlayer.execute(id, player);
  }

  deleteById(id: PlayerId): void {
    const deletePlayer = new DeletePlayerByIdUseCase(this.playerDBRepository);
    deletePlayer.execute(id);
  }

  uploadProfilePhoto(id: PlayerId, url: string): Promise<void> {
    const uploadPlayerProfilePhoto = new UploadPlayerProfilePhoto(
      this.playerDBRepository,
    );
    return uploadPlayerProfilePhoto.execute(id, url);
  }
}
