import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GalleryService {

	private message = new BehaviorSubject(null);
	currentMessage = this.message.asObservable();
	constructor() { }

	newMessage(principalInput: number){
		this.message.next(principalInput);
	}
}
