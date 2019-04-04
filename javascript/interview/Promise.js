function Promise(excutor) {
  let _this = this
  _this.status = "pending"
  _this.value = ""
  _this.reason = ""
  function resolve (value) {
    if (_this.status === "pending") {
      _this.status = "resolved"
      _this.value = value
    }
  }
  function reject (reason) {
    if (_this.status === "pending") {
      _this.status = "rejected"
      _this.reason = reason
    }
  }
  excutor(resolve, reject)
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  let _this = this
  if (_this.status === "resolved") {
    onFulfilled(_this.value)
  }
  if (_this.status === "rejected") {
    onRejected(_this.reason)
  }
}