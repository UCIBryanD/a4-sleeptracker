import { nanoid } from 'nanoid';

export class SleepData {
	id:string;
	loggedAt:Date;
	dataType:string|undefined;

	constructor(dataType: string, logDate: Date = new Date(), setid?: string) {
		//Assign a random (unique) ID. This may be useful for comparison (e.g., are two logged entries the same).
		if (!setid) {
			this.id = nanoid();
		}
		else {this.id = setid;}
		this.loggedAt = logDate;
		this.dataType = dataType;
	}

	summaryString():string {
		return 'Unknown sleep data';
	}

	dateString():string {
		return this.loggedAt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
	}

	getLoggedAt(): Date {
		return this.loggedAt;
	}

	setLoggedAt(date: Date) {
		this.loggedAt = date;
	}

	getId() {
		return this.id;
	}
}
