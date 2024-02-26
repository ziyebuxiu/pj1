import { BaseError } from '../common/error/base-error';

export class AnswerNotFoundError extends BaseError {
  constructor(public readonly id: number) {
    super('AnswerNotFoundError', `Answer with id ${id} is not found.`, 404);
  }
}

export class AnswerAlreadyAgreeError extends BaseError {
  constructor(public readonly id: number) {
    super(
      'AnswerAlreadyAgreeError',
      `Answer with id ${id} is already agreed.`,
      400,
    );
  }
}

export class AnswerAlreadyFavoriteError extends BaseError {
  constructor(public readonly id: number) {
    super(
      'AnswerAlreadyFavoriteError',
      `Answer with id ${id} is already favorited.`,
      400,
    );
  }
}

export class AnswerNotFavoriteError extends BaseError {
  constructor(public readonly id: number) {
    super(
      'AnswerNotFavoriteError',
      `Answer with id ${id} is not favorited.`,
      400,
    );
  }
}

export class AlreadyHasSameAttitudeError extends BaseError {
  constructor(
    public readonly userId: number,
    public readonly id: number,
    public readonly agree_type: number,
  ) {
    super(
      'AlreadyHasSameAttitudeError',
      `Already has attitude ${agree_type} on answer ${id}.`,
      400,
    );
  }
}
