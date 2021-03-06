import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Apartment } from "../apartment/apartment";
import { District } from "./District";
import { Location } from "./Location";

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: "10", unique: true })
  code: string;
  @Column({ type: "nvarchar", charset: "utf8", length: 255 })
  name: string;
  @OneToMany((type) => District, (o) => o.province)
  @JoinColumn()
  districts: District[];
  @OneToMany((type) => Location, (o) => o.province)
  @JoinColumn()
  locations: Location[];
  @OneToMany((type) => Apartment, (o) => o.province)
  @JoinColumn()
  aparmtemtns: Apartment[];
}
