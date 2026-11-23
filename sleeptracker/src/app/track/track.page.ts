import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIcon, IonLabel, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, ModalController } from '@ionic/angular/standalone';
import { ModalLogComponent } from '../modal-log/modal-log.component';
import { ModalSleepinessComponent } from '../modal-sleepiness/modal-sleepiness.component';
import { addIcons } from 'ionicons';
import { sunny, partlySunny, cloud, cloudyNight, rainy, thunderstorm, moon } from 'ionicons/icons';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-track',
  templateUrl: './track.page.html',
  styleUrls: ['./track.page.scss'],
  standalone: true,
  imports: [IonIcon, IonLabel, IonItem, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TrackPage implements OnInit {
  time:string = "placeholderTime";
  day:string = "placeholderDate";
  date: Date | undefined;
  timeSet:number = 0;
  timeMsgs:string[] = [
    "Ready to start the morning?",
    "Feeling tired this afternoon?",
    "Ready to go to sleep?",
    "You should really be asleep..."
  ]
  timeMsg:string = "";
  orderIcons: string[] = [
    "partly-sunny",
    "sunny",
    "moon",
    "cloudy-night"
  ]
  

  constructor(private modalController: ModalController, private sleepService: SleepService) {
    addIcons({sunny, partlySunny, cloud, cloudyNight, rainy, thunderstorm, moon});
    this.refreshTime();
    setInterval(() => {
      this.refreshTime();
    }, 1000);
    //sleepService.getStorage();
  } 

  ngOnInit() {
  }

  refreshTime() {
    this.date = new Date()
    this.time = this.date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    this.day = this.date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
    const curr_time = this.date.getHours();
    if (curr_time > 5) {this.timeSet = 0;}
    else if(curr_time > 12) {this.timeSet = 1;}
    else if (curr_time > 18){this.timeSet = 2;}
    else {this.timeSet = 3;}
    //console.log(this.time);
  }

  async openModalLog() {
    const modal = await this.modalController.create({
      component: ModalLogComponent,
      componentProps: {
        logCreation: this.date,
        logText: "",
        timeStart: this.date,
        timeEnd: this.date, 
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

  async openFatigueLog() {
    const modal = await this.modalController.create({
      component: ModalSleepinessComponent,
      componentProps: {
        logCreation: this.date,
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

  async getDatabase() {
    this.sleepService.getStorage();
  }

  async deleteDatabase() {
    this.sleepService.deleteStorage();
  }



}
