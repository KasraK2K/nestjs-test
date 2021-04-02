import { LeadRepository } from './lead.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { LeadController } from './lead.controller';
import { LeadService } from './lead.service';

const mockLeadRepository = () => ({});

describe('LeadController', () => {
  let leadController: LeadController;
  let leadService: LeadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadController],
      providers: [
        LeadService,
        { provide: LeadRepository, useFactory: mockLeadRepository },
      ],
    }).compile();

    leadController = module.get<LeadController>(LeadController);
    leadService = module.get<LeadService>(LeadService);
  });

  describe('defined', () => {
    it('leadController should be defined', () => {
      expect(leadController).toBeDefined();
    });

    it('leadService should be defined', () => {
      expect(leadService).toBeDefined();
    });
  });
});
