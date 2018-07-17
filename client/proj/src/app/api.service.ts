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
	    return  this.httpClient.get(`${this.API_GET_URL}/`);
	}
	createHouse(house){
	    return  this.httpClient.post(`${this.API_POST_HOUSE_URL}/contacts/`,contact);
	}
	createPic(pic) {
		return  this.httpClient.post(`${this.API_POST_PIC_URL}/contacts/`,contact);
	}
}