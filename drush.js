(function (window) {
	var document = window.document,
        canvas = document.getElementById('drush'),
        context = canvas.getContext('2d'),
        form = document.getElementById('generateForm')
    ;
	
	for (var y=0; y<=canvas.height || y<=canvas.width; y+=10) {
	    context.moveTo(0, y);
	    context.lineTo(canvas.width, y);
	    context.moveTo(y, 0);
	    context.lineTo(y, canvas.height);
	    context.lineWidth = 1;
	    context.strokeStyle = "#eae6e6";
	    context.stroke();
	}	
    
	
	var Dot = Base.extend({
		  constructor: function(x, y, width, height) {
		    this.x = x;
		    this.y = y;
		    this.width = width;
		    this.height = height;
		  },
		  x: this.x,
		  y: this.y,
		  draw: function(context) {
		    context.fillRect(this.x, this.y, this.width, this.height);    
		  },
		  code: function() {
		    var code = "fillRect(" 
		    	+ this.x + ", " 
		    	+ this.y + ", "
		    	+ this.width + ", "
		    	+ this.height
		    	+ ");";
		    return code;
		  }
		});
		
    
	var Canvas = Base.extend({
		constructor: function(width, height) {
		  this.width = width;
		  this.height = height;
		  this.dots = [];
		},
	    drawDot: function(dot) {
	      var insert = true;
	      for (var i = 0; i<this.dots.length; i++) {
	        if (this.dots[i].x == dot.x && this.dots[i].y == dot.y) {
	          insert = false;
	          break;
	        }   	  
	      }
	      if (insert) {
	        this.dots.push(dot);
	      }
	    },
	   getCode: function() {
	     var code = "function (context, x, y) {\n";
	     code += "  context.translate(x, y); \n";
	     for(var i=0; i<this.dots.length;i++) {
	       code += "  " + "context." + this.dots[i].code();
	       code += "\n";
	     };
	     code += "}";
	     return code;
	   }
	});
	
	var virtualCanvas = new Canvas(640, 480);
	canvas.addEventListener('click', onMouseClick, false);
	
	form.generate.addEventListener('click', onGenerate, false);
	
	function onGenerate(evt) {
	  form = evt.originalTarget.form;
	  code = document.createElement('textarea');
	  code.cols = 50;
	  code.rows = 10;
	  code.value = virtualCanvas.getCode();
	  form.appendChild(code);
	}
	
	function onMouseClick(evt) {
	  var xBase = canvas.offsetLeft;
	  var yBase = canvas.offsetTop;
	  dot = new Dot(evt.clientX-xBase, evt.clientY-yBase, 10, 10);
	  dot.draw(context);
	  virtualCanvas.drawDot(dot);
	}
}) (window);