class Map{



  constructor(data,selectedValue){
	
  
	
     let map = d3.select("#mapChart").classed("map", true);
	 //let showOptions = d3.select("#chooseOptions").classed("chooseOptions", true);
	 this.projection = d3.geoConicConformal().scale(150).translate([400, 350]);
     this.hdi=data;
	 this.selectedVal=selectedValue
	 
  };
	checkRadioButton(radioValue){
		//console.log('radioValue',radioValue)
	}
  showmap(world){
	////console.log('this.hdi',this.hdi,this.hdi.length)
		  
		  let data= this.hdi;
		  let optionSelected = this.selectedVal;
		  //console.log(optionSelected);
     this.path = d3.geoPath()
            .projection(this.projection);
    this.graticule = d3.geoGraticule();
 
  let nworld = topojson.feature(world, world.objects.countries);
  
  let tooltip = new Tooltip();
  let map = d3.select("#map").append('svg').attr('width',900).attr('height',600).attr("transform", "translate(" + 50 + ",0)").append('g');
        //draw the initial map
		
        let mapPath = map.selectAll("path")
            .data(nworld.features)
            .enter()
            .append("path")
            .attr("class", "countries")
            .attr("id", function (d,i) {
			    //console.log(d.id,i);
                return d.id;
            })
            
            .attr("d", this.path)
			
			.on('click',function (d){
				
				if (d3.select('#check').property("checked")){
					console.log("checked",d3.select('#check').property("checked"));
					let clas=d3.select(this).attr('class');
					console.log(clas);
					if (clas==='countryselected'){
					d3.select(this).attr('class','countries');	
				    d3.select('#compareBlock').select('svg').remove();
					d3.select('#donutChart').select('svg').remove();
					}
					else{
					d3.select(this).attr('class','countryselected');
					d3.select('#infopanel').select('svg').remove();
					let count=[];
					let c="";
					for (let j=0;j<data.length;j++){
					c= d3.select('#map').select('#'+data[j].Country_Code).attr('class');
					
					if (c=='countryselected'){
						console.log(data[j].Country_Code);
						count.push(data[j].Country_Code);
						
					}
					}
					if (count.length==2){
						
						let dChart = new donutChart()
						dChart.categoryName(count,1);
						
						
					}
					else if (count.length>2){
						let year=parseInt(d3.select('#yearname').select('.yearselecter').attr('cx'));
						
						year=(year-30)/30 + 1990
						////console.log(year);
						if(optionSelected=='HDI'){
							let color = d3.scaleLinear()
									  .domain([0,1])
									  .range([0,255]);
							for (let j=0;j<data.length;j++){
								////console.log(j,data[j]);
								if (data[j].Country_Code==d3.select(this).attr('id'))
								d3.select('#'+data[j].Country_Code)
								.attr('fill',"rgb(" +"0, " + color(parseFloat(data[j][year.toString()]))   + ",0 )")
								.attr('class','countries');
							
							
							}
							
						}else{
							let color = d3.scaleLinear()
									  .domain([0,1378])
									  .range([255,20]);
							////console.log('yes')
							for (let j=0;j<data.length;j++){
								////console.log(j,data[j]);
								if (data[j].Country_Code==d3.select(this).attr('id'))
								d3.select('#'+data[j].Country_Code)
								 .attr('fill',"rgb(" +" 255," + color(parseFloat(data[j][year.toString()]))  + ",0 )")
								 .attr('class','countries');
							
							
							}
							
						}	
						
					}
					
					}
				}
				else{
					let dChart = new donutChart()
						dChart.categoryName(d.id,0)
						//console.log(optionSelected)
						
						let year=parseInt(d3.select('#yearname').select('.yearselecter').attr('cx'));
						
						year=(year-30)/30 + 1990
						////console.log(year);
						if(optionSelected=='HDI'){
							let color = d3.scaleLinear()
									  .domain([0,1])
									  .range([0,255]);
							for (let j=0;j<data.length;j++){
								////console.log(j,data[j]);
								d3.select('#'+data[j].Country_Code)
								.attr('fill',"rgb(" +"0, " + color(parseFloat(data[j][year.toString()]))   + ",0 )")
								.attr('class','countries');
							
							
							}
							d3.select(this).attr('class','countryselected')
						}else{
							let color = d3.scaleLinear()
									  .domain([0,1378])
									  .range([255,20]);
							////console.log('yes')
							for (let j=0;j<data.length;j++){
								////console.log(j,data[j]);
								d3.select('#'+data[j].Country_Code)
								 .attr('fill',"rgb(" +" 255," + color(parseFloat(data[j][year.toString()]))  + ",0 )")
								 .attr('class','countries');
							
							
							}
							d3.select(this).attr('class','countryselected')
						}

						
						
						let infopanel = new Infopanel();
						infopanel.viewinfo(data,d.id);
						// let lchart = new LineChart()
						// lchart.drawLineChart(' ',' ')
						d3.select('#LineChart').select('svg').remove();
				}
					
					
						
							
				
				
				
			})
			.on('mouseover',function(d){
				////console.log('on mousover',d.id,'this.hdi',data)
				let c_code = d
				let tempYr=[]
				for(var i=0;i<data.length;i++){
					////console.log('first dataa',data[i],data[i]['Country_Code'],data[i]['2017'])
					tempYr.push({'Country_Code': data[i]['Country_Code'],'2017':data[i]['2017'],'Country':data[i]['Country']})
				}
				////console.log('tempYr',tempYr)
				tempYr.forEach(function(d){
					////console.log('yyy',d)
					////console.log('c_code',c_code)
					if (c_code.id == d.Country_Code){
						////console.log('c_code',c_code.id)
						tooltip.mouseover(d,optionSelected)
						tooltip.mousemove(d,optionSelected)
					}
					
				})
			})
			.on('mouseout',function(d){
				tooltip.mouseout(d)
			})
			;
   	
	 let graticulePath = map.append("path")
            .datum(this.graticule)
            .attr("class", "grat")
            .attr("d", this.path)
            .attr("fill", "none");
	
	this.changecolor(27,optionSelected);
  
  
    ////console.log('data',data)
    let yearchar= d3.select("#year").append('svg').attr('width',930).attr('height',100).attr("transform", "translate(" + 50 + ",0)");
	let year=[1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
	yearchar = yearchar.append('g').attr('id','yearname').selectAll('circle').data(year)
	                   .enter()
					   .append('circle')
					   .attr('id',function(d,i){
						   ////console.log('yearffffff',d,typeof(d))
						   
						   return 'year'+ d.toString()
					    })
					   .attr('cx',(d,i)=>i*30+30)
					   .attr('cy',40)
					   .attr('r',6)
					   .attr('fill','red')
					   .attr('class','none')
					   .on('click',function(d,i){
						   d3.select("#infopanel").select('svg').remove();
						   d3.select('#textCategories').select('svg').remove();
						   d3.select('#donutChart').select('svg').remove()
						   d3.select('#LineChart').select('svg').remove()
						   d3.select("#compareBlock").select('svg').remove();
						   ////console.log('year is coming fine: ',yrSel)
						   d3.selectAll('circle').attr('class','none').attr('fill','red');
						   ////console.log('d3 select',d3.select(this),d,typeof(d))
						   
							d3.select("#year"+ d).attr('class','yearselecter').attr('r',10)
							let yearList=[1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
						   for(var k=0;k<yearList.length;k++){
							   if(d != yearList[k]){
								   //console.log('year not clicked: ',yearList[k])
								   d3.select("#year"+ yearList[k].toString()).attr('r',6).attr('fill','red')
							   }
						   }
							//console.log('yess I have selected i value: ',i)
							let year=1990+i;
							cons
							if (optionSelected=='HDI'){
								
							let color = d3.scaleLinear()
							  .domain([0,1])
							.range([0,255]);
							for (let j=0;j<data.length;j++){
								 
								////console.log(j,data[j].Country_Code,color(parseFloat(data[j][year.toString()])));
								d3.select('#'+data[j].Country_Code)
								
								.attr('fill',"rgb(" +"0, " + color(parseFloat(data[j][year.toString()]))   + ",0 )");
							}
							
							}
							else{
								let color = d3.scaleLinear()
							  .domain([0,1378])
							  .range([255,20]);
							  for (let j=0;j<data.length;j++){
								 
								////console.log(j,data[j].Country_Code,color(parseFloat(data[j][year.toString()])));
								d3.select('#'+data[j].Country_Code)
								
								.attr('fill',"rgb(" +"255, " + color(parseFloat(data[j][year.toString()]))   + ",0 )");
							  }
							}
						   
						   
					   })
					   ;
	d3.select('#year2017').attr('class','yearselecter').attr('r',10)
	let selectedyear=[1990,1993,1996,1999,2002,2005,2008,2011,2014,2017]
	let yeartext = d3.select("#year").select('svg').append('g').selectAll('text').data(selectedyear)
	                   .enter()
					   .append('text')
					   .attr('x',(d,i)=>i*90+15)
					   .attr('y',70)
					   .attr('r',4)
					   
					   .text((d,i)=>selectedyear[i])
					   ;
	
	// let button = d3.select("#year").select('svg').append('g').selectAll('rect').data([1567])
	                   // .enter()
					   // .append('rect')
					   // .attr('id',"button")
					   // .attr('x',870)
					   // .attr('y',30)
					   // .attr('height',20)
					   // .attr('width',100)
					   // .attr("xlink:href", d=>"data/flags-mini/NEXT.png")
					   // //.attr('fill','yellow')
					   // .on('click', d=>this.video())
					   let next ='next'
	   let button2 = d3.select("#year").select('svg').append('g').append('image')
						.attr('x', 880)
						.attr('y', -10)
						.attr("xlink:href", d=>"data/flags-mini/" +next.toLowerCase() + ".png")
						.attr("width", 40)
                        .attr("height", 100)
						.on('click', d=>this.video())
		;
	
	// let buttontext = d3.select("#year").select('svg').selectAll('line').append('g').data([1567])
	                   // .enter()
					   // .append('text')
					   // .attr('x',880)
					   // .attr('y',45)
					   
					   
					   // .text("Next")
					   // ;
  };
  
	changecolor(i,optionSelected){
		//console.log(optionSelected,i)
		  ////console.log('iiiii',i)
		d3.select('#yearname').selectAll('circle').attr('class','None');
		
		let year=1990+i;
		let data = this.hdi
			if (optionSelected == 'HDI'){
				let color = d3.scaleLinear()
							  .domain([0,1])
							  .range([0,255]);
				for (let j=0;j<this.hdi.length;j++){
				 
				////console.log(j,this.hdi[j].Country_Code,color(parseFloat(this.hdi[j][year.toString()])));
				d3.select('#'+this.hdi[j].Country_Code)
				.transition()
				.delay(100)
				.duration(100)
				.attr('fill',"rgb(" +"0, " + color(parseFloat(this.hdi[j][year.toString()]))   + ",0 )");
			
			
				}
			}else{
				let color = d3.scaleLinear()
							  .domain([0,1378])
							  .range([255,20]);
				for (let j=0;j<this.hdi.length;j++){
					 
					////console.log(j,'tttttttt',color(parseInt(this.hdi[j][year.toString()])));
					d3.select('#'+this.hdi[j].Country_Code)
					.transition()
					.delay(100)
					.duration(100)
					.attr('fill',"rgb(" +"255, " + color(parseInt(this.hdi[j][year.toString()]))   + ",0 )");
				
				
				}
			}
    
	};
  
   video(){
	   d3.select("#infopanel").select('svg').remove()
	   d3.select('#textCategories').select('svg').remove();
	   d3.select('#donutChart').select('svg').remove();
	   d3.select("#compareBlock").select('svg').remove();
	   
    let year=parseInt(d3.select('#yearname').select('.yearselecter').attr('cx'));
	d3.select('#yearname').selectAll('circle').attr('class','none').attr('fill','red');
	year=(year-30)/30 + 1990 +1;
	    
    if (year==2018){
		year=1990
	}
	//console.log('year clicked in video',year);
							//d3.selectAll('circle').attr('class','none').attr('fill','red');
						   ////console.log('d3 select',d3.select(this),d,typeof(d))
						   
	d3.select("#year"+ year.toString()).attr('r',10).attr('fill','green')
	let yearList=[1990,1991,1992,1993,1994,1995,1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017];
    for(var k=0;k<yearList.length;k++){
	   if(year != yearList[k]){
		   //console.log('year not clicked: ',yearList[k])
		   d3.select("#year"+ yearList[k].toString()).attr('r',6).attr('fill','red')
	   }
    }
	if (this.selectedVal=='HDI'){
	let color = d3.scaleLinear()
							  .domain([0,1])
							  .range([0,255]);
	
	for (let j=0;j<this.hdi.length;j++){
					 
					////console.log(j,data[j]);
					d3.select('#'+this.hdi[j].Country_Code)
						.attr('fill',"rgb(" +"0, " + color(parseFloat(this.hdi[j][year.toString()]))   + ",0 )")
						.attr('class','countries');
					
					
				}	
	}
	else{
		let color = d3.scaleLinear()
							  .domain([0,1378])
							  .range([255,20]);
	
	for (let j=0;j<this.hdi.length;j++){
					 
					////console.log(j,data[j]);
					d3.select('#'+this.hdi[j].Country_Code)
						.attr('fill',"rgb(" +"255, " + color(parseFloat(this.hdi[j][year.toString()]))   + ",0 )")
						.attr('class','countries');
					
					
				}
		
	}
	
    d3.select('#year'+year).attr('class','yearselecter')
  };
  
  


}
