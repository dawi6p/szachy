import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("message", { schema: "szachy" })
export class message {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "title" })
  title: string;

  @Column("varchar", { name: "message"})
  message: string;
}
