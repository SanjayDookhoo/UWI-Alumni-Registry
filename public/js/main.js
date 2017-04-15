

/*remove before*/
function barGraph(){
  console.log("bar");
  var choice=$('input[name=choice]:checked').val();
  var gender=$('input[name=gender]').val();
  var from=$('input[name=from]').val();
  var to=$('input[name=to]').val();
  var jobTitle=$('input[name=jobTitle]').val();
  var companyName=$('input[name=companyName]').val();

  console.log(choice);
  console.log(gender);
  console.log(from);
  console.log(to);
  console.log(jobTitle);
  console.log(companyName);

  //format data to send as params
  /*
  where
    lte
    gte
    is
  select

  */

  var params={
    "where": {
      "is":{

      },
      "lte":{

      },
      "gte":{

      }
    }
  }
  if(gender!=""){
    params["where"]["is"]["gender"]=gender;
  }
  if(jobTitle!=""){
    params["where"]["is"]["jobTitle"]=jobTitle;
  }
  if(companyName!=""){
    params["where"]["is"]["companyName"]=companyName;
  }
  if(from!="" && to!=""){
    params["where"]["gte"]["age"]=from;
    params["where"]["lte"]["age"]=to;
  }
  console.log(params);

  $.ajax({
    url: "http://localhost:8080/query",
    type: "get", //send it through get method
    data: params,
    success: function(response) {
      //Do Something
      console.log(JSON.parse(response));
      //console.log(response);

      var data2=JSON.parse(response);

      var vlSpec = {
      "data": {
        "values": data2},
      "transform": {
        //"calculate": [{"field": "gender", "expr": "datum.gender == \"Female\" ? \"Female\" : \"Male\""}]
      },
      "mark": "bar",
      "encoding": {
        "column": {
          "field": choice, "type": "ordinal",
          "scale": {"padding": 4},
          "axis": {"orient": "bottom", "axisWidth": 1, "offset": -8}
        },
        "y": {
          "aggregate": "sum", "field": "count", "type": "quantitative",
          "axis": {"title": "Count", "grid": false}
        },
        "x": {
          //"field": "gender", "type": "nominal",
          "scale": {"bandSize": 6},
          "axis": false
        },
        "color": {
          //"field": "gender", "type": "nominal",
          "scale": {"range": ["#EA98D2", "#659CCA"]}
        }
      },
      "config": {"facet": {"cell": {"strokeWidth": 0}}}
      };

      var embedSpec = {
        mode: "vega-lite",  // Instruct Vega-Embed to use the Vega-Lite compiler
        spec: vlSpec
        // You can add more vega-embed configuration properties here.
        // See https://github.com/vega/vega/wiki/Embed-Vega-Web-Components#configuration-propeties for more information.
      };

      // Embed the visualization in the container with id `vis`
      vg.embed("#vis", embedSpec, function(error, result) {
        // Callback receiving the View instance and parsed Vega spec
        // result.view is the View, which resides under the '#vis' element
      });
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });
}

function lineGraph(){
  console.log("line");

  $.ajax({
    url: "https://vega.github.io/vega-editor/app/data/stocks.csv",
    type: "get", //send it through get method
    success: function(response) {
      //Do Something
      console.log(response);
      //console.log(response);


      var vlSpec = {
        "description": "Google's stock price over time.",
        "data": {"url": "https://vega.github.io/vega-editor/app/data/stocks.csv", "format": {"type": "csv"}},
        "transform": {"filter": "datum.symbol==='GOOG'"},
        "mark": "line",
        "encoding": {
          "x": {"field": "date", "type": "temporal"},
          "y": {"field": "price", "type": "quantitative","axis": {"title":"Students"}}
        }
      }


      var embedSpec = {
        mode: "vega-lite",  // Instruct Vega-Embed to use the Vega-Lite compiler
        spec: vlSpec
        // You can add more vega-embed configuration properties here.
        // See https://github.com/vega/vega/wiki/Embed-Vega-Web-Components#configuration-propeties for more information.
      };

      // Embed the visualization in the container with id `vis`
      vg.embed("#vis", embedSpec, function(error, result) {
        // Callback receiving the View instance and parsed Vega spec
        // result.view is the View, which resides under the '#vis' element
      });
    },
    error: function(xhr) {
      //Do Something to handle error
    }
  });
}
