
  function tableCreator(e, t) {
    function i(e, t) {
        var n = "";
        var r = "";
        var s = "";
        $.each(t[0], function(e, t) {
            s += "<th>" + e + "</th>"
        });
        $.each(t, function(e, t) {
            r += "<tr>";
            $.each(t, function(e, t) {
                var n = 1 + Math.floor(Math.random() * 90 + 10);
                var s = $.isPlainObject(t);
                var o = [];
                if (s) {
                    o = $.makeArray(t)
                }
                if ($.isArray(t) && t.length > 0) {
                    r += "<td><div><a href='#" + n + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + n + "' class='panel-collapse collapse'>" + i(e, t) + "</div></div></td>"
                } else {
                    if (o.length > 0) {
                        r += "<td><div><a href='#" + n + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + n + "' class='panel-collapse collapse'>" + i(e, o) + "</div></div></td>"
                    } else {
                        r += "<td>" + t + "</td>"
                    }
                }
            });
            r += "</tr>"
        });
        n += "<table class='table table-bordered table-hover table-condensed'><thead>" + s + "</thead><tbody>" + r + "</tbody></table>";
        return n
    }
    $(t).empty();
    $(t).append("<table id='parentTable' class='table table-bordered table-hover table-condensed'><thead></thead><tbody></tbody></table>");
    var n = "";
    var r = "";
    $.each(e, function(e, t) {
        n += "<th>" + e + "</th>";
        var s = 1 + Math.floor(Math.random() * 90 + 10);
        var o = $.isPlainObject(t);
        var u = [];
        if (o) {
            u = $.makeArray(t)
        }
        if ($.isArray(t) && t.length > 0) {
            r += "<td><div id='accordion'><a href='#" + s + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + s + "' class='panel-collapse collapse'>" + i(e, t) + "</div></div></td>"
        } else {
            if (u.length > 0) {
                r += "<td><div id='accordion'><a href='#" + s + "' data-toggle='collapse' data-parent='#msgReport'><span class='glyphicon glyphicon-plus'></span></a><div id='" + s + "' class='panel-collapse collapse'>" + i(e, u) + "</div></div></td>"
            } else {
                r += "<td>" + t + "</td>"
            }
        }
    });
    $("#parentTable thead").append("<tr>" + n + "</tr>");
    $("#parentTable tbody").append("<tr>" + r + "</tr>");
    $(".glyphicon ").on("click", function() {
        var e = $(this).attr("class");
        switch (e) {
            case "glyphicon glyphicon-plus":
                $(this).removeClass("glyphicon-plus").addClass("glyphicon-minus");
                break;
            case "glyphicon glyphicon-minus":
                $(this).removeClass("glyphicon-minus").addClass("glyphicon-plus");
                break;
            default:
        }
    })
}


var divSelector = '#tableDynamic'
var jsonStr = { "id": "0001", "type": "donut", "name": "Cake", "ppu": 0.55, "batters": { "batter": [{ "id": "1001", "type": "Regular" }, { "id": "1002", "type": "Chocolate" }, { "id": "1003", "type": "Blueberry" }, { "id": "1004", "type": "Devil's Food" }] }, "topping": [{ "id": "5001", "type": "None" }, { "id": "5002", "type": "Glazed" }, { "id": "5005", "type": "Sugar" }, { "id": "5007", "type": "Powdered Sugar" }, { "id": "5006", "type": "Chocolate with Sprinkles" }, { "id": "5003", "type": "Chocolate" }, { "id": "5004", "type": "Maple" }] };

var jsonStr =[{
"email": "twhite0@trellian.com",
"firstName": "Terry",
"lastName": "White",
"gender": "Male",
"age": 40,
"address": "0194 Upham Trail",
"occupations": [
{
"jobTitle": "Geologist IV",
"companyName": "Topicblab",
"occupationStart": "12/20/2016",
"occupationEnd": "3/13/2016",
"address": "7 Moland Lane"
},{
"jobTitle": "Geologist IV",
"companyName": "Topicblab",
"occupationStart": "12/20/2016",
"occupationEnd": "3/13/2016",
"address": "7 Moland Lane"
}
],
"education": [
{
"educationType": "parallelism",
"date": "12/15/2016"
}
]
}];

tableCreator(  jsonStr,divSelector )
