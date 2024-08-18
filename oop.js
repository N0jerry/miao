class Complex {//实现复数
    constructor(real,imag) {
        this.real = real
        this.imag = imag
    }

    plus(c) {
        var real = this.real + c.real
        var imag = this.imag + c.imag
        return new Complex(real, imag)
    }

    minus(c) {
        var real = this.real - c.real
        var imag = this.imag - c.imag
        return new Complex(real, imag)
    }
    multiple(c) {
        var real = this.real * c.real - this.imag * c.imag //这里得到实部,
        var imag = this.real * c.imag + this.imag * c.real
        return new Complex(real, imag)

    }

    div(c) {
        var helper = new Complex(c.real, -c.imag)//封装辅助计算
        var fenmu = c.multiple(helper).real//取出它的实部
        var fenzi = this.multiple(helper)

        var real = fenzi.real / fenmu //分子的实部除以分母
        var imag = fenzi.imag / fenmu
        return new Complex(real, imag)
    }
    toString() {
        return '' + this.real + (this.imag > 0 ? "+" : '') + this.imag + 'i'
        //当虚部小于0就不加+
    }
}
class Vector {//实现向量
    constructor(x,y) {
        this.x = x
        this.y = y
    }
    plus(v) {
        var x = this.x + v.x //Vector的x属性值与v的x属性值的和
        var y = this.y + v.y
        return new Vector(x, y) //返回新的向量
    }
    minus(v) {
        var x = this.x - v.x //Vector的x属性值与v的x属性值的和
        var y = this.y - v.y
        return new Vector(x, y) //返回新的向量
    }
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)//x的平方加y的平方开根号
    }
}
class Stack {//栈
    constructor() {
        this._elements = []
    }

    push(val) {
        this._elements.push(val)
    }
    // 从栈中取出元素并删除栈顶元素
    pop() {
        return this._elements.pop()
    }
    // 查看但不删除栈顶元素,查看队头,不看队尾
    peek() {
        return this._elements[this._elements.length - 1]
    }

    get size() {
        return this._elements.length
    }
}

class Queue {//队列
    constructor() {
        this._head = null//头节点
        this._tail = null//最后一个节点,这里操作两个节点可以提高效率
        this._length = 0
    }

    // 向队列中增加元素
    add(val) {
        var node = {//节点
            val: val,
            next: null,
        }
        this._length++
        if (this._head == null) {//当head为空
            this._head = this._tail = node
            return this
        }
        this._tail.next = node//把node添加给next属性值
        this._tail = node//最后一个节点改为node
        return this
    }
    // 从队头取出元素并删除队头元素
    pop() {
        if (this._head == null) {
            return undefined
        }
        this._length--
        if (this._head == this._tail) {//只有一个节点
            var result = this._head.val//取出的头节点
            this._head = this._tail = null//头尾都为null
            return result
        }
        var result = this._head.val
        this._head = this._head.next//头结点变为head里的next
        return result
    }
    // 查看队头元素（没有查看队尾元素的功能）
    peek() {
        return this._head.val
    }
    // 以及queue.size获取队列的长度
    get size() {
        return this._length
    }
}

class LinkedList {//单向链表
    constructor() {
        this._head = null //头结点一开始是空的
        this._length = 0
    }

    at(idx) {
        var p = this._head
        while (idx > 0 && p) {
            p = p.next
            idx--
        }
        if (p) {
            return p.val
        } else {
            return undefined
        }
    }

    set(idx, val) {
        var p = this._head
        while (idx > 0 && p) {
            p = p.next
            idx--
        }
        if (p) {
            p.val = val
        }
    }

    append(val) {
        var node = {
            val: val,
            next: null,
        }
        this._length++
        if (this._head == null) {
            this._head = node
            return this
        }
        var p = this._head
        while (p.next) {
            p = p.next
        }
        p.next = node
        return this
    }

