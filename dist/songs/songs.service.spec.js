"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mongoose_1 = require("@nestjs/mongoose");
const songs_service_1 = require("./songs.service");
const mockSongModel = {
    find: jest.fn().mockReturnThis(),
    exec: jest.fn().mockResolvedValue([{ nombre: 'test', artista: 'test', genero: 'test', anio: 2020, reproducciones: 1 }]),
    insertMany: jest.fn().mockResolvedValue([]),
    deleteMany: jest.fn().mockResolvedValue({ deletedCount: 1 }),
};
describe('SongsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                songs_service_1.SongsService,
                { provide: (0, mongoose_1.getModelToken)('Song'), useValue: mockSongModel },
            ],
        }).compile();
        service = module.get(songs_service_1.SongsService);
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
//# sourceMappingURL=songs.service.spec.js.map