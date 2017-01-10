import { Component,OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {Page1} from '../page1/page1';
import { Storage } from '@ionic/storage';


/*
  Generated class for the Addstory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-addstory',
  	templateUrl: 'addstory.html'
  })
  export class AddstoryPage implements OnInit {
  	Kisah: FirebaseListObservable<any>;
    username:any;
    public kisah ={
      judul: '',
      isi: '',
      image : '',
      created: new Date().toString()
    }

    constructor(public navCtrl: NavController,public storage: Storage, public navParams: NavParams,private af: AngularFire) {
      this.username=this.storage.get('username').then((user)=>{
        console.log(user);
        this.Kisah = af.database.list('/Kisah/'+user);
        
      })
    }
    ionViewDidLoad() {
      console.log('ionViewDidLoad AddstoryPage');
    }

    ngOnInit() {
      this.getPhotos();
    }

    getPhotos() {
      this.Kisah = this.af.database.list('/Kisah');
      
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
        this.kisah.image=this.gambarku;
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
        this.kisah.image=this.gambarku;
        
      }, (err) => {
        // Handle error
      });
    }

    uploadSemua(){
      this.Kisah.push(this.kisah);
      this.navCtrl.pop();
      this.navCtrl.setRoot(Page1);
    }

    deletecontact(photoKey: string) {
      this.Kisah.remove(photoKey);
    }

    likecontact(photoKey, likes: number) {
      this.Kisah.update(photoKey, { likes: likes + 1})
    }




  }
