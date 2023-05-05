import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("Friend1", ["friend1"], {})
@Index("Friend2", ["friend2"], {})
@Entity("friends", { schema: "szachy" })
export class Friends {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Friend1", nullable: true })
  friend1: number | null;

  @Column("int", { name: "Friend2", nullable: true })
  friend2: number | null;

  @ManyToOne(() => User, (user) => user.friends, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Friend1", referencedColumnName: "id" }])
  friend: User;

  @ManyToOne(() => User, (user) => user.friends2, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Friend2", referencedColumnName: "id" }])
  friend3: User;
}
