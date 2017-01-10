import { Component } from '@angular/core';

import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';
import { AddstoryPage } from '../addstory/addstory';
import { LoginPage } from '../login/login';
import { DetailstoryPage } from '../detailstory/detailstory';
@Component({
	selector: 'page-allpost',
	templateUrl: 'allpost.html'
})
export class AllpostPage {
	Kisah: FirebaseListObservable<any>;
	users : FirebaseListObservable<any>

	
	constructor(public navCtrl: NavController, public af :AngularFire,public alertCtrl: AlertController,
		public actionSheetCtrl: ActionSheetController,
		public storage: Storage) {

		this.Kisah = af.database.list('/Kisah');
		this.users = af.database.list('/users/');

		this.Kisah.subscribe(x => {
			let object = this.Kisah.$ref.orderByChild('key')
			let key = this.Kisah.$ref.ref.once('value', function(y){
				console.log('xx ', y.key)
			})
			console.log('x',x)
			console.log('object',object)
			console.log('key',key)
		})

		let object = this.Kisah.$ref.orderByChild('key')

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
