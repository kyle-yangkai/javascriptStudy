熟悉html的都知道可以采用url链接的方式，直接通过网页拨打电话和发送短信，但是在ios设备和andriod设备中发送短信的代码却不一样，一下我们探究如何识别设备并自动适配相应的代码。
```
<a href="tel:10086" >拨打电话</a>
<br>
<a id="send">发送短信</a>
<script src="//cdn.bootcss.com/jquery/2.1.4/jquery.min.js"> </script>
<script type="text/javascript">
  $(document).ready(function(e) {
    var u = navigator.userAgent;
    /**创建isAndroid 和isIos保存设备类型判断值**/
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //匹配android设备
    var isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //匹配ios设备
    //判断所使用的设备是android设备还是ios设备
    if(isAndroid == true){
      $("#send").attr("href","sms:10086?body=发送内容");
    }
    else if(isIos == true){
      $("#send").attr("href","sms:10086&body=发送内容");
    }
  });
</script>
```
通过以上代码实现了我们的需求。

**注意：**以上发送短信的代码在ios设备上的UC浏览器不适用，会出现错误，有兴趣的可以自行尝试。
