import { Injectable } from  '@angular/core';
import { HttpClient} from  '@angular/common/http';

@Injectable({
providedIn:  'root'
})

export  class  APIService {
	API_GET_URL  =  'http://localhost:8000/api/getData';
	API_POST_HOUSE_URL = 'http://localhost:8000/api/postData';
	API_POST_PIC_URL = 'http://localhost:8000/api/postPic';
	constructor(private  httpClient:  HttpClient) {}
	getData(){

	    var temp = this.httpClient.get(`${this.API_GET_URL}`, {responseType: 'text'});
	    console.log(temp);
	    return temp;
	}
	createHouse(house){
	    return  this.httpClient.post(`${this.API_POST_HOUSE_URL}`, house, {responseType: 'text'});
	}
	createPic(pic) {
		return  this.httpClient.post(`${this.API_POST_PIC_URL}`, pic, {responseType: 'text'});
	}
}