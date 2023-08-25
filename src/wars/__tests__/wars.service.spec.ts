import { BadGatewayException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { War } from '../entities/war.entity';
import { WarsService } from '../wars.service';

describe('WarsService', () => {
  let warService: WarsService;
  let model: Model<War>;

  const mockWar = {
    title: 'test',
    episode_id: 89,
    director: 'Agustin Bessone',
    producer: 'Yo',
    created: '2023-08-24T17:07:47.081Z',
    edited: '2023-08-24T17:07:47.081Z',
    _id: '64e78e63607773d55de479fb',
  };

  const mockWars = [
    {
      title: 'test',
      episode_id: 89,
      director: 'Agustin Bessone',
      producer: 'Yo',
      created: '2023-08-24T17:07:47.081Z',
      edited: '2023-08-24T17:07:47.081Z',
      _id: '64e78e63607773d55de479fb',
    },
    {
      title: 'test2',
      episode_id: 33,
      director: 'Agustin Besso',
      producer: 'Vos',
      created: '2023-08-24T17:07:47.081Z',
      edited: '2023-08-24T17:07:47.081Z',
      _id: '64e78e63607773d55de479675',
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarsService,
        {
          provide: getModelToken(War.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            create: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    warService = module.get<WarsService>(WarsService);
    model = module.get<Model<War>>(getModelToken('War'));
  });

  it('should be defined', () => {
    expect(warService).toBeDefined();
  });

  describe('Create', () => {
    it('should insert a new war', async () => {
      jest
        .spyOn(model, 'create')
        .mockImplementationOnce((): Promise<any> => Promise.resolve(mockWar));
      const newCat = await warService.create({
        title: 'test',
        episode_id: 89,
        director: 'Agustin Bessone',
        producer: 'Yo',
        created: '2023-08-24T17:07:47.081Z',
        edited: '2023-08-24T17:07:47.081Z',
      });
      expect(newCat).toEqual({
        title: 'test',
        episode_id: 89,
        director: 'Agustin Bessone',
        producer: 'Yo',
        created: '2023-08-24T17:07:47.081Z',
        edited: '2023-08-24T17:07:47.081Z',
        _id: '64e78e63607773d55de479fb',
      });
    });
  });

  describe('findAll', () => {
    it('should return all wars', async () => {
      jest.spyOn(model, 'find').mockResolvedValue(mockWars);

      const result = await warService.findAll();

      expect(mockWars).toHaveLength(2);
      expect(result).toEqual(mockWars);
    });
  });

  describe('findById', () => {
    it('should find and return a book by ID', async () => {
      jest.spyOn(model, 'findById').mockResolvedValue(mockWar);

      const result = await warService.findOne(mockWar._id);

      expect(model.findById).toHaveBeenCalledWith(mockWar._id);
      expect(result).toEqual(mockWar);
    });

    it('should throw NotFoundException if book is not found', async () => {
      const badId = 'idBad';
      jest.spyOn(model, 'findById').mockResolvedValue(null);

      await expect(warService.findOne(badId)).rejects.toThrow(
        `War with episode #${badId} not found`,
      );
    });
  });

  describe('Delete', () => {
    it('should delete a war successfully', async () => {
      const deletedID = '4e78e63607773d55de479fb';
      jest.spyOn(model, 'findByIdAndRemove').mockResolvedValue({
        deleted: true,
        message: `Film with id #${deletedID} was deleted`,
      } as any);
      expect(await warService.remove(deletedID)).toEqual({
        deleted: true,
        message: `Film with id #${deletedID} was deleted`,
      });
    });

    it('shouldnt delete a war with a bad id', async () => {
      const deletedID = 'bad-id';
      jest.spyOn(model, 'findByIdAndRemove').mockResolvedValue(null);
      expect(await warService.remove(deletedID)).toEqual({
        deleted: false,
        message: `Film with id #${deletedID} couldn't deleted`,
      });
    });
  });

  describe('Update', () => {
    it('should update a war successfully', async () => {
      const updatedId = '4e78e63607773d55de479fb';
      const newData = { title: 'New Title' };
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(mockWar);
      expect(await warService.update(updatedId, newData)).toEqual({
        title: 'test',
        episode_id: 89,
        director: 'Agustin Bessone',
        producer: 'Yo',
        created: '2023-08-24T17:07:47.081Z',
        edited: '2023-08-24T17:07:47.081Z',
        _id: '64e78e63607773d55de479fb',
      });
    });

    it('shouldnt update a war with a bad id', async () => {
      const badId = 'bad-id';
      jest.spyOn(model, 'findByIdAndUpdate').mockResolvedValue(null);
      expect(
        Promise.reject(
          new BadGatewayException(`Film with id #${badId} isn't in db`),
        ),
      ).rejects.toThrow(`Film with id #${badId} isn't in db`);
    });
  });
});
