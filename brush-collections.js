(function() {
  var localBrush = brush || {};
  
  localBrush.collections = {
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
  }
  
  window.brush = localBrush;
}) ();
