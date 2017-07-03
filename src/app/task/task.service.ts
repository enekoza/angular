import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Task } from './task';


@Injectable()
export class TaskService {

  private taskUrlBase = 'http://localhost:3000/list/';
  private taskUrlSufix = '/task';

  private taskUrl = 'http://localhost:3000/task';

  constructor(private http: Http) {

  }

  getAll(listId): Promise<Array<Task>> {

    return this.http.get(this.taskUrlBase+listId+this.taskUrlSufix)
    .toPromise()
    .then((response) => {
      return response.json() as Task[];
    })
    .catch(this.handleError);
  }

  post(task: Task): Promise<Task> {

    const headers = new Headers({
      'Content-Type': 'application/json'
    });


    return this.http.post(this.taskUrl, JSON.stringify(task), {headers: headers})
    .toPromise()
    .then((response) => {
      return response.json() as Task;
    })
    .catch(this.handleError);
  }

  put(task: Task): Promise<Task> {

    const headers = new Headers({
      'Content-Type': 'application/json'
    });


    return this.http.put(this.taskUrl, JSON.stringify(task), {headers: headers})
    .toPromise()
    .then((response) => {
      return response.json() as Task;
    })
    .catch(this.handleError);
  }

  delete(task: Task): Promise<Task> {

    const headers = new Headers({
      'Content-Type': 'application/json'
    });


    return this.http.delete(this.taskUrl+"/"+task.id, {headers: headers})
    .toPromise()
    .then((response) => {
      return task;
    })
    .catch(this.handleError);
  }

  done(task : Task): Promise<Task> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put(this.taskUrl+"/"+task.id+"/done/true", {headers: headers})
    .toPromise()
    .then((response) => {
      return task;
    })
    .catch(this.handleError);
  }

  undone(task : Task): Promise<Task> {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put(this.taskUrl+"/"+task.id+"/done/false", {headers: headers})
    .toPromise()
    .then((response) => {
      return task;
    })
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
