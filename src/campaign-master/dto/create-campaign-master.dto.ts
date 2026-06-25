export class CreateCampaignMasterDto {
  orgId: number;
  campaignName: string;
  campaignTypeId: number;
  description?: string;
  fromDate: string;
  toDate: string;
  stateId: number;
  districtId: number;
  location: string;
  campaignObjective: string;
  createdBy?: string;
  createdOn: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  status: boolean = true;
}
