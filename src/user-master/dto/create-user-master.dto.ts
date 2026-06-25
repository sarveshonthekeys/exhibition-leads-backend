export class CreateUserMasterDto {
  orgId: number;
  orgName?: string;
  sbuId?: number;
  campaignId?: number;
  username: string;
  password: string;
  email?: string;
  mobile?: string;
  address?: string;
  pincode?: number;
  roleId?: number;
  expoToken?: string;
  createdBy?: string;
  createdOn: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  status: boolean;
}
