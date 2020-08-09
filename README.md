# emmmmmm，给你的p5项目录个视频

## 项目依赖  

socket.io  
express.js  

## 食用方式

### Step 1  

克隆本仓库，进入仓库目录，安装依赖:  
`npm/cnpm i`

### Step 2  

拷贝你p5项目到public目录里  

### Step 3  

在主html里引入captruer.js(已在public目录里)和socket.io.js(在node_modules/socket.io/node_modules/socket.io-client/dist中可找到)  

### Step 4  

在shetch.js中  

声明一个全局变量:  
`let c = null`  

在createCanvas之后:  
`c = new Captruer();`  

在draw的最后:  
`c.captrue()`  

### Step 5  

`node main.js`  

### Step 6  

浏览器打开:  

`http://localhost:3000 + 你的主html路径`  

你觉得差不多能停里就关掉浏览器  

然后你就能在output目录里得到一个untitled.mp4，分享给他人吧