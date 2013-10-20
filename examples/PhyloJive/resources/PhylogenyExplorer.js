//this is got statistics, popup window, select, expand / collapsed , rotate, setRoot
var labelType, useGradients, nativeTextSupport, animate;

(function () {
    var ua = navigator.userAgent,
        iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
        typeOfCanvas = typeof HTMLCanvasElement,
        nativeCanvasSupport = (typeOfCanvas === 'object' || typeOfCanvas === 'function'),
        textSupport = nativeCanvasSupport && (typeof
            document.createElement('canvas').getContext('2d').fillText === 'function');
    //I'm setting this based on the fact that ExCanvas provides text support for IE
    //and that as of today iPhone/iPad current text support is lame
    labelType = (!nativeCanvasSupport || (textSupport && !iStuff)) ? 'Native' : 'HTML';
    nativeTextSupport = labelType === 'Native';
    useGradients = nativeCanvasSupport;
    animate = !(iStuff || !nativeCanvasSupport);
}());
var Log = {
    elem: false,
    write: function (text) {
        if (!this.elem) {
            this.elem = document.getElementById('log');
        }
        this.elem.innerHTML = text;
        //     this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
    }
};
var Nav = {
    elem: false,
    load: function (opt) {
        function $E(tag, props) {
            var elem = document.createElement(tag);
            for (var p in props) {
                if (typeof props[p] == "object") {
                    $jit.util.extend(elem[p], props[p]);
                } else {
                    elem[p] = props[p];
                }
            }
            return elem;
        }
        opt.codeBase =  '';
        var popupHTML = '<div id="popup-close" style="position:relative; width:100%; background-color:lightblue"><a href="#" onclick="this.parentNode.parentNode.style.display=\'none\';" onmouseover="this.style.cursor=\'pointer\';" class="ui-dialog-titlebar-close ui-corner-all" role="button"><span class="ui-icon ui-icon-closethick">close</span></a></div><div id="popup-text"></div>';
        var navHTML = '<div style="position:relative"><div id="panup" style="position: absolute; left: 13px; top: 4px; width: 18px; height: 18px; cursor: pointer;"><img id="north" src="' + opt.codeBase + 'resources/north-mini.png" /></div><div id="panleft" style="position: absolute; left: 4px; top: 22px; width: 18px; height: 18px; cursor: pointer;"><img id="west" src="' + opt.codeBase + 'resources/west-mini.png" /></div><div id="panright" style="position: absolute; left: 22px; top: 22px; width: 18px; height: 18px; cursor: pointer;"><img id="east" src="' + opt.codeBase + 'resources/east-mini.png" /></div><div id="pandown" style="position: absolute; left: 13px; top: 40px; width: 18px; height: 18px; cursor: pointer;"><img id="south" src="' + opt.codeBase + 'resources/south-mini.png" /></div><div id="zoomout" style="position: absolute; left: 13px; top: 99px; width: 18px; height: 18px; cursor: pointer;"><img id="zoomOUT" src="' + opt.codeBase + 'resources/zoom-minus-mini.png" /></div><div id="zoomworld" style="position: absolute; left: 13px; top: 81px; width: 18px; height: 18px; cursor: pointer;"><img id="world" style="position: relative; width: 18px; height: 18px;" src="' + opt.codeBase + 'resources/zoom-world-mini.png"></div><div id="zoomin" style="position: absolute; left: 13px; top: 63px; width: 18px; height: 18px; cursor: pointer;"><img id="zoomIN" src="'
            + opt.codeBase
            + 'resources/zoom-plus-mini.png" /></div><div style="position:absolute;left:-50px;top:123px;width:130px"> Status: <span id="log"></span></div></div>';

        var jitcontainer, rightJitContainer, centerJitContainer,
            id = typeof (opt.injectInto) == 'string' ? opt.injectInto : opt.injectInto.id,
            infovis, parent, popup, navigation, menu, border;

        //  this function is losing its meaning by adding this. just for now.
        //     var popupContainer = document.getElementById('center-jitcontainer');
        //     var popup = $jit.id('popup');
        //     popup.style.display = 'none';
        border = opt.width * 100 / 90;
        jitcontainer = $E('div', {
            'id': 'jitcontainer',
            'className': 'clearfix roundedCorner',
            'style': {
                'position': 'relative',
                'width': border + 'px',
                'height': ((opt.height + 55 + border / 20)) + 'px'
            }
        });

        rightJitContainer = $E('div', {
            'id': 'right-jitcontainer',
            'className': 'phylojivepadding',
            'style': {
                display: 'none'
            }
        });
        centerJitContainer = $E('div', {
            'id': 'center-jitcontainer',
            'className': 'phylojivepadding'
        });
        infovis = jQuery('#' + id)[0];

        parent = infovis.parentNode;
        parent.replaceChild(jitcontainer, infovis);
        //       parent.appendChild ( jitcontainer );
        centerJitContainer.appendChild(infovis);
        jitcontainer.appendChild(centerJitContainer);
        jitcontainer.appendChild(rightJitContainer);

        popup = $E('div', {
            'id': 'popup',
            'className': '',
            'style': {
                'color': 'black',
                'display': 'none',
                'border': '1px solid green',
                'background-color': '#B5D397',
                'position': 'absolute',
                'left': '50px',
                'top': '90px',
                //'width': '250px',
                //'height': '170px',
                'overflow': 'auto',
                'text-align': 'left'
            }
        });
        jQuery(popup).html(popupHTML);
        centerJitContainer.appendChild(popup);
        jQuery(popup).resizable({
            maxHeight: 450,
            maxWidth: 350,
            minHeight: 250,
            minWidth: 170
        });
        jQuery(popup).draggable({
            handle: '#popup-close',
            containment: '#' + opt.injectInto
        });

        navigation = $E('div', {
            'id': 'navigationPanel',
            'style': {
                'left': (opt.width - 50) + 'px'
            }
        });
        jQuery(navigation).html(navHTML);
        jitcontainer.appendChild(navigation);

        menu = $E('div', {
            'id': 'jitmenubutton',
            'className': 'menubutton'
        });
        jQuery(menu).click(function () {
            toggleScreen(this);
        });
        jitcontainer.appendChild(menu);

    }
};
var settingsPage, updateCharacter, onSetCharacter, onClickAlign, onSetRoot,
    onLateralise, isLateralise, onAnimate, onRender, onBranchLength,
    onBranchMultiply, onGetCharacter, st, toggleScreen;

