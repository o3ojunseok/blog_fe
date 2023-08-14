import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {}

  async findAllUser(): Promise<User[]> {
    return await this.userRepository.findAllUser();
  }

  async findOneUser(id: number): Promise<User> {
    return await this.userRepository.findOneUser(id);
  }

  async signUpUser(createData: CreateUserDto): Promise<User> {
    const findUser = await this.userRepository.findOneUserEmail(createData.user_email);
    const hashedPassword = await bcrypt.hash(createData.password, 10);

    if (findUser) {
      throw new BadRequestException('user is already exist.')
    }

    const user = new User();
    user.user_email = createData.user_email
    user.user_name = createData.user_name;
    user.password = hashedPassword;

    await this.userRepository.createUser(user);
    return user;
  }

  async updateUser(id: number, updateData: UpdateUserDto): Promise<User> {
    const findUser = await this.userRepository.findOneUser(id);
    if (!findUser) {
      throw new BadRequestException('user is not found.');
    }

    const user = new User();
    user.user_name = updateData.user_name;
    user.password = updateData.password;

    await this.userRepository.updateUser(id, user);
    return user;
  }

  async deleteUser(id: number): Promise<string> {
    const findUser = await this.userRepository.findOneUser(id);
    if (!findUser) {
      throw new BadRequestException('user is not found.');
    }
    await this.userRepository.deleteUser(id);
    return 'success delete user!';
  }

  async setCurrentRefreshToken(id: number, refresh_token: string): Promise<User> {
    const currentRefreshToken = await this.getCurrentHashedRefreshToken(refresh_token);
    const currentRefreshTokenExp = await this.getCurrentRefreshTokenExp();
  
    await this.userRepository.updateRefreshUser(id, {
      refresh_token: currentRefreshToken,
      refresh_token_expired_at: currentRefreshTokenExp,
    });
    const user = await this.userRepository.findOneUser(id);
    return user;
  }

  async getCurrentHashedRefreshToken(refresh_token: string): Promise<string> {
    const currentRefreshToken = await bcrypt.hash(refresh_token, 10);
    return currentRefreshToken;
  }

  async getCurrentRefreshTokenExp(): Promise<Date> {
    const currentDate = new Date();
    const currentRefreshTokenExp = new Date(currentDate.getTime() + parseInt(this.configService.get<string>('JWT_REFRESH_EXPIRATION_TIME')));
    return currentRefreshTokenExp;
  }
  
  async getUserIfRefreshTokenMatches(id: number, refresh_token: string): Promise<User> {
    const user: User = await this.userRepository.findOneUser(id);
    const isRefreshTokenMatching = await bcrypt.compare(
      refresh_token,
      user.refresh_token
    );
    if (isRefreshTokenMatching) {
      return user;
    } 
  }

  async removeRefreshToken(id: number): Promise<User> {
    await this.userRepository.updateRefreshUser(id, {
      refresh_token: null,
      refresh_token_expired_at: null,
    });
    const user = await this.userRepository.findOneUser(id);
    return user;
  }
}
