const Node = require('./node');

class LinkedList {
    constructor() {
    this.length = 0;  // инициализация
        this._head = null;
        this._tail = null;
    }

    append(data) {
    const newte = new Node(data);

        if(this.length === 0) {
            this._head = newte;
            this._tail = newte;
        } else { //замена tail
            this._tail.next = newte;
            newte.prev = this._tail;
            this._tail = newte;

            if(this.length === 1) { 
                this._head.next = newte;
                newte.prev = this._head;
            }
        }
        this.length += 1; //обновляем длину листа
        return this;
    }

    head() {
    return this._head.data;
    }

    tail() {
        return this._tail.data;
           }

    at(index) {
    if (index > -1) {
            let curte = this._head; //начинаем перебор
            let i = 0;
            while ((curte !== null) && (i < index)) { //пока не дойдем до null в конце и индекс не станет равен заданному
                curte = curte.next;
                i++;
            }
             if(curte !== null){
                 return curte.data;
             }
        } else {
            return undefined;
        }
    }

    insertAt(index, data) {
    
        if (index > -1) {
            const newte = new Node(data);
            let curte = this._head; 
            let i = 0;
            while ((curte !== null) && (i < index)) {
                curte = curte.next;
                i++;
            }
            newte._next = curte;
            if(curte.prev === null) { //проработка исключения
                newte.prev = null;
                this._head = newte;
                this._tail = newte;
            } else {
                newte.prev = curte.prev; //вставка и замена местами
                curte.prev.next = newte;
            }
            curte.prev = newte; //вставка и замена местами
            newte.next = curte;
        }

        return this;
    }

    isEmpty() {
    return this.length === 0;
    }

    clear() {
    this.length = 0;
        this._head.data = null;
        this._tail.data = null;

        return this;
    }

    deleteAt(index) {
    if (index > 0) {
            let curte = this._head; //начинаем перебор с начала
            let i = 0;
            while ((curte !== null) && (i < index)) {
                curte = curte.next;
                i++;
            }

            if (curte.prev === null) { //проработка исключения, удаляем
                this._head = curte.next;
            } else {
                curte.prev.next = curte.next; //esle удаляем
            }

            if(curte.next === null) { // приводим в порядок tail, если удаление в конце
                this._tail = curte.prev;
            } else {
                curte.next.prev = curte.prev;
            }
        }
        return this;
    }

    reverse() {
    let curte = this._head; //начало, меняем head и tail, идем с конца в начало
        this._tail = curte;

        while (curte !== null) {
            let temp = curte.prev; 
            curte.prev = curte.next;
            curte.next = temp;

            if (curte.prev !== null) { // условие перебора цикла
                curte = curte.prev;
            } else {
                this._head = curte;
                break;
            }
        }
        return this;
    }

    indexOf(data) {
    let curte = this._head; //перебор сначала
        let i = 0;
        while ((curte !== null) && (i < this.length)) { 
            if (curte.data === data) { // сверяем значения с требуемым
                return i; // если нашли, то возвращаем индекс
            }
            curte = curte.next; // если не нашли, перебираем дальше 
            i++;
        }
        return -1; // если данные не совпадают с запрашиваемыми данными
    }
}
}

module.exports = LinkedList;
