/* eslint-disable prefer-const */
import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { War } from './entities/war.entity';

@Injectable()
export class WarsService {
  constructor(@InjectModel(War.name) private readonly warModel: Model<War>) {}

  async create(createWarDto: CreateWarDto) {
    createWarDto.name = createWarDto.name.toLowerCase();

    try {
      const war = await this.warModel.create(createWarDto);

      return war;
    } catch (error) {
      this.hanldeExceptions(error);
    }
  }

  findAll() {
    return `This action returns all wars`;
  }

  async findOne(name: string) {
    let war: War;

    war = await this.warModel.findOne({ name: name.toLowerCase().trim() });

    if (!war) throw new NotFoundException(`War with name ${name} not found`);

    return war;
  }

  async update(name: string, updateWarDto: UpdateWarDto) {
    const war = await this.findOne(name);

    if (updateWarDto.name)
      updateWarDto.name = updateWarDto.name.toLowerCase().trim();

    try {
      await war.updateOne(updateWarDto);

      return { ...war.toJSON(), ...updateWarDto };
    } catch (error) {
      this.hanldeExceptions(error);
    }
  }

  async remove(name: string) {
    console.log('ye');
    const war = await this.findOne(name);
    await war.deleteOne();
  }

  private hanldeExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadGatewayException(
        `Pokemon exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException(
      `Can't create War, please check server logs `,
    );
  }
}
