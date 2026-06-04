import { bootstrapApplication } from '@angular/platform-browser';
import { destroyPlatform, getPlatform } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { register } from 'swiper/element/bundle';

register();


if (getPlatform()) {
  destroyPlatform(); // Destruye la anterior
}

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
