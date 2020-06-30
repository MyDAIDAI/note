/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function(head) {
	return swap(head)
};
function swap(head) {
	if (!head) return null
	let preNode = head
	let nextNode = head.next
	if (preNode && nextNode) {
		let tmp = nextNode.next
		nextNode.next = preNode
		preNode.next = swap(tmp)
	}
	if (!nextNode) return preNode
  return nextNode
}
let listNode = {
	val: '1',
	next: {
		val: '2',
		next: {
			val: '3',
			next: {
				val: '4',
				next: null
			}
		}
	}
}
let reverseList = swapPairs(listNode)
console.log(reverseList)
