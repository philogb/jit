function init() {

    "use strict";

    var $jit = window.$jit;
    var Log = window.Log;

    //init data    
    var json1_load = [{
        "id": "1",
        "name": "window 1",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "1",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }, {
        "id": "2",
        "name": "window 2",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "1",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "1"
        }]
    }];

    var json1_run = [{
        "id": "1",
        "name": "1",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "2",
                    "1"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }, {
        "id": "2",
        "name": "3",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "2",
                    "1"
                ],
                $type: "arrow"
            },
            nodeTo: "1"
        }]
    }];

    //init data
    var json2_load = [{
        "id": "1",
        "name": "window 1",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "1",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }, {
        "id": "2",
        "name": "window 2",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "1",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "1"
        }, {
            "data": {
                "$direction": [
                    "2",
                    "3"
                ],
                $type: "arrow"
            },
            nodeTo: "3"
        }]
    }, {
        "id": "3",
        "name": "window 3",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "2",
                    "3"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }];

    var json2_run = [{
        "id": "1",
        "name": "window 1",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "2",
                    "1"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }, {
        "id": "2",
        "name": "window 2",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "2",
                    "1"
                ],
                $type: "arrow"
            },
            nodeTo: "1"
        }, {
            "data": {
                "$direction": [
                    "3",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "3"
        }]
    }, {
        "id": "3",
        "name": "window 3",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "3",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }];

    //init data
    var json3_load = [{
        "id": "2",
        "name": "window 2",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "2",
                    "1"
                ],
                $type: "arrow"
            },
            nodeTo: "1"
        }, {
            "data": {
                "$direction": [
                    "2",
                    "3"
                ],
                $type: "arrow"
            },
            nodeTo: "3"
        }]
    }, {
        "id": "1",
        "name": "window 1",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "2",
                    "1"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }, {
        "id": "3",
        "name": "window 3",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "2",
                    "3"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }];

    var json3_run = [{
        "id": "1",
        "name": "window 1",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "1",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }, {
        "id": "2",
        "name": "window 2",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "1",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "1"
        }, {
            "data": {
                "$direction": [
                    "3",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "3"
        }]
    }, {
        "id": "3",
        "name": "window 3",
        "adjacencies": [{
            "data": {
                "$direction": [
                    "3",
                    "2"
                ],
                $type: "arrow"
            },
            nodeTo: "2"
        }]
    }];

//    var json3_run = [{
//        "id": "1",
//        "name": "window 1",
//        "adjacencies": [{
//            "data": {
//                "$direction": [
//                    "1",
//                    "2"
//                ],
//                $type: "arrow"
//            },
//            nodeTo: "2"
//        }, {
//            "data": {
//                "$direction": [
//                    "3",
//                    "1"
//                ],
//                $type: "arrow"
//            },
//            nodeTo: "3"
//        }]
//    }, {
//        "id": "2",
//        "name": "window 2",
//        "adjacencies": [{
//            "data": {
//                "$direction": [
//                    "1",
//                    "2"
//                ],
//                $type: "arrow"
//            },
//            nodeTo: "1"
//        }]
//    }, {
//        "id": "3",
//        "name": "window 3",
//        "adjacencies": [{
//            "data": {
//                "$direction": [
//                    "3",
//                    "1"
//                ],
//                $type: "arrow"
//            },
//            nodeTo: "1"
//        }]
//    }];

    function createRGraph() {
        return new $jit.RGraph({
            'injectInto': 'infovis',

            'duration': 1000,

            'background': {
                'CanvasStyles': {
                    'strokeStyle': '#555',
                    'shadowBlur': 50,
                    'shadowColor': '#ccc'
                }
            },
            Events: {
                enable: false,
                type: 'Native',
                enableForEdges: true
            },

            Node: {
                color: '#ddeeff',
                overridable: true
            },

            Edge: {
                overridable: true,
                color: '#C17878',
                lineWidth: 1.5
            },

            onCreateLabel: function (domElement, node) {
                domElement.innerHTML = node.name;
            }

        });
    }

    var rgraph = createRGraph();
    var button;

    // example 1 //
    ///////////////
    button = $jit.id('loadSample1');
    button.onclick = function () {
        //load data.
        rgraph.loadJSON(json1_load);

        // show
        rgraph.refresh();
    };

    button = $jit.id('runSample1');
    button.onclick = function () {

        rgraph.onClick('2', {
            hideLabels: false,
            onComplete: function () {
                rgraph.op.morph(json1_run, {
                    fps: 55,
                    type: 'fade:seq',
                    duration: 500,
                    hideLabels: false,
                    onComplete: function () {
                        Log.write("morph complete!");
                    }
                });
            }
        });

    };

    // example 2 //
    ///////////////
    button = $jit.id('loadSample2');
    button.onclick = function () {
        //load data.
        rgraph.loadJSON(json2_load);

        // show
        rgraph.refresh();
    };

    button = $jit.id('runSample2');
    button.onclick = function () {

        rgraph.onClick('3', {
            hideLabels: false,
            onComplete: function () {
                rgraph.op.morph(json2_run, {
                    fps: 55,
                    type: 'fade:seq',
                    duration: 500,
                    hideLabels: false,
                    onComplete: function () {
                        Log.write("morph complete!");
                    }
                });
            }
        });

    };


    // example 3 //
    ///////////////
    button = $jit.id('loadSample3');
    button.onclick = function () {
        //load data.
        rgraph.loadJSON(json3_load);

        // show
        rgraph.refresh();
    };

    button = $jit.id('runSample3');
    button.onclick = function () {

        rgraph.onClick('1', {
            hideLabels: false,
            onComplete: function () {
                rgraph.op.morph(json3_run, {
                    fps: 55,
                    type: 'fade:seq',
                    duration: 500,
                    hideLabels: false,
                    onComplete: function () {
                        Log.write("morph complete!");
                    }
                });
            }
        });

    };


}