    pop() {
        if (this._head == null) {
            return undefined
        }

        this._length--
        if (this._head.next == null) { // 链表只有一个结点时
            var result = this._head.val
            this._head = null
            return result
        }
        var p = this._head
        while (p.next.next) {
            p = p.next
        }
        var result = p.next.val
        p.next = null
        return result
    }

    prepend(val) {
        var node = {
            val: val,
            next: this._head,
        }
        this._length++
        this._head = node
        return this
    }

    shift() {
        if (this._head == null) {
            return undefined
        }
        this._length--
        var result = this._head.val
        this._head = this._head.next
        return result
    }

    toArray() {
        var result = []
        var p = this._head
        while (p) {
            result.push(p.val)
            p = p.next
        }
        return result
    }

    toString() {
        return this.toArray().join('->')
    }

    get size() {
        return this._length
    }

}


class MyMap {//映射
    constructor(initPairs = []) {
        this._pairs = [] //[[key:val],[key:val],[key:val]]
        for (var pair of initPairs) {//加上这句可以创建出两元素一组的映射对
            var key = pair[0]
            var val = pair[1]
            this.set(key, val)//当var m = new MyMap()生效这行就跟着生效,set依赖this._pairs = []需要在for上面
        }
    }
    set(key, val) {//把key属性的值变为val
        for (var i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                this._pairs[i + 1] = val//右边等于val
                return this
            }
        }
        this._pairs.push(key, val)//这里push了两个元素,数组里没有遍历到key,就新增key和val这两个元素
        return this
    }
    get(key) {
        for (var i = 0; i < this._pairs.length; i += 2) { //i += 2为一组
            if (this._pairs[i] === key) {
                return this._pairs[i + 1]
            }
        }
        return undefined
    }
    // 判断这个映射中是否存在这个key的映射
    has(key) {
        for (var i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) { //2=='2'true,2==='2'false
                return true
            }
        }
        return false
    }
    delete(key) {
        for (var i = 0; i < this._pairs.length; i += 2) {
            if (this._pairs[i] === key) {
                this._pairs.splice(i, 2)//从第i的位置,删除自己和第二个元素
                return true
            }
        }
        return false
    }
    // 清空这个映射中所有的映射对儿
    clear() {
        this._pairs = []
        return this
    }
    // 获取这个映射中映射对儿的数量
    get size() { //获取get出size这个属性
        return this._pairs.length / 2
    }
    // 遍历这个映射中所有的映射对儿
    forEach(iterator) {
        for (var i = 0; i < this._pairs.length; i += 2) {
            iterator(this._pairs[i + 1], this._pairs[i])//接收左右为一组
        }
    }
}

class MySet {//集合
    constructor(initalValues = []) {
        this._elements = [] //创建属于自己的对象
        for (var val of initalValues) {
            this.add(val)
        }
    }
    // 向集合中添加元素
    add(value) {
        if (!this._elements.includes(value)) {//复杂度O(n),有循环
            this._elements.push(value)
        }
        return this
    }
    // 从集合中删除value元素
    delete(value) {
        var idx = this._elements.indexOf(value)
        if (idx >= 0) {//indexOf没找到就返回-1
            this._elements.splice(idx, 1)//给splice传-1,就会删除倒数第一项,1为删除1个数
        }//因为每个数组[]但是独一无二的,indexOf拿不到其内存地址就删不掉
        return this
    }

    // 获取集合中的元素用 c.size，它是一个getter
    get size() {
        return this._elements.length//返回数组长度
    }


    // 清空集合中的所有元素
    clear() {
        this._elements = []
        return this
    }

    // 判断集合中是否存在某元素
    has(value) {
        return this._elements.includes(value)//这里返回真假
    }
    // 遍历集合中的元素（顺序无所谓）
    forEach(func) {
        if (typeof func !== 'function') {
            throw new TypeError('回调函数必须是函数'); // 确保回调函数是函数类型
        }
        for (var value of this._elements) { //值和数组
            func(value)//func函数
        }

    }
}