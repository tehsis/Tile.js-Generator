(function () {
  var localBrush = {}; // A local brush class

  localBrush.figures = {	
    
    /**
     * A dot is a square with a defined height and width. 
     */
    Dot:  Backbone.Model.extend({
      
      /**
       * Deprecated. Must be moved to the view. 
       */ 
      draw: function(params) {
        context = params.context || params;
        context.fillRect(this.get('x'), this.get('y'), this.get('width'), 
            this.get('height'));    
      },

      /**
       * Deprecated. Must be moved to the view. 
       */ 
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

  };

  localBrush.utils = {
    Grid: Backbone.Model.extend({
      draw: function() {
       var context = this.get('canvas').getContext('2d:');
       for (var y=0; y<=this.height || y<=this.width; y+= this.dotSize) {
         context.moveTo(0, y);
         context.lineTo(this.get('width'), y);
         context.moveTo(y, 0);
         context.lineTo(y, this.get('height'));
         context.lineWidth = 1;
         context.strokeStyle = "#eae6e6";
         context.stroke();
       };		
      },
    }),
    
        /*
     * A virtualCanvas is a _collection_ of figures. 
     */
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

  window.brush = localBrush;
}) ();
