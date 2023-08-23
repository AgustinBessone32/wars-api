/* eslint-disable prefer-const */
import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  SetMetadata,
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
    try {
      const war = await this.warModel.create(createWarDto);

      return war;
    } catch (error) {
      this.hanldeExceptions(error);
    }
  }

  async findAll() {
    let war: War[];

    war = await this.warModel.find();

    return war;
  }

  @SetMetadata('roles', ['user'])
  async findOne(id: number) {
    let war: War;

    war = await this.warModel.findOne({ episode_id: id });

    if (!war) throw new NotFoundException(`War with episode #${id} not found`);

    return war;
  }

  async update(id: number, updateWarDto: UpdateWarDto) {
    const war = await this.findOne(id);

    try {
      await war.updateOne(updateWarDto);

      return { ...war.toJSON(), ...updateWarDto };
    } catch (error) {
      this.hanldeExceptions(error);
    }
  }

  async remove(id: number) {
    const war = await this.findOne(id);
    await war.deleteOne();

    return `Film with id #${id} was deleted`;
  }

  private hanldeExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadGatewayException(
        `Film exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }

    throw new InternalServerErrorException(
      `Can't create Film, please check server logs `,
    );
  }
}
