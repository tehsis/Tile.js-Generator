(function () {
  var localBrush = window.brush || {}; // A local brush class

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
    
  window.brush = localBrush;
}) ();
