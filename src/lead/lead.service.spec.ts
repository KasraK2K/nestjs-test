import { LeadRepository } from './lead.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { LeadService } from './lead.service';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

const mockLeadRepository = () => ({
  getAllLead: jest.fn(),
});

describe('LeadService', () => {
  let leadService: LeadService;
  let leadRepository: LeadRepository;

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
      leadRepository.getAllLead = jest.fn().mockResolvedValue('someValue');
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
});
