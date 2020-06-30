class EventEmiter{
  constructor() {
    this._events = {}
  }
  on(event, callback) {
    if(Array.isArray(event)) {
      for (let index = 0, len = event.length; index < len; index++) {
        this.on(event[index], callback)
      }
    } else {
      (this._events[event] || (this._events[event] = [])).push(callback)
    }
    return this
  }
  off(event, callback) {
    if(Array.isArray(event)) {
      for (let index = 0, len = event.length; index < len; index++) {
        this.off(event[index], callback)
      }
    } else {
      if(!callback) {
        this._events[event] = null
      } else {
        let callbacks = this._events[event]
        let i = callbacks.length
        while (i >= 0) {
          // callbacks[i].fn是为 once时所用的
          // once 中添加的回调函数会自定义的 on, 在 on 上添加了 on.fn = callback
          if(callbacks[i] === callback || callback === callbacks[i].fn) {
            callbacks.splice(i, 1)
            break
          }
          i--
        }
      }
    }
    return this
  }
  emit(event) {
    if(Array.isArray(event)) {
      for (let index = 0, len = event.length; index < len; index++) {
        this.emit(event[i])
      }
    } else {
      let callbacks = this._events[event]
      let args = Array.prototype.slice.call(arguments, 1)
      for (let index = 0, len = callbacks.length; index < len; index++) {
        callbacks[index].apply(this, args)
      }
    }
  }
  once(event, callback) {
    function on() {
      this.off(event, callback)
      callback.apply(this, arguments)
    }
    on.fn = callback
    this.on(event, on)
  }
}
