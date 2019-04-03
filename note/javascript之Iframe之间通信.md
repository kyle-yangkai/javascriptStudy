本文讨论都是在同域（同一域名，同一端口，同一协议）下进行。

以下我们讨论三个问题：1、iframe子页面和父页面相互获取元素，2、iframe子页面和父页面相互调用方法和变量。

## 一. iframe子页面和父页面相互获取元素

1. 子页面获取父页面元素

//获取父页面 $("#id")的元素

Js原生：`window.parent.document.getElementById ("元素id");`

Jquery： `$("#id", parent.document);`

2. 父页面获取子页面元素

//获取子页面 $("#id")的元素

Js原生：`window.frames[iframe序号].document.getElementById("元素id")`;

Jquery：`$("#iframeID").contents().find("#元素ID")`;

![图1、获取元素](https://upload-images.jianshu.io/upload_images/13112949-762f5b63d73560af.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 二. iframe子页面和父页面相互调用方法和变量

1. 子页面调用父页面方法和变量

//调用父页面方法和变量

`window.parent.func();` //调用方法

`window.parent.value;` //调用变量

2. 父页面调用子页面方法和变量

//调用子页面方法和变量

`window.frames[iframe序号].func();`//调用方法

`window.frames[iframe序号].value;` //调用变量

![图2、调用方法和变量](https://upload-images.jianshu.io/upload_images/13112949-2e61271c077a5911.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

说明：

1. `iframe`之间相互通信的前提是页面加载完成，所以我们从上面可以看到 父页面获取子页面元素，调用子页面方法、变量时使用了`window.frames[0].onload =function(){}`包裹来确保子页面加载完成。

2. 父页面获取子页面iframe内容不止上述一种方法，还可以`iframe`的`id`和`iframeName`来获取，即`document.getElementById('iframeId').contentWindow.document.getElementById('子页面中的元素ID');`和`iframeName.window.document.getElementById('子页面中的元素ID');`
