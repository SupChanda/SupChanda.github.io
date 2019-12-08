class Infopanel{



  constructor(){
	  d3.select("#infopanel").select('svg').remove()
     let infopanel = d3.select("#infopanel").classed("infopanel", true);
     this.margin = {top: 15, right: 10, bottom: 15, left: 25};
    //Gets access to the div element created for this chart and legend element from HTML
    this.svg = infopanel.append("svg")
	                    .attr("height",400)
						.attr("weight",400)
						.attr('class','fixedDiv')
						.attr("transform", "translate(" + 20 + ",0)")
						;
  
  
  
  
  
  
  };

  viewinfo(alldata,country){
	  
	  this.svg.selectAll('g').remove();
	  let j=0
	 for (j=0;j<alldata.length;j++){
		 
		 if (alldata[j]['Country_Code']==country){
			 break
		 }
		 
	 }
     let data=[];
	 data.push(alldata[j]);
	 
							   
							   
	 let countryname = this.svg.append('g').selectAll("text").data(data);
	 countryname=countryname.enter().append('text')
							   .merge(countryname)
							   .transition()
								.duration(1000)
								.delay(300)
							   .attr('x', 65)
							   .attr('y', 50)
							   .style('font-family', 'cursive')
							   .style('font-size','34px')
							   //.style('textAlign','left')
							   .text(function(d){ 
									//console.log('country name',d.Country)
									if(d.Country.includes('Russian')){
										return 'Russia'
									}else{
										return d.Country
									}
							   })
							   
							   ;
	
	
	let fname = this.svg.append('g').selectAll("text").data(data);
	 fname=fname.enter().append('text').merge(fname)
								.transition()
								.duration(1000)
								.delay(400)
	                           .attr('x', 50)
							   .attr('y', 100)
							   .style('font-family', 'cursive')
							   .style('font-size','16px')
							   .text("Flag : ")
							   
							   ;
	
     let flag = this.svg.append('g').selectAll("image").data(data);
	 flag = flag.enter().append("image")
						.transition()
						.duration(1000)
						.delay(500)
	                    .attr('x', 100)
						.attr('y', 60)
						.attr("xlink:href", d=>"data/flags-mini/"+d.Two_Letter_Country_Code+".png")
						.attr("width", 150)
                        .attr("height", 100)
						;
						
	let pname = this.svg.append('g').selectAll("text").data(data);
	 pname=pname.enter().append('text').merge(pname)
								.transition()
								.duration(1000)
								.delay(700)
	                           .attr('x', 50)
							   .attr('y', 190)
							   .style('font-family', 'cursive')
							   .style('font-size','16px')
							   .text("Population(2017): ")
	let population = this.svg.append('g').selectAll("text").data(data);
	 population=population.enter().append('text').merge(population)
								.transition()
								.duration(1000)
								.delay(900)
	                           .attr('x', 190)
							   .attr('y', 190)
							   .text(d=>d.Year_2017/1000000 + "(mil)")
							   ;	
    
    let cname = this.svg.append('g').selectAll("text").data(data);
	 cname=cname.enter().append('text').merge(cname)
								.transition()
								.duration(1000)
								.delay(1100)
	                           .attr('x', 50)
							   .attr('y', 220)
							   .style('font-family', 'cursive')
							   .style('font-size','16px')
							   .text("Capital : ")
	let capital = this.svg.append('g').selectAll("text").data(data);
	 capital=capital.enter().append('text').merge(capital)
								.transition()
								.duration(1000)
								.delay(1300)
	                           .attr('x', 190)
							   .attr('y', 220)
							   .text(d=>d.Capital)
							   ;	
    
	let cuname = this.svg.append('g').selectAll("text").data(data);
	 cuname=cuname.enter().append('text').merge(cuname)
								.transition()
								.duration(1500)
								.delay(1500)
	                           .attr('x', 50)
							   .attr('y', 250)
							   .style('font-family', 'cursive')
							   .style('font-size','16px')
							   .text("Currency : ")
	let currency = this.svg.append('g').selectAll("text").data(data);
	 currency=currency.enter().append('text').merge(currency)
								.transition()
								.duration(1000)
								.delay(1700)
	                           .attr('x', 190)
							   .attr('y', 250)
							   .text(d=>d.Currency)
							   ;
							   
	let chid = this.svg.append('g').selectAll("text").data(data);
	 chid=chid.enter().append('text').merge(chid)
	                           .transition()
								.duration(1000)
								.delay(1900)
							   .attr('x', 50)
							   .attr('y', 280)
							   .style('font-family', 'cursive')
							   .style('font-size','16px')
							   .text("GDP(Rank) : ")
	let hid = this.svg.append('g').selectAll("text").data(data);
	 hid=hid.enter().append('text').merge(hid)
	                           .transition()
								.duration(1000)
								.delay(2100)
							   .attr('x', 190)
							   .attr('y', 280)
							   .text(d=>d.Ranking)
							   ;
   
   let langName = this.svg.append('g').selectAll("text").data(data);
	 langName=langName.enter().append('text').merge(langName)
	                           .transition()
								.duration(1000)
								.delay(1900)
							   .attr('x', 50)
							   .attr('y', 310)
							   .style('font-family', 'cursive')
							   .style('font-size','16px')
							   .text("Language: ")
	let lang = this.svg.append('g').selectAll("text").data(data);
	 lang=lang.enter().append('text').merge(lang)
	                           .transition()
								.duration(1000)
								.delay(2100)
							   .attr('x', 190)
							   .attr('y', 310)
							   .text(d=>d.lang_name)
							   ;
    let cont_name = this.svg.append('g').selectAll("text").data(data);
	 cont_name=cont_name.enter().append('text').merge(cont_name)
	                           .transition()
								.duration(1000)
								.delay(1900)
							   .attr('x', 50)
							   .attr('y', 340)
							   .style('font-family', 'cursive')
							   .style('font-size','16px')
							   .text("Continent: ")
	let cont = this.svg.append('g').selectAll("text").data(data);
	 cont=cont.enter().append('text').merge(cont)
	                           .transition()
								.duration(1000)
								.delay(2100)
							   .attr('x', 190)
							   .attr('y', 340)
							   .text(d=>d.Continent_Name)
							   ;
    
  };


}