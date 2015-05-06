# Camembert a jQuery pie-chart plugin
Camembert is a very simple "pie-chart" jQuery plugin.
It integrates a simple SVG pie chart, without writing a single  line of svg code.

## Camembert in brief

- The target element must exists in your html file. At least you must provide two data arrays of the same size, one is an array of string labels, the second is an array of float values corresponding to the percentage of each corresponding label value. Optionally, you can provide a radius and  an array of colors.

## Usage

- Include jQuery and Camembert
- Call Camembert

```html
<div id="camembert"></div>
...
<script src="jquery.js"></script>
<script src="jquery.camembert.js"></script>
<script>
	$(document).ready(function(){

		// Some delicious french cheeses : 
		var labels = ["Brie", "Camembert", "Pont-Lévêque", "Munster", "Vacherin"] ; 

		// Some values:
		var values = [20.10 , 42.30 , 19.60 , 14.70 , 3.30 ] ; 

		$("#camembert").camembert({ "labels": labels , "values": values }) ; 

	}); 
</script>
```
## 

