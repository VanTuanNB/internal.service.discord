import { Module } from '@nestjs/common';
import { FiltersModule } from './common/filters/filter.module';
import { PipesModule } from './common/pipes/pipe.module';
@Module({
    imports: [FiltersModule, PipesModule],
    exports: [FiltersModule, PipesModule],
})
export class CoreModule {}
