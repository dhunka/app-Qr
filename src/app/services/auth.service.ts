import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { alumno } from '../models/models';

import {
	Auth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
	authState,
} from '@angular/fire/auth';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private auth: AngularFireAuth,) {}

	async register({ email, password }) {
		try {
			const user = await this.auth.createUserWithEmailAndPassword(email, password);
			return user;
		} catch (e) {
			return null;
		}
	}
    
	login(correo:string,password:string){
      return this.auth.signInWithEmailAndPassword(correo,password)
	}
  
	logout() {
		return this.auth.signOut();
	}

	registrarUser(datos: alumno) {
	  return  this.auth.createUserWithEmailAndPassword(datos.correo, datos.password);
	  
	}
   
	stateuser(){
		return this.auth.authState
	}

	async getuid() {
		const user = await this.auth.currentUser;
		if(user){
		return user.uid;
		} else {
			return null;
		}
	}
}
