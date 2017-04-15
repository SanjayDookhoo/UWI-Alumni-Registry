var headers = ["H1","H2","H3","H4","H5","H6"];

$(".accordion").click(function(e) {
  var target = e.target,
      name = target.nodeName.toUpperCase();

  if($.inArray(name,headers) > -1) {
    var subItem = $(target).next();

    //slideUp all elements (except target) at current depth or greater
    var depth = $(subItem).parents().length;
    var allAtDepth = $(".accordion p, .accordion div").filter(function() {
      if($(this).parents().length >= depth && this !== subItem.get(0)) {
        return true;
      }
    });
    $(allAtDepth).slideUp("fast");

    //slideToggle target content and adjust bottom border if necessary
    subItem.slideToggle("fast",function() {
        $(".accordion :visible:last").css("border-radius","0 0 10px 10px");
    });
    $(target).css({"border-bottom-right-radius":"0", "border-bottom-left-radius":"0"});
  }
});

function createChartGeneral(){
  var get=$("#general-view").val();
  var filter1=$("#general-filter").val();
  var filter2=$("#general-filter-value").val();
  var filter3=$("#general-filter-time-start").val();
  var filter4=$("#general-filter-time-end").val();


  //get data from mongodb
  var dataG;
  $.ajax({
        type: "GET",
        url: '/query',
        data: {"get" : get,"filter1" : filter1,"filter2" : filter2,"filter3" : filter3, "filter4":filter4},
        //contentType: "application/json; charset=utf-8",
        contentType: "text/plain",
        dataType: 'JSON',
        success: successFunc,
        error: errorFunc
    });

    function successFunc(data, status) {
        //$("#dictionaryDropDown").html(data);
        dataG=data;
        console.log(data);
    }

    function errorFunc() {
        console.log("error");
    }

  $(function () {
      var chart = new Highcharts.Chart({
          chart: {
              renderTo: 'container',
              type: 'column'
          },
          title: {
            text: 'General Chart'
          },
          xAxis: {
              //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
          },

          plotOptions: {
              series: {
                  cursor: 'pointer',
                  point: {
                      events: {
                          /*click: function() {
                              for (var i = 0; i < this.series.data.length; i++) {
                                  this.series.data[i].update({ color: '#ECB631' }, true, false);
                              }
                              this.update({ color: '#f00' }, true, false)
                          }*/
                      }
                  }
              }
          },

          series: [{
              //data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
              data: [[0,29.9], [1,29.9], [2,29.9], [3,29.9], [4,29.9], [5,29.9], [6,40] ]
          }]
      });
  });
}
function createChartEducation(){

}
function createChartOccupation(){

}
function createHeatMap(){

}