export class CreateCampaignTypeMasterDto {
  camapignType: string;
  campaignTypeDescription?: string;
  createdBy?: string;
  createdOn: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  status: boolean = true;
}
