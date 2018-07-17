/*初始化图表元素*/
window.onload=function(){
    display_all();//显示全部交易情况统计
    mui("#footer_nav").on("tap","#all_record",function () {
        display_all();
    });
    mui("#footer_nav").on("tap","#income_record",function () {
        display_income();
    });
    mui("#footer_nav").on("tap","#payment_record",function () {
        display_payment();
    });
};
/*首页的全部交易信息的显示*/
var display_all=function(){
    var query={
        query:0//查询全部的交易
    };
    base_ajax(site_url+"/servlet.itemServlet/DisplayItems",query,function (data) {
        var pieChart=echarts.init(byId("pieChart_all"));
        var paymentMoney = 0;//支出金额为0
        var incomeMoney = 0;//收入金额为0
        var legend=["支出","收入"];
        var title="全部交易情况统计";
        var name='总情况统计';
        var data_money;
        for (var i = 0; i < data.length; i++) {
            if (data[i]["query"] == 0) {
                incomeMoney += data[i]["money"];
            } else {
                paymentMoney += data[i]["money"];
            }
        }
        data_money=[
            {value: paymentMoney, name: '支出', selected: true},
            {value: incomeMoney, name: '收入'},
        ];
        pieChart.setOption(getOption(title,name,legend,data_money),true);
    });
};
/*显示收入记录*/
var display_income=function(){
  var query={
      query:1//查询收入记录
  };
  base_ajax(site_url+"/servlet.itemServlet/DisplayItems",query,function (data) {

      var pieChart=echarts.init(byId("pieChart_income"));
      var title = "收入记录统计";
      var name='收入记录统计';
      var legendName = new Array();
      var money = new Object();
      var data_money=new Array();
      for (var i = 0; i < data.length; i++) {//获取全部收入种类，为去重
          legendName.push(data[i]["className"]);
      }
      legendName = legendName.distinct();//去重，收入种类名称
      for(var i=0;i<legendName.length;i++){//初始化全部的属性
          money[legendName[i]]=0;
      }
      for(var i=0;i<data.length;i++){
          money[data[i]["className"]]+=data[i]["money"];
      }
      for (var i = 0; i < legendName.length; i++){
          var money_item={
              name:legendName[i],
              value:money[legendName[i]]
          };
          data_money.push(money_item);
      }
      pieChart.setOption(getOption(title,name,legendName,data_money));
  });
};
/*显示支出记录*/
var display_payment=function () {
    var query={
        query:2//查询支出记录
    };
    base_ajax(site_url+"/servlet.itemServlet/DisplayItems",query,function (data) {

        var pieChart=echarts.init(byId("pieChart_payment"));
        var title = "支出记录统计";
        var name='支出记录统计';
        var legendName = new Array();
        var money = new Object();
        var data_money=new Array();
        for (var i = 0; i < data.length; i++) {//获取全部支出种类，为去重
            legendName.push(data[i]["className"]);
        }
        legendName = legendName.distinct();//去重，支出种类名称
        for(var i=0;i<legendName.length;i++){//初始化全部的属性
            money[legendName[i]]=0;
        }
        for(var i=0;i<data.length;i++){
            money[data[i]["className"]]+=data[i]["money"];
        }
        for (var i = 0; i < legendName.length; i++){
            var money_item={
                name:legendName[i],
                value:money[legendName[i]]
            };
            data_money.push(money_item);
        }
        pieChart.setOption(getOption(title,name,legendName,data_money));
    });
};
/*由id获取dom元素*/
var byId = function(id) {
    return document.getElementById(id);
};
/*数组去重复*/
Array.prototype.distinct = function (){
    var arr = this,
        i,
        obj = {},
        result = [],
        len = arr.length;
    for(i = 0; i< arr.length; i++){
        if(!obj[arr[i]]){ //如果能查找到，证明数组元素重复了
            obj[arr[i]] = 1;
            result.push(arr[i]);
        }
    }
    return result;
};
/*显示相应的图表*/
var  getOption= function(title,name,legend,data_money){
    //利用三目判断根据图形的样式选取不同类型的数据，bar和line的数据格式相同，pie格式与前两者不同

        var chartOption = {
            title: {
                text: title,
                left: "center"
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                type: "scroll",

                left: "center",
                bottom: 10,
                data: legend
            },
            series: [
                {
                    name: name,
                    type: 'pie',
                    selectedMode: 'single',
                    radius: [0, '30%'],

                    label: {
                        normal: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}\n{hr|}\n  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 12,
                                    lineHeight: 25,
                                    align: 'center'
                                },
                                per: {
                                    borderRadius: 2,
                                    align:"center"
                                }
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data: data_money
                }
            ]
        };
        return chartOption;
};