import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Liveness probe. App Service (and Kubernetes, and load balancers) call
  // an endpoint like this to decide whether the container is alive and
  // should keep receiving traffic.
  //
  // Deliberately does NOT touch the database. A liveness probe answers
  // "is this process healthy?" — if it also checked Azure SQL, a brief
  // database blip would make the platform kill and restart a perfectly
  // healthy app, turning a small problem into an outage. Checking
  // dependencies is a *readiness* probe, which is a different question.
  @Get('health')
  health() {
    return {
      status: 'ok',
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }
}
