function init(){

    var infovis = document.getElementById('infovis');
    var w = infovis.offsetWidth, h = infovis.offsetHeight;
    infovis.style.width = w + 'px';
    infovis.style.height = h + 'px';
    var get = function(id){
        return document.getElementById(id);
    };
    var opt = get('layout'), title = get('title'), offset = get('offset'), color = get('colored'), hor = get('horizontal');
    
    
    var options = {
        rootId: 'infovis',
        
        offset: offset.checked ? 4 : 0,
        
        titleHeight: title.checked ? 13 : 0,
        
        orientation: hor.checked ? "h" : "v",
        
        Color: {
            //Allow coloring
            allow: color.checked,
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
    };
    
    document.getElementById('out_button').onclick = function(){
        tm.out();
    };
    
    
    opt.onchange = function(){
        var json = Feeder.makeTree({
            idPrefix: "node",
            levelStart: 0,
            levelEnd: 4,
            maxChildrenPerNode: 10,
            minChildrenPerNode: 1,
            counter: 0
        });
        Feeder.setWeights(json);
        
        var text = opt.options[opt.selectedIndex].text;
        if (window.tm) 
            tm.empty();
        tm = new TM[text](options);
        tm.loadJSON(json);
    };
    
    title.onclick = function(){
        options.titleHeight = title.checked ? 13 : 0;
        opt.onchange();
    };
    
    offset.onclick = function(){
        options.offset = offset.checked ? 4 : 0;
        opt.onchange();
    };
    
    color.onclick = function(){
        options.Color.allow = color.checked;
        opt.onchange();
    };
    
    hor.onclick = function(){
        options.orientation = hor.checked ? "h" : "v";
        opt.onchange();
    };
    
    opt.onchange();
}
