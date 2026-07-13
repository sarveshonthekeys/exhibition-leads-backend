import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationMasterModule } from './organization-master/organization-master.module';
import { ConfigModule } from '@nestjs/config';
import { UserMasterModule } from './user-master/user-master.module';
import { SbuMasterModule } from './sbu-master/sbu-master.module';
import { RoleMasterModule } from './role-master/role-master.module';
import { CampaignMasterModule } from './campaign-master/campaign-master.module';
import { GvDisbursementMasterModule } from './gv-disbursement-master/gv-disbursement-master.module';
import { ProductFamilyMasterModule } from './product-family-master/product-family-master.module';
import { ProductMasterModule } from './product-master/product-master.module';
import { VisitorMasterModule } from './visitor-master/visitor-master.module';
import { StateMasterModule } from './state-master/state-master.module';
import { DistrictMasterModule } from './district-master/district-master.module';
import { CampaignTypeMasterModule } from './campaign-type-master/campaign-type-master.module';
import { IndustryTypeMasterModule } from './industry-type-master/industry-type-master.module';
import { CompanyTypeMasterModule } from './company-type-master/company-type-master.module';
import { VisitorDetailsModule } from './visitor-details/visitor-details.module';
import { ProductsInterestedModule } from './products-interested/products-interested.module';
import { MenuAssignmentMasterModule } from './menu-assignment-master/menu-assignment-master.module';
import { PlanMasterModule } from './plan-master/plan-master.module';
import { SubscriptionMasterModule } from './subscription-master/subscription-master.module';
import { ScheduleModule } from '@nestjs/schedule';
import { DiscountMasterModule } from './discount-master/discount-master.module';
import { OrganizationTypeMasterModule } from './organization-type-master/organization-type-master.module';
import { HelperModule } from './helper/helper.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev-secret-change-me',
      signOptions: { expiresIn: '7d' },
    }),
    UserMasterModule,
    OrganizationMasterModule,
    SbuMasterModule,
    RoleMasterModule,
    CampaignMasterModule,
    GvDisbursementMasterModule,
    ProductFamilyMasterModule,
    ProductMasterModule,
    VisitorMasterModule,
    StateMasterModule,
    DistrictMasterModule,
    CampaignTypeMasterModule,
    IndustryTypeMasterModule,
    CompanyTypeMasterModule,
    VisitorDetailsModule,
    ProductsInterestedModule,
    MenuAssignmentMasterModule,
    PlanMasterModule,
    SubscriptionMasterModule,
    ScheduleModule.forRoot(),
    SubscriptionMasterModule,
    DiscountMasterModule,
    OrganizationTypeMasterModule,
    HelperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
