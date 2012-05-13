(function() {
  var localBrush = window.brush || {};
  
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
    }) 
  }
  
  window.brush = localBrush;
}) ();
