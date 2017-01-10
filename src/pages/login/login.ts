import { Component } from '@angular/core';
import { NavController, NavParams, AlertController ,LoadingController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { RegisterPage } from '../register/register';
import { Storage } from '@ionic/storage';
import { Page1 } from '../page1/page1';
import 'rxjs/add/operator/map';
/*
  Generated class for the Login page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-login',
    templateUrl: 'login.html'
  })
  export class LoginPage {
    users : FirebaseListObservable<any>
    frmLogin : any = {username : '', password : ''}
    constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,
          public loadingCtrl: LoadingController,
          public storage: Storage,public af: AngularFire) {
      this.users = af.database.list('/users');
    }
    public createAccount() {
      this.navCtrl.push(RegisterPage);
    }
    doLogin(){
      if( this.frmLogin.username === '' || 
        this.frmLogin.password === ''){
        let alert    = this.alertCtrl.create({
          title  : "Warning!",
          subTitle: "form harus diisi",
          buttons  : ["ok"]
        })
      alert.present()
    }else{
      let that = this
      let loading   = this.loadingCtrl.create({
        content : "Authentication...",
        delay  : 2000    
      })
      let alert    = this.alertCtrl.create({
        title  : "Warning!",
        subTitle: "username / password salah",
        buttons  : ["ok"]
      })
      loading.present()
      let items= this.af.database.list('users/'+this.frmLogin.username)
      items.$ref.once('value', function(x){
        console.log(x.hasChild('password'))
        if(x.hasChild('password')){
          if(x.val().password === that.frmLogin.password){
            console.log('Password Sama')
            loading.dismiss()
            that.storage.remove('username')
            that.storage.set('username', that.frmLogin.username).then(()=> {console.log('Stored in localStorage')})
            that.navCtrl.setRoot(Page1)
          }else{
            console.log('Password Beda')
            loading.dismiss()
            alert.present()
          }
        }else{
          console.log('belum terdaftar')
          loading.dismiss()
        }
      })
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
}