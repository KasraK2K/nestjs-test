import { LeadRepository } from './lead.repository';
import { Test, TestingModule } from '@nestjs/testing';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

const mockLeadCredentialsDto = {
  name: 'kasra',
  family_name: 'karami',
  email: 'kasra_K2k@yahoo.com',
  cellphone: '09183619290',
};

describe('leadRepository', () => {
  let leadRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeadRepository],
    }).compile();

    leadRepository = module.get<LeadRepository>(LeadRepository);
  });

  /* ----------------------------- leadRepository ----------------------------- */
  describe('defined', () => {
    it('leadRepository should be defined', () => {
      expect(leadRepository).toBeDefined();
    });
  });

  /* ------------------------------- createLead ------------------------------- */
  describe('createLead', () => {
    let save;

    beforeEach(() => {
      save = jest.fn();
      leadRepository.create = jest.fn().mockReturnValue({ save });
    });

    it('successfully create lead', async () => {
      save.mockResolvedValue(undefined);
      expect(
        leadRepository.createLead(mockLeadCredentialsDto),
      ).resolves.not.toThrow();
    });

    it('throws a conflict exception email already exists', () => {
      save.mockRejectedValue({ code: '23505' });
      expect(leadRepository.createLead(mockLeadCredentialsDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('throws a internal server exception', () => {
      save.mockRejectedValue({ code: '12312' });
      expect(leadRepository.createLead(mockLeadCredentialsDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
