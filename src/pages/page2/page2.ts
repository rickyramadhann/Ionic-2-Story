import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { EditprofilPage } from '../editprofil/editprofil';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-page2',
  templateUrl: 'page2.html'
})
export class Page2 {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;
  users: FirebaseListObservable<any>;
  data:any={
    username:'',
    email:'',
    contact:'',
    image:''


  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public af :AngularFire, public storage : Storage) {

    storage.get('username').then((user)=>{
      if(user ==null){
        console.log("gagal");
        // this.users = af.database.list('/users/'+user);
      }

      else{
        this.data.username = user;
        this.users = af.database.list('/users/'+user);

        this.users.subscribe(x => {
          this.data.email = x[0].$value;
          console.log(this.data);

          console.log(x)
          console.log(x[0].$value)
          console.log(x[0].value)
        })
      }
      
    })

    // this.email=this.storage.get('email').then((user)=>{
      //   console.log(user);
      //   this.Profil = af.database.list('/Profil/'+user);
      
      // })
    }

    public editProfil() {
       

      
    }

    itemTapped(event, item) {
      // That's right, we're pushing to ourselves!
      this.navCtrl.push(Page2, {
        item: item
      });
    }

    public gambarku:any;
    takePhoto() {
      Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetHeight: 500,
        targetWidth: 500,
        correctOrientation: true
      }).then((imageData) => {
        this.gambarku="data:image/jpeg;base64," + imageData;
        console.log("berhasil");

      }, (err) => {
        console.log(err);
      });
    }

    takeGallery() {
      var options = {
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        destinationType: Camera.DestinationType.FILE_URI
      };
      Camera.getPicture(options).then((imageData) => {
        this.gambarku = imageData;
        
      }, (err) => {
        // Handle error
      });
    }


  }
