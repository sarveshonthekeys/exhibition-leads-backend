export class CreateSbuMasterDto {
  orgId: number;
  sbuName: string;
  sbuDescription?: string;
  createdBy?: string;
  createdOn: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  Status: boolean = true;
}
