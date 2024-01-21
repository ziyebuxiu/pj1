/*
 *  Description: This file defines the entities used in users service.
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
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index({ unique: true })
  username: string;

  @Column()
  hashedPassword: string; // Algorithm: bcrypt

  @Column()
  @Index({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  // The following code is deleted due to circulate reference issues.
  /*
  // Joinable columns:
  // These columns are not stored in the database, but can be joined with other tables.
  //
  // For example, the following code queries a user and its profile record.
  // const user = await this.userRepository.findOne({
  //   where: { id: userId },
  //   relations: ['user_profile']
  // });
  @OneToOne(() => UserProfile, profile => profile.user)
  profile: UserProfile;

  @OneToMany(() => UserFollowingRelationship, follow => follow.follower)
  followingRelationships: UserFollowingRelationship[]; // This user follows other users.

  @OneToMany(() => UserFollowingRelationship, follow => follow.followee)
  followedRelationships: UserFollowingRelationship[]; // This user is followed by other users.

  @OneToMany(() => UserResetPasswordRequest, request => request.user)
  resetPasswordRequests: UserResetPasswordRequest[];

  @OneToMany(() => UserLoginLog, log => log.user)
  loginLogs: UserLoginLog[];

  @OneToMany(() => UserProfileQueryLog, log => log.viewer)
  profileViewingLogs: UserProfileQueryLog[]; // This user views other users.

  @OneToMany(() => UserProfileQueryLog, log => log.viewee)
  profileViewedLogs: UserProfileQueryLog[]; // This user is viewed by other users.

  @OneToMany(() => UserResetPasswordLog, log => log.user)
  resetPasswordLogs: UserResetPasswordLog[];
  */
}

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @Index({ unique: true })
  @JoinColumn()
  user: User;

  // This property does not generate a new column, because the column `userId` is
  // generated automatically according to the @JoinColumn decorator by TypeORM engine.
  //
  // This property is used for accessing the user id without joining the user table.
  @Column()
  userId: number;

  @Column()
  nickname: string;

  @Column()
  avatar: string;

  @Column()
  intro: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

@Entity()
export class UserFollowingRelationship {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @Index()
  follower: User;

  // This property does not generate a new column, because the column `followerId` is
  // generated automatically according to the @ManyToOne decorator by TypeORM engine.
  //
  // This property is used for accessing the user id without joining the user table.
  @Column()
  followeeId: number;

  @ManyToOne(() => User)
  @Index()
  followee: User;

  // This property does not generate a new column, because the column `followeeId` is
  // generated automatically according to the @ManyToOne decorator by TypeORM engine.
  //
  // This property is used for accessing the user id without joining the user table.
  @Column()
  followerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

@Entity()
export class UserRegisterRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  email: string;

  @Column()
  code: string;

  @CreateDateColumn()
  createdAt: Date;
}

// This table is deleted because the token has enough info about the password reset request.
/*
@Entity()
export class UserResetPasswordRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @Index()
  user: User;

  // This property does not generate a new column, because the column `userId` is
  // generated automatically according to the @ManyToOne decorator by TypeORM engine.
  //
  // This property is used for accessing the user id without joining the user table.
  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;
}
*/

@Entity()
export class UserLoginLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @Index()
  user: User;

  // This property does not generate a new column, because the column `userId` is
  // generated automatically according to the @ManyToOne decorator by TypeORM engine.
  //
  // This property is used for accessing the user id without joining the user table.
  @Column()
  userId: number;

  @Column()
  ip: string;

  @Column()
  userAgent: string = '';

  @CreateDateColumn()
  createdAt: Date; // Login time
}

@Entity()
export class UserProfileQueryLog {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  @Index()
  viewer: User;

  // This property does not generate a new column, because the column `viewerId` is
  // generated automatically according to the @ManyToOne decorator by TypeORM engine.
  //
  // This property is used for accessing the user id without joining the user table.
  @Column({ nullable: true })
  viewerId: number;

  @ManyToOne(() => User)
  @Index()
  viewee: User;

  // This property does not generate a new column, because the column `vieweeId` is
  // generated automatically according to the @ManyToOne decorator by TypeORM engine.
  //
  // This property is used for accessing the user id without joining the user table.
  @Column()
  vieweeId: number;

  @Column()
  ip: string;

  @Column()
  userAgent: string = '';

  @CreateDateColumn()
  createdAt: Date;
}

export enum UserRegisterLogType {
  RequestSuccess = 1, // registerRequestId is not null for this type
  RequestFailDueToAlreadyRegistered = 2,
  RequestFailDueToInvalidEmail = 3,
  RequestFailDueToNotSupportedEmail = 4,
  RequestFailDurToSecurity = 5, // Too many requests
  RequestFailDueToSendEmailFailure = 6,
  Success = 1001,
  FailDueToExpired = 1002, // registerRequestId is not null for this type
  FailDueToUserExistence = 1003, // registerRequestId is not null for this type
  FailDueToEmailExistence = 1004, // registerRequestId is not null for this type
  FailDueToWrongCode = 1005,
}

@Entity()
export class UserRegisterLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  email: string;

  @Column()
  type: UserRegisterLogType;

  @Column({ nullable: true })
  registerRequestId?: number = null;

  @Column()
  ip: string;

  @Column()
  userAgent: string = '';

  @CreateDateColumn()
  createdAt: Date;
}

export enum UserResetPasswordLogType {
  RequestSuccess = 1,
  RequestFailDueToNoneExistentEmail = 2,
  RequestFailDueToSecurity = 3, // Too many requests
  Success = 1001,
  FailDurToInvalidToken = 1002,
  FailDueToExpiredRequest = 1003,
  FailDueToNoUser = 1004, // The token is valid, but the user id does not exist
}

@Entity()
export class UserResetPasswordLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number = null;

  @Column()
  type: UserResetPasswordLogType;

  @Column()
  ip: string;

  @Column()
  userAgent: string = '';

  @CreateDateColumn()
  createdAt: Date;
}