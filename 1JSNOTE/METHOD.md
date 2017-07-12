# JS Method

### TimePicker

[My97 DatePicker](http://www.my97.net/dp/down.asp?wkvoxu=000mw1)

### get url-params

```$xslt
        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
            var r = window.location.search.substr(1).match(reg);
            if (r!=null) return (r[2]); return null;
        }
```
