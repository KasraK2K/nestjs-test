import { LeadEntity } from './entities/lead.entity';
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from 'typeorm';
import {
  BadRequestException,
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
import { bulkToLeadObject } from 'src/common/utils/bulk.utils';
import { BulkInsertResponse } from './interfaces/lead.interface';

@EntityRepository(LeadEntity)
export class LeadRepository extends Repository<LeadEntity> {
  private readonly logger = new Logger(LeadRepository.name);

  async createLead(
    leadCredentialsDto: LeadCredentialsDto,
    debug: boolean = false,
  ): Promise<LeadEntity> {
    const lead = new LeadEntity();
    _.assign(lead, leadCredentialsDto);
    try {
      await this.save(lead);
    } catch (error) {
      if (debug) throw error;
      else if (error.code === '23505')
        throw new ConflictException(error.detail);
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

  async softDeleteLead(leadId: string): Promise<UpdateResult> {
    return await this.softDelete(leadId);
  }

  async removeLead(leadId: string): Promise<DeleteResult> {
    return await this.delete(leadId);
  }

  async bulkInsert(file: Express.Multer.File): Promise<BulkInsertResponse> {
    if (!file) throw new BadRequestException('file not found.');
    const errors = [];
    const leads = bulkToLeadObject(file);
    for (const bulkData of leads) {
      const errors = [];
      const leads = bulkToLeadObject(file);
      for (const lead of leads)
        try {
          await this.createLead(lead, true);
        } catch (error) {
          if (error.code === '23505')
            errors.push({ ...lead, error: 'email or phone already exists' });
          else
            errors.push({
              ...lead,
              error: 'email/phone not provided or invalid',
            });
        }
      const all = leads.length;
      const failds = errors.length;
      const success = all - failds;
      return { all, success, failds, reason: errors };
    }
  }
}
