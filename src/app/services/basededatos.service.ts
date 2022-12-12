import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs/internal/Observable';
import {AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class BasededatosService {

  constructor(private AngularFirestore:AngularFirestore) { }

  createDoc(data:any,path:string,id:string){
    const collection=this.AngularFirestore.collection(path);
    return collection.doc(id).set(data);
  }
  deleteDocument(){

  }
  getDocument(){
    console.log('estoy por leer una colecion');
   this.AngularFirestore.collection('items').valueChanges().subscribe((res)=>{
       console.log('res=>',res);
   });
  }
  editDocument(){

  }

  getDoc<tipo>(path: string, id:string){
    return this.AngularFirestore.collection(path).doc<tipo>(id).valueChanges()
  }

  getCollection<tipo>(path:string){
    const collection = this.AngularFirestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getId(){
    return this.AngularFirestore.createId();
  }

  updateDoc(path: string, id: string, data: any) {
    return this.AngularFirestore.collection(path).doc(id).update(data)
  }
  
  collection<T>(path: string): AngularFirestoreCollection<T> {
    return this.AngularFirestore.collection<T>(path);
  }
  
}
