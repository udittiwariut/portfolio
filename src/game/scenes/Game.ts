import { Scene } from "phaser";
import { MAP_SEAN_1, MAP_SEAN_1_LAYER } from "../../conts/maps";
import { ASSETS_CONSTANT_1 } from "../../conts/assetsConts";
import { PLAYER_MOVEMENT, PLAYER_SPRITE } from "../../conts/sprite";
import { Player } from "../objects/Player";

export class Game extends Scene {
  player: Phaser.GameObjects.Sprite;
  constructor() {
    super("Game");
  }
  init() {}

  create() {
    const map = this.make.tilemap({ key: MAP_SEAN_1.name });

    const tileSet = [];
    ASSETS_CONSTANT_1.forEach((val) => {
      map.addTilesetImage(val.name, val.name);
      tileSet.push(val.name);
    });

    map.createLayer(MAP_SEAN_1_LAYER.Grass, tileSet, 0, 0);
    map.createLayer(MAP_SEAN_1_LAYER.Stone_mud, tileSet, 0, 0);
    map.createLayer(MAP_SEAN_1_LAYER.Houses_object, tileSet, 0, 0);
    this.player = new Player(this, 100, 100);
    map.createLayer(MAP_SEAN_1_LAYER.Overhead_house_object, tileSet, 0, 0);
  }

  update(): void {
    this.player.update();
  }
}
