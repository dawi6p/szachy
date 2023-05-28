import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Match } from "./Match";

@Entity("matchtype", { schema: "szachy" })
export class Matchtype {
  @PrimaryGeneratedColumn({ type: "int", name: "ID" })
  id: number;

  @Column("int", { name: "Time" })
  time: number;

  @Column("varchar", { name: "Name", length: 20 })
  name: string;

  @OneToMany(() => Match, (match) => match.matchtype)
  matches: Match[];
}
