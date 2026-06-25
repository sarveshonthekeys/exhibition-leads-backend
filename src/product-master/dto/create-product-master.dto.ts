export class CreateProductMasterDto {
  orgId: number;
  sbuId: number;
  productFamilyId: number;
  productCode: string;
  productName: string;
  productDescription?: string;
  model: models[];
  createdBy?: string;
  createdOn: Date;
  modifiedBy: string;
  modifiedOn: Date;
  status: boolean = true;
}
export class models {
  modelName?: string;
  productMasterId?: number;
}
