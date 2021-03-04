import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  Logger,
  ParseIntPipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import { LeadManagerService } from './lead-manager.service';
import { CreateLeadManagerDto } from './dto/create-lead-manager.dto';
import { UpdateLeadManagerDto } from './dto/update-lead-manager.dto';
import { ApiTags } from '@nestjs/swagger';
import * as config from 'config';
import { LeadManagerEntity } from './entities/lead-manager.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult } from 'typeorm';

const pagination = config.get('pagination');
const server = config.get('server');

@ApiTags('lead-managers')
@Controller('lead-managers')
export class LeadManagerController {
  private readonly logger = new Logger(LeadManagerController.name);

  constructor(private readonly leadManagerService: LeadManagerService) {}

  @Post()
  async createLeadManager(
    @Body(ValidationPipe) createLeadManagerDto: CreateLeadManagerDto,
  ): Promise<LeadManagerEntity> {
    return await this.leadManagerService.createLeadManager(
      createLeadManagerDto,
    );
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

  @Put('/:leadManagerId')
  async updateLeadManager(
    @Param('leadManagerId') leadManagerId: string,
    @Body() updateLeadManagerDto: UpdateLeadManagerDto,
  ): Promise<LeadManagerEntity> {
    return await this.leadManagerService.updateLeadManager(
      leadManagerId,
      updateLeadManagerDto,
    );
  }

  @Delete('/:leadManagerId')
  async deleteLeadManager(
    @Param('leadManagerId', ParseUUIDPipe) leadManagerId: string,
  ): Promise<DeleteResult> {
    return await this.leadManagerService.deleteLeadManager(leadManagerId);
  }
}
