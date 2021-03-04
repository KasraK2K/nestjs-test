import { LeadManagerRepository } from './lead-manager.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LeadManagerService } from './lead-manager.service';
import { LeadManagerController } from './lead-manager.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LeadManagerRepository])],
  controllers: [LeadManagerController],
  providers: [LeadManagerService],
})
export class LeadManagerModule {}
