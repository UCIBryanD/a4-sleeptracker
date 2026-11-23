import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonList, IonRadio, IonRadioGroup, IonModal, IonLabel, IonDatetimeButton, IonDatetime, IonIcon, IonItem, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea, ModalController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sunny, partlySunny, cloud, cloudyNight, rainy, thunderstorm, moon } from 'ionicons/icons';
import { SleepData } from '../data/sleep-data';
import { SleepService } from '../services/sleep.service';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

@Component({
  selector: 'app-modal-sleepiness',
  templateUrl: './modal-sleepiness.component.html',
  styleUrls: ['./modal-sleepiness.component.scss'],
  standalone: true,
  imports: [FormsModule, IonList, IonRadio, IonRadioGroup, IonModal, IonLabel, IonDatetimeButton, IonDatetime, IonIcon, IonItem, IonButtons, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, IonTextarea]
})
export class ModalSleepinessComponent  implements OnInit {
  @Input() logCreation!: Date;
  @Input() logText!: string;
  @Input() rating!: number;
  @Input() exists!: boolean;
  @Input() id!: string | undefined;


  static orderIcons: string[] = [
    "none",
    "sunny",
    "partly-sunny",
    "cloud",
    "cloudy-night",
    "rainy",
    "thunderstorm",
    "moon"
  ]
  
  ModalSleepinessComponent = ModalSleepinessComponent;
  StanfordSleepinessData = StanfordSleepinessData;
  constructor(private modalController: ModalController, private alertController: AlertController) {
    addIcons({sunny, partlySunny, cloud, cloudyNight, rainy, thunderstorm, moon});
  }

  ngOnInit() {
    console.log("Rating: " + this.rating);
  }

  async close() {
    //console.log(this.logText);
    await this.modalController.dismiss(null, "cancel");
  }

  async save() {
    const data = this.getData();
    if (!this.rating || this.rating == 0) {
      this.error("Select a Sleepiness", "Please select an option for your sleepiness");
    }
    else {await this.modalController.dismiss(data, "save");}
  }

  getData() {
    return {
      logCreation: this.logCreation,
      logText: this.logText,
      rating: this.rating,
      exists: true
    }
  }

  async error(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['Okay'],
    });

    await alert.present();
  }


  
}
