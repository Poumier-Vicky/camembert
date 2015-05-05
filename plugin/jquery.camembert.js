(function($)
{ 
	$.fn.camembert =function(opdata){  
		var angleDepart =0 ; 
		var angleFin=0 ;   
        //On définit nos paramètres par défaut
	    var defauts=
	    {
			angleDepart: 0,		
			angleFin: 0,		
			rayon: 100,		
			tabLabel: ["Developpement","Graphisme","Recette", "Administratif"],
			tabDonnees:  [35,45,15,5] ,
			tabCouleur: [] 
	    };  
	           
	    //On fusionne nos deux objets ! =D
	   	var obj = $.extend(defauts, opdata );


	   	function init(obj){
	   		if(obj['tabCouleur'].length == 0 ){
	   				$.each( obj.tabDonnees, function(index,value){
	   					obj.tabCouleur.push(getRandomColor());
	   				});
	   		}
	   	}

		function drawGraphCam(obj, div){

			init(obj) ; 

		 	div.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width=500 height=600></svg>';
			 // pour chaque entree des tableaux on dessine les arc , carres et textes
			 for (i=0; i<obj['tabDonnees'].length;i++){
				addElements(i);
				angleDepart=angleFin;

			}
			//return this;
		 } 

		



	    function getRandomColor() {
			var letters = '0123456789ABCDEF'.split('');
			var color = '#';
			for (var i = 0; i < 6; i++ ) {
				color += letters[Math.round(Math.random() * 15)];
			}
			return color;
		}

		function degres2radians(centreX, centreY, rayon, degres) {
			 var radians = (degres-90) * Math.PI / 180.0;
			 return {
				 x: centreX + (rayon * Math.cos(radians)),
				 y: centreY + (rayon * Math.sin(radians))
			 };
		}
		function monArc(x, y, rayon, angleDepart, angleFin){
			 var depart = degres2radians(x, y, rayon, angleFin);
			 var fin = degres2radians(x, y, rayon, angleDepart);
			 var arc180 = angleFin - angleDepart <= 180 ? "0" : "1";
			 var d = [
			 "M", depart.x, depart.y,
			 "A", rayon, rayon, 0, arc180, 0, fin.x, fin.y,
			 "L", x,y,
			 "L", depart.x, depart.y
			 ].join(" ");
			 
			return d;
		}
			 
		function addElements(i){
			 var svg =  $('svg')[0]; //Get le svg
			 angleDepart=angleDepart;
			 angleFin=(angleDepart+obj['tabDonnees'][i]);

			 // dessin des arcs de cercle
			 var path = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
			 path.setAttribute('fill',obj['tabCouleur'][i]);
			 path.setAttribute('d',monArc(120 , 120, obj['rayon'], angleDepart*3.6, angleFin*3.6));
			 path.setAttribute('id','arc'+i);
			 path.setAttribute('p',i);
			 path.setAttribute('class',"arc");
			 
			 // dessin des carres de legende
			 var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect'); //Create a path in SVG's namespace
			 rect.setAttribute('width','16');
			 rect.setAttribute('height','16');
			 rect.setAttribute('x',260);
			 rect.setAttribute('y',30*i+10);
			 rect.setAttribute('fill',obj['tabCouleur'][i]);
			 rect.setAttribute('id','rect'+i);
			 
			 // dessin des textes de legende
			 var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
			 text.setAttribute('x', 280);
			 text.setAttribute('y', 30*i+10+12);
			 text.setAttribute('fill', '#999');
			 text.setAttribute('font-size','12');
			 text.setAttribute('font-family','sans-serif');
			 text.setAttribute('font-weight','normal');
			 text.setAttribute('id','text'+i);
			 text.textContent = obj['tabLabel'][i]+' ('+obj['tabDonnees'][i]+'%)';
			 
			 // ajout des elements au svg
			 svg.appendChild(path);
			 svg.appendChild(rect);
			 svg.appendChild(text);
		}



	     return this.each(function( i,o ){
		    	//console.log("plugin camembert i : ", i , "objet: ", o); 
	      	    drawGraphCam(obj, o) ;  // doit renvoyer this en fin de traitement ; 
	     });
			

	}
})(jQuery);