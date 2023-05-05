import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Riddle } from "./Riddle";

@Index("RiddleID", ["riddleId"], {})
@Index("UserID", ["userId"], {})
@Entity("riddleuser", { schema: "szachy" })
export class Riddleuser {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "RiddleID" })
  riddleId: number;

  @Column("int", { name: "UserID" })
  userId: number;

  @Column("datetime", { name: "Date" })
  date: Date;

  @Column("tinyint", { name: "Solved", width: 1 })
  solved: boolean;

  @ManyToOne(() => User, (user) => user.riddleusers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "UserID", referencedColumnName: "id" }])
  user: User;

  @ManyToOne(() => Riddle, (riddle) => riddle.riddleusers, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "RiddleID", referencedColumnName: "id" }])
  riddle: Riddle;
}
