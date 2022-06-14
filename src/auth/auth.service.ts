import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schemas/user.schema';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
  ) {}

  async signup({ email, password, name }: CreateAuthDto) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new BadRequestException('User Already Exists!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save()
    const token = await this.signinToken(newUser._id, newUser.email, newUser.name)
    return {
      message: "Account created successfully",
      name: newUser.name,
      email: newUser.email,
      token
    };
  }

  async login({ email, password }: CreateAuthDto) {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('User not found');
    } else {
      const comparedPassword = await bcrypt.compare(password, user.password);
      if (!comparedPassword) {
        throw new BadRequestException('Credentials Incorrect');
      }
      delete user.password;
    }
    const token = await this.signinToken(user._id, user.email, user.name)
    return {
      name: user.name,
      email: user.email,
      token
    };
  }

  async signinToken(_id: string, email: string, name: string) {
    const payload = {
      _id,
      email,
      name,
    };
    const jwtSecret =
      process.env.JWT_SECRET ||
      '12KHUH@mlkmldsjfkl!://!x:cùezùlljznkj>W?XS?.N.?QX';
    const token = await this.jwt.signAsync(payload, {
      secret: jwtSecret,
      expiresIn: '1d',
    });

    return token;
  }
}
