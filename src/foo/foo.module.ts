import { HttpModule, Module } from '@nestjs/common';
import { FooController } from './foo.controller';
import { Agent } from 'https'

@Module({
    imports: [
         HttpModule.register({
             httpsAgent: new Agent({
                 rejectUnauthorized: false
             })
         }),
    ],
    controllers: [
        FooController,
    ],
})
export class FooModule {}
