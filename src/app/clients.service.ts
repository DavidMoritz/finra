import { Injectable } from '@angular/core';
import executiveList from '../data/executives.json';
import clientListData from '../data/clients.json';
import { random1toN, tacByColor } from './utils';

export interface Client {
  id: string;
  execId: string;
  name: string;
  address: string;
  lat: number;
  long: number;
  color: string;
  content: any;
}

function getColorFromExecutive(execId: string) {
  const exec = executiveList.find((exec) => exec.id === execId);

  return exec?.color || 'orange';
}

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private clients = <Client[]>[];

  constructor() {
    const localClients = localStorage.getItem('clients');
    const parser = new DOMParser();

    if (localClients) {
      this.clients = JSON.parse(localClients);
    } else {
      clientListData.forEach((client) => {
        const rand = random1toN(70);
        const color = getColorFromExecutive(`e${rand}`);
        this.clients.push({
          ...client,
          execId: `e${rand}`,
          lat: Number(client.lat),
          long: Number(client.long),
          color,
          content: parser.parseFromString(tacByColor(color), 'image/svg+xml')
            .documentElement,
        });
      });
    }
  }

  getExecutiveClients(execId: string) {
    return this.clients.filter((client) => client.execId === execId);
  }
  getNonExecutiveClients() {
    const execIds = executiveList.map((exec) => exec.id);

    return this.clients.filter((client) => !execIds.includes(client.execId));
  }
  getAllClients() {
    return this.clients;
  }
}
