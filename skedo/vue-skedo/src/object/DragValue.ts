import Emitter from "@/object/Emitter";
import { Topics } from "@/object/Topic";

export default class DragValue extends Emitter<number> {
  private startX: number = 0;
  private startY: number = 0;
  private diffX: number = 0;
  private diffY: number = 0;

  //开始拖拽
  public start(e: DragEvent) {
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.diffX = 0;
    this.diffY = 0;
  }

  // 更新值，获取拖拽差值
  public update(e: DragEvent) {
    this.diffX = e.clientX - this.startX;
    this.diffY = e.clientY - this.startY;
    this.emit(Topics.DragDataUpdated);
  }

  public getDiffX() {
    return this.diffX;
  }

  public getDiffY() {
    return this.diffY;
  }
}
