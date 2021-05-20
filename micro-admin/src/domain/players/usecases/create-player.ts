import { Player } from '../player.entity';
import { PlayerDBRepository } from '../player.repository';
import { PlayerDTO } from '../../../application/players/player.dto';
import { EntityAlreadyExistsError } from 'src/domain/common/exceptions/business.exception';

export class CreatePlayerUseCase {
  constructor(private readonly playerDBRepository: PlayerDBRepository) {}

  async execute(data: PlayerDTO): Promise<Player> {
    const playerAlreadyExists = await this.playerDBRepository.findByEmail(
      data.email,
    );

    if (playerAlreadyExists) {
      throw new EntityAlreadyExistsError(Player.name);
    }

    const player: Player = new Player({
      email: data.email,
      phoneNumber: data.phoneNumber,
      name: data.name,
      ranking: 'A',
      currentRankingPosition: 1,
      profileUrlPhoto: '',
      category: data.category
    });

    return this.playerDBRepository.create(player);
  }
}
