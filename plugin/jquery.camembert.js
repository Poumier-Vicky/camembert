(function($){ 
	$.fn.camembert =function(opdata){  

		var startAngle =0 ; 
		var endAngle=0 ;   

		//Defaults parameters:
		var defaults=
		{
				startAngle: 0,		
				endAngle: 0,		
				radius: 100,		
				labels: ["Developpement","Graphisme","Recette", "Administratif"],
				values:  [35,45,15,5] ,
				colors: [] 
		};  
			
		//Melting the two objects:
		var obj = $.extend(defaults, opdata );


		function init(obj){
			if(obj['colors'].length == 0 ){
					$.each( obj.values, function(index,value){
						obj.colors.push(getRandomColor());
					});
			}
		}

		function drawGraphCam(obj, div){

			init(obj) ; 
			var divId = $(div).attr("id");
			div.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=500 height=600 id='+divId+'></svg>';

			for (i=0; i<obj['values'].length;i++){
				addElements(i, divId);
				startAngle=endAngle;
			}
		} 

		function getRandomColor() {
			var letters = '0123456789ABCDEF'.split('');
			var color = '#';
			for (var i = 0; i < 6; i++ ) {
				color += letters[Math.round(Math.random() * 15)];
			}
			return color;
		}

		function degres2radians(centreX, centreY, radius, degres) {
			var radians = (degres-90) * Math.PI / 180.0;
			return {
				x: centreX + (radius * Math.cos(radians)),
				y: centreY + (radius * Math.sin(radians))
			};
		}

		function arcPath(x, y, radius, startAngle, endAngle){
			var depart = degres2radians(x, y, radius, endAngle);
			var fin = degres2radians(x, y, radius, startAngle);
			var arc180 = endAngle - startAngle <= 180 ? "0" : "1";
			var d = [
			"M", depart.x, depart.y,
			"A", radius, radius, 0, arc180, 0, fin.x, fin.y,
			"L", x,y,
			"L", depart.x, depart.y
			].join(" ");
			
			return d;
		}
				
		function addElements(i, divId){
			var svg =  $('svg[id='+divId+']')[0]; //Get le svg
			startAngle=startAngle;
			endAngle=(startAngle+obj['values'][i]);


			// Draw circle bow:
			var path = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
			path.setAttribute('fill', obj['colors'][i]);
			path.setAttribute('d', arcPath(120 , 120, obj['radius'], startAngle*3.6, endAngle*3.6));
			path.setAttribute('id', 'arc'+i+''+divId);
			path.setAttribute('p', i);
			path.setAttribute('class', "arc");
			
			// Draws the legend rects
			var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect'); //Create a path in SVG's namespace
			rect.setAttribute('width','16');
			rect.setAttribute('height','16');
			rect.setAttribute('x',260);
			rect.setAttribute('y',30*i+10);
			rect.setAttribute('fill',obj['colors'][i]);
			rect.setAttribute('id','rect'+i+''+divId);
			
			// Draws the text labels:
			var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			text.setAttribute('x', 280);
			text.setAttribute('y', 30*i+10+12);
			text.setAttribute('fill', '#999');
			text.setAttribute('font-size','12');
			text.setAttribute('font-family','sans-serif');
			text.setAttribute('font-weight','normal');
			text.setAttribute('id','text'+i+''+divId);
			text.textContent = obj['labels'][i]+' ('+obj['values'][i]+'%)';
			
			// Append to svg 
			svg.appendChild(path);
			svg.appendChild(rect);
			svg.appendChild(text);
		}



		return this.each(function( i,o ){
			drawGraphCam(obj, o) ;  
		});
			

	}
})(jQuery);
