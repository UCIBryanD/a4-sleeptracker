import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = true;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];


	constructor(private storage: Storage) {
		this.init();
		//this.fillArrays();
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
			SleepService.LoadDefaultData = false;
		}
		this.getAll();
	} 

	async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
		const storage = await this.storage.create();
		console.log("storage got");
		this.storage = storage;
		this.getStorage();
	}

	// Create and expose methods that users of this service can
	// call, for example:

	private async addDefaultData() {
		await this.storage;
		var goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(1, 3, 0); //1:03am
		var wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday
		var sleepinessDate = new Date();
		sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
		sleepinessDate.setHours(14, 38, 0); //2:38pm
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm
		goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(23, 11, 0); //11:11pm
		wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 9 * 60 * 60 * 1000); //Sleep for exactly nine hours
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp));
		await this.storage;
		this.getStorage();
	}

	async fillArrays() {
		await this.storage;
		this.storage?.forEach((value, key, index) => {
			if (value.dataType == "overnight") {
				//console.log("filling overnight data");
				//console.log(value.id);
				SleepService.AllOvernightData.push(value);
			}
			else if (value.dataType == "stanford") {
				//console.log("filling stanford data");
				//console.log(value.id);
				SleepService.AllSleepinessData.push(value);
			}
			SleepService.AllSleepData.push(value);
		});
	}

	public async logOvernightData(sleepData:OvernightSleepData) {
		this.set(sleepData.id, sleepData);
		//const addedData = await this.storage!.get(sleepData.id);
		//console.log("DATA ADDED TO DB: " + addedData);
		//SleepService.AllSleepData.push(sleepData);
		//SleepService.AllOvernightData.push(sleepData);
	}

	public async logSleepinessData(sleepData:StanfordSleepinessData) {
		this.set(sleepData.id, sleepData);
		//SleepService.AllSleepData.push(sleepData);
		//SleepService.AllSleepinessData.push(sleepData);
	}

	public async deleteOvernightData(sleepData:OvernightSleepData) {
		this.remove(sleepData);
		///SleepService.AllSleepData = SleepService.AllSleepData.filter(data => data.id != sleepData.id);
		//SleepService.AllOvernightData = SleepService.AllOvernightData.filter(data => data.id != sleepData.id);
	}

	public async deleteSleepinessData(sleepData:StanfordSleepinessData) {
		this.remove(sleepData);
		//SleepService.AllSleepData = SleepService.AllSleepData.filter(data => data.id != sleepData.id);
		//SleepService.AllSleepinessData = SleepService.AllSleepinessData.filter(data => data.id != sleepData.id);
	}

	public async getStorage() {
		await this.storage;
		this.getAll();
		//console.log(await this.storage?.keys());
		this.storage?.forEach((value, key, index) => {
			console.log(key + ", " + value + ", " + index);
			//console.log("type of value: " + typeof(value));
		});
		this.getAll();
		
	}

	public async deleteStorage() {
		await this.storage;
		//SleepService.AllSleepinessData = [];
		//SleepService.AllOvernightData = [];
		//SleepService.AllSleepData = [];
		await this.storage!.clear();
		this.getAll();
	}




	async getArrFromStorage(dataType: string = "") {
		await this.storage;
		const arr:any[]  = [];
		this.storage?.forEach((value, key, index) => {
			if (dataType === "overnight" && value.dataType === "overnight") {
				arr.push(new OvernightSleepData(value.sleepStart, value.sleepEnd, value.logDate, value.logText, value.id));
			}
			else if (dataType === "stanford" && value.dataType === "stanford") {
				arr.push(new StanfordSleepinessData(value.loggedValue, value.loggedAt, value.logText, value.id));
			}
			else {
				if (dataType === "overnight" && value.dataType === "") {
					arr.push(new OvernightSleepData(value.sleepStart, value.sleepEnd, value.logDate, value.logText, value.id));
				}	
				else if (dataType === "stanford" && value.dataType === "") {
					arr.push(new StanfordSleepinessData(value.loggedValue, value.loggedAt, value.logText, value.id));
				}
			}
		});
		return arr;
	}

	async getOvernight() {
		await this.storage;
		SleepService.AllOvernightData = await this.getArrFromStorage("overnight");
		//return await this.getArrFromStorage("overnight");
	}

	async getSleepiness() {
		await this.storage;
		SleepService.AllSleepinessData = await this.getArrFromStorage("stanford");
		//return await this.getArrFromStorage("stanford");
	}

	async getSleep() {
		await this.storage;
		SleepService.AllSleepData = await this.getArrFromStorage("");
		//return await this.getArrFromStorage("stanford");
	}

	async getAll() {
		await this.storage;
		this.getOvernight();
		this.getSleepiness();
		this.getSleep();
		console.log("Got all");
	}

	public async set(key: string, value: any) {
		await this.storage;
		this.storage?.set(key, value);
		this.getAll();
	}

	public async remove(data: SleepData) {
		await this.storage;
		this.storage?.remove(data.id);
		this.getAll();
	}



}
