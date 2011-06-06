(function () {

var vcl = {}; // A local virtual class
    
vcl.classes = {	
     Dot:  Base.extend({
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
		}),
    
	 Canvas: Base.extend({
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
	 })
};

window.brush = vcl;

}) ();