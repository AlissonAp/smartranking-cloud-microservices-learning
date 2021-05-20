export class EntityNotFoundError extends Error {
  constructor(entity: string, id: string) {
    super(`${entity} with id ${id} not found!`);
    this.name = EntityNotFoundError.name;
  }
}

export class EntityAlreadyExistsError extends Error {
  constructor(fromEntity: string, toEntity = '') {
    super(
      `${fromEntity} already exists${toEntity ? ' into ' : ''}${toEntity}!`,
    );
    this.name = EntityAlreadyExistsError.name;
  }
}

export class EntityIncorrectData extends Error {
  constructor(entity: string, messages: Array<string>) {
    super(`${entity} has received incorrect data. ${messages.join('\n')}`);
    this.name = EntityIncorrectData.name;
  }
}
