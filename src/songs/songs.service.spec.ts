import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { SongsService } from './songs.service';

const mockSongModel = {
  find: jest.fn().mockReturnThis(),
  exec: jest.fn().mockResolvedValue([{ nombre: 'test', artista: 'test', genero: 'test', anio: 2020, reproducciones: 1 }]),
  insertMany: jest.fn().mockResolvedValue([]),
  deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 }),
};

describe('SongsService', () => {
  let service: SongsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SongsService,
        { provide: getModelToken('Song'), useValue: mockSongModel },
      ],
    }).compile();
    service = module.get<SongsService>(SongsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return songs', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ nombre: 'test', artista: 'test', genero: 'test', anio: 2020, reproducciones: 1 }]);
  });

  it('insertMany should call insertMany', async () => {
    await service.insertMany([]);
    expect(mockSongModel.insertMany).toHaveBeenCalled();
  });

  it('deleteAll should call deleteMany', async () => {
    await service.deleteAll();
    expect(mockSongModel.deleteMany).toHaveBeenCalled();
  });
});
