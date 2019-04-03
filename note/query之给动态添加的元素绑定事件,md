通常我们使用`jquery`给元素`class='addContent'`绑定点击事件时代码如下：
```
$(". addContent ").click(function(){
  alert("点击成功");
})
```
但是当我们动态添加另外一个`class='addContent'`的新元素时，新元素不能绑定上上述点击事件，我试着用定时器`setInterval`来刷新，代码如下：
```
setInterval(function(){
  $(". addContent ").click(function(){
    alert("点击成功");
  })
},30)
```
这样做解决了该功能，但是带来了另外一个麻烦——定时器不断执行会影响网页性能，如果页面功能复杂会出现位置bug，所以不建议这样使用。

下面给出几种解决方案

## 一. 动态添加元素时直接绑定事件

代码及结果如图1所示，我们在动态添加元素的的时候直接绑定事件，这样做需要绑定的方法是全局方法，不能是在`jquery`里面写的局部方法，不然会调用不到。

![直接绑定.](https://upload-images.jianshu.io/upload_images/13112949-6c98891a90c957ef.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 二. 事件委托绑定

代码及结果如图2所示，值得注意的是，这里的`document`可以换成需添加元素的已存在的父元素如`#div1`。

![委托绑定](https://upload-images.jianshu.io/upload_images/13112949-3231a83773a85adb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

