import { LeadEntity } from './entities/lead.entity';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { LeadCredentialsDto } from './dto/lead-credentials.dto';
import * as _ from 'lodash';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@EntityRepository(LeadEntity)
export class LeadRepository extends Repository<LeadEntity> {
  private readonly logger = new Logger(LeadRepository.name);

  async createLead(
    leadCredentialsDto: LeadCredentialsDto,
  ): Promise<LeadEntity> {
    const lead = new LeadEntity();
    _.assign(lead, leadCredentialsDto);
    try {
      await this.save(lead);
    } catch (error) {
      if (error.code === '23505') throw new ConflictException(error.detail);
      else throw new InternalServerErrorException(error.message);
    }
    return lead;
  }

  async getAllLead(
    options: IPaginationOptions,
  ): Promise<Pagination<LeadEntity>> {
    const leads = this.createQueryBuilder('lead');
    return await paginate<LeadEntity>(leads, options);
  }

  async getLeadById(leadId: string): Promise<LeadEntity> {
    return await this.findOne(leadId);
  }

  async updateLead(
    leadId: string,
    leadCredentialsDto: LeadCredentialsDto,
  ): Promise<LeadEntity> {
    const lead = await this.getLeadById(leadId);
    _.assign(lead, leadCredentialsDto);
    try {
      await this.save(lead);
    } catch (error) {
      if (error.code === '23505') throw new ConflictException(error.detail);
      else throw new InternalServerErrorException(error.message);
    }
    return lead;
  }

  async deleteLead(leadId: string): Promise<DeleteResult> {
    return await this.delete(leadId);
  }
}
