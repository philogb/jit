function init(){
  //init data
  var json = "{\"children\": [{\"children\": [{\"children\": [], \"data\": {\"playcount\": \"276\", \"artist\": \"A Perfect Circle\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/11403219.jpg\", \"$area\": 276}, \"id\": \"album-Thirteenth Step\", \"name\": \"Thirteenth Step\"}, {\"children\": [], \"data\": {\"playcount\": \"271\", \"artist\": \"A Perfect Circle\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/11393921.jpg\", \"$area\": 271}, \"id\": \"album-Mer De Noms\", \"name\": \"Mer De Noms\"}], \"data\": {\"playcount\": 547, \"$area\": 547}, \"id\": \"artist_A Perfect Circle\", \"name\": \"A Perfect Circle\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"209\", \"artist\": \"Mad Season\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/32349839.jpg\", \"$area\": 209}, \"id\": \"album-Above\", \"name\": \"Above\"}], \"data\": {\"playcount\": 209, \"$area\": 209}, \"id\": \"artist_Mad Season\", \"name\": \"Mad Season\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"260\", \"artist\": \"Stone Temple Pilots\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/38753425.jpg\", \"$area\": 260}, \"id\": \"album-Tiny Music... Songs From the Vatican Gift Shop\", \"name\": \"Tiny Music... Songs From the Vatican Gift Shop\"}, {\"children\": [], \"data\": {\"playcount\": \"254\", \"artist\": \"Stone Temple Pilots\", \"image\": \"http:\/\/images.amazon.com\/images\/P\/B000002IU3.01.LZZZZZZZ.jpg\", \"$area\": 254}, \"id\": \"album-Core\", \"name\": \"Core\"}], \"data\": {\"playcount\": 514, \"$area\": 514}, \"id\": \"artist_Stone Temple Pilots\", \"name\": \"Stone Temple Pilots\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"181\", \"artist\": \"Bush\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8673371.jpg\", \"$area\": 181}, \"id\": \"album-The Science of Things\", \"name\": \"The Science of Things\"}], \"data\": {\"playcount\": 181, \"$area\": 181}, \"id\": \"artist_Bush\", \"name\": \"Bush\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"229\", \"artist\": \"Foo Fighters\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/32579429.jpg\", \"$area\": 229}, \"id\": \"album-Echoes, Silence, Patience &amp; Grace\", \"name\": \"Echoes, Silence, Patience &amp; Grace\"}, {\"children\": [], \"data\": {\"playcount\": \"185\", \"artist\": \"Foo Fighters\", \"image\": \"http:\/\/images.amazon.com\/images\/P\/B0009HLDFU.01.MZZZZZZZ.jpg\", \"$area\": 185}, \"id\": \"album-In Your Honor (disc 2)\", \"name\": \"In Your Honor (disc 2)\"}], \"data\": {\"playcount\": 414, \"$area\": 414}, \"id\": \"artist_Foo Fighters\", \"name\": \"Foo Fighters\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"398\", \"artist\": \"Luis Alberto Spinetta\", \"image\": \"http:\/\/images.amazon.com\/images\/P\/B00005LNP5.01._SCMZZZZZZZ_.jpg\", \"$area\": 398}, \"id\": \"album-Elija Y Gane\", \"name\": \"Elija Y Gane\"}, {\"children\": [], \"data\": {\"playcount\": \"203\", \"artist\": \"Luis Alberto Spinetta\", \"image\": \"http:\/\/images.amazon.com\/images\/P\/B0000B193V.01._SCMZZZZZZZ_.jpg\", \"$area\": 203}, \"id\": \"album-Para los Arboles\", \"name\": \"Para los Arboles\"}], \"data\": {\"playcount\": 601, \"$area\": 601}, \"id\": \"artist_Luis Alberto Spinetta\", \"name\": \"Luis Alberto Spinetta\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"224\", \"artist\": \"Alice in Chains\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/26497553.jpg\", \"$area\": 224}, \"id\": \"album-Music Bank\", \"name\": \"Music Bank\"}, {\"children\": [], \"data\": {\"playcount\": \"217\", \"artist\": \"Alice in Chains\", \"image\": \"http:\/\/images.amazon.com\/images\/P\/B0000296JW.01.MZZZZZZZ.jpg\", \"$area\": 217}, \"id\": \"album-Music Bank (disc 1)\", \"name\": \"Music Bank (disc 1)\"}, {\"children\": [], \"data\": {\"playcount\": \"215\", \"artist\": \"Alice in Chains\", \"image\": \"http:\/\/images.amazon.com\/images\/P\/B0000296JW.01.MZZZZZZZ.jpg\", \"$area\": 215}, \"id\": \"album-Music Bank (disc 2)\", \"name\": \"Music Bank (disc 2)\"}, {\"children\": [], \"data\": {\"playcount\": \"181\", \"artist\": \"Alice in Chains\", \"image\": \"http:\/\/images.amazon.com\/images\/P\/B0000296JW.01.MZZZZZZZ.jpg\", \"$area\": 181}, \"id\": \"album-Music Bank (disc 3)\", \"name\": \"Music Bank (disc 3)\"}], \"data\": {\"playcount\": 837, \"$area\": 837}, \"id\": \"artist_Alice in Chains\", \"name\": \"Alice in Chains\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"627\", \"artist\": \"Tool\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8480501.jpg\", \"$area\": 627}, \"id\": \"album-10,000 Days\", \"name\": \"10,000 Days\"}], \"data\": {\"playcount\": 627, \"$area\": 627}, \"id\": \"artist_Tool\", \"name\": \"Tool\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"261\", \"artist\": \"Chris Cornell\", \"image\": \"http:\/\/cdn.last.fm\/flatness\/catalogue\/noimage\/2\/default_album_medium.png\", \"$area\": 261}, \"id\": \"album-2006-09-07: O-Bar, Stockholm, Sweden\", \"name\": \"2006-09-07: O-Bar, Stockholm, Sweden\"}, {\"children\": [], \"data\": {\"playcount\": \"211\", \"artist\": \"Chris Cornell\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/25402479.jpg\", \"$area\": 211}, \"id\": \"album-Lost and Found\", \"name\": \"Lost and Found\"}], \"data\": {\"playcount\": 472, \"$area\": 472}, \"id\": \"artist_Chris Cornell\", \"name\": \"Chris Cornell\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"197\", \"artist\": \"Disturbed\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8634627.jpg\", \"$area\": 197}, \"id\": \"album-The Sickness\", \"name\": \"The Sickness\"}], \"data\": {\"playcount\": 197, \"$area\": 197}, \"id\": \"artist_Disturbed\", \"name\": \"Disturbed\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"493\", \"artist\": \"Erykah Badu\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8591345.jpg\", \"$area\": 493}, \"id\": \"album-Mama's Gun\", \"name\": \"Mama's Gun\"}], \"data\": {\"playcount\": 493, \"$area\": 493}, \"id\": \"artist_Erykah Badu\", \"name\": \"Erykah Badu\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"249\", \"artist\": \"Audioslave\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/32070871.jpg\", \"$area\": 249}, \"id\": \"album-Audioslave\", \"name\": \"Audioslave\"}], \"data\": {\"playcount\": 249, \"$area\": 249}, \"id\": \"artist_Audioslave\", \"name\": \"Audioslave\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"359\", \"artist\": \"Soda Stereo\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/15858421.jpg\", \"$area\": 359}, \"id\": \"album-Comfort y M\u00fasica Para Volar\", \"name\": \"Comfort y M\u00fasica Para Volar\"}], \"data\": {\"playcount\": 359, \"$area\": 359}, \"id\": \"artist_Soda Stereo\", \"name\": \"Soda Stereo\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"302\", \"artist\": \"Sinch\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8776205.jpg\", \"$area\": 302}, \"id\": \"album-Clearing the Channel\", \"name\": \"Clearing the Channel\"}], \"data\": {\"playcount\": 302, \"$area\": 302}, \"id\": \"artist_Sinch\", \"name\": \"Sinch\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"177\", \"artist\": \"Dave Matthews Band\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/32457599.jpg\", \"$area\": 177}, \"id\": \"album-Crash\", \"name\": \"Crash\"}], \"data\": {\"playcount\": 177, \"$area\": 177}, \"id\": \"artist_Dave Matthews Band\", \"name\": \"Dave Matthews Band\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"207\", \"artist\": \"Pearl Jam\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/30352203.jpg\", \"$area\": 207}, \"id\": \"album-Vs.\", \"name\": \"Vs.\"}], \"data\": {\"playcount\": 207, \"$area\": 207}, \"id\": \"artist_Pearl Jam\", \"name\": \"Pearl Jam\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"486\", \"artist\": \"Kr\u00f8m\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/26053425.jpg\", \"$area\": 486}, \"id\": \"album-It All Makes Sense Now\", \"name\": \"It All Makes Sense Now\"}, {\"children\": [], \"data\": {\"playcount\": \"251\", \"artist\": \"Agua de Annique\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/9658733.jpg\", \"$area\": 251}, \"id\": \"album-Air\", \"name\": \"Air\"}], \"data\": {\"playcount\": 737, \"$area\": 737}, \"id\": \"artist_Kr\u00f8m\", \"name\": \"Kr\u00f8m\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"345\", \"artist\": \"Temple of the Dog\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8605651.jpg\", \"$area\": 345}, \"id\": \"album-Temple Of The Dog\", \"name\": \"Temple Of The Dog\"}], \"data\": {\"playcount\": 345, \"$area\": 345}, \"id\": \"artist_Temple of the Dog\", \"name\": \"Temple of the Dog\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"318\", \"artist\": \"Nine Inch Nails\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/29274729.jpg\", \"$area\": 318}, \"id\": \"album-And All That Could Have Been (Still)\", \"name\": \"And All That Could Have Been (Still)\"}], \"data\": {\"playcount\": 318, \"$area\": 318}, \"id\": \"artist_Nine Inch Nails\", \"name\": \"Nine Inch Nails\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"256\", \"artist\": \"Tryo\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/32595059.jpg\", \"$area\": 256}, \"id\": \"album-Mamagubida\", \"name\": \"Mamagubida\"}, {\"children\": [], \"data\": {\"playcount\": \"220\", \"artist\": \"Tryo\", \"image\": \"http:\/\/cdn.last.fm\/flatness\/catalogue\/noimage\/2\/default_album_medium.png\", \"$area\": 220}, \"id\": \"album-Reggae \u00e0 Coup de Cirque\", \"name\": \"Reggae \u00e0 Coup de Cirque\"}, {\"children\": [], \"data\": {\"playcount\": \"181\", \"artist\": \"Tryo\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/16799743.jpg\", \"$area\": 181}, \"id\": \"album-Grain de sable\", \"name\": \"Grain de sable\"}], \"data\": {\"playcount\": 657, \"$area\": 657}, \"id\": \"artist_Tryo\", \"name\": \"Tryo\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"258\", \"artist\": \"Sublime\", \"image\": \"http:\/\/cdn.last.fm\/flatness\/catalogue\/noimage\/2\/default_album_medium.png\", \"$area\": 258}, \"id\": \"album-Best Of\", \"name\": \"Best Of\"}, {\"children\": [], \"data\": {\"playcount\": \"176\", \"artist\": \"Sublime\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/5264426.jpg\", \"$area\": 176}, \"id\": \"album-Robbin' The Hood\", \"name\": \"Robbin' The Hood\"}], \"data\": {\"playcount\": 434, \"$area\": 434}, \"id\": \"artist_Sublime\", \"name\": \"Sublime\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"418\", \"artist\": \"Red Hot Chili Peppers\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8590493.jpg\", \"$area\": 418}, \"id\": \"album-One Hot Minute\", \"name\": \"One Hot Minute\"}], \"data\": {\"playcount\": 418, \"$area\": 418}, \"id\": \"artist_Red Hot Chili Peppers\", \"name\": \"Red Hot Chili Peppers\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"275\", \"artist\": \"Guns N' Roses\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/17597653.jpg\", \"$area\": 275}, \"id\": \"album-Chinese Democracy\", \"name\": \"Chinese Democracy\"}, {\"children\": [], \"data\": {\"playcount\": \"203\", \"artist\": \"Guns N' Roses\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/15231979.jpg\", \"$area\": 203}, \"id\": \"album-Use Your Illusion II\", \"name\": \"Use Your Illusion II\"}], \"data\": {\"playcount\": 478, \"$area\": 478}, \"id\": \"artist_Guns N' Roses\", \"name\": \"Guns N' Roses\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"208\", \"artist\": \"Wax Tailor\", \"image\": \"http:\/\/images.amazon.com\/images\/P\/B0007LCNNE.01.MZZZZZZZ.jpg\", \"$area\": 208}, \"id\": \"album-Tales of the Forgotten Melodies\", \"name\": \"Tales of the Forgotten Melodies\"}], \"data\": {\"playcount\": 208, \"$area\": 208}, \"id\": \"artist_Wax Tailor\", \"name\": \"Wax Tailor\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"208\", \"artist\": \"Radiohead\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/7862623.png\", \"$area\": 208}, \"id\": \"album-In Rainbows\", \"name\": \"In Rainbows\"}], \"data\": {\"playcount\": 208, \"$area\": 208}, \"id\": \"artist_Radiohead\", \"name\": \"Radiohead\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"317\", \"artist\": \"Soundgarden\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8600371.jpg\", \"$area\": 317}, \"id\": \"album-Down On The Upside\", \"name\": \"Down On The Upside\"}, {\"children\": [], \"data\": {\"playcount\": \"290\", \"artist\": \"Soundgarden\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8590515.jpg\", \"$area\": 290}, \"id\": \"album-Superunknown\", \"name\": \"Superunknown\"}], \"data\": {\"playcount\": 607, \"$area\": 607}, \"id\": \"artist_Soundgarden\", \"name\": \"Soundgarden\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"247\", \"artist\": \"Blind Melon\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/15113951.jpg\", \"$area\": 247}, \"id\": \"album-Nico\", \"name\": \"Nico\"}, {\"children\": [], \"data\": {\"playcount\": \"218\", \"artist\": \"Blind Melon\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/45729417.jpg\", \"$area\": 218}, \"id\": \"album-Soup\", \"name\": \"Soup\"}, {\"children\": [], \"data\": {\"playcount\": \"197\", \"artist\": \"Blind Melon\", \"image\": \"http:\/\/images.amazon.com\/images\/P\/B00005V5PW.01.MZZZZZZZ.jpg\", \"$area\": 197}, \"id\": \"album-Classic Masters\", \"name\": \"Classic Masters\"}, {\"children\": [], \"data\": {\"playcount\": \"194\", \"artist\": \"Blind Melon\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/15157989.jpg\", \"$area\": 194}, \"id\": \"album-Blind Melon\", \"name\": \"Blind Melon\"}], \"data\": {\"playcount\": 856, \"$area\": 856}, \"id\": \"artist_Blind Melon\", \"name\": \"Blind Melon\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"537\", \"artist\": \"Incubus\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/17594883.jpg\", \"$area\": 537}, \"id\": \"album-Make Yourself\", \"name\": \"Make Yourself\"}, {\"children\": [], \"data\": {\"playcount\": \"258\", \"artist\": \"Incubus\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/31550385.jpg\", \"$area\": 258}, \"id\": \"album-Light Grenades\", \"name\": \"Light Grenades\"}, {\"children\": [], \"data\": {\"playcount\": \"181\", \"artist\": \"Incubus\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/32309285.jpg\", \"$area\": 181}, \"id\": \"album-Morning View\", \"name\": \"Morning View\"}], \"data\": {\"playcount\": 976, \"$area\": 976}, \"id\": \"artist_Incubus\", \"name\": \"Incubus\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"198\", \"artist\": \"Jack Johnson\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/8599099.jpg\", \"$area\": 198}, \"id\": \"album-On And On\", \"name\": \"On And On\"}, {\"children\": [], \"data\": {\"playcount\": \"186\", \"artist\": \"Jack Johnson\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/30082075.jpg\", \"$area\": 186}, \"id\": \"album-Brushfire Fairytales\", \"name\": \"Brushfire Fairytales\"}], \"data\": {\"playcount\": 384, \"$area\": 384}, \"id\": \"artist_Jack Johnson\", \"name\": \"Jack Johnson\"}, {\"children\": [{\"children\": [], \"data\": {\"playcount\": \"349\", \"artist\": \"Mother Love Bone\", \"image\": \"http:\/\/userserve-ak.last.fm\/serve\/300x300\/21881921.jpg\", \"$area\": 349}, \"id\": \"album-Mother Love Bone\", \"name\": \"Mother Love Bone\"}], \"data\": {\"playcount\": 349, \"$area\": 349}, \"id\": \"artist_Mother Love Bone\", \"name\": \"Mother Love Bone\"}], \"data\": {}, \"id\": \"root\", \"name\": \"Top Albums\"}";
  //end
  //init TreeMap
  var tm = new $jit.TM.Voronoi({
    //where to inject the visualization
    injectInto: 'infovis',
    //show only one tree level
    levelsToShow: 1,
    labelsToShow: [1, 1],
    //parent box title heights
    titleHeight: 4,
    //enable animations
    animate: animate,
    //box offsets
    offset: 2,
    border: 1,
    //use canvas text
    Label: {
      type: labelType,
      size: 9,
      family: 'Tahoma, Verdana, Arial'
    },
    //enable specific canvas styles
    //when rendering nodes
    Node: {
      CanvasStyles: {
        shadowBlur: 0,
        shadowColor: '#000'
      }
    },
    //Attach left and right click events
    Events: {
      enable: true,
      onClick: function(node) {
        if(node) tm.enter(node);
      },
      onRightClick: function() {
        tm.out();
      },
      //change node styles and canvas styles
      //when hovering a node
      onMouseEnter: function(node, eventInfo) {
        if(node) {
          //add node selected styles and replot node
          node.setCanvasStyle('shadowBlur', 7);
          node.setData('color', '#888');
          tm.fx.plotNode(node, tm.canvas);
          tm.labels.plotLabel(tm.canvas, node, tm.controller);
        }
      },
      onMouseLeave: function(node) {
        if(node) {
          node.removeData('color');
          node.removeCanvasStyle('shadowBlur');
          tm.plot();
        }
      }
    },
    //duration of the animations
    duration: 1000,
    //Enable tips
    Tips: {
      enable: true,
      type: 'Native',
      //add positioning offsets
      offsetX: 20,
      offsetY: 20,
      //implement the onShow method to
      //add content to the tooltip when a node
      //is hovered
      onShow: function(tip, node, isLeaf, domElement) {
        var html = "<div class=\"tip-title\">" + node.name 
          + "</div><div class=\"tip-text\">";
        var data = node.data;
        if(data.artist) {
          html += "Artist: " + data.artist + "<br />";
        }
        if(data.playcount) {
          html += "Play count: " + data.playcount;
        }
        if(data.image) {
          html += "<img src=\""+ data.image +"\" class=\"album\" />";
        }
        tip.innerHTML =  html; 
      }  
    },
    //Implement this method for retrieving a requested  
    //subtree that has as root a node with id = nodeId,  
    //and level as depth. This method could also make a server-side  
    //call for the requested subtree. When completed, the onComplete   
    //callback method should be called.  
    request: function(nodeId, level, onComplete){  
      var tree = eval('(' + json + ')');  
      var subtree = $jit.json.getSubtree(tree, nodeId);  
      $jit.json.prune(subtree, 1);  
      onComplete.onComplete(nodeId, subtree);  
    },
    //Add the name of the node in the corresponding label
    //This method is called once, on label creation and only for DOM labels.
    onCreateLabel: function(domElement, node){
        domElement.innerHTML = node.name;
    }
  });
  
  var pjson = eval('(' + json + ')');  
  //$jit.json.prune(pjson, 1);
  
  tm.loadJSON(pjson);
  tm.refresh();
  //end
  //add event to the back button
  var back = $jit.id('back');
  $jit.util.addEvent(back, 'click', function() {
    tm.out();
  });
}


