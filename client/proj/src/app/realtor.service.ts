import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RealtorService {

	private message = new BehaviorSubject(null);
	currentMessage = this.message.asObservable();
	constructor() { }

	newMessage(housemsg: number){
		this.message.next(housemsg);
	}
}
