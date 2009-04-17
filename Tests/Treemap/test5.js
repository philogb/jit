

function init() {
    
                tm = new TM.SliceAndDice({
                    tips: false,
                    Color: {
                //Allow coloring
                        allow: true,
                //Set min value and max value for the second *dataset* object values.
                //Default's to -100 and 100.
                        minValue: -100,
                        maxValue: 100,
                //Set color range. Default's to reddish and greenish. 
                //It takes an array of three
                //integers as R, G and B values.
                        minColorValue: [0, 255, 50],
                        maxColorValue: [255, 0, 50]
                    }
                });
                if(!Browser.Engine.presto) {
                    $('opera_right').setStyle('display', 'none');
                } else {
                    $('opera_right_button').addEvent('click', function() {
                        tm.out();
                    });
                }
                
                var json = Feeder.makeTree({
                                idPrefix: "node",
                                levelStart: 0,
                                levelEnd: 4,
                                maxChildrenPerNode: 10,
                                minChildrenPerNode: 1,
                                counter: 0
                            });
                Feeder.setWeights(json);
                tm.layout.orientation = "v";
                tm.loadJSON(json);
            
}