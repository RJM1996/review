## font

1. 设置 font-size 的 4 种方法
- px
- em
- %
- 关键字: small, medium, large, x-large, xx-large

2. body 的字体大小即为默认的字体大小, 一般为 16px

3. font-weight 取值一般为: normal, bold
lighter, bolder, 100-900 一般取决于字体和浏览器的支持, 通常并不使用
```
100 - Thin
200 - Extra Light (Ultra Light)
300 - Light
400 - Regular (Normal、Book、Roman)
500 - Medium
600 - Semi Bold (Demi Bold)
700 - Bold
800 - Extra Bold (Ultra Bold)
900 - Black (Heavy)
```



4. color 的表示
- 颜色名
- 十六进制码
- rgb 表示法
十六进制表示法: #AABBCC
其中 AA 表示 red, BB 表示 green, CC 表示 blue
A 就是十六进制的 10, 即 AA = 10*16 + 10 = 170
B 就是十六进制的 11, 即 BB = 11*16 + 11 = 187
C 就是十六进制的 12, 即 CC = 12*16 + 12 = 204
所以 #AABBCC 就是 rgb(170, 187, 204)
