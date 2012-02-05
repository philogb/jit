window.addEvent('domready', function() {
   var is = new Fx.Marquee($('image-switcher'), {
       duration: 1500
   });

   var imageArray = ["force-directed.png", "icicle.png", "tm.png", "multitree.png", "sunburst2.png", "piechart.png", "barchart.png", "areachart.png", "rgraph.png", "hypertree.png", "sunburst.png"]
    .map(function(elem) { return "static/v20/img/marquee/" + elem; });
   var titles = ["Force-Directed Layouts", "Icicle Visualization", "Animated TreeMaps", "Multi-Trees", "Custom Nodes and Edges", "Pie Charts", "Bar Charts", "Area Charts", "Radial Layouts", "Hyperbolic Layouts", "Sunburst Visualization"];
   
   var images = new Asset.images(imageArray, {
      onComplete: function() {
        var i = 0, len = imageArray.length;
        var announce = function(i) {
            var container = new Element('div', {
                'styles': {
                    'position': 'relative'
                }
            });
            var text = new Element('div', {
                'html': titles[i],
                'class': 'tag'
            });
            var alink = new Element('a', {
              'href': 'demos/',
              'title': 'Try the demos'
            });
            images[i++].inject(alink);
            alink.inject(container);
            text.inject(container);
            setTimeout(function() {
                is.announce({
                  message: container,
                  delay: 3000,
                  revert: false  
                }).chain(function() {
                   i = i % len;
                   announce(i); 
                });
            }, 3000);
        };
        announce(i);
      } 
   });
});
