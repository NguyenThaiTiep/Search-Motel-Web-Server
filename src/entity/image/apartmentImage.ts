import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ApartmentDetail } from "../apartment/apartmentDetail";

@Entity()
export class ApartmentImage {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  url: string;
  @ManyToOne((type) => ApartmentDetail, (o) => o.images)
  @JoinColumn()
  apartmentDetail: ApartmentDetail;
}
