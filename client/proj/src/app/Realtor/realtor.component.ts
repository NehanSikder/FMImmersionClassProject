import { Component, OnInit } from '@angular/core';
import * as AWS from 'aws-sdk';
import { HttpClient } from '@angular/common/http';
import { APIService } from  '../api.service';

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
  houseId: number;
  houseList: Array<object> = [];

  constructor(private http : HttpClient, private  apiService:  APIService){
  }

  ngOnInit() {

  }

/*
createContact(){

var  contact  = {
    account:  1,
    address:  "Home N 333 Apartment 300",
    createdBy:  1,
    description:  "This is the third contact",
    email:  "abbess@email.com",
    first_name:  "kaya",
    isActive: true,
    last_name: "Abbes",
    phone: "00121212101"
};
this.apiService.createContact(contact).subscribe((response) => {
    console.log(response);
});
};
}
}
*/
  
  submitPicPosting(picURL) {
    if (this.houseId == null) {
      // do nothing, shoudl create alert to tell user to first post a house!
    } else {
      var picture = {
        'houseFkey' : this.houseId,
        'picURL' : picURL
      }
      this.apiService.createPic(picture).subscribe((data) => {
        console.log(data);
      });
      

    }  

  }
  submitHousePosting(){
    var house = {
        'address' : this.address,
        'price' : this.price,
        'realtorFname' : this.realtorFname,
        'realtorLname' : this.realtorLname,
        'realtorEmail' : this.realtorEmail,
        'phone_number' : this.phone_number,
    }
    this.apiService.createHouse(house).subscribe((data) => {
        console.log(data);
        this.houseId = data['houseID'];
    });  

  }


  fileEvent(fileInput: any) {
    const AWSService = AWS;
    const region = 'us-east-1';
    const bucketName = 'fmimmersionbuket';
    const IdentityPoolId = 'us-east-1:b6f9b2b1-792b-4cc3-98d5-4dc9788b30e8';
    const file = fileInput.target.files[0];
    console.log(file);
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
        console.log(data);

        // creates the  unique name to be stores in the s3 bucket
        uuid = data.substring(0, data.length-2);
        this.image = uuid;
        s3.upload({ 
           Key: uuid, 
           Bucket: bucketName, 
           Body: file,
           ACL: 'public-read',
           ContentType: file.type
         }, function (err, data) {
           if (err) {
             console.log(err, 'there was an error uploading your file');
           } else {
             console.log('no error in S3 upload');
             this.submitPicPosting('https://s3.amazonaws.com/fmimmersionbuket/'+uuid);
           }
       });
    });
 



  }


}
