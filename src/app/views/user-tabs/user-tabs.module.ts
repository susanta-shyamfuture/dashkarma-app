import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserTabsRoutingModule } from './user-tabs-routing.module';
import { UserTabsPage } from './user-tabs.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserTabsRoutingModule
  ],
  declarations: [UserTabsPage]
})
export class UserTabsPageModule {}
