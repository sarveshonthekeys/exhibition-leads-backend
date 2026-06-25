import { Injectable } from '@nestjs/common';
import { CreateHelperDto } from './dto/create-helper.dto';
import { UpdateHelperDto } from './dto/update-helper.dto';
import { PrismaService } from 'src/prisma.service';
import { SubscriptionMasterService } from 'src/subscription-master/subscription-master.service';
import { last } from 'rxjs';
import { format, isAfter, isBefore, parseISO } from 'date-fns';

@Injectable()
export class HelperService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly subscriptionService: SubscriptionMasterService,
  ) {}
  async checkTrialLimit(
    entity: string,
    orgId: number,
    limit: number,
  ): Promise<void> {
    console.log(entity, orgId, limit);
    const count = await this.prisma[entity].count({
      where: { orgId },
    });
    const response = await this.subscriptionService.findByOrgIsActive(orgId);
    console.log(response.message);
    const currentDateString = format(new Date(), 'yyyy-MM-dd'); // Format current date
    const currentDate = parseISO(currentDateString); // Parse formatted current date
    //const abc = isAfter(parseISO(response.message.startDate), currentDate);
    const res = response.message.some(
      (subscription) =>
        subscription.planId == 1 &&
        isAfter(parseISO(subscription.startDate), currentDate),
    );
    console.log('resssss', res);
    console.log('res', response);
    if (response && !res && response.message[0].planId == 2) {
      if (count >= limit) {
        console.log(count);
        throw new Error(`Trial subscription allows only ${limit} ${entity}s.`);
      }
    }
  }
  create(createHelperDto: CreateHelperDto) {
    return 'This action adds a new helper';
  }

  findAll() {
    return `This action returns all helper`;
  }

  findOne(id: number) {
    return `This action returns a #${id} helper`;
  }

  update(id: number, updateHelperDto: UpdateHelperDto) {
    return `This action updates a #${id} helper`;
  }

  remove(id: number) {
    return `This action removes a #${id} helper`;
  }
}
