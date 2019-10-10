class List{
  constructor(ary){
    this.array = ary;
    this.linkList = null
  }
  init(start=0){
    if(!this.array.length || start >= this.array.length ){
      return null
    }
    let node = {
      value:this.array[start],
      next:null
    }
    node.next = this.init(start+1) 
    this.linkList = node
    return node
  }
  nth(index){
    if(!this.linkList){
      return null
    }
    let head = this.linkList
    let cur = 0
    while(head){
      if(cur === index){
        return head.value
      }
      cur++
      head = head.next
    }
  }
  append(value){
    let head = this.linkList
    while (head.next) {
      head = head.next
    }
    head.next = {
      value,
      next:null
    }
  }
}

var  l = new List([1,2,3,4,5,6,7,8])
l.init()
l.append(9)
console.log(l.linkList)
console.log(l.nth(9))