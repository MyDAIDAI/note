function Node(val, next) {
    this.val = val;
    this.next = next || null;
}
var MyLinkedList = function() {
    this.head = null;
    this.tail = null;
    this.length = 0;
};

/** 
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    if(index < 0 || index > this.length) {
        return -1;
    }
    let node = this.head;
    while(index > 0 && node) {
        node = node.next;
        index--;
    }
    return node.val;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    let node = new Node(val);
    let firstNode = this.head;
    this.head = node;
    node.next = firstNode;
    this.length++;
    return this.head;
};

/** 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    let node = new Node(val);
    let curNode = this.head;
    while(curNode && curNode.next) {
        curNode = curNode.next;
    }
    curNode.next = node;
    this.length++;
    return node;
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if(index < 0) {
        this.addAtHead(val);
        return;
    } else if(index === this.length) {
        this.addAtTail(val);
        return
    } else if(index > this.length) {
        return;
    } else {
        let node = new Node(val);
        let curNode = this.head;
        while(index > 1 && curNode && curNode.next) {
            curNode = curNode.next;
            index--;
        }
        let next = curNode?.next ||  null;
        curNode.next = node;
        node.next = next;
        this.length++;
        return this.head.next;
    }
};

/** 
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if(index === 0) {
        this.head = this.head.next;
    } else {
        let curNode = this.head;
        while(index > 1 && curNode && curNode.next) {
            curNode = curNode.next;
            index--;
        }
        curNode.next = curNode.next?.next || null;
    }
    return this.head;
};

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
 let linkedList = new MyLinkedList();
 linkedList.addAtHead(1);
 linkedList.addAtTail(3);
 linkedList.addAtIndex(1,2);   //链表变为1-> 2-> 3
 console.log(JSON.stringify(linkedList))
 console.log('get 2', linkedList.get(1));            //返回2
 linkedList.deleteAtIndex(1);  //现在链表是1-> 3
 console.log('get 3', linkedList.get(1));            //返回3
 console.log('linkedList', linkedList)