使用`iframe`除了通信以外最大的问题应该就是其高度和宽度的问题了，默认状态下，`iframe`的宽度为`300px`，高度为`150px`，当给`iframe`增加`width=’100%’ height=’100%’`属性而父元素的属性均为默认是，`iframe`宽度会扩展至与父元素宽度一致，而高度仍然是`150px`，因此接下来我们主要讨论iframe的高度以及其滚动条的问题。为了讨论方便，下面我们默认`body`元素里面只有`iframe`和`iframe`的父元素且`iframe`宽高属性为`width=’100%’ height=’100%’`。

![图1：初始例子](https://upload-images.jianshu.io/upload_images/13112949-e6d710efbc0742b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

由图1我们可以看出，当`iframe`父元素给定了宽高之后，`iframe（width=’100%’ height=’100%’）`宽高与父元素一致，但是当父元素的高度大于屏幕的可用范围且`iframe`内容高度大于`iframe`固定高度时，浏览器窗口会出现两个滚动条，这样很不美观，我们需要解决这个滚动条的问题。

想要不出现两个滚动条，我们有下面两种解决思路：1、去掉浏览器窗口的滚动条；2、去掉iframe内部的滚动条。这两种思路都可以，在使用的时候需要根据自身需求选择。

## 一. 去掉浏览器窗口的滚动条

去掉浏览器窗口的滚动条其实就是iframe父元素的高度不大于浏览器窗口的高度。1、可以直接设定iframe父元素的高度使其不大于浏览器窗口的高度；2、如果我们希望iframe父元素的高度跟随浏览器窗口高度变化而变化，可以使用偏移属性来解决，代码如图2所示，结果如图3所示。

![图2：去除浏览器窗口滚动条](https://upload-images.jianshu.io/upload_images/13112949-71a96dad8227fb09.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![图3：代码运行结果](https://upload-images.jianshu.io/upload_images/13112949-81bcc95f675285c0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

当然，`iframe`父元素高度也可以使用`javascript`来设定，这里不做过多讨论，有兴趣的同学们可以自己研究一下。

## 二. 去掉`iframe`内部的滚动条

去掉`iframe`内部的滚动条其实就是让`iframe`内容高度不大于`iframe`父元素设定高度，但是大多数情况下，`iframe`内容高度是不固定的，这里我们就需要动态获取`iframe`内容高度并将其赋值给`iframe`框架高度，具体代码及结果如图4。

![图4：去除iframe滚动条代码及运行结果](https://upload-images.jianshu.io/upload_images/13112949-2da8df2cdcb97962.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

由图4我们可以看到还是有两个滚动条，这是什么原因呢？其实通过浏览器的调试工具我们不难发现其实是`iframe`里面内嵌的网页中的`body`有个默认`margin`值，而我们此时的`iframe`框架高度=`iframe`内容高度，当然会有滚动条出现，只要我们将默认的`margin`值更改为0，滚动条就会消失。
