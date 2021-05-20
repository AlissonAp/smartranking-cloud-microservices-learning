export enum BusinessOperations {
  GET,
  DELETE,
  CREATE,
  UPDATE
}

export class EntityNotFoundError extends Error {
  operation?: BusinessOperations
  constructor(entity: string, id: string, operation?: BusinessOperations) {
    super(`${entity} with id ${id} not found!`);
    this.name = EntityNotFoundError.name;
    this.operation = operation;
  }
}

export class EntityAlreadyExistsError extends Error {
  operation?: BusinessOperations
  constructor(fromEntity: string, toEntity = '', operation: BusinessOperations = BusinessOperations.CREATE) {
    super(
      `${fromEntity} already exists${toEntity ? ' into ' : ''}${toEntity}!`,
    );
    this.name = EntityAlreadyExistsError.name;
    this.operation = operation;
  }
}

export class EntityIncorrectData extends Error {
  operation?: BusinessOperations
  constructor(entity: string, messages: Array<string>, operation?: BusinessOperations) {
    super(`${entity} has received incorrect data. ${messages.join('\n')}`);
    this.name = EntityIncorrectData.name;
    this.operation = operation;
  }
}