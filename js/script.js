
let optList = ['HDI','Population']
	d3.select("#chooseOptions")
	//.attr('class','chooseOptions')
			.selectAll("option")
             .data(optList)
             .enter()
             .append("option")
             .attr("value", function(d){
				 return d;
			 })
             .text(function(d){
				 return d;
			 })
			 
			 ;
			 
				
	 // let cButton = d3.select('#legend')
					// .select('svg')
					// .append('g')
					// .attr('transform','translate(90,40)')
					// .selectAll('text')
					// .data(['compare button'])
					// .enter()
					// .append('text')
					// .attr('x',10)
					// .attr('y',10)
					// .text('COMPARE')
					
	 let selectedValue = 'HDI'
	 d3.csv("data/Country_code_with_Info_Panel.csv",function(d){
						return d;
					 
					 }).then(function(alldata){


				let mapview=new Map(alldata,selectedValue);

				// let dChart = new donutChart()
				// dChart.categoryName()
				d3.json("data/world.json")
					.then(function(world) {
					  mapview.showmap(world);
					});
				});
	d3.select("#chooseOptions").on('change',function(d){
			d3.select("#mapChart").select('svg').remove();
			d3.select("#year").select('svg').remove();
			d3.select("#infopanel").select('svg').remove();
			d3.select('#donutChart').select('svg').remove();
				 console.log('options are coming',d3.select(this).property("value"))
				 selectedValue = d3.select(this).property("value");
				 if (selectedValue == 'HDI'){
					setValue = 'Country_code_with_Info_Panel.csv'
				}else{
					setValue = 'pop_in_millions.csv'
				}
				d3.csv("data/"+ setValue,function(d){
						return d;
					 
					 }).then(function(alldata){


				let mapview=new Map(alldata,selectedValue);

				// let dChart = new donutChart()
				// dChart.categoryName()
				d3.json("data/world.json")
					.then(function(world) {
					  mapview.showmap(world);
					});
				});
			 
			 })
			 
			 
      ;
			

		


