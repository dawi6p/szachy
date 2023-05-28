import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Matchtype } from "./Matchtype";

@Index("Black", ["black"], {})
@Index("White", ["white"], {})
@Index("TypeID", ["typeId"], {})
@Entity("match", { schema: "szachy" })
export class Match {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("datetime", { name: "Date" })
  date: Date;

  @Column("int", { name: "Black", nullable: true })
  black: number | null;

  @Column("int", { name: "White", nullable: true })
  white: number | null;

  @Column("int", { name: "Win" })
  win: number;

  @Column("varchar", { name: "FENString", length: 1000 })
  fenString: string;

  @Column("int", { name: "TypeID", nullable: true })
  typeId: number | null;

  @ManyToOne(() => User, (user) => user.matches, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Black", referencedColumnName: "id" }])
  black2: User;

  @ManyToOne(() => User, (user) => user.matches2, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "White", referencedColumnName: "id" }])
  white2: User;

  @ManyToOne(() => Matchtype, matchtype => matchtype.matches, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "TypeID", referencedColumnName: "id" }])
  matchtype: Matchtype;
}
