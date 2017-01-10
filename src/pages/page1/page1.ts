import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { AddstoryPage } from '../addstory/addstory';
import { LoginPage } from '../login/login';
import { DetailstoryPage } from '../detailstory/detailstory';
@Component({
	selector: 'page-page1',
	templateUrl: 'page1.html'
})
export class Page1 {
	Kisah: FirebaseListObservable<any>;
	users : FirebaseListObservable<any>

	data:any={
		username :'',
		email: ''
	}
	constructor(public navCtrl: NavController, public af :AngularFire,public alertCtrl: AlertController,
		public actionSheetCtrl: ActionSheetController,
		public storage: Storage) {
		
		storage.get('username').then((user)=>{
			console.log(user);
			if(user==null)
			{
				console.log("user null");

			}

			else{
				this.data.username = user;
				this.users =  af.database.list('/users'+user);
				this.Kisah = af.database.list('/Kisah/'+user);
			}
			
		})
		

	}


	deletekisah(photoKey: string) {
		this.Kisah.remove(photoKey);
	}

	public createStory() {
		this.navCtrl.push(AddstoryPage);
	}
	public detailStory(kisah) {
		console.log(kisah)
		this.navCtrl.push(DetailstoryPage,kisah);

	}

	Logout(){
		this.storage.remove('username');
		this.navCtrl.setRoot(LoginPage);
	}
}
