import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  Logger,
  ParseIntPipe,
  Query,
  ParseUUIDPipe,
  Patch,
} from '@nestjs/common';
import { LeadManagerService } from './lead-manager.service';
import { CreateLeadManagerDto } from './dto/create-lead-manager.dto';
import { UpdateLeadManagerDto } from './dto/update-lead-manager.dto';
import { ApiTags } from '@nestjs/swagger';
import * as config from 'config';
import { LeadManagerEntity } from './entities/lead-manager.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult, UpdateResult } from 'typeorm';
import { SearchLeadManagerAndCount } from './interfaces/search.interface';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { AssignLeadToManagerDto } from './dto/assign-lead-to-manager.dto';

const pagination = config.get('pagination');
const server = config.get('server');
const events = config.get('events');

@ApiTags('lead-managers')
@Controller('lead-managers')
export class LeadManagerController {
  private readonly logger = new Logger(LeadManagerController.name);

  constructor(
    private readonly leadManagerService: LeadManagerService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  async createLeadManager(
    @Body(ValidationPipe) createLeadManagerDto: CreateLeadManagerDto,
  ): Promise<LeadManagerEntity> {
    const leadManager = await this.leadManagerService.createLeadManager(
      createLeadManagerDto,
    );
    // emit event to assign lead to new lead manager after create the new lead manager
    this.eventEmitter.emit(events.leadManager.free, leadManager);
    return leadManager;
  }

  @Get()
  async GetAllLeadManager(
    @Query('page', ParseIntPipe) page: number = pagination.page,
    @Query('limit', ParseIntPipe) limit: number = pagination.limit,
  ): Promise<Pagination<LeadManagerEntity>> {
    return await this.leadManagerService.GetAllLeadManager({
      page,
      limit,
      route: `${server.address}/lead-managers`,
    });
  }

  @Get('/:leadManagerId')
  async getLeadManagerById(
    @Param('leadManagerId', ParseUUIDPipe) leadManagerId: string,
  ): Promise<LeadManagerEntity> {
    return this.leadManagerService.getLeadManagerById(leadManagerId);
  }

  @Get('/search/:name')
  async searchLeadManager(
    @Param('name') name: string,
  ): Promise<SearchLeadManagerAndCount> {
    return this.leadManagerService.searchLeadManager(name);
  }

  @Patch('/assign')
  async assignLeadToManager(
    @Body(ValidationPipe) assignLeadToManagerDto: AssignLeadToManagerDto,
  ) {
    return await this.leadManagerService.assignLeadToManager(
      assignLeadToManagerDto,
    );
  }

  @Patch('/:leadManagerId')
  async updateLeadManager(
    @Param('leadManagerId') leadManagerId: string,
    @Body(ValidationPipe) updateLeadManagerDto: UpdateLeadManagerDto,
  ): Promise<LeadManagerEntity> {
    return await this.leadManagerService.updateLeadManager(
      leadManagerId,
      updateLeadManagerDto,
    );
  }

  @Delete('/:leadManagerId')
  async softDeleteLeadManager(
    @Param('leadManagerId', ParseUUIDPipe) leadManagerId: string,
  ): Promise<UpdateResult> {
    return await this.leadManagerService.softDeleteLeadManager(leadManagerId);
  }

  @Delete('/remove/:leadManagerId')
  async removeLeadManager(
    @Param('leadManagerId', ParseUUIDPipe) leadManagerId: string,
  ): Promise<DeleteResult> {
    return await this.leadManagerService.removeLeadManager(leadManagerId);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Events                                   */
  /* -------------------------------------------------------------------------- */
  @OnEvent(events.leadManager.free)
  assignLeadToNewManager(leadManager: LeadManagerEntity) {
    console.log('leadManager', leadManager);
  }
}
