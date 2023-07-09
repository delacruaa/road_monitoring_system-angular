import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}
  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        console.log('success');
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  }
}
