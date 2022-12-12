import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AvatarService } from '../services/avatar.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
	
  constructor(
	    private firestore: AngularFirestore,
		private avatarService: AvatarService,
		private authService: AuthService,
		private router: Router,
		private loadingController: LoadingController,
		private alertController: AlertController
	) {
		
	}

  
  async logout() {
		await this.authService.logout();
		this.router.navigateByUrl('/', { replaceUrl: true });
	}

  
}
