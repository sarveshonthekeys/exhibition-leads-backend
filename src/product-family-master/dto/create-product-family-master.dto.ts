export class CreateProductFamilyMasterDto {
  sbuId?: number;
  orgId: number;
  productFamilyName: string;
  productFamilyDescription?: string;
  createdBy?: string;
  createdOn: Date;
  modifiedBy?: string;
  modifiedOn: Date;
  status: boolean = true;
}
