export class CreateCompanyTypeMasterDto {
  companyType: string;
  companyTypeDescription?: string;
  createdBy?: string;
  createdOn: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  status: boolean = true;
}
