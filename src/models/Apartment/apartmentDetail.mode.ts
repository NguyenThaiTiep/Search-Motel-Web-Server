import { deserialize, deserializeArray, plainToClass } from "class-transformer";
import { getRepository } from "typeorm";
import { HandelStatus } from "../../config/HandelStatus";
import {
  ApartmentGetDto,
  ApartmentInputDto,
} from "../../dto/Apartment/apartment.dto";
import { ApartmentDetailInputDto } from "../../dto/Apartment/apartmentDetail.dto";
import { Apartment } from "../../entity/apartment/apartment";
import { ApartmentDetail } from "../../entity/apartment/apartmentDetail";
import { KitchenType } from "../../entity/apartment/type/kitchenType";
import { ToiletType } from "../../entity/apartment/type/toiletType";
import { ApartmentImage } from "../../entity/image/apartmentImage";
import { mapObject } from "../../utils/map";

const create = async (input: ApartmentDetailInputDto) => {
  if (!input || !input.apartmentId || !input.imagesId) return HandelStatus(400);
  let apartmentDetailRepo = getRepository(ApartmentDetail);
  let apartmentRepo = getRepository(Apartment);
  let imageApartmentRepo = getRepository(ApartmentImage);
  let kitchenTypeRepo = getRepository(KitchenType);
  let toilerTypeRepo = getRepository(ToiletType);
  let apartment = await apartmentRepo.findOne(input.apartmentId);
  if (input.id) {
    let ad = apartmentDetailRepo.findOne(input.id);
    if (!ad) {
      return HandelStatus(404, "Không tìm thấy bản chi tiết");
    }
  }
  let apartmentDetailGet = await apartmentDetailRepo.findOne({
    apartment: apartment,
  });
  if (!apartment || (apartmentDetailGet && !input.id)) {
    return HandelStatus(400, "Đã tồn tại bản chi tiết");
  }
  let images = await imageApartmentRepo.findByIds(input.imagesId);
  let kitchenType = await kitchenTypeRepo.findOne(input.kitchenTypeId || -1);
  let toiletType = await toilerTypeRepo.findOne(input.toiletTypeId || -1);
  let apartmentDetail;

  if (input.id) {
    apartmentDetail = await apartmentDetailRepo.findOne({
      id: input.id,
      apartment: apartment,
    });
    if (!apartmentDetail) return HandelStatus(404);
    apartmentDetail = mapObject(apartmentDetail, input);
  } else {
    apartmentDetail = plainToClass(ApartmentDetail, input);
  }

  if (images && images.length != 0) apartmentDetail.images = images;
  apartmentDetail.toiletType = toiletType;
  apartmentDetail.kitchenType = kitchenType;
  if (!input.apartmentId) apartmentDetail.apartment = apartment;
  apartment.apartmentDetail = apartmentDetail;

  // console.log(apartmentDetail);

  try {
    if (input.id) {
      await apartmentDetailRepo.update(input.id, apartmentDetail);
    } else await apartmentDetailRepo.save(apartmentDetail);
    return HandelStatus(200, null, { id: apartmentDetail.id });
  } catch (e) {
    return HandelStatus(500, e);
  }
};
const getByApartmentId = async (apartmentId: number) => {
  if (!apartmentId) return HandelStatus(400);
  let apartmentRepo = await getRepository(Apartment).findOne({
    relations: [
      "province",
      "district",
      "ward",
      "street",
      "apartmentDetail",
      "apartmentDetail.kitchenType",
      "apartmentDetail.toiletType",
    ],
    where: {
      id: apartmentId,
    },
  });

  if (!apartmentRepo) return HandelStatus(404);
  let result = deserialize(ApartmentGetDto, JSON.stringify(apartmentRepo), {
    excludeExtraneousValues: true,
  });
  return HandelStatus(200, null, result);
};
const update = async (input: ApartmentInputDto) => {};
const remove = async (id: number) => {
  try {
    await getRepository(ApartmentDetail).delete(id);
    return HandelStatus(200);
  } catch (e) {
    return HandelStatus(500, e);
  }
};
export const ApartmentDetailService = {
  create,
  update,
  remove,
  getByApartmentId,
};
