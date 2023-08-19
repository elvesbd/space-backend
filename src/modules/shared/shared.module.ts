import { Module } from '@nestjs/common';
import { TypeORMRepositoryService } from './infra/adapters';

@Module({
  imports: [],
  providers: [TypeORMRepositoryService],
})
export class SharedModule {}
