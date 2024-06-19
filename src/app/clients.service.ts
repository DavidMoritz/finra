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
  execName: string;
}

function getColorFromExecutive(execId: string) {
  const exec = executiveList.find((exec) => exec.id === execId);

  return {
    color: exec?.color || 'orange',
    execName: exec?.name || 'Unassigned',
  };
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
        const { color, execName } = getColorFromExecutive(`e${rand}`);
        this.clients.push({
          ...client,
          execId: `e${rand}`,
          lat: Number(client.lat),
          long: Number(client.long),
          color,
          execName,
          content: parser.parseFromString(tacByColor(color), 'image/svg+xml')
            .documentElement,
        });
      });
    }
  }

  getExecutiveClients(execId: string, q: string) {
    const execClients = this.clients.filter(
      (client) => client.execId === execId
    );

    return this.filterQuery(execClients, q);
  }
  getNonExecutiveClients(q: string) {
    const execIds = executiveList.map((exec) => exec.id);
    const nonExecClients = this.clients.filter(
      (client) => !execIds.includes(client.execId)
    );

    return this.filterQuery(nonExecClients, q);
  }
  getAllClients(q: string) {
    return this.filterQuery(this.clients, q);
  }
  filterQuery(list: Client[], q: string) {
    if (!q) return list;

    function condense(str: string) {
      return str.toLowerCase().replace(/[^a-zA-Z]/g, '');
    }

    return list.filter((client) => condense(client.name).includes(condense(q)));
  }
}
