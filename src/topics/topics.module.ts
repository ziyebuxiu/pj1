/*
 *  Description: This file defines the topics module.
 *
 *  Author(s):
 *      Nictheboy Li    <nictheboy@outlook.com>
 *
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../users/users.entity';
import { TopicsController } from './topics.controller';
import { Topic, TopicSearchLog } from './topics.entity';
import { TopicsService } from './topics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Topic, TopicSearchLog]),
    AuthModule,
  ],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule {}
