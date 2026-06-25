export class CreateRoleMasterDto {
  orgId: number;
  roleName: string;
  roleDescription?: string;
  menu?: Menu[];
  createdBy?: string;
  createdOn: Date;
  modifiedBy?: string;
  modifiedOn?: Date;
  status: boolean = true;
}

export class Menu {
  id: number;
  roleMasterId: number;
  menuId: number;
  menuName: string;
}
