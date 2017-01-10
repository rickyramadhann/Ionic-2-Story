import { Component } from '@angular/core';
import { NavController, NavParams,AlertController, LoadingController} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage'
import {Page1} from '../page1/page1';
/*
  Generated class for the Register page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-register',
  	templateUrl: 'register.html'
  })
  export class RegisterPage {
  	frmregister : any = {username : '',email:'', password:''}

  	users : FirebaseListObservable<any>

  	constructor(public navCtrl: NavController, public navParams: NavParams,public af: AngularFire,
  		public alertCtrl: AlertController,
  		public loadingCtrl: LoadingController,
  		public storage: Storage) {
  		this.users= af.database.list('/users');
  	}

  	ionViewDidLoad() {
  		console.log('ionViewDidLoad RegisterPage');
  	}


  	Reg(){
  		if( this.frmregister.username === '' || 
  			this.frmregister.email    === '' ||
  			this.frmregister.password === ''){

  			let alert    = this.alertCtrl.create({
  				title  : "Warning!",
  				subTitle: "form harus diisi",
  				buttons  : ["ok"]
  			})
  		alert.present()

  	}else{

  		let that = this

  		let data 		= {email : '', password : ''};
  		data.email 		= this.frmregister.email
  		data.password 	= this.frmregister.password

  		let loading 	= this.loadingCtrl.create({
  			content : "Create Account...",
  			delay	: 2000		
  		})

  		let alert		= this.alertCtrl.create({
  			title	: "Warning!",
  			subTitle: "username yang anda masukkan sudah pernah terdaftar",
  			buttons	: ["ok"]
  		})

  		loading.present()

  		this.users.$ref.ref.child(this.frmregister.username).once('value', function(snapshot){
  			if(snapshot.exists()){
  				console.log('data sudah ada')
  				console.log(snapshot)
  				alert.present()
  			}
  			else{
  				loading.dismiss()
  				snapshot.ref.parent.child(that.frmregister.username).set(data)
  				that.storage.remove('username')
  				that.storage.set('username', that.frmregister.username).then(()=> {console.log('Storage berhasil disimpan')})
          that.navCtrl.setRoot(Page1);
        }
      })
    }

  }

  


}
