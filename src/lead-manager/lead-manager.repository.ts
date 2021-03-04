import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as _ from 'lodash';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { LeadManagerEntity } from './entities/lead-manager.entity';
import { CreateLeadManagerDto } from './dto/create-lead-manager.dto';
import { UpdateLeadManagerDto } from './dto/update-lead-manager.dto';

@EntityRepository(LeadManagerEntity)
export class LeadManagerRepository extends Repository<LeadManagerEntity> {
  private readonly logger = new Logger(LeadManagerRepository.name);

  async createLeadManager(
    createLeadManagerDto: CreateLeadManagerDto,
  ): Promise<LeadManagerEntity> {
    const { name } = createLeadManagerDto;
    const leadManager = new LeadManagerEntity();
    _.assign(leadManager, { name });
    return await this.save(leadManager);
  }

  async GetAllLeadManager(
    options: IPaginationOptions,
  ): Promise<Pagination<LeadManagerEntity>> {
    const leadManagers = this.createQueryBuilder('lead-managers');
    return await paginate<LeadManagerEntity>(leadManagers, options);
  }

  async getLeadManagerById(leadManagerId: string): Promise<LeadManagerEntity> {
    return await this.findOne(leadManagerId);
  }

  async updateLeadManager(
    leadManagerId: string,
    updateLeadManagerDto: UpdateLeadManagerDto,
  ): Promise<LeadManagerEntity> {
    const leadManager = await this.getLeadManagerById(leadManagerId);
    _.assign(leadManager, updateLeadManagerDto);
    try {
      await this.save(leadManager);
    } catch (error) {
      if (error.code === '23505') throw new ConflictException(error.detail);
      else throw new InternalServerErrorException(error.message);
    }
    return leadManager;
  }

  async deleteLeadManager(leadManagerId: string): Promise<DeleteResult> {
    return await this.delete(leadManagerId);
  }
}
