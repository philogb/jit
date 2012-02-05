var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport 
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem) 
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
  // init data
  var json = {
    id: "190_0",
    name: "Pearl Jam",
    children: [
        {
          id: "306208_1",
          name: "Pearl Jam & Cypress Hill",
          data: {
            relation: "<h4>Pearl Jam & Cypress Hill</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: collaboration)</div></li><li>Cypress Hill <div>(relation: collaboration)</div></li></ul>"
          },
          children: [
            {
              id: "84_2",
              name: "Cypress Hill",
              data: {
                relation: "<h4>Cypress Hill</h4><b>Connections:</b><ul><li>Pearl Jam & Cypress Hill <div>(relation: collaboration)</div></li></ul>"
              },
              children: []
            }
          ]
        },
        {
          id: "107877_3",
          name: "Neil Young & Pearl Jam",
          data: {
            relation: "<h4>Neil Young & Pearl Jam</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: collaboration)</div></li><li>Neil Young <div>(relation: collaboration)</div></li></ul>"
          },
          children: [
            {
              id: "964_4",
              name: "Neil Young",
              data: {
                relation: "<h4>Neil Young</h4><b>Connections:</b><ul><li>Neil Young & Pearl Jam <div>(relation: collaboration)</div></li></ul>"
              },
              children: []
            }
          ]
        },
        {
          id: "236797_5",
          name: "Jeff Ament",
          data: {
            relation: "<h4>Jeff Ament</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: member of band)</div></li><li>Temple of the Dog <div>(relation: member of band)</div></li><li>Mother Love Bone <div>(relation: member of band)</div></li><li>Green River <div>(relation: member of band)</div></li><li>M.A.C.C. <div>(relation: collaboration)</div></li><li>Three Fish <div>(relation: member of band)</div></li><li>Gossman Project <div>(relation: member of band)</div></li></ul>"
          },
          children: [
              {
                id: "1756_6",
                name: "Temple of the Dog",
                data: {
                  relation: "<h4>Temple of the Dog</h4><b>Connections:</b><ul><li>Jeff Ament <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "14581_7",
                name: "Mother Love Bone",
                data: {
                  relation: "<h4>Mother Love Bone</h4><b>Connections:</b><ul><li>Jeff Ament <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "50188_8",
                name: "Green River",
                data: {
                  relation: "<h4>Green River</h4><b>Connections:</b><ul><li>Jeff Ament <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "65452_9",
                name: "M.A.C.C.",
                data: {
                  relation: "<h4>M.A.C.C.</h4><b>Connections:</b><ul><li>Jeff Ament <div>(relation: collaboration)</div></li></ul>"
                },
                children: []
              },
              {
                id: "115632_10",
                name: "Three Fish",
                data: {
                  relation: "<h4>Three Fish</h4><b>Connections:</b><ul><li>Jeff Ament <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "346850_11",
                name: "Gossman Project",
                data: {
                  relation: "<h4>Gossman Project</h4><b>Connections:</b><ul><li>Jeff Ament <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              }
          ]
        },
        {
          id: "41529_12",
          name: "Stone Gossard",
          data: {
            relation: "<h4>Stone Gossard</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: member of band)</div></li><li>Temple of the Dog <div>(relation: member of band)</div></li><li>Mother Love Bone <div>(relation: member of band)</div></li><li>Brad <div>(relation: member of band)</div></li><li>Green River <div>(relation: member of band)</div></li><li>Gossman Project <div>(relation: member of band)</div></li></ul>"
          },
          children: [
              {
                id: "1756_13",
                name: "Temple of the Dog",
                data: {
                  relation: "<h4>Temple of the Dog</h4><b>Connections:</b><ul><li>Stone Gossard <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "14581_14",
                name: "Mother Love Bone",
                data: {
                  relation: "<h4>Mother Love Bone</h4><b>Connections:</b><ul><li>Stone Gossard <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "24119_15",
                name: "Brad",
                data: {
                  relation: "<h4>Brad</h4><b>Connections:</b><ul><li>Stone Gossard <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "50188_16",
                name: "Green River",
                data: {
                  relation: "<h4>Green River</h4><b>Connections:</b><ul><li>Stone Gossard <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "346850_17",
                name: "Gossman Project",
                data: {
                  relation: "<h4>Gossman Project</h4><b>Connections:</b><ul><li>Stone Gossard <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              }
          ]
        },
        {
          id: "131161_18",
          name: "Eddie Vedder",
          data: {
            relation: "<h4>Eddie Vedder</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: member of band)</div></li><li>Temple of the Dog <div>(relation: member of band)</div></li><li>Eddie Vedder & Zeke <div>(relation: collaboration)</div></li><li>Bad Radio <div>(relation: member of band)</div></li><li>Beck & Eddie Vedder <div>(relation: collaboration)</div></li></ul>"
          },
          children: [
              {
                id: "1756_19",
                name: "Temple of the Dog",
                data: {
                  relation: "<h4>Temple of the Dog</h4><b>Connections:</b><ul><li>Eddie Vedder <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "72007_20",
                name: "Eddie Vedder & Zeke",
                data: {
                  relation: "<h4>Eddie Vedder & Zeke</h4><b>Connections:</b><ul><li>Eddie Vedder <div>(relation: collaboration)</div></li></ul>"
                },
                children: []
              },
              {
                id: "236657_21",
                name: "Bad Radio",
                data: {
                  relation: "<h4>Bad Radio</h4><b>Connections:</b><ul><li>Eddie Vedder <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "432176_22",
                name: "Beck & Eddie Vedder",
                data: {
                  relation: "<h4>Beck & Eddie Vedder</h4><b>Connections:</b><ul><li>Eddie Vedder <div>(relation: collaboration)</div></li></ul>"
                },
                children: []
              }
          ]
        },
        {
          id: "236583_23",
          name: "Mike McCready",
          data: {
            relation: "<h4>Mike McCready</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: member of band)</div></li><li>Mad Season <div>(relation: member of band)</div></li><li>Temple of the Dog <div>(relation: member of band)</div></li><li>$10,000 Gold Chain <div>(relation: collaboration)</div></li><li>M.A.C.C. <div>(relation: collaboration)</div></li><li>The Rockfords <div>(relation: member of band)</div></li><li>Gossman Project <div>(relation: member of band)</div></li></ul>"
          },
          children: [
              {
                id: "1744_24",
                name: "Mad Season",
                data: {
                  relation: "<h4>Mad Season</h4><b>Connections:</b><ul><li>Mike McCready <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "1756_25",
                name: "Temple of the Dog",
                data: {
                  relation: "<h4>Temple of the Dog</h4><b>Connections:</b><ul><li>Mike McCready <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "43661_26",
                name: "$10,000 Gold Chain",
                data: {
                  relation: "<h4>$10,000 Gold Chain</h4><b>Connections:</b><ul><li>Mike McCready <div>(relation: collaboration)</div></li></ul>"
                },
                children: []
              },
              {
                id: "65452_27",
                name: "M.A.C.C.",
                data: {
                  relation: "<h4>M.A.C.C.</h4><b>Connections:</b><ul><li>Mike McCready <div>(relation: collaboration)</div></li></ul>"
                },
                children: []
              },
              {
                id: "153766_28",
                name: "The Rockfords",
                data: {
                  relation: "<h4>The Rockfords</h4><b>Connections:</b><ul><li>Mike McCready <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "346850_29",
                name: "Gossman Project",
                data: {
                  relation: "<h4>Gossman Project</h4><b>Connections:</b><ul><li>Mike McCready <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              }
          ]
        },
        {
          id: "236585_30",
          name: "Matt Cameron",
          data: {
            relation: "<h4>Matt Cameron</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: member of band)</div></li><li>Soundgarden <div>(relation: member of band)</div></li><li>Temple of the Dog <div>(relation: member of band)</div></li><li>Eleven <div>(relation: supporting musician)</div></li><li>Queens of the Stone Age <div>(relation: member of band)</div></li><li>Wellwater Conspiracy <div>(relation: member of band)</div></li><li>M.A.C.C. <div>(relation: collaboration)</div></li><li>Tone Dogs <div>(relation: member of band)</div></li></ul>"
          },
          children: [
              {
                id: "1111_31",
                name: "Soundgarden",
                data: {
                  relation: "<h4>Soundgarden</h4><b>Connections:</b><ul><li>Matt Cameron <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "1756_32",
                name: "Temple of the Dog",
                data: {
                  relation: "<h4>Temple of the Dog</h4><b>Connections:</b><ul><li>Matt Cameron <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "9570_33",
                name: "Eleven",
                data: {
                  relation: "<h4>Eleven</h4><b>Connections:</b><ul><li>Matt Cameron <div>(relation: supporting musician)</div></li></ul>"
                },
                children: []
              },
              {
                id: "11783_34",
                name: "Queens of the Stone Age",
                data: {
                  relation: "<h4>Queens of the Stone Age</h4><b>Connections:</b><ul><li>Matt Cameron <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "61972_35",
                name: "Wellwater Conspiracy",
                data: {
                  relation: "<h4>Wellwater Conspiracy</h4><b>Connections:</b><ul><li>Matt Cameron <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "65452_36",
                name: "M.A.C.C.",
                data: {
                  relation: "<h4>M.A.C.C.</h4><b>Connections:</b><ul><li>Matt Cameron <div>(relation: collaboration)</div></li></ul>"
                },
                children: []
              },
              {
                id: "353097_37",
                name: "Tone Dogs",
                data: {
                  relation: "<h4>Tone Dogs</h4><b>Connections:</b><ul><li>Matt Cameron <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              }
          ]
        },
        {
          id: "236594_38",
          name: "Dave Krusen",
          data: {
            relation: "<h4>Dave Krusen</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: member of band)</div></li><li>Candlebox <div>(relation: member of band)</div></li></ul>"
          },
          children: [
            {
              id: "2092_39",
              name: "Candlebox",
              data: {
                relation: "<h4>Candlebox</h4><b>Connections:</b><ul><li>Dave Krusen <div>(relation: member of band)</div></li></ul>"
              },
              children: []
            }
          ]
        },
        {
          id: "236022_40",
          name: "Matt Chamberlain",
          data: {
            relation: "<h4>Matt Chamberlain</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: member of band)</div></li><li>Critters Buggin <div>(relation: member of band)</div></li><li>Edie Brickell and New Bohemians <div>(relation: member of band)</div></li></ul>"
          },
          children: [
              {
                id: "54761_41",
                name: "Critters Buggin",
                data: {
                  relation: "<h4>Critters Buggin</h4><b>Connections:</b><ul><li>Matt Chamberlain <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "92043_42",
                name: "Edie Brickell and New Bohemians",
                data: {
                  relation: "<h4>Edie Brickell and New Bohemians</h4><b>Connections:</b><ul><li>Matt Chamberlain <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              }
          ]
        },
        {
          id: "236611_43",
          name: "Dave Abbruzzese",
          data: {
            relation: "<h4>Dave Abbruzzese</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: member of band)</div></li><li>Green Romance Orchestra <div>(relation: member of band)</div></li></ul>"
          },
          children: [
            {
              id: "276933_44",
              name: "Green Romance Orchestra",
              data: {
                relation: "<h4>Green Romance Orchestra</h4><b>Connections:</b><ul><li>Dave Abbruzzese <div>(relation: member of band)</div></li></ul>"
              },
              children: []
            }
          ]
        },
        {
          id: "236612_45",
          name: "Jack Irons",
          data: {
            relation: "<h4>Jack Irons</h4><b>Connections:</b><ul><li>Pearl Jam <div>(relation: member of band)</div></li><li>Redd Kross <div>(relation: member of band)</div></li><li>Eleven <div>(relation: member of band)</div></li><li>Red Hot Chili Peppers <div>(relation: member of band)</div></li><li>Anthym <div>(relation: member of band)</div></li><li>What Is This? <div>(relation: member of band)</div></li></ul>"
          },
          children: [
              {
                id: "4619_46",
                name: "Redd Kross",
                data: {
                  relation: "<h4>Redd Kross</h4><b>Connections:</b><ul><li>Jack Irons <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "9570_47",
                name: "Eleven",
                data: {
                  relation: "<h4>Eleven</h4><b>Connections:</b><ul><li>Jack Irons <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "12389_48",
                name: "Red Hot Chili Peppers",
                data: {
                  relation: "<h4>Red Hot Chili Peppers</h4><b>Connections:</b><ul><li>Jack Irons <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "114288_49",
                name: "Anthym",
                data: {
                  relation: "<h4>Anthym</h4><b>Connections:</b><ul><li>Jack Irons <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              },
              {
                id: "240013_50",
                name: "What Is This?",
                data: {
                  relation: "<h4>What Is This?</h4><b>Connections:</b><ul><li>Jack Irons <div>(relation: member of band)</div></li></ul>"
                },
                children: []
              }
          ]
        }
    ],
    data: {
      relation: "<h4>Pearl Jam</h4><b>Connections:</b><ul><li>Pearl Jam & Cypress Hill <div>(relation: collaboration)</div></li><li>Neil Young & Pearl Jam <div>(relation: collaboration)</div></li><li>Jeff Ament <div>(relation: member of band)</div></li><li>Stone Gossard <div>(relation: member of band)</div></li><li>Eddie Vedder <div>(relation: member of band)</div></li><li>Mike McCready <div>(relation: member of band)</div></li><li>Matt Cameron <div>(relation: member of band)</div></li><li>Dave Krusen <div>(relation: member of band)</div></li><li>Matt Chamberlain <div>(relation: member of band)</div></li><li>Dave Abbruzzese <div>(relation: member of band)</div></li><li>Jack Irons <div>(relation: member of band)</div></li></ul>"
    }
  };
  // end
  // init RGraph
  var rgraph = new $jit.RGraph({
    // Where to append the visualization
    injectInto: 'infovis',
    // Optional: create a background canvas and plot
    // concentric circles in it.
    background: {
      CanvasStyles: {
        strokeStyle: '#555',
        shadowBlur: 10,
        shadowColor: '#ccc'
      }
    },
    // Set Edge and Node styles
    Node: {
      overridable: true,
      color: '#ccddee',
      dim: 12
    },
    Edge: {
      overridable: true,
      color: '#C17878',
      lineWidth: 1.5
    },
    // Use native canvas text
    Label: {
      type: labelType,
      size: 11,
      family: 'Verdana',
      color: '#fff'
    },
    //Add events for Dragging and dropping nodes
    Events: {
      enable: true,
      type: 'Native',
      onMouseEnter: function(node, eventInfo, e){
        rgraph.canvas.getElement().style.cursor = 'move';
      },
      onMouseLeave: function(node, eventInfo, e){
        rgraph.canvas.getElement().style.cursor = '';
      },
      onDragMove: function(node, eventInfo, e){
        var pos = eventInfo.getPos();
        node.pos.setc(pos.x, pos.y);
        rgraph.plot();
      },
      onDragEnd: function(node, eventInfo, e){
        rgraph.compute('end');
        rgraph.fx.animate( {
          modes: [
            'linear'
          ],
          duration: 700,
          transition: $jit.Trans.Elastic.easeOut
        });
      },
      //touch events
      onTouchStart: function(node, eventInfo, e) {
        //stop the default event
        $jit.util.event.stop(e);
      },
      onTouchMove: function(node, eventInfo, e){
        //stop the default event
        $jit.util.event.stop(e);
        var pos = eventInfo.getPos();
        node.pos.setc(pos.x, pos.y);
        rgraph.plot();
      },
      onTouchEnd: function(node, eventInfo, e){
        //stop the default event
        $jit.util.event.stop(e);
        rgraph.compute('end');
        rgraph.fx.animate( {
          modes: [
            'linear'
          ],
          duration: 700,
          transition: $jit.Trans.Elastic.easeOut
        });
      }
    },
    //Add the name of the node in the correponding label
    //and a click handler to move the graph.
    //This method is called once, on label creation.
    onCreateLabel: function(domElement, node){
      domElement.innerHTML = node.name;
    },
    //Change some label dom properties.
    //This method is called each time a label is plotted.
    onPlaceLabel: function(domElement, node){
        var style = domElement.style;
        style.display = '';
        style.cursor = 'pointer';

        if (node._depth <= 1) {
            style.fontSize = "0.8em";
            style.color = "#ccc";
        
        } else if(node._depth == 2){
            style.fontSize = "0.7em";
            style.color = "#494949";
        
        } else {
            style.display = 'none';
        }

        var left = parseInt(style.left);
        var w = domElement.offsetWidth;
        style.left = (left - w / 2) + 'px';
    }
  });
  // load JSON data
  rgraph.loadJSON(json);
  // compute positions and make the first plot
  rgraph.refresh();
  // end
}
