import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { War } from '../wars/entities/war.entity';

@Injectable()
export class SeedService {
  constructor(@InjectModel(War.name) private readonly warModel: Model<War>) {}

  async sexecuteSeed() {
    await this.warModel.deleteMany({});

    const { data } = await axios.get('https://swapi.dev/api/films/');

    const insertArrayPromise = [];

    data.results.forEach(
      async ({ episode_id, title, director, producer, created, edited }) => {
        insertArrayPromise.push(
          this.warModel.create({
            episode_id,
            title,
            director,
            producer,
            created,
            edited,
          }),
        );
      },
    );

    await Promise.all(insertArrayPromise);

    return 'Seed executed';
  }
}
