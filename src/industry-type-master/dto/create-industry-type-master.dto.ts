export class CreateIndustryTypeMasterDto {
  industryType: string;
  industryTypeDescription?: string;
  createdBy?: string;
  createdOn: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  status: boolean = true;
}
