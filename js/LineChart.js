class LineChart{
	constructor(){
		//d3.select("#LineChart").select('svg').remove();
		let lineChart = d3.select("#lineChart").classed("lineChart", true);
		
	};
	drawLineChart(alldata,country,subCategoryName){
		let tooltip = new Tooltip()
		console.log('alldata',alldata)
		//consol.log('country'country)
		//let year=[1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
		//d3.select("#LineChart").select('svg').remove();
		let j=0
		for (j=0;j<alldata.length;j++){
		 
		 if (alldata[j]['Country_Code']==country){
			 break
		 }
		 
	 }
     let data=[];
	 data.push(alldata[j]);
	 
	 let yearName= []
	 
	 ////console.log(data);	
	 let yearList=[]
	 d3.keys(data[0]).forEach(function(d){
		 ////console.log('dddddatatttt',typeof(d),d)
		 if(d.includes('Country')== false){
			 yearName.push(parseInt(d))
		}
	 })
	 let yearValue=[]
	 //console.log('yearName',yearName)
	 d3.values(data[0]).forEach(function(d){
		 if(/[^a-zA-Z]+$/.test(d)==true){
			 yearValue.push(parseFloat(d))
		 }
	 })
	 for(var i=0;i<yearName.length;i++){
		 let Name={}
		 Name[parseInt(yearName[i])]=parseInt(yearValue[i])
		 yearList.push(Name)
	 }
	 console.log('yearLIST',yearList)
	 console.log('yearValue',yearValue,d3.max(yearValue))
	 let yscale = d3.scaleLinear().domain([0,parseFloat(d3.max(yearValue))]).range([400,0])
	 let xscale = d3.scaleLinear().domain([parseInt(d3.min(yearName)),parseInt(d3.max(yearName))]).range([0,680])
	 var x_axis = d3.axisBottom()
                   .scale(xscale)
				   .tickFormat(d3.format("d"));
				   
     var y_axis = d3.axisLeft()
                   .scale(yscale);
	let lChart = d3.select('#LineChart')
					.append('svg')
					.attr('width',850)
					.attr('height',800)
					
	lChart.append('g').attr('transform','translate(130,490)').call(x_axis)
	lChart.append('g').attr('transform','translate(128,90)').call(y_axis)
	var line = d3.line()
				.x(function(d,i) { 
						//console.log('yearName1',yearName[i])
						return xscale(parseInt(yearName[i])); 
				}) // set the x values for the line generator
				.y(function(d,i) { 
						//console.log('yearValue1',yearValue[i])
						return yscale(parseFloat(yearValue[i])); }) // set the y values for the line generator 
				.curve(d3.curveMonotoneX) // apply smoothing to the line
	lChart
	.append('g')
	.attr('transform','translate(130,90)')
	.append("path")
    .datum(yearList)
    .attr("fill","none")	
	.attr("stroke","steelblue")
	.attr("stroke-width",2)
    .attr("d", line); // 11. Calls the line generator 
	let name = subCategoryName.split('_')
	let strName = name.join(' ')
	lChart.append('g')
		.attr('transform','translate(130,90)')
		.selectAll("dot")
        .data(yearList)
		.enter().append("circle")
        .attr("r", 4)
		.attr('fill','red')
        .attr("cx", function(d,i) { return xscale(parseInt(yearName[i]));  })
        .attr("cy", function(d,i) { return yscale(parseFloat(yearValue[i])); })
		.on('mouseover',function(d){
			console.log('value of sub category',d,d3.values(d))
			tooltip.mouseover(d3.keys(d),d3.values(d))
			tooltip.mousemove(d3.keys(d),d3.values(d))
		})
		.on('mouseout',function(d){
			tooltip.mouseout(d)
		})
	lChart.append('text')
			.attr('transform','translate(500,530)')
			.style("text-anchor", "middle")
			.style('font-family', 'cursive')
			.text("YEAR");
	lChart.append('text')
			.attr('transform','translate(450,40)')
			.style("text-anchor", "middle")
			.style('font-family', 'cursive')
			.style('font-size','25px')
			.text(strName);
	lChart.append('text')
			.attr('transform','rotate(-90)')
			.attr('x',-280)
			.attr('y',60)
			.style("text-anchor", "middle")
			.style('font-family', 'cursive')
			.style('font-size','15px')
			.text("HDI VALUE OF THE SUB_CATEGORY");
	};

}