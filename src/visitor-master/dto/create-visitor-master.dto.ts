export class CreateVisitorMasterDto {
  orgId: number;
  sbuId?: number;
  campaignId: number;
  industryTypeId: number;
  userId: number;
  companyType: number;
  companyName?: string;
  address?: string;
  pincode?: number;
  stateId: number;
  districtId: number;
  productsInterested?: CreateVisitorIntProductDto[];
  attachmentId?: number;
  noOfGifts?: string;
  giftDetails?: string;
  planningTimeline?: string;
  financingReuired?: boolean;
  noOfPeopleAccompanied?: number;
  noOfGiftsNeeded?: string;
  createdBy?: string;
  visitorDetails?: CreateVisitorDetailsDto[];
  status?: boolean = true;
}

export class CreateVisitorIntProductDto {
  productFamilyId: number;
  orgId: number;
  sbuId?: number;
  productId: number;
  userId: number;
  visitorMasterId: number;
  modelId: number;
  noOfMachines: number;
}
export class CreateVisitorDetailsDto {
  visitorName: string;
  orgId: number;
  sbuId?: number;
  userId: number;
  email?: string;
  mobileNo?: string;
  visitorMasterId: number;
}
