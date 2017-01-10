import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Detailstory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-detailstory',
  	templateUrl: 'detailstory.html'
  })
  export class DetailstoryPage {
  	public judul:any;
  	public isi:any;
  	public image:any;

  	constructor(public navCtrl: NavController, public navParams: NavParams,public af :AngularFire,
                public storage: Storage) {
  		this.judul =navParams.get('judul');
  		this.isi =navParams.get('isi');
  		this.image =navParams.get('image');
  	
  	}

  	ionViewDidLoad() {
  		console.log('ionViewDidLoad DetailstoryPage');
  	}

  }
