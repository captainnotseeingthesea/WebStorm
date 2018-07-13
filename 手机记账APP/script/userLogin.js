var site_url="http://192.168.199.109:8088/WebDemo";
function base_ajax(url,data,success_func){
    mui.ajax(url,{
        data:data,
        dataType:"json",
        type:"post",
        timeout:10000,//超时事件设置为10s
        success:function (data) {//成功返回
            success_func(data);
            mui.toast(data.errmsg);
        },
        error:function (xhr,type,errorThrown) {
            mui.toast("失败"+type+" "+xhr.status);
        }
    })
}