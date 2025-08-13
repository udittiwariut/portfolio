import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(this.scale.width / 2, this.scale.height / 2, "logo");

    this.add.text(0, 0, "Main Menu", {
      fontFamily: "Arial Black",
      fontSize: 38,
      color: "#ffffff",
      stroke: "#000000",
      strokeThickness: 8,
      align: "center",
    });

    this.input.once("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
