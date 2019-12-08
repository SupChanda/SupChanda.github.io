class Compare{
    constructor(){
	
	    let map = d3.select("#compareBlock").classed("compareBlock", true);
	
	};
    viewCompare(catagory,subcatagory,country1,country2){
		let tooltip = new Tooltip()
		console.log(catagory,subcatagory);
	    if (subcatagory!='None'){
		  d3.csv("data/"+subcatagory+".csv",function(d){
		       return d;
		  
		  }).then(function(data){
		  d3.select('#compareBlock').select('svg').remove();
		   let svg=d3.select('#compareBlock').append('svg').attr('width',1100).attr('height',600);
		   console.log(data);
		   let j=0
		   for (j=0;j<data.length;j++){
		       if (data[j]['Country_Code']==country1)
			   break;
		   }
		   let country1data=[];
		   country1data.push(data[j]);
		   console.log(country1data);
		   j=0
		   for (j=0;j<data.length;j++){
		       if (data[j]['Country_Code']==country2)
			   break;
		   }
		   let country2data=[];
		   country2data.push(data[j]);
		   console.log(country2data);
		   let yearListcountry1=[];
		   d3.keys(country1data[0]).forEach(function(d){
		      if (d.includes('Country')==false){
			    yearListcountry1.push(parseInt(d));  
			  }
		   
		   })
		   
		   let yearListcountry2=[];
		   d3.keys(country2data[0]).forEach(function(d){
		      if (d.includes('Country')==false){
			    yearListcountry2.push(parseInt(d));  
			  }
		   
		   })
		   
		   let yearValuecountry1=[]
		   d3.values(country1data[0]).forEach(function(d){
		       if (/[^a-zA-Z]+$/.test(d)==true){
			       yearValuecountry1.push(parseFloat(d));
			   
			   }
		   
		   })
		   
		   let yearValuecountry2=[]
		   d3.values(country2data[0]).forEach(function(d){
		       if (/[^a-zA-Z]+$/.test(d)==true){
			       yearValuecountry2.push(parseFloat(d));
			   
			   }
		   
		   })
		   console.log(yearListcountry1);
		   console.log(yearListcountry2);
		   console.log(yearValuecountry1);
		   console.log(yearValuecountry2);
		   let yscale = d3.scaleLinear().domain([0,1.2*d3.max([d3.max(yearValuecountry1),d3.max(yearValuecountry2)])]).range([500,0]);
		   let xscale = d3.scaleLinear().domain([d3.min(yearListcountry1),d3.max(yearListcountry1)]).range([0,900]);
		   let x_axis = d3.axisBottom().scale(xscale).tickFormat(d3.format("d"));
		   let y_axis = d3.axisLeft().scale(yscale);
		   svg.append('g').attr('transform','translate(152,550)').call(x_axis);
		   svg.append('g').attr('transform','translate(150,50)').call(y_axis);
		   
		   let line1 =d3.line()
		                .x(function(d,i) {
						    return xscale(yearListcountry1[i])+130;
						
						})
						.y(function(d,i){
						    return yscale(yearValuecountry1[i]);
						
						})
						.curve(d3.curveMonotoneX);
		
		    let line2 =d3.line()
		                .x(function(d,i) {
						    return xscale(yearListcountry2[i])+130;
						
						})
						.y(function(d,i){
						    return yscale(yearValuecountry2[i]);
						
						})
						.curve(d3.curveMonotoneX);
						
			svg.append('g')
			   .attr('transform','translate(30,50)')
			   .append("path")
			   .datum(yearListcountry1)
			   .attr("fill","none")
			   .attr("stroke","steelblue")
			   .attr("stroke-width",2)
			   .attr("d",line1)
			   ;
		   
			svg.append('g')
			.attr('transform','translate(30,0)')
			.selectAll("dot")
			.data(yearListcountry1)
			.enter().append("circle")
			.attr("r", 4)
			.attr('fill','black')
			.attr("cx", function(d,i) { return xscale(yearListcountry1[i])+130;  })
			.attr("cy", function(d,i) { return yscale(yearValuecountry1[i])+50; })	
			.on('mouseover',function(d,i){
				console.log('value of sub category',d)
				tooltip.mouseover([d], [yearValuecountry1[i]])
				tooltip.mousemove([d],[yearValuecountry1[i]])
			})
			.on('mouseout',function(d,i){
				tooltip.mouseout([d],[yearValuecountry1[i]])
			})
			
			
			svg.append('g')
			   .attr('transform','translate(30,50)')
			   .append("path")
			   .datum(yearListcountry2)
			   .attr("fill","none")
			   .attr("stroke","red")
			   .attr("stroke-width",2)
			   .attr("d",line2)
			   ;   
		   svg.append('g')
			.attr('transform','translate(30,0)')
			.selectAll("dot")
			.data(yearListcountry2)
			.enter().append("circle")
			.attr("r", 4)
			.attr('fill','black')
			.attr("cx", function(d,i) { return xscale(yearListcountry2[i])+130;  })
			.attr("cy", function(d,i) { return yscale(yearValuecountry2[i])+50; })	
			.on('mouseover',function(d,i){
				console.log('value of sub category2',d)
				tooltip.mouseover([d], [yearValuecountry2[i]])
				tooltip.mousemove([d],[yearValuecountry2[i]])
			})
			.on('mouseout',function(d,i){
				tooltip.mouseout([d],[yearValuecountry2[i]])
			})
			
		svg.append('text')
			.attr('transform','translate(600,40)')
			.style("text-anchor", "middle")
			.style('font-family', 'cursive')
			.style('font-size','25px')
			.text('Line Chart Comparison between '+ ' ' +country1 + ' and ' + country2);
		svg.append('text')
			.attr('transform','translate(600,600)')
			.style("text-anchor", "middle")
			.style('font-family', 'cursive')
			.style('font-size','18px')
			.text('YEAR');
			
		svg.append('text')
			.attr('transform','rotate(-90)')
			.attr('x',-280)
			.attr('y',90)
			.style("text-anchor", "middle")
			.style('font-family', 'cursive')
			.style('font-size','20px')
			.text(subcatagory + ' values');
			
			svg.append("circle").attr("cx",900).attr("cy",60).attr("r", 6).style("fill", "red")
			svg.append("circle").attr("cx",900).attr("cy",90).attr("r", 6).style("fill", "black")
			svg.append("text").attr("x", 920).attr("y", 63).text(country1).style("font-size", "15px").attr("alignment-baseline","middle")
			svg.append("text").attr("x", 920).attr("y", 93).text(country2).style("font-size", "15px").attr("alignment-baseline","middle")
		  });
		
		}
		else if (catagory!='None'){
		    d3.csv("data/"+catagory+".csv",function(d){
		       return d;
		  
		  }).then(function(data){
		  d3.select('#compareBlock').select('svg').remove();
		   let svg=d3.select('#compareBlock').append('svg').attr('width',1100).attr('height',600);
		   console.log(data);
		   let categoryNames1={'Education':['Schooling_Years','Govt_Expenditure','Adult_literacy_rate','Primary_teachers_trained','Primary_dropout'],
							'Environmental_Sustainability':['Carbon_emmisions','Fossil_consumption','forest_area','fresh_water_withdrawal','Renewable_energy_used'],
							'Gender':['Child_marriage','Gender_Development_Index','Gender_Inequality_Index','maternal_mortality_ratio','unemployment_rate'],
							'Inequality':['Education','Income','Life_expectancy','Adjusted_education','Loss_in_HDI'],
							'Work_Employment':['Child_labour','Unemployment_total','Youth_not_in_school','Unemployment_youth_rate','vulnerable_employment']};
		  
		    console.log('catagory',catagory)
			let subcatagories = categoryNames1[catagory];
			let countries = [country1,country2];
			console.log('subcatagories',subcatagories);
			let yscale = d3.scaleBand().domain(subcatagories).range([500,0]);
			let y_axis = d3.axisLeft().scale(yscale);
			
			let xscale = d3.scaleBand().domain(countries).range([0,800]);
			let x_axis = d3.axisBottom().scale(xscale);
			svg.append('g').style("font", "15px times").attr('transform','translate(203,50)').call(y_axis);
			svg.append('g').attr('transform','translate(204,550)').call(x_axis);
			
			let country1data=[];
			let j=0;
			for (j=0;j<data.length;j++){
		       if (data[j]['Country_Code']==country1)
			   break;
		   }
		   let year = 2017;
		   for (year=2017;year>=1990;year--)
		       if (data[j][year.toString()]!=='0.0' && typeof data[j][year.toString()] !=='undefined')
			    break;
			console.log(year);
		    country1data.push(parseFloat(data[j][year.toString()]));
			let tem=j+1
			for (j=tem;j<data.length;j++){
		       if (data[j]['Country_Code']==country1)
			   break;
		   }
			country1data.push(parseFloat(data[j][year.toString()]));
			tem=j+1
			for (j=tem;j<data.length;j++){
		       if (data[j]['Country_Code']==country1)
			   break;
		   }
			country1data.push(parseFloat(data[j][year.toString()]));
			tem=j+1
			for (j=tem;j<data.length;j++){
		       if (data[j]['Country_Code']==country1)
			   break;
		   }
			country1data.push(parseFloat(data[j][year.toString()]));
			tem=j+1
			for (j=tem;j<data.length;j++){
		       if (data[j]['Country_Code']==country1)
			   break;
		   }
			country1data.push(parseFloat(data[j][year.toString()]));
		  
		  let country2data=[];
			 j=0;
			for (j=0;j<data.length;j++){
		       if (data[j]['Country_Code']==country2)
			   break;
		   }
		   
		    country2data.push(parseFloat(data[j][year.toString()]));
			tem=j+1
			for (j=tem;j<data.length;j++){
		       if (data[j]['Country_Code']==country2)
			   break;
		   }
			country2data.push(parseFloat(data[j][year.toString()]));
			tem=j+1
			for (j=tem;j<data.length;j++){
		       if (data[j]['Country_Code']==country2)
			   break;
		   }
			country2data.push(parseFloat(data[j][year.toString()]));
			tem=j+1
			for (j=tem;j<data.length;j++){
		       if (data[j]['Country_Code']==country2)
			   break;
		   }
			country2data.push(parseFloat(data[j][year.toString()]));
			tem=j+1
			for (j=tem;j<data.length;j++){
		       if (data[j]['Country_Code']==country2)
			   break;
		   }
			country2data.push(parseFloat(data[j][year.toString()]));
		  
		  console.log(country1data);
		  console.log(country2data);
		  let total=[];
		  let l=0;
		    for (l=0;l<5;l++){
		     total.push(country2data[l]+country1data[l]);}
		  
		  
		  svg.append('g')
			   .attr('transform','translate(80,50)')
			   .selectAll('rect')
			   .data(country1data)
			   .enter()
			   .append('rect')
			   .attr('x' , function(d,i){
			   if (country1data[i]!==0)
			   return (1-(country1data[i]/total[i]))*xscale(countries[1]) +130;
			   else   
			   return (0.5*xscale(countries[1])) +130;
			   
			   })
			   .attr('y', (d,i)=>yscale(subcatagories[i])+50)
			   .attr('height', 10)
			   .attr('width',function(d,i){
			   if (country1data[i]!==0)
			   return ((country1data[i]/total[i]))*xscale(countries[1]);
			   else   return (0.5*xscale(countries[1]));
			   
			   })
			   .attr('fill','red')
			   .on('mouseover',function(d,i){
				console.log('value of sub category2',d)
				tooltip.mouseover([subcatagories[i]], [country1data[i]])
				tooltip.mousemove([subcatagories[i]],[country1data[i]])
				})
				.on('mouseout',function(d,i){
					tooltip.mouseout([subcatagories[i]],[country1data[i]])
				})
			   ;
		  svg.append('g')
			   .attr('transform','translate(80,50)')//50 to 80
			   .selectAll('rect')
			   .data(country2data)
			   .enter()
			   .append('rect')
			   .attr('x' , (d,i)=>xscale(countries[1])+5+130)
			   .attr('y', (d,i)=>yscale(subcatagories[i])+50)
			   .attr('height', 10)
			   .attr('width',function(d,i){
			   if (country2data[i]!==0)
			   return ((country2data[i]/total[i]))*xscale(countries[1]);
			   else   return (0.5*xscale(countries[1]));
			   
			   })
			   .attr('fill','green')
			   .on('mouseover',function(d,i){
				console.log('value of sub category2',d)
				tooltip.mouseover([subcatagories[i]], [country2data[i]])
				tooltip.mousemove([subcatagories[i]],[country2data[i]])
				})
				.on('mouseout',function(d,i){
					tooltip.mouseout([subcatagories[i]],[country2data[i]])
				})
			   ;
		  svg.append('text')
			.attr('transform','translate(600,25)')
			.style("text-anchor", "middle")
			.style('font-family', 'cursive')
			.style('font-size','18px')
			.text('Chart comparing '+ ' '+  catagory+ ' ' + 'between '+ ' '+ country1 +' ' + 'and '+ ' ' + country2+ ' for category: '+ catagory);
		 
	   svg.append('text')
			.attr('transform','translate(630,600)')
			.style("text-anchor", "middle")
			.style('font-family', 'cursive')
			.style('font-size','18px')
			.text('COUNTRY_CODE');
			
		svg.append('text')
			.attr('transform','rotate(-90)')
			.attr('x',-270)
			.attr('y',16)
			.style("text-anchor", "middle")
			.style('font-family', 'cursive')
			.style('font-size','20px')
			.text("SUB_CATEGORIES");
			
			svg.append("rect").attr("x",880).attr("y",57).attr("width", 30).attr('height',10).style("fill", "red")
			svg.append("rect").attr("x",880).attr("y",87).attr("width", 30).attr('height',10).style("fill", "green")
			svg.append("text").attr("x", 920).attr("y", 63).text(country1).style("font-size", "15px").attr("alignment-baseline","middle")
			svg.append("text").attr("x", 920).attr("y", 93).text(country2).style("font-size", "15px").attr("alignment-baseline","middle")
		  });
		
		
		
		
		}
		else{
		 d3.select('#compareBlock').selectAll('svg').remove();
		
		
		}
	
	
	
	
	}



}