updateCharacter = function (character) {
    if (!character) {
        return;
    }
    var options = '',
        unselected = '',
        i, name, selectedfirst = st.config.selectedCharacters [ 0 ] || false ,
        first = st.config.selectedCharacters [ 0 ] || false ,
	second = st.config.selectedCharacters [ 1 ] || false ,
	third = st.config.selectedCharacters [ 2 ] || false,
	select1 = '', select2='', select3 ='';
    for (i = 0; i < character.length; i += 1) {
	var opt1 = '', opt2 = '', opt3 = '';
	if ( first !== false && first === character [ i ] ) {
	opt1 = 'selected="selected"'
	}
	if ( second !== false && second === character [ i ] ) {
	opt2 = 'selected="selected"'
	}
	if ( third !== false && third === character [ i ] ) {
	opt3 = 'selected="selected"'
        }
        name = character[i].replace(/_/g, ' ');
	select1 += '<option '+ opt1 +' value="' + character [ i ] + '" >' + name + '</option>';
	select2 += '<option '+ opt2 +' value="' + character [ i ] + '" >' + name + '</option>';
	select3 += '<option '+ opt3 +' value="' + character [ i ] + '" >' + name + '</option>';
    }
    if ( select2 ) {
      select2 = '<option value=""> Please select </option>'+ select2;
    }
    if ( select3 ) {
      select3 = '<option value=""> Please select </option>'+ select3;
    }
    jQuery('#firstCharacter').html(select1);
    jQuery('#secondCharacter').html(select2);
    jQuery('#thirdCharacter').html(select3);
};
settingsPage = function () {
    var rightContainer = $jit.id('right-jitcontainer');
    rightContainer.innerHTML
        += '<div id="tabs"><ul><li><a href="#tabAction">Action</a></li><li><a href="#tabCharacter">Character</a></li><li><a href="#tabLegend">Legend</a></li><li><a href="#tabSearch">Search</a></li><li><a href="#tabInput">Input</a></li></ul>  <div id="tabCharacter"><h4>Select Character</h4><p><label>Select: </label><br/><label id="characterSelection">First Characters: <select id="firstCharacter" onChange="onSetCharacter ( )"> </select><br/>Second Chracter: <select id ="secondCharacter" onChange="onSetCharacter ( )"></select><br/>Third Chracter: <select id ="thirdCharacter" onChange="onSetCharacter ( )"></select></label></p></div><div id ="tabAction"><h4>Actions</h4><p><table><tr><td>Node Actions</td></tr><tr><td>Select</td><td><input id="selectClade" name="options" type="radio" checked /><tr><td>Expand / Collapse</td><td><div id="expandDiv"><input id = "expand" name="options" type="radio" /></div></td></tr><tr><td>Rotate</td><td><div id="rotateDiv"><input id = "rotate" name="options" type="radio" /></div></td></tr><tr><td>Set Root</td><td><input id = "setRoot" name="options" type = "radio" onclick = "onSetRoot ( this );"/></td></tr><!--<tr><td>Get Characters</td><td><input id = "character" name="options" type = "radio" onclick = "onGetCharacter ( this );"/></td></tr>--></table><br/><table><tr><td>Tree Actions</td></tr><tr><td>Align Names</td><td><div id="settings"><input id="alignName" type="checkbox"  onclick="onClickAlign ( this )"/></div></td></tr><tr><td>Ladderize</td><td><input id = "lateralise"  checked type = "checkbox" onclick = "onLateralise ( this );"/></td></tr><tr><td>Animate</td><td><input id="animate" type="checkbox" checked onClick = "onAnimate( this )"/></td></tr><tr><td>Branch Length</td><td><input id="branchLength" type="checkbox" checked onClick = "onBranchLength( this )"/></td></tr><tr><td>Length Multiplier</td><td><label><input id="branchMultiplier" name="multiply" type="radio" onClick = "onBranchMultiply( 0.1 )"/>x0.1</label> <label><input name="multiply" id="branchMultiplier" type="radio" onClick = "onBranchMultiply( 1 )"/>x1</label> <label><input id="branchMultiplier" name="multiply" type="radio" checked onClick = "onBranchMultiply( 5 )"/>x5</label></td></tr><!--<tr><td>Selected Nodes</td><td><div id="selected"></div></td></tr>--></table></p></div><div id="tabLegend"><h4>Legend</h4><p><table id ="legend"><tbody id = "legendBody"><tr><th>Legend:</th><td></td></tr></tbody></table></p></div><div id="tabSearch"><h4>Search</h4><p><table><tr><td>Search:</td><td><input id="searchString" type="text" size="15" /></td><tr><td></td><td><input class ="foswikiButton" type="submit" id="next" value="next"/><input type="submit" id="previous" class ="foswikiButton" value="previous"/></td></tr></table></p></div><div id="tabInput"><h4>Input Tree</h4><p><table><tr><td>Input Tree:</td><td><textarea id="newickTree" size="15"></textarea></td></tr><tr><td></td><td><input id="renderTree" type="submit" value="Render" onclick="onRender ( this )"/></td></tr></table></p></div></div>';
    jQuery('#tabs').tabs();
};
var phylojive =  ( function () {
  var tree, character;
  return {
    drawTree: function ( newickTree ) {
      if ( typeof newickTree === 'undefined' ) {
        alert ('tree is not defined.');
        return;
      }
      var json, legendElem;
      Smits.NewickParse(newickTree);
      this.tree = Smits.getRoot().json();
      st.loadJSON(this.tree);
      st.compute();
      st.config.initCharacter = false;
      legendElem = $jit.id('legend');
      if (st.character) {
        html = st.colorCharacter() || '';
        jQuery('#legendBody').html( html );
        legendElem.style.display = 'inline';
        updateCharacter ( st.characterList );
      } else {
        legendElem.style.display = 'none';
      }
      st.onClick(st.root);
      st.fitScreen();
    },
    drawCharacter: function () {
    }
  }
})();
function smitsNode2JSON (node) {
    var childJSON = [];
    var leaves = 0;
    for (var i = 0; i < node.children.length; i++) {
        var j = smitsNode2JSON(node.children[i])
        childJSON.push(j);
        leaves += j.data.leaf;
        leaves += j.data.leaves;
    }
    var that = node;
    var sampleid = '';
    if (childJSON.length !== 0) {
        return {
            "id": node.id,
            "name": node.name,
            "data": {
                'leaves': leaves,
                'leaf': 0,
                'len': node.len,
                '$type': 'circle',
                '$dim': 5,
                '$color': '#fff'
            },
            "children": childJSON
        };
    } else {
        node.name = node.name.replace(/_/g, ' ');
        var sampleArray = node.name.split(' ');
        if (sampleArray.length > 1) {
            sampleid = sampleArray[1];
        }
        var name = sampleArray[0];
        var nodeJSON = {
            "id": node.id,
            "name": node.name,
            "data": {
                'leaves': 0,
                'leaf': 1,
                'len': node.len,
                '$height': 20,
                '$type': 'none',
                'sampleid': sampleid,
                'name': name
            },
            "children": childJSON
        };
        return nodeJSON;
    }
}
function phylogenyExplorer_init(initial) {
    var config = {
        //id of viz container element
        injectInto: 'infovis',
        width: 800,
        height:600,
        offsetX: 0,
        align: 'left',
        alignName: false,
        lateralise: true,
        branchLength: true,
        branchMultiplier: 1,
        duration: 1000,
        fps: 10,
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 20,
        levelsToShow: Number.MAX_VALUE,
        constrained: false,
        firstCharacter: 'Raceme_length_median',
        //enable panning
        Navigation: {
            enable: true,
            panning: 'avoid nodes',
            zooming: 50
        },
        Tips: {
            enable: true,
            onShow: function (div, node) {
                var url = '',
                    key, i, char, html = '',
                    name = '',
                    index;
                if (node.data.leaf) {
                    name = "<h3>" + node.name + "</h3>";
                    url = '<img class="tipImage" src="http://biocache.ala.org.au/ws/density/map?q='
                        + node.name.split(/\s+/).join('+') + '"/>';
                }
                //         div.innerHTML = node.name;
                // display all characters
                var result = [];
                for (index in st.config.selectedCharacters) {
                    //           if ( node.data.character.hasOwnProperty ( key ) ) {
                    key = st.config.selectedCharacters[index];
                    char = node.data.character[key];
                    html = '<strong>' + key + '</strong>: ';
                    if (typeof char === 'undefined' || char.length === 0 || typeof char[0] === 'undefined') {
                        html += '&mdash;';
                    } else if (typeof char[0] !== 'number') {
                        html += char.join(',');
                    } else {
                        html += char[0].toFixed(4);
                    }
                    result.push(html);
                    //           }
                }
                div.innerHTML = name + result.join('<br/>') + url;
            }
        },
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        Node: {
            height: 40,
            width: 20,
            type: 'circle',
            dim: 5,
            color: '#aaa',
            overridable: true,
            align: 'left'
        },
        Canvas: {
            background: {
                color: '#EEF2F7'
            }
        },
        Edge: {
            type: 'line',
            color: '#000',
            overridable: true,
            lineWidth: 2
        },
        Events: {
            enable: true,
            type: 'Native',
            //Change cursor style when hovering a node  
            onMouseEnter: function (node, event, e) {
                st.canvas.getElement().style.cursor = 'pointer';
                //         popup.style.display = 'inline';
                //         popup.style.top = event.pos.y+ 20 +'px';
                //         popup.style.left = event.pos.x+20 +'px';
                //         var html = '',i ; 
                //         if ( node.data.leaf ) {
                //           html = node.name ;
                //         } else {
                //           for ( i = 0 ; i < node.data.colorCharacter.length ; i += 1 ) {
                //             html += node.data.colorCharacter [ i ] + "<br/>";
                //           }
                //         }
                //         popupText.innerHTML = html;
                // call tips from here
                st.tips.config.onShow(st.tips.tip, node);
                st.tips.setTooltipPosition($jit.util.event.getPos(e));
            },
            onMouseLeave: function () {
                st.canvas.getElement().style.cursor = '';
                //         popup.style.display = 'none';
                st.tips.hide(true);
            },
            onClick: function (node, eventInfo, e) {
                var leafs;
                if (node) {
                    selectedClade = [];

                    var expand = $jit.id('expand');
                    var pos = st.labels.getLabel(node.id);
                    var setRoot = $jit.id('setRoot');
                    var rotate = $jit.id('rotate');
                    var select = $jit.id('selectClade');
                    var loc = parseInt(pos.style.left.replace(/px/, ''), 10) + 100;
                    var locy = parseInt(pos.style.top.replace(/px/, ''), 10) + 40;

                    // re-root the tree.
                    if (setRoot.checked) {
                        var id = node.id;
                        st.setRoot(id, 'animate');
                        st.root = id;
                    }

                    // rotate node
                    if (rotate.checked) {
                        st.computePositions(st.graph.getNode(st.root), 'start');
                        if (typeof node.data.rotate === "undefined") {
                            node.data.rotate = false;
                        }
                        node.data.rotate = !node.data.rotate;
                        st.computePositions(st.graph.getNode(st.root), 'end');
                        st.fx.animate({
                            modes: ['linear', 'node-property:alpha'],
                            onComplete: function () {}
                        });
                    }

                    // action for 
                    if (expand.checked) {
                        st.setCollapsed(node);
                        var level = st.nodesExpCol(node);
                        if (level) {
                            st.zoomIndex = level;
                        }
                        st.computePositions(st.graph.getNode(st.root), '');
                        st.plot();
                    }

                    // select clade and display it on the popup window
                    if (select.checked) {
                        st.clickedNode = node;
                        node.eachSubgraph(function (elem) {
                            if (elem.data.leaf) {
                                if (leafs) {
                                    leafs += "<li>" + elem.name + "</li>";
                                } else {
                                    leafs = "<li>" + elem.name + "</li>";
                                }
                                selectedClade.push(elem);
                            }
                        });

                        popup.style.display = 'inline';
                        popup.style.top = locy + 'px';
                        popup.style.left = loc + 'px';
                        popupText.innerHTML = st.config.presentClade(selectedClade);
                        st.config.onPresentClade();
                        st.plot();
                    }
                }
            }
        },
        presentClade: function (clade) {
          var tmpl = st.config.tmpl,
            nodeList = [],
            node, html, split;
            for (var i = 0; ((i < clade.length) & (i < 30)); i++) {
              node = {}
              node.name = clade [ i ].name;
              nodeList.push ( node ) ;
            }
          if ( tmpl ) {
            tmpl = _.template ( tmpl );
            html = tmpl ( {nodeList: nodeList});
          } else {
            
          }
          return html;

        }, //presentClade 

        onPresentClade:function ( ) {
                $('a.thumbImage1').colorbox({iframe:true,width:'80%',height:'80%'});
          }, // onPresentClade
        tmpl : '<ul><% _.each(nodeList , function( value ) { %> <li> <%= value.name %> </li> <% }); %> </ul>',
        Tips:{
          enable:true,
          onShow:function( div, node){
          var url ='',   key, i , char,
          html ='',name ='', maptitle='', index;
          if (!!node.name) {         
              url = '<img class="tipImage" src="http://biocache.ala.org.au/ws/density/map?q='+ node.name.replace(' ','+')+'"/>';
              maptitle = '<br/>ALA <strong>reported</strong> occurences';
              name = "<i>"+node.name + "</i>";
                }
          else { name = " unnamed clade ";
                }
          name = name + "<strong> click</strong> for ";
          if ( node.data.leaf ) { // end taxon
            name = name + "for linked data"; 	  
          } else { //clade 		    
            //clade 		    
            name = "Part of " + name; 
              if (node.length < 30) {
                      name = name + "clade members"; }
                else {
                      name = name + "30 clade members"; }            
              } 
          name = "<h3>"+ name + "</h3>";
          // display all characters
          var result = [] ;
          for ( index in st.config.selectedCharacters ) {
              key = st.config.selectedCharacters [ index ];
              char = node.data.character [ key ];
              html = '<strong>' + key + '</strong>: ';
              if ( typeof char === 'undefined' || char.length === 0 || typeof char[0] === 'undefined' ){
                html += '&mdash;';
              } else if ( typeof char[0] !== 'number') {
                html += char.join ( ',<br/>....' );
              } else {
                html += char[0].toFixed ( 4 );
              }
              result.push ( html );
          }
          div.innerHTML = name + result.join ( '<br/>' ) + maptitle + url ;
            }
        },
        onBeforeCompute: function (node) {
            Log.write("loading " + node.name);
        },

        onAfterCompute: function (msg) {
            if (msg) {
                Log.write(msg);
            } else {
                Log.write("done");
            }
        },
        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function (label, node) {
            var char, list = st.config.selectedCharacters /*st.characterList*/
            ,
                charTypeMapping = st.charTypeMapping,
                i, values, div, colorCoding = st.colorCoding,
                firstColor, index, temp, shape;
            label.id = node.id;
            label.innerHTML = node.name;
            label.onclick = function () {
                var setRoot = $jit.id('setRoot');
                if (!setRoot.checked) {
                    st.controller.Events.onClick(node);
                }
            };
            //set label styles
            var style = label.style;
            style.width = 'auto';
            style.height = 17 + 'px';
            style.cursor = 'pointer';
            style.color = '#333';
            style.fontSize = '0.8em';
            style.textAlign = 'left';
            style.paddingTop = '3px';
            style.display = 'inline';

            style.color = node.data.$color;
            //         if (node.data.color) 
            var boxes = '';
            var first = st.config.firstCharacter;
            var shapes = ['box', 'star', 'triangle'],
                index = 0;

            boxes = '';

            for (i = 0; i < list.length; i += 1) {
                //           for ( char in node.data.character ) 
                char = list[i];
                values = node.data.character[char];
                if (values && values.length > 0 && typeof values[0] !== 'undefined') {
                    if (charTypeMapping[char] === st.config.typeEnum.quali) {
                        temp = colorCoding[char];
                        value = values[0];
                        if (values.length > 1) {
                            value = 'multiple';
                        }
                        shape = '<div class="' + temp[value].shape
                            + '" style="float:left;background-color:'
                            + temp[value].color + ';" title="' + char + ' : '
                            + values.join(' , ') + '"></div>';
                        if (i === 0) {
                            firstColor = temp[value].color;
                        }
                    } else if (charTypeMapping[char] === st.config.typeEnum.quant) {
                        temp = st.colorCodingQuali[char];
                        value = values[0];
                        index = st.findIndex(value, st.range[char]);
                        shape = '<div class="' + temp[index].shape
                            + '" style="float:left;background-color:'
                            + temp[index].color + ';" title="' + char + ' : '
                            + temp[index].name + '"></div>';

                        if (i === 0) {
                            //                   firstColor = temp [ index ].color;
                            firstColor = st.config.quantColor[st.config.quantColor.length - 1];
                        }
                    }
                } else {
                    shape = '<div class="empty" style="float:left;background-color:;" title="empty"></div>';
                }
                if (first !== char) {
                    boxes += shape;
                } else {
                    boxes = shape + boxes;
                }
            }
            //       if (node.data.leaf) {
            //           label.innerHTML = boxes + '&nbsp;&nbsp;<div style="display:inline;color:' + firstColor  + '">' + node.name + '</div>';
            // //         }
            // make names for nodes.      
            if (label) {
                if (!node.data.leaf) {
                    label.innerHTML = boxes
                        + '&nbsp;&nbsp;<div style="display:inline;color:'
                        + firstColor + '">' + node.data.leaves + ' Taxa</div>';
                } else {
                    label.innerHTML = boxes
                        + '&nbsp;&nbsp;<div style="display:inline;color:'
                        + firstColor + '">' + node.name + '</div>';
                }
            }

        },

        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function (node) {
            //add some color to the nodes in the path between the
            //root node and the selected node.
            //       if (!node.data.leaf) {
            var result = true,
                char;
            if (!node.data.leaf) {
                for (var key in st.config.selectedCharacters) {
                    if ( node.data.characterConsistency.hasOwnProperty ( key ) ) {
                      char = st.config.selectedCharacters[key];
                      result = result && node.data.characterConsistency[char];
                    }
                }
            }
            if (!result && node.data.$type !== 'triangle') {
                node.data.$type = 'square';
            }
            if (node.data.$type === 'circle') {
                if (node.data.rotate) {
                    node.data.$color = 'purple';
                } else {
                    node.data.$color = 'red';
                }
            } else if (node.data.$type === 'square') {
                node.data.$dim = 10;
                node.data.$color = "red";
            }
            /*      }else {
      }*/
            if (node.data.$type === 'triangle') {
                node.data.$dim = 15;
                node.data.$color = '#EE9AA2';
            } else if (node.data.$type !== 'square') {
                delete node.data.$dim;
            }
            // color for root node.
            if (st.root === node.id) {
                node.data.$color = 'lightblue';
            }
        },
        //This method is called right before plotting
        //an edge. It's useful for changing an individual edge
        //style properties before plotting it.
        //Edge data proprties prefixed with a dollar sign will
        //override the Edge global style properties.
        onBeforePlotLine: function (adj) {},
        onClick: function (node, eventInfo, e) {
            if (node) {
                var elem = document.getElementById('selected');
                if (node.leaf) {
                    elem.innerHTML = node.name;
                } else {
                    elem.innerHTML = '';
                    node.subGraph(function (n) {
                        if (n.data.leaf) {
                            elem.innerHTML += n.name + "<br/>";
                        }
                    });
                }
            }
        },
        onPlaceLabel: function (dom, node) {
            var alignName = $jit.id('alignName')
            if (node.selected) {
                dom.style.display = 'none';
            }
            //             remove labels of non-leaf nodes
            if (!node.data.leaf) {
                dom.style.display = 'none';
                //         dom.innerHTML = node.data.leaves + ' Taxa';
            }
            //    // show label for the last visible node in the clade
            dom.style.display = node.data.display || 'block';
            if (alignName.checked) {
                jQuery('#' + dom.id + ' .quant').addClass('quantAlign');
            } else {
                jQuery('#' + dom.id + ' .quant').removeClass('quantAlign');
            }
        }
    };
    var height = config.height,
        width = config.width || 800;
    $jit.util.extend(config, initial);
    Nav.load(config);
    var html, rightContainer = $jit.id('right-jitcontainer'),
        popup = $jit.id('popup'),
        popupText = $jit.id('popup-text');
    settingsPage();

    //init data
    var dataObject, json = '';

    if (config.tree) {
        dataObject = new Smits.PhyloCanvas.NewickParse(config.tree);
    }
    if (typeof(dataObject)==='object') {
        json = smitsNode2JSON(dataObject.getRoot());
    }

    var selectedClade;
    var zoomIN = $jit.id('zoomIN'),
        zoomOUT = $jit.id('zoomOUT'),
        world = $jit.id('world');
    //end
    //init Spacetree
    //Create a new ST instance
    st = new $jit.Phylo(config);
    isLateralise = function () {
        return st.config.lateralise;
    };
    //load json data
    st.loadJSON(json);
    //compute node positions and layout
    st.compute();
    
    //color line depending on character info
    st.character = config.character || {};
    
    // recursive algorithm to do propogate the line color
    //append to legend table
    var legendElem = $jit.id('legend');
    if (st.character) {
      html = st.colorCharacter() || '';
      jQuery('#legendBody').html(html);
      legendElem.style.display = 'inline';
      updateCharacter(st.characterList);
    } else {
      legendElem.style.display = 'none';
    }
    var north = $jit.id('north'),
        east = $jit.id('east'),
        west = $jit.id('west'),
        south = $jit.id('south');

    function clickHandler() {
        var pos = {};
        switch (this.id) {
        case 'north':
            pos = {
                x: 0,
                y: 10
            };
            break;
        case 'west':
            pos = {
                x: -10,
                y: 0
            };
            break;
        case 'east':
            pos = {
                x: 10,
                y: 0
            };
            break;
        case 'south':
            pos = {
                x: 0,
                y: -10
            };
            break;
        }
        var canvas = st.canvas;
        canvas.translate(pos.x, pos.y);
    }
    north.onmousedown = south.onmousedown = east.onmousedown = west.onmousedown = clickHandler;

    function zoomHandler() {
        var scroll;
        switch (this.id) {
        case 'zoomIN':
            scroll = +1;
            break;
        case 'zoomOUT':
            scroll = -1;
            break;
        }
        st.zoom(scroll);
    }
    zoomIN.onclick = zoomOUT.onclick = zoomHandler;
    world.onclick = function () {
        st.fitScreen();
    };
    var result = [];
    var pos, prevSearch;
    var searchBtn = $jit.id('searchString');

    function nextStep(pos, step, length) {
        // logic so that search starts from the first instance 
        if (typeof pos === 'undefined') {
            return step > 0 ? 0 : length - 1;
        }
        var i = (pos + step) % length;
        return i < 0 ? length + i : i;
    }

    var search = function (step) {
            var searchString = searchBtn.value;
            // if search has been done, clear the selected label
            var len;
            var root = st.graph.getNode(st.root);
            if (result.length > 0) {
                len = result.length;
                pos = nextStep(pos, step, len);
                var prevElem = st.labels.getLabel(result[nextStep(pos, -1 * step, len)].id);
                prevElem.style.backgroundColor = '';
            }
            if (searchString && prevSearch !== searchString) {
                result = [];
                prevSearch = searchString;
                root.eachSubgraph(function (node) {
                    var name = node.name,
                        pattern = new RegExp(searchString, 'i');
                    if (name.match(pattern)) {
                        result.push(node);
                    }
                });
                pos = nextStep(undefined, step, len);
            } else if (searchString === '') {
                result = [];
            }
            if (result.length > 0) {
                var shownNode = result[pos];
                if (!shownNode.exist) {
                    root.collapsed = true;
                    st.nodesExpCol(root);
                    st.computePositions(root, '');
                    st.plot();
                }
                // transalate to top
                var canvas = st.canvas,
                    oy = canvas.translateOffsetY,
                    xTranslate = 0,
                    yTranslate = -oy;
                st.canvas.translate(xTranslate, yTranslate);

                var element = st.labels.getLabel(result[pos].id);
                element.style.backgroundColor = 'yellow';
                jQuery(element).click();
            }
        };

    // add event handlers to listen to enter key on search field
    function keyHandler(e) {
        var ENTER = 13;
        var shift = e.shiftKey;
        if (shift && e.keyCode === ENTER) {
            search(-1);
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        } else if (e.keyCode === ENTER) {
            search(1);
            if (e.preventDefault) {
                e.preventDefault();
            }
            return false;
        }
    }

    if (searchBtn.addEventListener) {
        searchBtn.addEventListener('keydown', keyHandler, false);
    } else if (searchBtn.attachEvent) {
        searchBtn.attachEvent('onkeydown', keyHandler);
    }


    var next = $jit.id('next'),
        previous = $jit.id('previous');
    next.onclick = function () {
        search(1);
    };
    previous.onclick = function () {
        search(-1);
    };

    //     var popup = $jit.id('popup');
    //     var popupText = $jit.id('popup-text');
    /* function onclickAlign 
       This function will align the names in a vertical line.
    */
    onClickAlign = function (alignName) {
        if (alignName.checked) {
            st.config.alignName = true;
            jQuery('.quant').addClass('quantAlign');
        } else {
            st.config.alignName = false;
            jQuery('.quant').removeClass('quantAlign');
        }
        st.plot();
    };
    onSetRoot = function (setRoot) {
        if (setRoot.value === 'checked') {
            var id = st.clickedNode.id;
            st.setRoot(id, 'animate');
        }
    };
    onLateralise = function (lat) {
        if (lat.checked) {
            st.config.lateralise = true;
        } else {
            st.config.lateralise = false;
        }
        st.computePositions(st.graph.getNode(st.root), '');
        st.plot();
    };
    var animateDuration;
    onAnimate = function (animate) {
        if (!animateDuration) {
            animateDuration = st.config.duration;
        }
        if (animate.checked) {
            st.config.duration = animateDuration;
        } else {
            st.config.duration = 0;
        }
    };
    onRender = function (render) {
        var newickTree = $jit.id('newickTree').value;
        if (newickTree) {
            var dataObject = new Smits.PhyloCanvas.NewickParse(newickTree),
                rootObject, json = '';

            if (typeof(dataObject)==='object') {
                rootObject = dataObject.getRoot(),
                json = smitsNode2JSON( rootObject );
                st.loadJSON(json);
            }
            st.compute();
            st.config.initCharacter = false;
            var legendElem = $jit.id('legend');
            if (st.character) {
                html = st.colorCharacter() || '';
                jQuery('#legendBody').html(html);
                legendElem.style.display = 'inline';
                updateCharacter(st.characterList);
            } else {
                legendElem.style.display = 'none';
            }
            st.onClick(st.root);
            st.fitScreen();
        }
    };
    onGetCharacter = function (char) {

    };
    onBranchLength = function (checkbox) {
        st.config.branchLength = checkbox.checked;
        st.computePositions(st.graph.getNode(st.root), '');
        st.plot();
    };
    onBranchMultiply = function (value) {
        st.config.branchMultiplier = value;
        st.computePositions(st.graph.getNode(st.root), '');
        st.plot();
    };
    toggleScreen = function (elem) {
        var style = jQuery('#right-jitcontainer')[0].style;
        style.display = (style.display === 'none' ? '' : 'none');
        if (style.display) {
            jQuery(elem).removeClass('on');
        } else {
            jQuery(elem).addClass('on');
        }
    };
    onSetCharacter = function () {
        populateCharacters();
        //     TODO: disable phylo and loading gif
        //     TODO: parsimony characters and redraw
        redraw();
        //     TODO: enable phylo.
    };

    function populateCharacters() {
        var first, second, third, value = [];
        first = jQuery('#firstCharacter').val();
        second = jQuery('#secondCharacter').val();
        third = jQuery('#thirdCharacter').val();
        first && value.push(first);
        second && value.push(second);
        third && value.push(third);
        st.config.firstCharacter = first || '';
        st.config.selectedCharacters = value;
        first = typeof ( first ) === 'undefined' ? '':first;
        second = typeof ( second ) === 'undefined' ? '':second;
        third = typeof ( third ) === 'undefined' ? '':third;
        app.navigate ( 'character/'+first+'/'+second+'/'+third );
    }

    function redraw() {
        var legendElem = $jit.id('legend'),
            i, node, label;
        //     st.loadJSON (json);
        //     st.compute ();
        if (st.character) {
            html = st.colorCharacter() || '';
            jQuery('#legendBody').html(html);
            legendElem.style.display = 'inline';
        } else {
            legendElem.style.display = 'none';
        }

        for (i in st.graph.nodes) {
            if (st.graph.nodes.hasOwnProperty(i)) {
                node = st.graph.nodes[i];
                //         if( node.data.leaf ) {
                label = jQuery('#' + node.id)[0];
                label && st.config.onCreateLabel(label, node);
                //         }
            }
        }

        //optional: make a translation of the tree
        //emulate a click on the root node.
        st.onClick(st.root);
        st.fitScreen();
    }
    var AppRouter = Backbone.Router.extend({
      
      routes: {
        ""                      : "start",
        "character/*char"     : "characterSelection"
      },
      
      start: function() {
        
        //optional: make a translation of the tree
        //emulate a click on the root node.
        st.onClick(st.root);
        st.fitScreen();
      },
      
      characterSelection: function( char ) {
        var chars = char.split ( '/');
        var index = [ 'firstCharacter' , 'secondCharacter' , 'thirdCharacter' ];
        for ( var i = 0 ; i  < chars.length ; i ++ ) {
          var ch = unescape ( chars [ i ] );
          var select = jQuery ( '#'+index[i] )[0];
          for ( var j = 0 ; j < select.options.length; j ++ ) {
            if ( select.options[j].value === ch ) {
              select.selectedIndex = j;
              break;
            }
          }
        }
        onSetCharacter ();
      }
      
    });
    
    var app = new AppRouter();
    Backbone.history.start();
};
