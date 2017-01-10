import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/*
  Generated class for the Editprofil page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-editprofil',
  	templateUrl: 'editprofil.html'
  })
  export class EditprofilPage {
  	Profil : FirebaseListObservable<any>;
  	public profil = {
      id:'',
  		nama : '',
  		email: '',
  		hp:'',
  		image:''
  	}

  	constructor(public navCtrl: NavController,public af: AngularFire, public params: NavParams) {
  		this.Profil=af.database.list('/Profil');
  		this.profil.id=this.params.get('id');
  		this.profil.nama = this.params.get('nama');
  		this.profil.email = this.params.get('email');
  		this.profil.hp = this.params.get('hp');
  		this.profil.image =this.params.get('image');
  	}
  	ionViewDidLoad() {
  		console.log('ionViewDidLoad EditprofilPage');
  	}

  	saveProfil(id,nama,email,hp,image){
  		if(id){
  			this.Profil.update(id,{
  				nama:nama,
  				email:email,
  				hp:hp,
  				image:image
  			}).then(newprof=>{
  				this.navCtrl.pop();
  			},error=>{
  				console.log("Gagal");
  			});
  		}

  		else{
  			this.Profil.push({
  				nama: nama,
  				email: email,
  				hp: hp,
  				image:image

  			}).then( newprof => {
  				this.navCtrl.pop();
  			}, error => {
  				console.log(error);
  			});
  		}
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
  			this.profil.image=this.gambarku;
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
  			this.profil.image=this.gambarku;
  			
  		}, (err) => {
  			// Handle error
  		});
  	}

  }
