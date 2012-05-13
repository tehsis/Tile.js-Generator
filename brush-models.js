(function () {
  var vcl = {}; // A local virtual class

  vcl.figures = {	
    Dot:  Backbone.Model.extend({
      draw: function(params) {
        context = params.context || params;
        context.fillRect(this.get('x'), this.get('y'), this.get('width'), 
            this.get('height'));    
      },

      clear: function(params) {
        context = params.context || params;
        context.clearRect(this.get('x'), this.get('y'), this.get('width'), 
            this.get('height'));  
      },

      code: function(params) {
        size = params.size || params;
        var code = "fillRect("; 
        code += (this.get('x') / size) + ", "; 
        code += (this.get('y') / size) + ", ";
        code += (this.get('width') / size) + ", ";
        code += (this.get('height') / size);
        code += ");";
        return code;
      }
    }),

    VirtualCanvas: Base.extend({
      constructor: function(params) {
        this.width = params.width;
        this.height = params.height;
        this.dots = [];
      },

      drawDot: function(params) {
        dot = params.dot || params;
        var insert = true;
        var i; 
        for (i = 0; i<this.dots.length; i++) {
          if (this.dots[i].x === dot.x && this.dots[i].y === dot.y) {
            insert = false;
            break;
          }   	  
        }
        if (insert) {
          this.dots.push(dot);
        } else {
          this.dots.splice(i,1);   	  
        }	      
        return insert;
      },

      getCode: function(params) {
        size = params.size || params;
        var code = "function (context, x, y) {\n";
        code += "  context.translate(x, y); \n";
        for(var i=0; i<this.dots.length;i++) {
          code += "  " + "context." + this.dots[i].code(size);
          code += "\n";
        };
        code += "}";
        return code;
      }
    })
  };

  vcl.utils = {
    Grid: Base.extend({
      constructor: function(params) {
        this.height = params.height;
        this.width = params.width;
        this.dotSize = params.dotSize;
        this.canvas = params.canvas;
        this.context = this.canvas.getContext('2d');
      },
   
      draw: function() {
       for (var y=0; y<=this.height || y<=this.width; y+= this.dotSize) {
         this.context.moveTo(0, y);
         this.context.lineTo(this.width, y);
         this.context.moveTo(y, 0);
         this.context.lineTo(y, this.height);
         this.context.lineWidth = 1;
         this.context.strokeStyle = "#eae6e6";
         this.context.stroke();
       };		
      },
    })
  };

  window.brush = vcl;
}) ();
