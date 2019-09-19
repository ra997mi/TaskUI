import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { NotifyComponent } from '../../notify/notify.component';
import { AllNotifyComponent } from '../../all-notify/all-notify.component';
import { SettingsComponent } from '../../settings/settings.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AllComponent } from '../../dashboard/all/all.component';
import { ImageComponent } from '../../dashboard/image/image.component';
import { MusicComponent } from '../../dashboard/music/music.component';
import { VideoComponent } from '../../dashboard/video/video.component';
import { MatVideoModule } from 'mat-video';
import { Ng5SliderModule } from 'ng5-slider';
import { NgxAudioPlayerModule } from 'ngx-audio-player';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatChipsModule,
  MatSliderModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatChipsModule,
    NgxSpinnerModule,
    MatSliderModule,
    MatVideoModule,
    Ng5SliderModule,
    NgxAudioPlayerModule
  ],
  declarations: [
    ConfirmDeleteComponent,
    DashboardComponent,
    NotifyComponent,
    AllNotifyComponent,
    SettingsComponent,
    AllComponent,
    ImageComponent,
    MusicComponent,
    VideoComponent
  ],
  entryComponents: [ConfirmDeleteComponent]
})

export class AdminLayoutModule { }
