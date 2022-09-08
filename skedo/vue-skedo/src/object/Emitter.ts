// @ts-ignore
import {Observable, Subscriber} from "rxjs";

type ObserverFunction = (data: any) => void;
/**
 * class Emitter 监听函数
 */
export default class Emitter<T> {
  private observers: Map<T, ObserverFunction[]>;

  constructor() {
    this.observers = new Map()
  }

  private addObserverFunction(topic: T, fn: ObserverFunction) {
    if(!this.observers.has(topic)) {
      this.observers.set(topic, []);
    }
    this.observers.get(topic)?.push(fn)
  }

  /**
   * 监听函数
   * @param topic
   */
  on(topic: T | T[]): Observable<any>{
    return new Observable<any>((observer: Subscriber<any>) => {
      if(Array.isArray(topic)) {
        topic.forEach(t => {
          this.addObserverFunction(t, (data) => {
            observer.next(data)
          })
        })
      } else {
        this.addObserverFunction(topic, (data) => {
          observer.next(data )
        })
      }
    })
  }

  /**
   * 触发函数
   * @param topic
   * @param data
   */
  emit(topic: T, data: any) {
    if(this.observers.get(topic)) {
      this.observers.get(topic)?.forEach(fn => {
        fn(data)
      })
    }
  }
}