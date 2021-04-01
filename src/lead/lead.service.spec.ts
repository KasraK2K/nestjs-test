import { NotFoundException } from '@nestjs/common';
import { LeadRepository } from './lead.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from './lead.service';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

const mockLeadRepository = () => ({
  getAllLead: jest.fn(),
  getLeadById: jest.fn(),
  createLead: jest.fn(),
});

describe('LeadService', () => {
  let leadService: LeadService;
  let leadRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadService,
        { provide: LeadRepository, useFactory: mockLeadRepository },
      ],
    }).compile();

    leadService = module.get<LeadService>(LeadService);
    leadRepository = module.get<LeadRepository>(LeadRepository);
  });

  it('should be defined', () => {
    expect(leadService).toBeDefined();
  });

  it('should be defined', () => {
    expect(leadRepository).toBeDefined();
  });

  /* ------------------------------- getAllLead ------------------------------- */
  describe('getAllLead', () => {
    it('get all lead from repository', async () => {
      leadRepository.getAllLead.mockResolvedValue('someValue');
      expect(leadRepository.getAllLead).not.toHaveBeenCalled();
      const options: IPaginationOptions = {
        page: 1,
        limit: 10,
        route: '/leads',
      };
      const result = await leadService.getAllLead(options);
      expect(leadRepository.getAllLead).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  /* ------------------------------- getLeadById ------------------------------ */
  describe('getLeadById', () => {
    // found
    it('find task by id and return the task', async () => {
      leadRepository.getLeadById.mockResolvedValue('someLead');
      expect(leadRepository.getLeadById).not.toHaveBeenCalled();
      const result = await leadService.getLeadById('1');
      expect(leadRepository.getLeadById).toHaveBeenCalledWith('1');
      expect(result).toEqual('someLead');
    });

    // not found
    it('throw error as task is not found', async () => {
      leadRepository.getLeadById.mockResolvedValue(null);
      expect(leadRepository.getLeadById).not.toHaveBeenCalled();
      expect(leadService.getLeadById('1')).rejects.toThrow(NotFoundException);
      expect(leadRepository.getLeadById).toHaveBeenCalledWith('1');
    });
  });

  /* ------------------------------- createLead ------------------------------- */
  describe('createLead', () => {
    it('call leadRepository.createLead() and returns result.', async () => {
      leadRepository.createLead.mockResolvedValue('someLead');
      expect(leadRepository.createLead).not.toHaveBeenCalled();
      const createLeadDto = {
        name: 'kasra',
        family_name: 'karami',
        email: 'kasra_K2k@yahoo.com',
        cellphone: '09183619290',
      };
      const result = await leadService.createLead(createLeadDto);
      expect(leadRepository.createLead).toHaveBeenCalledWith(
        createLeadDto,
        false,
      );
      expect(result).toEqual('someLead');
    });
  });
});
