import { LeadManagerRepository } from './lead-manager.repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLeadManagerDto } from './dto/create-lead-manager.dto';
import { UpdateLeadManagerDto } from './dto/update-lead-manager.dto';
import { LeadManagerEntity } from './entities/lead-manager.entity';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class LeadManagerService {
  private readonly logger = new Logger(LeadManagerService.name);

  constructor(
    @InjectRepository(LeadManagerRepository)
    private leadManagerRepository: LeadManagerRepository,
  ) {}

  async createLeadManager(
    createLeadManagerDto: CreateLeadManagerDto,
  ): Promise<LeadManagerEntity> {
    return await this.leadManagerRepository.createLeadManager(
      createLeadManagerDto,
    );
  }

  async GetAllLeadManager(
    options: IPaginationOptions,
  ): Promise<Pagination<LeadManagerEntity>> {
    return await this.leadManagerRepository.GetAllLeadManager(options);
  }

  async getLeadManagerById(leadManagerId: string): Promise<LeadManagerEntity> {
    return await this.leadManagerRepository.getLeadManagerById(leadManagerId);
  }

  async updateLeadManager(
    leadManagerId: string,
    updateLeadManagerDto: UpdateLeadManagerDto,
  ): Promise<LeadManagerEntity> {
    return await this.leadManagerRepository.updateLeadManager(
      leadManagerId,
      updateLeadManagerDto,
    );
  }

  async softDeleteLeadManager(leadManagerId: string): Promise<UpdateResult> {
    return await this.leadManagerRepository.softDeleteLeadManager(
      leadManagerId,
    );
  }

  async removeLeadManager(leadManagerId: string): Promise<DeleteResult> {
    return await this.leadManagerRepository.removeLeadManager(leadManagerId);
  }
}