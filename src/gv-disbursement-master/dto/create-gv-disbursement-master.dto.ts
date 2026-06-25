export class CreateGvDisbursementMasterDto {
  orgId: number;
  sbuId: number;
  visitorId: number;
  gvDisbursement: boolean;
  createdBy?: string;
  createdOn: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  status: boolean = true;
}
