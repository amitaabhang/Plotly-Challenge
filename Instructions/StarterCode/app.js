
var namesArr = []
function init() {
  
    console.log("In Init function")

    d3.json("samples.json").then((sampleData)=> {
       
        namesArr = sampleData.names
        console.log(namesArr)

        namesArr.forEach(function(name){

            d3.select("#selDataset")
            .append("Option")
            .text(name)
            .property("value");


        })

        showDemographicInfo(namesArr[0])

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

function optionChanged(name){

    showDemographicInfo(name)
};