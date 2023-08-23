import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = this.userModel.create(createUserDto);

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const { password, email } = loginUserDto;

      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new UnauthorizedException(`Not valid credentials (email)`);
      }

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any) {
    if (error.code === 11000) {
      throw new BadGatewayException(
        `User exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException(
      `Can't create User, please check server logs `,
    );
  }
}
