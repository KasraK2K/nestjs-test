import { LeadRepository } from './lead.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LeadCredentialsDto } from './dto/lead-credentials.dto';
import { LeadEntity } from './entities/lead.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult } from 'typeorm';

@Injectable()
export class LeadService {
  private readonly logger = new Logger(LeadService.name);

  constructor(
    @InjectRepository(LeadRepository) private leadRepository: LeadRepository,
  ) {}

  async createLead(
    leadCredentialsDto: LeadCredentialsDto,
  ): Promise<LeadEntity> {
    return await this.leadRepository.createLead(leadCredentialsDto);
  }

  async getAllLead(
    options: IPaginationOptions,
  ): Promise<Pagination<LeadEntity>> {
    return await this.leadRepository.getAllLead(options);
  }

  async getLeadById(leadId: string): Promise<LeadEntity> {
    return await this.leadRepository.getLeadById(leadId);
  }

  async updateLead(
    leadId: string,
    leadCredentialsDto: LeadCredentialsDto,
  ): Promise<LeadEntity> {
    return await this.leadRepository.updateLead(leadId, leadCredentialsDto);
  }

  async deleteLead(leadId: string): Promise<DeleteResult> {
    return await this.leadRepository.deleteLead(leadId);
  }
}
