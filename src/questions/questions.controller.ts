/*
 *  Description: This file implements the questions controller.
 *               It is responsible for handling the requests to /questions/...
 *               However, it's not responsible for /questions/{id}/answers/...
 *
 *  Author(s):
 *      Nictheboy Li    <nictheboy@outlook.com>
 *
 */

import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService, AuthorizedAction } from '../auth/auth.service';
import { BaseRespondDto } from '../common/DTO/base-respond.dto';
import { BaseErrorExceptionFilter } from '../common/error/error-filter';
import {
  AddQuestionRequestDto,
  AddQuestionResponseDto,
} from './DTO/add-question.dto';
import {
  FollowQuestionResponseDto,
  UnfollowQuestionResponseDto,
} from './DTO/follow-unfollow-question.dto';
import { GetQuestionFollowerResponseDto } from './DTO/get-question-follower.dto';
import { GetQuestionResponseDto } from './DTO/get-question.dto';
import { SearchQuestionResponseDto } from './DTO/search-question.dto';
import { UpdateQuestionRequestDto } from './DTO/update-question.dto';
import { QuestionsService } from './questions.service';

@Controller('/questions')
@UsePipes(new ValidationPipe())
@UseFilters(new BaseErrorExceptionFilter())
export class QuestionsController {
  constructor(
    private readonly questionsService: QuestionsService,
    private readonly authService: AuthService,
  ) { }

  @Get('/')
  async searchQuestion(
    @Query('q') q: string,
    @Query('page_start', new ParseIntPipe({ optional: true }))
    pageStart: number,
    @Query('page_size', new ParseIntPipe({ optional: true }))
    pageSize: number,
    @Headers('Authorization') auth: string,
    @Ip() ip: string,
    @Headers('User-Agent') userAgent: string,
  ): Promise<SearchQuestionResponseDto> {
    throw new Error();
  }

  @Post('/')
  async addQuestion(
    @Body() body: AddQuestionRequestDto,
    @Headers('Authorization') auth: string,
  ): Promise<AddQuestionResponseDto> {
    const userId = this.authService.verify(auth).userId;
    this.authService.audit(
      auth,
      AuthorizedAction.create,
      userId,
      'questions',
      null,
    );
    const questionId = await this.questionsService.addQuestion(
      userId,
      body.title,
      body.content,
      body.type,
      body.topics,
      body.groupId,
    );
    return {
      code: 201,
      message: 'Created',
      data: {
        id: questionId,
      },
    }
  }

  @Get('/:id')
  async getQuestion(
    @Param('id') id: number,
    @Headers('Authorization') auth: string,
    @Ip() ip: string,
    @Headers('User-Agent') userAgent: string,
  ): Promise<GetQuestionResponseDto> {
    throw new Error();
  }

  @Put('/:id')
  async updateQuestion(
    @Param('id') id: number,
    @Body() body: UpdateQuestionRequestDto,
    @Headers('Authorization') auth: string,
  ): Promise<BaseRespondDto> {
    throw new Error();
  }

  @Delete('/:id')
  async deleteQuestion(
    @Param('id') id: number,
    @Headers('Authorization') auth: string,
  ): Promise<BaseRespondDto> {
    throw new Error();
  }

  @Get('/:id/followers')
  async getQuestionFollowers(
    @Param('id', ParseIntPipe) id: number,
    @Query('page_start', new ParseIntPipe({ optional: true }))
    pageStart: number,
    @Query('page_size', new ParseIntPipe({ optional: true })) pageSize: number,
    @Headers('Authorization') auth: string,
    @Ip() ip: string,
    @Headers('User-Agent') userAgent: string,
  ): Promise<GetQuestionFollowerResponseDto> {
    throw new Error();
  }

  @Put('/:id/followers')
  async followQuestion(
    @Param('id') id: number,
    @Headers('Authorization') auth: string,
  ): Promise<FollowQuestionResponseDto> {
    throw new Error();
  }

  @Delete('/:id/followers')
  async unfollowQuestion(
    @Param('id') id: number,
    @Headers('Authorization') auth: string,
  ): Promise<UnfollowQuestionResponseDto> {
    throw new Error();
  }
}
