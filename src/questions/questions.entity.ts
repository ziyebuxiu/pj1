/*
 *  Description: This file defines the entities used in questions service.
 *               It defines the SQL tables stored in the database.
 *
 *  Author(s):
 *      Nictheboy Li    <nictheboy@outlook.com>
 *
 */

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GroupQuestionRelationship } from '../groups/group.entity';
import { Topic } from '../topics/topics.entity';
import { User } from '../users/users.entity';

import { isMySQL } from '../common/helper/db.helper';

@Entity()
// Use fulltext index to support fulltext search.
@Index('idx_ft_title_content', ['title', 'content'], {
  fulltext: true,
  parser: 'ngram',
})
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  createdBy: User;

  @Column()
  @Index('idx_asker_user', { unique: false })
  createdById: number;

  // Use column type 'text' to support string with a maximum length of 64K.
  @Column('text')
  title: string;

  // Use column type 'mediumtext' to support string with a maximum length of 16M.
  @Column({ type: isMySQL() ? 'mediumtext' : 'text' })
  content: string;

  @Column()
  type: number;

  @OneToOne(() => GroupQuestionRelationship, (gqr) => gqr.question)
  groupQuestionRelationship: GroupQuestionRelationship;

  @Column('int', { nullable: true })
  @Index('idx_group', { unique: false })
  groupId?: number | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity()
export class QuestionTopicRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question)
  question: Question;

  @Column()
  @Index('idx_question', { unique: false })
  questionId: number;

  @ManyToOne(() => Topic)
  topic: Topic;

  @Column()
  @Index('idx_topic', { unique: false })
  topicId: number;

  // In the future, we may want to add a feature to add a topic to a question.
  // So we reserved this field.
  @ManyToOne(() => User)
  createdBy: User;

  @Column()
  createdById: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity()
export class QuestionFollowerRelation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question)
  question: Question;

  @Column()
  @Index('idx_question', { unique: false })
  questionId: number;

  @ManyToOne(() => User)
  follower: User;

  @Column()
  @Index('idx_follower', { unique: false })
  followerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

@Entity()
export class QuestionQueryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  viewer: User;

  @Column('int', { nullable: true })
  @Index('idx_user', { unique: false })
  viewerId?: number | null;

  @ManyToOne(() => Question)
  question: Question;

  @Column()
  @Index('idx_question', { unique: false })
  questionId: number;

  @Column()
  ip: string;

  @Column()
  userAgent: string = '';

  @CreateDateColumn()
  createdAt: Date;
}

@Entity()
// The search history is a precious data source,
// so we should record it even if it is not used for now.
export class QuestionSearchLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // In the future, we may want to use the search history to recommend topics to users.
  // So we use fulltext index here, although it is not necessary for now.
  @Index('idx_keywords', { fulltext: true, parser: 'ngram' })
  keywords: string;

  @Column('int', { nullable: true })
  // A paging argument.
  firstQuestionId?: number | null;

  @Column()
  // A paging argument.
  pageSize: number;

  @Column()
  // The result is represented as a string of question ids, separated by comma.
  // For example, if the result is [1, 2, 3], then the result string is "1,2,3".
  result: string;

  @Column({ type: 'float' })
  // The search duration in seconds.
  duration: number;

  @ManyToOne(() => User)
  @Index()
  searcher: User;

  // This property does not generate a new column, because the column `searcherId` is
  // generated automatically according to the @ManyToOne decorator by TypeORM engine.
  //
  // This property is used for accessing the user id without joining the user table.
  //
  // undefined if the searcher is not logged in.
  @Column('int', { nullable: true })
  searcherId?: number | null;

  @Column()
  ip: string;

  @Column()
  userAgent: string = '';

  @CreateDateColumn()
  createdAt: Date;
}
