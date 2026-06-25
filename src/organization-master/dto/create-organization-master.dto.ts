export class CreateOrganizationMasterDto {
  orgName: string;
  orgTypeId: number;
  orgDescription?: string;
  address?: string;
  pincode?: number;
  billTo?: string;
  billToPincode?: number;
  shipToPincode?: number;
  shipTo?: string;
  orgContactName?: string;
  orgMobileNo: string;
  orgEmail: string;
  createdBy?: string;
  createdOn?: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  status?: boolean = true;
}
