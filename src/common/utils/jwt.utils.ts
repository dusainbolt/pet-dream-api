import { AccountJWT } from 'src/api/account/account.interface';
import { Account } from 'src/entities/account.entity';

export class JWTUtils {
  static generateAuthToken = (account: Account): AccountJWT => ({
    id: account.id,
    username: account.username,
    email: account.email,
    role: account.role,
    status: account.status,
  });
}
