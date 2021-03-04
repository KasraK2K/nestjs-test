import { Controller, Get, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) // @Inject('APP_SERVICE') private readonly client: ClientProxy,
  {}

  @Get()
  getHello(): string {
    // this.client.emit('hello', 'do something please!');
    return this.appService.getHello();
  }

  // @MessagePattern('hello')
  // async hello(@Payload() data: string, @Ctx() context: RmqContext) {
  //   const channel = context.getChannelRef();
  //   const originalMsg = context.getMessage();

  //   console.log(context.getPattern(), data);

  //   channel.ack(originalMsg);
  // }
}
