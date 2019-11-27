function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
    // Use d3 to select the panel with id of `#sample-metadata`
  const url = "/metadata/" + sample;
  let selector = d3.select("#sample_metadata");
  selector.html("");
  d3.json(url).then((metadata) => {
    Object.entries(metadata).forEach(([key, value]) =>{
      selector.append("h6")
      .text(key + ": " + value);
    });
  });
    // Use `.html("") to clear any existing metadata






    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
Object.defineProperties(sampleData).forEach(function([key, value]){
  var row = sample_metadata.append("panel");
  row.text('${key}: ${value}');
})
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);cd


function buildCharts(sample) {
  const url = "/samples/" + sample;
  d3.jason(url).then((samples) => {
    let otu_ids = samples["otu_ids"];
    let sample_values = samples["sample_values"];
    let otu_labels = samples["otu_labels"];

    let trace1 = {
      labes: otu_ids,
      values: sample_values,
      type: "pie"
    };

    let pie_data = [trace1];
    Plotly.newPlot("pie", pie_data);

    let trace2 =  {
      x:otu_ids,
      y: sample_values,
      size: sample_values,
      text: ptu_labels,
      mode: "markers",
      markers: {
        size: sample_values,
        opacity: 0.5,
        color: otu_ids
      }
    };

      let bubble_data = [trace2];
      Ploty.newPlot("bubble", bubble_data)
    });
  };
}

  // @TODO: Use `d3.json` to fetch the sample data for the plots

    // @TODO: Build a Bubble Chart using the sample data

    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
