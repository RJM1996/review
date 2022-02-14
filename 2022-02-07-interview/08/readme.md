# thunk 函数

什么是 thunk 函数？
> 一个函数有多个参数，并且参数包含回调函数，使用高阶函数将其转换为只有一个回调函数作为参数的函数，转换后的这个单参数函数就叫做 thunk 函数

如何通过 thunk 函数解决回调地狱的问题？
> thunk 函数通常与 reduce 或 generator 函数搭配使用来解决回调地狱的问题

参考资料：<https://www.ruanyifeng.com/blog/2015/05/thunk.html>
