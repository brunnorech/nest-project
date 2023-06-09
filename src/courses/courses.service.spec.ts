/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>

const createMockRepository = <T = any>(): MockRepository<T> => ({
    findOne: jest.fn()
})

describe('CoursesServices', () => {
    let service: CoursesService;
    let courseRepository: MockRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CoursesService,
                { provide: Connection, useValue: {} },
                { provide: getRepositoryToken(Course), useValue: createMockRepository() },
                { provide: getRepositoryToken(Tag), useValue: createMockRepository() },
            ],
        }).compile();

        service = module.get<CoursesService>(CoursesService);
        courseRepository = module.get<MockRepository>(getRepositoryToken(Course));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('FindOne', () => {
        describe('Buscar Curso pelo ID', () => {

            it('Deve retornar um objeto course', async () => {
                const courseId = "1";

                const expectedCourse = {};

                await courseRepository.findOne.mockReturnValue(expectedCourse);
                const course = await service.findOne(courseId);

                expect(course).toEqual(expectedCourse);
            });

            it('Deve retornar um notFound', async () => {
                const courseId = "1";

                await courseRepository.findOne.mockReturnValue(undefined);

                try {
                    await service.findOne(courseId);
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual(`Course id ${courseId} not found`);

                }

            })

        });


    })
});
