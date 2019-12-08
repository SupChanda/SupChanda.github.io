class donutChart{
	constructor(){
		let donutChart = d3.select("#donutChart").classed("donutChart", true);
	};
	
	categoryName(countryName,checked){
		d3.select('#LineChart').select('svg').remove();
		d3.select('#donutChart').select('svg').remove();
		d3.select('#textCategories').select('svg').remove();
		d3.select('#compareBlock').select('svg').remove();
		let categoryNames={'Education':20,'Environmental_Sustainability':20,'Gender':20,'Inequality':20,'Work_Employment':20}
		let categoryKey=['Education','Environmental_Sustainability','Gender','Inequality','Work_Employment']
		let colorScale = d3.scaleOrdinal()
						.domain(categoryNames)
						.range(['#52FB16','#ffff00','#00aee7','#F816FB','#e94922'])
		let pie = d3.pie()
						.value(function(d){
							return d.value
						})
		let textSVG = d3.select('#textCategories')
						.append('svg')
						.attr('width',800)
						.attr('height',50)
						.append('g')
						.attr('transform','translate(10,33)')
						.selectAll('text')
						.data(['categories'])
						.enter()
						.append('text')
						.style('font-family', 'cursive')
					   .style('font-size','34px')
					   .text("Click a Category to see the sub categories: ")
					   .attr('class','comparePanel')
						
						
						
					
					
					
		let donutSVG = d3.select('#donutChart')
						.append('svg')
						.attr('width',900)
						.attr('height',600)
						
				let g = donutSVG.append('g')
						.attr('transform','translate(300,290)')
					
						
		let dataOfPie = pie(d3.entries(categoryNames))
		let arcPrevious = d3.arc()
						.innerRadius(160)
						.outerRadius(260)
						.cornerRadius(20);
						
		let arcOnMouseOver = d3.arc()
						  .innerRadius(140)
						.outerRadius(280)
						.cornerRadius(20);
						  
		
					g.selectAll('path')
							.data(dataOfPie)
							.enter()
							.append('path')
							.attr('id',function(d){
							return d.data.key
							})
							.attr('d',arcPrevious)
							.style('fill',function(d){
								//console.log('d',d)
								return colorScale(d.data.key)
							})
							
							.attr("stroke", "white")
						    .style("stroke-width", "2px")
						    .style("opacity", 0.8)
							.on('mouseover',function(d){
								//console.log('selectedValue',d.data.key)
									d3.select(this).transition()
									.duration(500)
									.attr('d',arcOnMouseOver)
									.style('opacity',0.8)
									.attr("stroke", "white")
									.style("stroke-width", "3px")
									//console.log('categoryNames.length',Object.keys(categoryNames).length,categoryNames,d3.keys(categoryNames).length)
									var keys = d3.keys(categoryNames)
									for (var i=0;i<keys.length;i++){
										if(keys[i]!= d.data.key){
											//console.log('categoryNames[i].data.key: ',keys[i],d.data.key)
											//console.log('yes',d3.select('#'+keys[i]))
											d3.select('#'+keys[i]).transition(300).duration(300).style('opacity',0.3).style('fill','grey')
											//d3.select('#Environmental Sustainability').transition().duration(100).style('opacity',0.3).style('fill','grey')
										}
									}
									
								
								})
								.on('mouseout',function(d){
									
									d3.select(this).transition()
									.duration(500)
									.attr('d',arcPrevious)
									.style('opacity',0.8)
									.attr("stroke", "white")
									.style("stroke-width", "2px")
									var keys = d3.keys(categoryNames)
									var keys = d3.keys(categoryNames)
									for (var i=0;i<keys.length;i++){
										if(keys[i]!= d.data.key){
											// console.log('categoryNames[i].data.key: ',keys[i],d.data.key)
											// console.log('yes',d3.select('#'+keys[i]))
											d3.select('#'+keys[i]).transition(300).duration(300).style('opacity',0.8).style('fill',function(d){return colorScale(keys[i])})
										}
									}
								})
								.on('click',(d)=>this.subCategoryName(d.data.key,countryName,checked));
					g.selectAll('text')
						.data(categoryKey)
						.enter()
						.append('text')
						.attr('x',function(d){
							if (d == 'Environmental_Sustainability'){
								return 36
							}else if (d == 'Work_Employment'){
								return 80
							}else if (d == 'Gender'){
								return 145
							}else if (d == 'Inequality'|| d == 'Education'){
								return 135
							}else{
								return 110
							}
						})
						.attr('dy',function(d){
							if(d == 'Gender'){
								return 45
							}else{
								return 43
							}
						})
						.append('textPath')
						.attr('xlink:href',function(d,i){
							return '#'+d
						})
						
						.text(function(d){
							return d
						})
						.attr('fill','black')
						.attr('font-family','sans-serif')
						.attr('font-size',18)
						.attr('pointer-events','none')
						;
					
							
													
						
						
		
		
	};
	subCategoryName(categoryNameClicked,countryName,checked){
		if (checked==1){
			let compare =new Compare();
			compare.viewCompare(categoryNameClicked,'None',countryName[0],countryName[1]);
		}
		d3.select('#textCategories').select('svg').remove();
		d3.select('#donutChart').select('svg').remove()
		//console.log('categoryNameClicked', categoryNameClicked)
		let categoryNames1={'Education':{'Schooling_Years':20,'Govt_Expenditure':20,'Adult_literacy_rate':20,'Primary_teachers_trained':20,'Primary_dropout':20},
							'Environmental_Sustainability':{'Carbon_emmisions':20,'Fossil_consumption':20,'forest_area':20,'fresh_water_withdrawal':20,'Renewable_energy_used':20},
							'Gender':{'Child_marriage':20,'Gender_Development_Index':20,'Gender_Inequality_Index':20,'maternal_mortality_ratio':20,'unemployment_rate':20},
							'Inequality':{'education_inequality':20,'Income':20,'Life_expectancy':20,'Adjusted_education':20,'Loss_in_HDI':20},
							'Work_Employment':{'Child_labour':20,'Unemployment_total':20,'Youth_not_in_school':20,'Unemployment_youth_rate':20,'vulnerable_employment':20}};
			let categoryNames=categoryNames1[categoryNameClicked];
			//console.log('yoo bro',d3.keys(categoryNames))
		let colorScale = d3.scaleOrdinal()
						.domain(categoryNames)
						.range(['#52FB16','#ffff00','#00aee7','#F816FB','#e94922'])
		let pie = d3.pie()
						.value(function(d){
							return d.value
						})
		let textSVG = d3.select('#textCategories')
						.append('svg')
						.attr('width',1100)
						.attr('height',50)
						.append('g')
						.attr('transform','translate(10,33)')
						.selectAll('text')
						.data(['categories'])
						.enter()
						.append('text')
						.style('font-family', 'cursive')
					   .style('font-size','34px')
					   .text("Click a Sub-category to see the trend over the years: ")
					   .attr('class','comparePanel')
									
		let donutSVG = d3.select('#donutChart')
						.append('svg')
						.attr('width',900)
						.attr('height',600)
						
				let g = donutSVG.append('g')
						.attr('transform','translate(300,290)')
					
						
		let dataOfPie = pie(d3.entries(categoryNames))
		let lineChart = new LineChart();
		let arcPrevious = d3.arc()
						.innerRadius(160)
						.outerRadius(260)
						.cornerRadius(20);
		
		let arcOnMouseOver = d3.arc()
						  .innerRadius(140)
						  .outerRadius(280)
						  .cornerRadius(20);;
		
			
			g.selectAll('path')
							.data(dataOfPie)
							.enter()
							.append('path')
							.attr('id',function(d){
							return d.data.key
							})
							.attr('d',arcPrevious)
							.attr('fill',function(d){
								//console.log('d',d)
								return colorScale(d.data.key)
							})
							.attr("stroke", "white")
						    .style("stroke-width", "2px")
						    .style("opacity", 0.8)
							.on('click',function(d){
								if (checked==1){
									d3.select('#LineChart').select('svg').remove();
								console.log('subcategory hovering on',d.data.key)
								//console.log('clicked: ',clicked)
									console.log('selected sub category: ',d3.select(this))
									
									
									var keys = d3.keys(categoryNames);
									
									
							       
									for (var i=0;i<keys.length;i++){
										if(keys[i]!= d.data.key){
											//console.log('categoryNames[i].data.key: ',keys[i],d.data.key)
											console.log('subcategory not selected',keys[i])
											d3.select('#'+keys[i]).transition(300)
											.duration(300)
											.attr('d',arcPrevious)
											//.attr('opacity',0.8)
											.attr("stroke", "white")
											.style("stroke-width", "2px")
											.style('opacity',0.3).style('fill','grey')
											//d3.select('#Environmental Sustainability').transition().duration(100).style('opacity',0.3).style('fill','grey')
										}else{
											console.log('subcategory selected',keys[i])
											d3.select('#'+keys[i]).transition(300)
											.duration(300)
											.attr('d',arcOnMouseOver)
											.style('opacity',0.8)
											.attr("stroke", "white")
											.style("stroke-width", "3px")
											.style('fill',function(d){
												console.log('colorScale(d.data.key)',colorScale(keys[i]))
												return colorScale(keys[i])
											})
										}
									}
									let compare =new Compare();
			                        compare.viewCompare(categoryNameClicked,d.data.key,countryName[0],countryName[1]);
									
								}
								else{
								d3.select('#LineChart').select('svg').remove();
								console.log('subcategory hovering on',d.data.key)
								//console.log('clicked: ',clicked)
									console.log('selected sub category: ',d3.select(this))
									
									
									var keys = d3.keys(categoryNames);
									
									
							       
									for (var i=0;i<keys.length;i++){
										if(keys[i]!= d.data.key){
											//console.log('categoryNames[i].data.key: ',keys[i],d.data.key)
											console.log('subcategory not selected',keys[i])
											d3.select('#'+keys[i]).transition(300)
											.duration(300)
											.attr('d',arcPrevious)
											//.attr('opacity',0.8)
											.attr("stroke", "white")
											.style("stroke-width", "2px")
											.style('opacity',0.3).style('fill','grey')
											//d3.select('#Environmental Sustainability').transition().duration(100).style('opacity',0.3).style('fill','grey')
										}else{
											console.log('subcategory selected',keys[i])
											d3.select('#'+keys[i]).transition(300)
											.duration(300)
											.attr('d',arcOnMouseOver)
											.style('opacity',0.8)
											.attr("stroke", "white")
											.style("stroke-width", "3px")
											.style('fill',function(d){
												console.log('colorScale(d.data.key)',colorScale(keys[i]))
												return colorScale(keys[i])
											})
										}
									}
								
									
									
									d3.csv("data/"+d.data.key+".csv",function(data){
										
										return data;
									 
									 }).then(function(data){
										 
								
								lineChart.drawLineChart(data,countryName,d.data.key);
								})
								
								}
							})
							// .on('mouseout',function(d){
								
								
								// d3.select(this).transition()
								// .duration(500)
								// .attr('d',arcPrevious)
								// .attr('opacity',0.8)
								// .attr("stroke", "white")
								// .style("stroke-width", "2px")
								
								// var keys = d3.keys(categoryNames)
									// for (var i=0;i<keys.length;i++){
										// if(keys[i]!= d.data.key){
											// //console.log('categoryNames[i].data.key: ',keys[i],d.data.key)
											// //console.log('yes',d3.select('#'+keys[i]))
											// d3.select('#'+keys[i]).transition(300).duration(300).style('opacity',0.8).style('fill',function(d){return colorScale(keys[i])})
											// //d3.select('#Environmental Sustainability').transition().duration(100).style('opacity',0.3).style('fill','grey')
										// }
									// }
								// d3.select('#LineChart').select('svg').remove()
							// })
							
					g.selectAll('text')
						.data(d3.keys(categoryNames))
						.enter()
						.append('text')
						.attr('x',function(d){
							if (d == 'Gender_Deveoplement_Index' ||  d == 'Unemployment_youth_rate'){
								return 60
							}else if (d == 'Child_marriage' || d == 'Child_labour' || d == 'forest_area'){
								return 120
							}else if (d == 'Schooling_Years' || d == 'Govt_Expenditure' || d == 'old_age_pension'){
								return 100
							}else if (d == 'Education'|| d == 'Income'){
								return 130
							}else if (d == 'Loss_in_HDI' || d == 'Life_expectancy' ){
								return 110
							}else{
								return 80
							}
						})
						.attr('dy',55)
						.append('textPath')
						.attr('xlink:href',function(d,i){
							return '#'+d
						})
						
						.text(function(d){
							return d
						})
						.attr('fill','black')
						.attr('font-family','sans-serif')
						.attr('font-size',18)
						.attr('pointer-events','none')
						;
						
						
						d3.select("#donutChart")
						.select('svg')
						.append('g')
						.attr('transform','translate(400,220)')
						.attr('id','buttonNew')
						.append('image')
						.attr('x',-200)
						.attr('y',-18)
						.attr("xlink:href", d=>"data/flags-mini/BACK_BUTTON.png")
						.attr("width", 200)
                        .attr("height", 200)
						// .on('mouseover',function(d){
							// //d3.select('#LineChart').select('svg').remove()
							// d3.select(this)
							// .transition(500)
							// .delay(50)
							// .attr("width", 0)
							// .attr("height", 270)
						// })
						// .on('mouseout',function(d){
							// d3.select(this)
							// .transition(500)
							// .delay(50)
							// .attr("width", 450)
							// .attr("height", 200)
						// })
						.on('click',(d)=>this.categoryName(countryName,checked));
					
			// let circle =d3.select('#donutChart')
						// .select('svg')
						// .append('g')
						// .attr('id','buttonNew')
						// .attr('transform','translate(400,220)')
						// .selectAll('circle')
						// .data(['button'])
						// .enter()
						// .append('circle')
						// .attr('cx',0)
						// .attr('cy',70)
						// .attr('r',120)
						// .attr('fill','yellow')
						// .on('mouseover',function(d){
							// //d3.select('#LineChart').select('svg').remove()
							// d3.select(this)
							// .transition(500)
							// .delay(50)
							// .attr('r',150)
						// })
						// .on('mouseout',function(d){
							// d3.select(this)
							// .transition(500)
							// .delay(50)
							// .attr('r',120)
						// })
						// .on('click',(d)=>this.categoryName(countryName));
						
							
					
							
			
		
	}
}