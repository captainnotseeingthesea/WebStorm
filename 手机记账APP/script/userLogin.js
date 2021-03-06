var site_url="http://192.168.199.109:8088/WebDemo";
function base_ajax(url,data,success_func){
    mui('body').progressbar().show();
    mui.ajax(url,{
        data:data,
        dataType:"json",
        type:"post",
        timeout:10000,//超时事件设置为10s
        success:function (data) {//成功返回
            success_func(data);
            mui('body').progressbar().hide();
            if(data.errmsg!=null && data.errno!=null) {
                mui.toast(data.errmsg);
                /*errno为10代表会话超时，需重新登陆*/
                if(data.errno==10){
                    location.href="html/login.html";
                }
            }
        },
        error:function (xhr,type,errorThrown) {
            mui('body').progressbar().hide();
            mui.toast("失败"+type+" "+xhr.status);
        }
    })
}