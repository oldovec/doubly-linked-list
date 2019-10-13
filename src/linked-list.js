const Node = require('./node');

class LinkedList {
    constructor() {
        this._head=null;
        this._tail=null;
        this.length=0;
    }

    append(data) {
       let node= new Node(data); 
       if(this.length) {
            this._tail.next=node;
            node.prev=this._tail;
            this._tail=node;
       }
       else {
           this._head=node;
           this._tail=node;
       }
       this.length++;
       return this;
    }

    head() { 
        return this._head ? this._head.data: null;
    }

    tail() {
        return this._tail ? this._tail.data: null;
    }

    at(index, flagInsert=false) { 
        let currentNode= this._head;
        let count=0;
        while(count<index) {
            currentNode=currentNode.next;
            count++;
        }
        if(flagInsert) return currentNode;
        return currentNode.data;
    }

    insertAt(index, data) {  
        if(!this.length){
           let node=this.append(data);
           return node.data; 
        }      
        let node= new Node(data); 
        let currentNodeIns=this.at(index,true);   
        
        let beforeNodeIns=currentNodeIns.prev;
        let nodeIns=currentNodeIns;
        let afterNodeIns=currentNodeIns.next;
        
        node.prev=beforeNodeIns;
        node.next=currentNodeIns;
        currentNodeIns.prev=node;
        beforeNodeIns.next=node;
        
        this.length++;

        return node.data;
    }

    isEmpty() {
        return !Boolean(this._head);
    }

    clear() {
        this._tail=null;
        this._head=null;
        this.length=0;
        return this;
    }

    deleteAt(index) {
        if(this.length==1) {
            this.clear();
            return this;
        }
        let currentNodeDel=this.at(index,true);

        let beforeNodeDel=currentNodeDel.prev;
        let nodeDel=currentNodeDel;
        let afterNodeDel=currentNodeDel.next;

        beforeNodeDel.next=afterNodeDel;
        afterNodeDel.prev=beforeNodeDel;
        nodeDel=null;
        this.length--;
    }

    reverse() {
        let currentNodeHead= this._head;
        let count=0;
        while(count<this.length) {

            let tempReverse;

            tempReverse=currentNodeHead.next;
            currentNodeHead.next=currentNodeHead.prev;
            currentNodeHead.prev=tempReverse;
            currentNodeHead=currentNodeHead.prev;
            count++;
        }

        let tempReverse;
        tempReverse=this._tail;
        this._tail=this._head;
        this._head=tempReverse;

        return this;        
    }

    indexOf(data) {
        let currentNode= this._head;
        let count=0;
        while(count<this.length) {
            if(currentNode.data==data) return count;
            currentNode=currentNode.next;
            count++;
        }
        return -1;
    }
}

module.exports = LinkedList;
