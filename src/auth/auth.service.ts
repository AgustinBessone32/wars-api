import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserResponse } from './interfaces/user-response.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserResponse> {
    try {
      const { password, ...userData } = createUserDto;

      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      const { email, fullName } = user;
      return {
        email,
        fullName,
        token: this.getJwtToken({ email: user.email }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserResponse> {
    const { password, email } = loginUserDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException(`Not valid credentials (email)`);
    }

    if (!bcrypt.compare(password, user.password)) {
      throw new UnauthorizedException(`Not valid credentials (password)`);
    }

    const { fullName } = user;

    return {
      email,
      fullName,
      token: this.getJwtToken({ email: user.email }),
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const tkn = this.jwtService.sign(payload);

    return tkn;
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
