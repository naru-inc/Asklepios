import {ModuleWithProviders, NgModule} from '@angular/core';
import {MaterialModule} from './material.module';

import { ChartsModule } from 'ng2-charts';


@NgModule({
  imports: [
    MaterialModule,
    ChartsModule
  ],
  exports: [
    MaterialModule,
    ChartsModule
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
