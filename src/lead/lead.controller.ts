import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Logger,
  ValidationPipe,
  ParseIntPipe,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import * as config from 'config';
import { LeadService } from './lead.service';
import { LeadCredentialsDto } from './dto/lead-credentials.dto';
import { LeadEntity } from './entities/lead.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeleteResult } from 'typeorm';

const pagination = config.get('pagination');
const server = config.get('pagination');

@Controller('leads')
export class LeadController {
  private readonly logger = new Logger(LeadController.name);

  constructor(private readonly leadService: LeadService) {}

  @Post()
  async createLead(
    @Body(ValidationPipe) leadCredentialsDto: LeadCredentialsDto,
  ): Promise<LeadEntity> {
    return await this.leadService.createLead(leadCredentialsDto);
  }

  @Get()
  async getAllLead(
    @Query('page', ParseIntPipe) page: number = pagination.page,
    @Query('limit', ParseIntPipe) limit: number = pagination.limit,
  ): Promise<Pagination<LeadEntity>> {
    return await this.leadService.getAllLead({
      page,
      limit,
      route: `${server.address}/leads`,
    });
  }

  @Get('/:leadId')
  async getLeadById(
    @Param('leadId', ParseUUIDPipe) leadId: string,
  ): Promise<LeadEntity> {
    return await this.leadService.getLeadById(leadId);
  }

  @Put(':leadId')
  async updateLead(
    @Param('leadId', ParseUUIDPipe) leadId: string,
    @Body(ValidationPipe) leadCredentialsDto: LeadCredentialsDto,
  ): Promise<LeadEntity> {
    return await this.leadService.updateLead(leadId, leadCredentialsDto);
  }

  @Delete('/:leadId')
  async deleteLead(
    @Param('leadId', ParseUUIDPipe) leadId: string,
  ): Promise<DeleteResult> {
    return await this.leadService.deleteLead(leadId);
  }
}
