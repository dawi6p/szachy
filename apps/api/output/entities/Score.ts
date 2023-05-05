import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("UserID", ["userId"], {})
@Entity("score", { schema: "szachy" })
export class Score {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("datetime", { name: "Date" })
  date: Date;

  @Column("int", { name: "Score" })
  score: number;

  @Column("int", { name: "UserID" })
  userId: number;

  @ManyToOne(() => User, (user) => user.scores, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "UserID", referencedColumnName: "id" }])
  user: User;
}
