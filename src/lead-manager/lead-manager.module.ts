import { LeadManagerRepository } from './lead-manager.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LeadManagerService } from './lead-manager.service';
import { LeadManagerController } from './lead-manager.controller';
import { LeadRepository } from 'src/lead/lead.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LeadManagerRepository, LeadRepository])],
  controllers: [LeadManagerController],
  providers: [LeadManagerService],
})
export class LeadManagerModule {}
