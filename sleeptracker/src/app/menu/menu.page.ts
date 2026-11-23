import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItem, IonLabel, IonButtons, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { SleepData } from '../data/sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';
import { addIcons } from 'ionicons';
import { trash, createOutline, sunny, partlySunny, cloud, cloudyNight, rainy, thunderstorm, moon } from 'ionicons/icons';
import { ModalSleepinessComponent } from '../modal-sleepiness/modal-sleepiness.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [IonItem, IonLabel, IonButtons, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MenuPage implements OnInit {
  SleepService = SleepService;
  StanfordSleepinessData = StanfordSleepinessData;
  ModalSleepinessComponent = ModalSleepinessComponent;
  constructor(private modalController: ModalController, private sleepService: SleepService) {
      addIcons({trash, createOutline, sunny, partlySunny, cloud, cloudyNight, rainy, thunderstorm, moon});
      //sleepService.getStorage();
  }

  ngOnInit() {
    //this.sleepService.getStorage();
  }

  deleteEntry(stanford: StanfordSleepinessData) {
    this.sleepService.deleteSleepinessData(stanford);
  }

  async editLog(stanford: StanfordSleepinessData) {
    const curr_time = new Date();
    const modal = await this.modalController.create({
        component: ModalSleepinessComponent,
        componentProps: {
          logCreation: stanford.getLoggedAt(),
          logText: stanford.getLogText(),
          rating: stanford.getLoggedValue(),
          id: stanford.getId(),
          exists: true
        }
    });
    
    await modal.present();
    
    const { data, role } = await modal.onDidDismiss();
    if (role === "save") {
      if (role === "save") {
        this.sleepService.logSleepinessData(new StanfordSleepinessData(data.rating, data.logCreation, data.logText, stanford.id));
      }
    }
  }

  async createLog() {
    const modal = await this.modalController.create({
      component: ModalSleepinessComponent,
      componentProps: {
        logCreation: new Date(),
        logText: "",
        rating: 0,
        exists: false
      }
    })

    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === "save") {
      console.log(data);
      this.sleepService.logSleepinessData(new StanfordSleepinessData(
        data.rating, data.logCreation, data.logText
      )); 
    }
  }


}
