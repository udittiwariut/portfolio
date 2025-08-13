import { Actor } from "../../classes/actor";
import { Utility } from "../../classes/utility";
import { PLAYER_MOVEMENT, PLAYER_SPRITE } from "../../conts/sprite";

export class Player extends Actor {
  private velocity = 150;
  private lastDirection: "up" | "down" | "left" | "right" | null = null;
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, PLAYER_SPRITE.name);
    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");
    this.getBody().setSize(32, 32);
    this.setScale(1.5);

    this.initAnimation();

    this.play(PLAYER_MOVEMENT.IDEAL_FRONT, true);
  }
  private initAnimation(): void {
    this.anims.create({
      key: PLAYER_MOVEMENT.IDEAL_FRONT,
      frames: this.anims.generateFrameNumbers(PLAYER_SPRITE.name, { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: PLAYER_MOVEMENT.IDEAL_X,
      frames: this.anims.generateFrameNumbers(PLAYER_SPRITE.name, { frames: [6, 7, 8, 9, 10, 11] }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: PLAYER_MOVEMENT.IDEAL_BACK,
      frames: this.anims.generateFrameNumbers(PLAYER_SPRITE.name, { frames: [12, 13, 14, 15, 16, 17] }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: PLAYER_MOVEMENT.WALK_DOWN,
      frames: this.anims.generateFrameNumbers(PLAYER_SPRITE.name, { frames: [18, 19, 20, 21, 22, 23] }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: PLAYER_MOVEMENT.WALK_X,
      frames: this.anims.generateFrameNumbers(PLAYER_SPRITE.name, { frames: [24, 25, 26, 27, 28, 29] }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: PLAYER_MOVEMENT.WALK_UP,
      frames: this.anims.generateFrameNumbers(PLAYER_SPRITE.name, { frames: [30, 31, 32, 33, 34, 35] }),
      frameRate: 8,
      repeat: -1,
    });
  }
  update(): void {
    this.getBody().setVelocity(0);

    let dx = 0;
    let dy = 0;

    if (this.keyW?.isDown) dy = -1;
    if (this.keyA?.isDown) dx = -1;
    if (this.keyS?.isDown) dy = 1;
    if (this.keyD?.isDown) dx = 1;

    if (dy === -1) {
      this.anims.play(PLAYER_MOVEMENT.WALK_UP, true);
      this.lastDirection = "up";
    } else if (dy === 1) {
      this.anims.play(PLAYER_MOVEMENT.WALK_DOWN, true);
      this.lastDirection = "down";
    } else if (dx !== 0) {
      this.anims.play(PLAYER_MOVEMENT.WALK_X, true);
      this.flipX = dx < 0;
      this.checkFlip();
      this.lastDirection = dx < 0 ? "left" : "right";
    } else {
      if (this.anims.currentAnim?.key !== this.getIdleAnimation()) {
        this.anims.play(this.getIdleAnimation(), true);
      }
    }

    const vector = new Phaser.Math.Vector2(dx, dy);
    if (vector.length() > 0) {
      vector.normalize();
      this.body.velocity.x = this.velocity * vector.x;
      this.body.velocity.y = this.velocity * vector.y;
    }
  }

  private getIdleAnimation(): string {
    switch (this.lastDirection) {
      case "up":
        return PLAYER_MOVEMENT.IDEAL_BACK;
      case "down":
        return PLAYER_MOVEMENT.IDEAL_FRONT;
      case "left":
      case "right":
        return PLAYER_MOVEMENT.IDEAL_X;
      default:
        return PLAYER_MOVEMENT.IDEAL_FRONT;
    }
  }
}
