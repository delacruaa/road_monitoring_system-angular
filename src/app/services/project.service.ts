import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { BehaviorSubject, catchError, throwError } from 'rxjs';
import {
  IConstructive,
  IGraphic,
  IMaterial,
  IObject,
} from '../models/IProject';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private db: AngularFireDatabase) {}

  getProjectList() {
    return this.db
      .object<string>('/')
      .valueChanges()
      .pipe(
        catchError((error) => {
          console.error('Error fetching data:', error);
          return throwError('Something went wrong');
        })
      );
  }

  addProject(id: string) {
    return this.db.object(`${id}`).set({
      do: {
        1111111111111: {
          id: 1111111111111,
          constructive: null,
          projectLeft: null,
          projectRight: null,
          doneLeft: null,
          doneRight: null,
          todayRight: null,
          todayLeft: null,
          yesterdayLeft: null,
          yesterdayRight: null,
          project: 0,
          done: 0,
          today: 0,
          yesterday: 0,
          type: 'oneRoadway',
        },
      },
      graph: {
        '1111111111111-Правая сторона': {
          '0ЩМА00': [
            {
              isDones: false,
              name: '0ЩМА00',
              num: 0,
            },
            {
              isDones: false,
              name: '0ЩМА00',
              num: 1,
            },
          ],
        },
      },
      material: {
        1111111111111: {
          id: 1111111111111,
          done: 0,
          today: 0,
          yesterday: 0,
          project: 0,
          type: 'unit',
          unit: 'currentUnit',
        },
      },
    });
  }
  deleteProject(id: string) {
    return this.db.object(`${id}`).remove();
  }
  updateDoneCell(
    currentRoute: string,
    graphicName: string,
    constrictiveName: string,
    isDone: boolean,
    cellNum: number
  ) {
    return this.db
      .object(
        `${currentRoute}/graph/${graphicName}/${constrictiveName}/${cellNum}`
      )
      .update({
        isDones: !isDone,
      });
  }

  addGraphic(
    currentRoute: string,
    id: number,
    nameGraph: string,
    index: number,
    constrictiveName: string,
    i: number
  ) {
    return this.db
      .object(
        `${currentRoute}/graph/` +
          id +
          '-' +
          nameGraph +
          `/${index + constrictiveName}` +
          `/${i}`
      )
      .set({
        isDones: false,
        num: i,
        name: index + constrictiveName,
      });
  }
  deleteGraphic(currentRoute: string, id: string) {
    return this.db.object(`${currentRoute}/graph/${id}`).remove();
  }

  addConstructive(currentRoute: string, id: number, data: IConstructive) {
    return this.db.object(`${currentRoute}/do/${id}`).set(data);
  }
  deleteConstructive(currentRoute: string, id: string) {
    return this.db.object(`${currentRoute}/do/${id}`).remove();
  }

  editConstructiveItems(
    currentRoute: string,
    value1: string,
    value2: string,
    value: string
  ) {
    return this.db.object(`${currentRoute}/${value1}`).update({
      [value2]: +value,
    });
  }

  addMaterial(currentRoute: string, id: number, data: IMaterial) {
    return this.db.object(`${currentRoute}/material/${id}`).set(data);
  }

  deleteMaterial(currentRoute: string, id: number) {
    return this.db.object(`${currentRoute}/material/${id}`).remove();
  }
}
