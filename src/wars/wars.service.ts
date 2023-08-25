/* eslint-disable prefer-const */
import {
  BadGatewayException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreateWarDto } from './dto/create-war.dto';
import { UpdateWarDto } from './dto/update-war.dto';
import { War } from './entities/war.entity';

@Injectable()
export class WarsService {
  constructor(@InjectModel(War.name) private readonly warModel: Model<War>) {}

  async create(createWarDto: CreateWarDto): Promise<War> {
    try {
      createWarDto.edited = createWarDto.edited
        ? createWarDto.edited
        : new Date().toISOString();
      createWarDto.created = createWarDto.created
        ? createWarDto.created
        : new Date().toISOString();
      const war = await this.warModel.create(createWarDto);

      return war;
    } catch (error) {
      this.hanldeExceptions(error);
    }
  }

  async findAll(): Promise<War[]> {
    let war: War[];

    war = await this.warModel.find();

    return war;
  }

  async findOne(id: string): Promise<War> {
    let war: War;

    if (isValidObjectId(id)) {
      war = await this.warModel.findById(id);
    }

    if (!war) throw new NotFoundException(`War with episode #${id} not found`);

    return war;
  }

  async update(id: string, updateWarDto: UpdateWarDto) {
    updateWarDto.edited = new Date().toISOString();
    const updated = await this.warModel.findByIdAndUpdate(id, updateWarDto);

    if (updated) return updated;

    throw new BadGatewayException(`Film with id #${id} isn't in db`);
  }

  async remove(id: string) {
    const deleted = await this.warModel.findByIdAndRemove(id);

    if (deleted)
      return {
        deleted: true,
        message: `Film with id #${id} was deleted`,
      };

    return {
      deleted: false,
      message: `Film with id #${id} couldn't deleted`,
    };
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
