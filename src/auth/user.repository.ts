import { Repository, EntityRepository } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { username, password } = authCredentialsDto;
    const user = new User();
    user.username = username;
    user.password = password;
    await user.save();
  }
}
