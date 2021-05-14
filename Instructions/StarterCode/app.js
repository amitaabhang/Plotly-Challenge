
var namesArr = []
function init() {
  
    console.log("In Init function")

    d3.json("samples.json").then((sampleData)=> {
       
        namesArr = sampleData.names
        //console.log(namesArr)

        namesArr.forEach(function(name){

            d3.select("#selDataset")
            .append("Option")
            .text(name)
            .property("value");


        })

        showDemographicInfo(namesArr[0])
        plotData(namesArr[0])

    });
   
};

init();


function showDemographicInfo(name)
{
    var demoInfoPanel = d3.select("#sample-metadata");
    demoInfoPanel.html("");

    d3.json("samples.json").then((sampleData)=> {
       
        metadataArr = sampleData.metadata
        console.log(metadataArr)
        console.log(name)


        var demoInfo = metadataArr.filter(function(meta){
             return (meta.id == parseInt(name))
        });

        console.log(demoInfo)

        Object.entries(demoInfo[0]).forEach(([key, value]) => {
            console.log(`${key} ${value}`); 
            demoInfoPanel.append("p").text(key.toUpperCase() + ":" + value);
          });

   });


}


function plotData(name)
{

    console.log("In Plot function")

    //var barPanel = d3.select("#bar");

    d3.json("samples.json").then((sampleData)=> {

        sampleArr = sampleData.samples
        console.log(sampleArr)

        var sampleValues = [];
        var otuIdValues = [];
        var otuLabels = [];
      

         var sampleInfo = sampleData.samples.filter(function(sample){
             return (sample.id == parseInt(name))
        });

        //console.log(`Sample Array: ${sampleInfo}`)
    
        Object.entries(sampleInfo[0]).forEach(([key, value]) => {
         if(key == "sample_values")
         {
            sampleValues =  value.slice(0, 10)
        }
         else if(key == "otu_ids")
         {
             otuIdValues =  value
             newOtuIdValues = otuIdValues.map( id => "OTU "+ id).slice(0, 10)
         }
         else(key == "otu_labels")
         {
             otuLabels = value.slice(0, 10)
         }

       });

        var wfreq = sampleData.metadata.filter(f => f.id.toString() === name)[0];
        wfreq = wfreq.wfreq;
        console.log("Washing Freq: " + wfreq);
       
         //console.log(sampleValues)
         //console.log(otuIdValues)
         //console.log(otuLabels)

        
         var trace1 = {
            x: sampleValues.reverse(),
            y: newOtuIdValues.reverse(),
            type: "bar",
            text: otuLabels,
            marker: {
              color: 'Blue'},
            orientation: "h",
          };

         var data = [trace1];

          Plotly.newPlot("bar", data);



          var trace2 = {
            x: otuIdValues,
            y: sampleValues,
            mode: "markers",
            text: otuLabels,
            marker: {
                size: sampleValues,
                color: otuIdValues
            }
          };

        var layout = {
            xaxis:{title: "OTU ID"}
         
        };

        var data2 = [trace2];

        Plotly.newPlot("bubble", data2, layout);

        var wfreq = sampleData.metadata.filter(f => f.id.toString() === name)[0];
        wfreq = wfreq.wfreq;
        console.log("Washing Freq: " + wfreq);

        var chart = [
            {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: {text: `Belly Button Washing Frequency`},
            type: "indicator",
            
            mode: "gauge+number",
            
            gauge: { axis: { range: [null, 9] },
                     steps: [
                      {range: [0, 1], color: "LightCyan"},
                      {range: [1, 2], color:"LightCyan"},
                      {range: [2, 3], color: "MediumTurquoise"},
                      {range: [3, 4], color: "MediumTurquoise"},
                      {range: [4, 5], color: "MediumTurquoise"},
                      {range: [5, 6], color: "MediumTurquoise"},
                      {range: [6, 7], color: "MediumTurquoise"},
                      {range: [7, 8], color: "Turquoise"},
                      {range: [8, 9], color: "Turquoise"}
                    ]}
                
            }
          ];
       


        var layout_chart = { 
             
              margin: { t: 20, b: 40, l:100, r:100 } 
            };

            Plotly.newPlot("gauge", chart, layout_chart);
   });

}


function optionChanged(name){

    showDemographicInfo(name)
    plotData(name)
};