import { Module } from '@nestjs/common';

import { HttpModule } from './http/http.module';
import { FooModule } from './foo/foo.module';

@Module({
    imports: [
        HttpModule,
        FooModule,
    ],
})
export class AppModule {}
