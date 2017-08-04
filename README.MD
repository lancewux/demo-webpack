demo实现的功能有

- 多页面应用打包，即打包后输出多个html文件
- 各种文件打包，包括js，img等
- 把css文件单独提取出来
- 实现了代码拆分和按需加载

例如

打包后的文件输出index.html和hello.html两个页面

index.html对应打包入口welcome，把welcome.js和cry.js打包在一起

welcome.css则单独提取了出来，实现js和css的分离

用import把laugh.js和cry.js拆分出来，实现代码拆分，然后按需加载cry.js。

