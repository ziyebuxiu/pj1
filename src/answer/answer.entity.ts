import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../users/users.entity';
  
  @Entity()
  export class Answer {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User)
    author: User;

    @Column()
    @Index({ unique: false })
    question_Id: number; //askeruser_Id
  
    // Use column type 'text' to support arbitrary length of string.
    @Column('text')
    // Use fulltext index to support fulltext search.
    @Index({ fulltext: true, parser: 'ngram' })
    title: string;
  
    // Use column type 'text' to support arbitrary length of string.
    @Column('text')
    // Use fulltext index to support fulltext search.
    @Index({ fulltext: true, parser: 'ngram' })
    content: string;
  
    @Column()
    type: Answer;
  
    @Column()
    is_group: boolean;
    
    @Column({ nullable: true })
    @Index({ unique: false })
    groupId?: number;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date;

    //agree
    @Column('text', {array: true, nullable: true})
    agrees: string[];

    @Column('text', {array: true, nullable: true})
    disagrees: string[];

    @Column({default: 0})
    agree_count: number;

    @Column({default: 0})
    disagree_count: number;

    @Column({default: 0})
    agree_type: number
    
    //favorite
    @Column({default: false})
    is_favorite: boolean; // isFavorited

    @Column({
        type: 'simple-array',
        default: [],
        transformer: {
          to: (value: string[]) => JSON.stringify(value),
          from: (value: string) => JSON.parse(value)
        }
    })
    favoritedBy: string[];

    @Column({default: 0})
    favorite_count: number;

    //comment
    @Column({ type: 'simple-json', nullable: true }) 
    comments: { userId: string, comment: string, createdAt: Date }[]; 

    @Column({default: 0})
    comment_count: number;
  
  }