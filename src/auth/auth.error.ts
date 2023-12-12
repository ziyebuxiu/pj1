/*
 *  Description: This file defines the errors that can be thrown by the AuthService.
 *               All the Errors in this file should extend BaseError.
 *
 *  Author(s):
 *      Nictheboy Li    <nictheboy@outlook.com>
 *
 */

import { BaseError } from '../common/error/base-error';
import { AuthorizedAction, authorizedActionToString } from './auth.service';

export class AuthenticationRequiredError extends BaseError {
  constructor() {
    super('AuthenticationRequiredError', 'Authentication required', 401);
  }
}

export class InvalidTokenError extends BaseError {
  constructor() {
    super('InvalidTokenError', 'Invalid token', 401);
  }
}

export class TokenFormatError extends BaseError {
  constructor(public readonly token: string) {
    super(
      'TokenFormatError',
      `The token is valid, but AuthService could not understand its payload. Token: ${token}`,
      401,
    );
  }
}

export class PermissionDeniedError extends BaseError {
  constructor(
    public readonly action: AuthorizedAction,
    public readonly resourceOwnerId?: number,
    public readonly resourceType?: string,
    public readonly resourceId?: number,
  ) {
    super(
      'PermissionDeniedError',
      `The attempt to perform action '${authorizedActionToString(
        action,
      )}' on resource (resourceOwnerId: ${
        resourceOwnerId === null ? 'null' : resourceOwnerId
      }, resourceType: ${
        resourceType === null ? 'null' : resourceType
      }, resourceId: ${
        resourceId === null ? 'null' : resourceId
      }) is not permitted by the given token.`,
      403,
    );
  }
}
