import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonButtons, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { ModalLogComponent } from '../modal-log/modal-log.component';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { addIcons } from 'ionicons';
import { trash } from 'ionicons/icons';


@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButtons, IonButton, IonItem, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HistoryPage implements OnInit {
  SleepService = SleepService;
  
  constructor(private modalController: ModalController, private sleepService: SleepService) {
    addIcons({trash});
  }

  ngOnInit() {
  }

  async createLog() {
    const curr_time = new Date();
    const modal = await this.modalController.create({
      component: ModalLogComponent,
      componentProps: {
        logCreation: curr_time,
        logText: "",
        timeStart: curr_time,
        timeEnd: curr_time, 
        exists: false
      }
    });

    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === "save") {
      console.log(data);
      this.sleepService.logOvernightData(new OvernightSleepData(
        data.timeStart, data.timeEnd, data.logCreation, data.logText
      ));
    }
  }

  deleteEntry(overnightData: OvernightSleepData) {
    this.sleepService.deleteOvernightData(overnightData);
  }

  async editEntry(overnightData: OvernightSleepData) {
    const modal = await this.modalController.create({
      component: ModalLogComponent,
      componentProps: {
        logCreation: overnightData.getLoggedAt(),
        logText: overnightData.getLogText(),
        timeStart: overnightData.getSleepStart(),
        timeEnd: overnightData.getSleepEnd(), 
        exists: true
      }
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === "save") {
      console.log(data);
      overnightData.setSleepStart(data.timeStart);
      overnightData.setSleepEnd(data.timeEnd);
      overnightData.setLogText(data.logText);
    }
  }

}
