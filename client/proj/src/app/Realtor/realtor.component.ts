import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { HttpClient } from '@angular/common/http';
import { APIService } from  '../api.service';
//import { RealtorService } from  '../realtor.service';

@Component({
  selector: 'app-realtor',
  templateUrl: './realtor.component.html',
  styleUrls: ['./realtor.component.scss']
})

export class RealtorComponent implements OnInit {

 housemsg: string = 'the message service'

  address: string;
  price: number;
  realtorFname: string;
  realtorLname: string;
  realtorEmail: string;
  phone_number: string;
  image: any;
  houseId: number;
  houseList: Array<object> = [];
  pictureList : Array<string> = [];
  api_key: string = 'AIzaSyBEHLjxQrMH3BbMhtjYG89O-7IKx05uwPw'

  img_files: Array<any> = [];
  s3_url: string;
  // constructor(private http : HttpClient, private  apiService:  APIService, private realtorService: RealtorService){
  // }

   constructor(private http : HttpClient, private  apiService:  APIService){
   }
  ngOnInit() {
    this.apiService.getData().subscribe(data => {
        //console.log(data);
    });
  }

  fileEvent(fileInput: any) {
    //console.log('File input', fileInput)
    var event = fileInput.target.files[0]
    //console.log('event', event)
    this.img_files.push(event)
    //console.log('img push: ', this.img_files)
  }

  submitAll() {
    //console.log('new home', this.address, this.price, this.image)

    //console.log('img_files: ', this.img_files)

    for(var i = 0; i < this.img_files.length; i++){
      this.awsUploadPictureFiles(this.img_files[i])
      //console.log(this.houseId);
    }

    this.img_files = [];
  }

  postNewHouse(picURL: string) {
    var house = {
        'address' : this.address,
        'price' : this.price,
        'realtorFname' : this.realtorFname,
        'realtorLname' : this.realtorLname,
        'realtorEmail' : this.realtorEmail,
        'phone_number' : this.phone_number,
        'picURL' : picURL
    }

    //console.log('House posted is: ', house)
    this.apiService.createHouse(house).subscribe((data) => {
        //console.log(data);
        this.houseId = data['houseID'];
    });

  }

  awsUploadPictureFiles(img_file: any) {
    //console.log('img aws: ', this.img_files)

      const AWSService = AWS;
      const region = 'us-east-1';
      const bucketName = 'fmimmersionbuket';
      const IdentityPoolId = 'us-east-1:b6f9b2b1-792b-4cc3-98d5-4dc9788b30e8';
      var file = img_file;
      var uuid;
        //Configures the AWS service and initial authorization
      AWSService.config.update({
        region: region,
        credentials: new AWSService.CognitoIdentityCredentials({
          IdentityPoolId: IdentityPoolId
        })
      });
    //adds the S3 service, make sure the api version and bucket are correct
      const s3 = new AWSService.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName}
      });

      this.http.get('https://www.uuidgenerator.net/api/version1',{responseType: 'text'}).subscribe(data => {
          //console.log(data);

          // creates the  unique name to be stores in the s3 bucket
          uuid = data.substring(0, data.length-2);
          this.s3_url = 'https://s3.amazonaws.com/fmimmersionbuket/'+uuid;
          //console.log('s3 urls pushed: ', this.s3_url)
          s3.upload({
             Key: uuid,
             Bucket: bucketName,
             Body: file,
             ACL: 'public-read',
             ContentType: file.type
           }, function (err, data) {
             if (err) {
               //console.log(err, 'there was an error uploading your file');
             } else {
               //console.log('no error in S3 upload');
             }
         });

         //console.log('s3 urls pushed mid: ', this.s3_url)
         this.postNewHouse(this.s3_url)


         // var house = {
         //     'address' : this.address,
         //     'price' : this.price,
         //     'realtorFname' : this.realtorFname,
         //     'realtorLname' : this.realtorLname,
         //     'realtorEmail' : this.realtorEmail,
         //     'phone_number' : this.phone_number,
         //     'picURL' : this.s3_url
         // }
         //this.realtorService.currentMessage.subscribe(message => this.housemsg = message);


      });
      //console.log('s3 urls pushed async: ', this.s3_url)
  }


}
