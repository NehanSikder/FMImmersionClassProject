import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';


@Component({
  selector: 'app-realtor',
  templateUrl: './realtor.component.html',
  styleUrls: ['./realtor.component.scss']
})
export class RealtorComponent implements OnInit {

  address: string;
  price: number;
  realtorFname: string;
  realtorLname: string;
  realtorEmail: string;
  phone_number: string;
  image: any;


  constructor() {
  }

  ngOnInit() {

  }

  submitPosting(){

    console.log(this.address)
    console.log(this.price)
    console.log(this.realtorFname)
    console.log(this.realtorLname)
    console.log(this.realtorEmail)
    console.log(this.phone_number)

  }


  fileEvent(fileInput: any) {
    const AWSService = AWS;
    const region = 'us-east-1';
    const bucketName = 'fmimmersionbuket';
    const IdentityPoolId = 'us-east-1:b6f9b2b1-792b-4cc3-98d5-4dc9788b30e8';
    const file = fileInput.target.files[0];
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
  //I store this in a variable for retrieval later
    this.image = file.name;
    console.log('got here');
    s3.upload({ Key: file.name, Bucket: bucketName, Body: file, ACL: 'public-read'}, function (err, data) {
     if (err) {
       console.log(err, 'there was an error uploading your file');
     } else {
       console.log('no error');
     }
   });
  }


}
