<<<<<<< HEAD
import { Injectable } from "@angular/core";
import { WshelperService } from "./wshelper.service";
import { GameConsole } from "../models/game-console";
=======
<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { WshelperService } from './wshelper.service';
import { GameConsole } from '../models/game-console';
>>>>>>> 36c09b6... feat: tags items and private user page creation

@Injectable({
  providedIn: "root",
})
export class GameConsoleService {
  videoGamesStationsList: Array<GameConsole>;

<<<<<<< HEAD
=======
    static URL = 'http://localhost:3000/consoles';
  
    constructor(private service: WshelperService) { }
  
    getAllItem() {
      return this.service.get(GameConsoleService.URL );
    }
  
    getItemFilter(number: number){
      return this.service.get(GameConsoleService.URL + '/filter/' + number );
    }
  
    postItem(gameconsole: GameConsole) {
      return this.service.post(GameConsoleService.URL, gameconsole);
    }
  
    getOneItem(id: number) {
      return this.service.get(GameConsoleService.URL + '/' + id.toString());
    }
  
    delete(id) {
      return this.service.delete(GameConsoleService.URL + 'delete/' + id);
    }
  
    update(id, gameconsole) {
      return this.service.put(GameConsoleService.URL + 'modify/' + id, gameconsole);
    }
=======
import { Injectable } from "@angular/core";
import { WshelperService } from "./wshelper.service";
import { GameConsole } from "../models/game-console";

@Injectable({
  providedIn: "root",
})
export class GameConsoleService {
  videoGamesStationsList: Array<GameConsole>;

>>>>>>> 36c09b6... feat: tags items and private user page creation
  static URL = "http://localhost:3000/consoles";

  constructor(private service: WshelperService) {}

  getAllItem() {
    return this.service.get(GameConsoleService.URL);
  }

  getItemFilter(number: number) {
    return this.service.get(GameConsoleService.URL + "/filter/" + number);
  }

  postItem(gameconsole: GameConsole) {
    return this.service.post(GameConsoleService.URL, gameconsole);
  }

  getOneItem(id: number) {
    return this.service.get(GameConsoleService.URL + "/" + id.toString());
  }

  delete(id) {
    return this.service.delete(GameConsoleService.URL + "delete/" + id);
  }

  update(id, gameconsole) {
    return this.service.put(
      GameConsoleService.URL + "modify/" + id,
      gameconsole
    );
  }
<<<<<<< HEAD
=======
>>>>>>> 0e287b4... Merge pull request #18 from Marineincera/feat/item-creation
>>>>>>> 36c09b6... feat: tags items and private user page creation
}
