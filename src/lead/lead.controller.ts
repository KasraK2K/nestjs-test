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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteResult } from 'typeorm';
import * as config from 'config';
import * as _ from 'lodash';
import { LeadService } from './lead.service';
import { LeadCredentialsDto } from './dto/lead-credentials.dto';
import { LeadEntity } from './entities/lead.entity';
import { bulkToLeadObject } from 'src/common/utils/bulk.utils';

const pagination = config.get('pagination');
const server = config.get('pagination');

@Controller('leads')
export class LeadController {
  private readonly logger = new Logger(LeadController.name);

  constructor(private readonly leadService: LeadService) {}

  @Post()
  async createLead(
    @Body(ValidationPipe) leadCredentialsDto: LeadCredentialsDto,
    debug: boolean = false,
  ): Promise<LeadEntity> {
    return await this.leadService.createLead(leadCredentialsDto, debug);
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

  @Post('/bulk/insert')
  @UseInterceptors(FileInterceptor('file'))
  async bulkInsert(@UploadedFile() file: Express.Multer.File) {
    return await this.leadService.bulkInsert(file);
  }
}
