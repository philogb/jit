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
        opt.codeBase = opt.codeBase || '';
        
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
        centerJitContainer.appendChild(infovis);
        jitcontainer.appendChild(centerJitContainer);
        jitcontainer.appendChild(rightJitContainer);

   }
};
var st;

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
                // call tips from here
                st.tips.config.onShow(st.tips.tip, node);
                st.tips.setTooltipPosition($jit.util.event.getPos(e));
            },
            onMouseLeave: function () {
                st.canvas.getElement().style.cursor = '';
                //         popup.style.display = 'none';
                st.tips.hide(true);
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
            var boxes = '';
            var first = st.config.firstCharacter;
            var shapes = ['box', 'star', 'triangle'],
                index = 0;

            boxes = '';

            for (i = 0; i < list.length; i += 1) {
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
        onPlaceLabel: function (dom, node) {
            //var alignName = $jit.id('alignName')
            if (node.selected) {
                dom.style.display = 'none';
            }
            //             remove labels of non-leaf nodes
            if (!node.data.leaf) {
                dom.style.display = 'none';
            }
            // show label for the last visible node in the clade
            dom.style.display = node.data.display || 'block';
                jQuery('#' + dom.id + ' .quant').removeClass('quantAlign');
        }
    };
    $jit.util.extend(config, initial);
    Nav.load(config);

    //init data
    var dataObject, json = '';

    if (config.tree) {
        dataObject = new Smits.PhyloCanvas.NewickParse(config.tree);
    }
    if (typeof(dataObject)==='object') {
        json = smitsNode2JSON(dataObject.getRoot());
    }

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
    if (st.character) {
      st.colorCharacter();
    }
    st.onClick(st.root);
    st.fitScreen();
};