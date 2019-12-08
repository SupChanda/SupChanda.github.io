class Tooltip {

  constructor() {
    //----------------------------------------
    // tooltip
    //----------------------------------------
    this.tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#FFFFFF")
      .attr('id', 'tooltip')
      .classed('tooltipDiv', true)
    ;
  };
  

  
  
  tooltip_html(d,optionSelected) {
	  //console.log('yes the tooltip is working',d[0],typeof(d[0]),optionSelected[0],typeof(optionSelected[0]))
	  let text =''
	  if (optionSelected == 'HDI'){
		  text += "<h2>HDI</h2>";
	  }else if (optionSelected == 'Population'){
		  text += "<h4>Population in millions</h4>";
	  }
    if ( optionSelected == 'HDI' || optionSelected =='Population'){
		text += "<ul>"
		text += "<li>" + d['Country_Code']+":\t\t"+d['2017']+"("+d.Country+")" + "</li>"
		text += "</ul>";
	}else{
		text += d[0]+":\t\t"+ optionSelected[0]
		
	}
    

    return text;
  }

  mouseover(d,optionSelected) {
	  //console.log('oh ya',optionSelected)
    this.tooltip
      .html(this.tooltip_html(d,optionSelected))
      .classed('tooltip-title', true)
    ;
    this.tooltip.style("visibility", "visible");
  }

  mousemove(d,optionSelected) {
	  //console.log('top ',d3.event.pageY)
    this.tooltip.style("top", (d3.event.pageY+6)+"px")
      .style("left",(d3.event.pageX+10)+"px");
  }

  mouseout(d) {
    this.tooltip.style("visibility", "hidden");
  }

};
