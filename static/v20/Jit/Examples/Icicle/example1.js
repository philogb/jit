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


var icicle;

function init(){
  //left panel controls
  controls();

  // init data
  var json = {
    "id": "node02",
    "name": "0.2",
    "data": {
      "$area": 8,
      "$dim": 8,
      "$color": "#001eff"
    },
    "children": [
        {
          "id": "node13",
          "name": "1.3",
          "data": {
            "$area": 10,
            "$dim": 10,
            "$color": "#9554ff"
          },
          "children": [
              {
                "id": "node24",
                "name": "2.4",
                "data": {
                  "$area": 3,
                  "$dim": 3,
                  "$color": "#ee6aff"
                },
                "children": [
                    {
                      "id": "node35",
                      "name": "3.5",
                      "data": {
                        "$area": 10,
                        "$dim": 10,
                        "$color": "#ff0ca2"
                      },
                      "children": [
                          {
                            "id": "node46",
                            "name": "4.6",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5c6f"
                            }
                            
                          }, {
                            "id": "node47",
                            "name": "4.7",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7b8a"
                            }
                            
                          }, {
                            "id": "node48",
                            "name": "4.8",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7b8a"
                            }
                            
                          }, {
                            "id": "node49",
                            "name": "4.9",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7787"
                            }
                            
                          }, {
                            "id": "node410",
                            "name": "4.10",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff5468"
                            }
                            
                          }, {
                            "id": "node411",
                            "name": "4.11",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6173"
                            }
                            
                          }
                      ]
                    }, {
                      "id": "node312",
                      "name": "3.12",
                      "data": {
                        "$area": 1,
                        "$dim": 1,
                        "$color": "#ff74ca"
                      },
                      "children": [
                          {
                            "id": "node413",
                            "name": "4.13",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff4056"
                            }
                            
                          }, {
                            "id": "node414",
                            "name": "4.14",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7383"
                            }
                            
                          }, {
                            "id": "node415",
                            "name": "4.15",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff4d61"
                            }
                            
                          }
                      ]
                    }
                ]
              }, {
                "id": "node216",
                "name": "2.16",
                "data": {
                  "$area": 8,
                  "$dim": 8,
                  "$color": "#ea47ff"
                },
                "children": [
                    {
                      "id": "node317",
                      "name": "3.17",
                      "data": {
                        "$area": 9,
                        "$dim": 9,
                        "$color": "#ff55be"
                      },
                      "children": [
                          {
                            "id": "node418",
                            "name": "4.18",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff3048"
                            }
                          }, {
                            "id": "node419",
                            "name": "4.19",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff5064"
                            }
                          }
                      ]
                    }, {
                      "id": "node320",
                      "name": "3.20",
                      "data": {
                        "$area": 8,
                        "$dim": 8,
                        "$color": "#ff5ac0"
                      },
                      "children": [
                          {
                            "id": "node421",
                            "name": "4.21",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff697b"
                            }
                          }, {
                            "id": "node422",
                            "name": "4.22",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff4e62"
                            }
                          }, {
                            "id": "node423",
                            "name": "4.23",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6f80"
                            }
                          }, {
                            "id": "node424",
                            "name": "4.24",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff596c"
                            }
                          }
                      ]
                    }, {
                      "id": "node325",
                      "name": "3.25",
                      "data": {
                        "$area": 7,
                        "$dim": 7,
                        "$color": "#ff5ec1"
                      },
                      "children": [
                          {
                            "id": "node426",
                            "name": "4.26",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff203a"
                            }
                          }, {
                            "id": "node427",
                            "name": "4.27",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6072"
                            }
                          }
                      ]
                    }, {
                      "id": "node328",
                      "name": "3.28",
                      "data": {
                        "$area": 3,
                        "$dim": 3,
                        "$color": "#ff71c9"
                      },
                      "children": [
                          {
                            "id": "node429",
                            "name": "4.29",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff4d61"
                            }
                          }, {
                            "id": "node430",
                            "name": "4.30",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff6f7f"
                            }
                          }, {
                            "id": "node431",
                            "name": "4.31",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff445a"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node232",
                "name": "2.32",
                "data": {
                  "$area": 7,
                  "$dim": 7,
                  "$color": "#ea4eff"
                },
                "children": [
                    {
                      "id": "node333",
                      "name": "3.33",
                      "data": {
                        "$area": 2,
                        "$dim": 2,
                        "$color": "#ff78cb"
                      },
                      "children": [
                          {
                            "id": "node434",
                            "name": "4.34",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff0d29"
                            }
                          }, {
                            "id": "node435",
                            "name": "4.35",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7383"
                            }
                          }
                      ]
                    }, {
                      "id": "node336",
                      "name": "3.36",
                      "data": {
                        "$area": 9,
                        "$dim": 9,
                        "$color": "#ff5cc0"
                      },
                      "children": [
                          {
                            "id": "node437",
                            "name": "4.37",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7686"
                            }
                          }, {
                            "id": "node438",
                            "name": "4.38",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5b6e"
                            }
                          }, {
                            "id": "node439",
                            "name": "4.39",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff576a"
                            }
                          }, {
                            "id": "node440",
                            "name": "4.40",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7282"
                            }
                          }, {
                            "id": "node441",
                            "name": "4.41",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff6476"
                            }
                          }
                      ]
                    }, {
                      "id": "node342",
                      "name": "3.42",
                      "data": {
                        "$area": 6,
                        "$dim": 6,
                        "$color": "#ff68c5"
                      },
                      "children": [
                          {
                            "id": "node443",
                            "name": "4.43",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7b8a"
                            }
                          }, {
                            "id": "node444",
                            "name": "4.44",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7b8a"
                            }
                          }, {
                            "id": "node445",
                            "name": "4.45",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7686"
                            }
                          }, {
                            "id": "node446",
                            "name": "4.46",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff586c"
                            }
                          }, {
                            "id": "node447",
                            "name": "4.47",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6779"
                            }
                          }, {
                            "id": "node448",
                            "name": "4.48",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff5367"
                            }
                          }
                      ]
                    }, {
                      "id": "node349",
                      "name": "3.49",
                      "data": {
                        "$area": 7,
                        "$dim": 7,
                        "$color": "#ff64c3"
                      },
                      "children": [
                          {
                            "id": "node450",
                            "name": "4.50",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff4056"
                            }
                          }, {
                            "id": "node451",
                            "name": "4.51",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6375"
                            }
                          }, {
                            "id": "node452",
                            "name": "4.52",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff5c6f"
                            }
                          }
                      ]
                    }, {
                      "id": "node353",
                      "name": "3.53",
                      "data": {
                        "$area": 4,
                        "$dim": 4,
                        "$color": "#ff70c8"
                      },
                      "children": [
                          {
                            "id": "node454",
                            "name": "4.54",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7484"
                            }
                          }, {
                            "id": "node455",
                            "name": "4.55",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6d7e"
                            }
                          }, {
                            "id": "node456",
                            "name": "4.56",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6577"
                            }
                          }, {
                            "id": "node457",
                            "name": "4.57",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff697b"
                            }
                          }, {
                            "id": "node458",
                            "name": "4.58",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6d7e"
                            }
                          }, {
                            "id": "node459",
                            "name": "4.59",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff6274"
                            }
                          }
                      ]
                    }, {
                      "id": "node360",
                      "name": "3.60",
                      "data": {
                        "$area": 4,
                        "$dim": 4,
                        "$color": "#ff70c8"
                      },
                      "children": [
                          {
                            "id": "node461",
                            "name": "4.61",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7b8a"
                            }
                          }, {
                            "id": "node462",
                            "name": "4.62",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7b8a"
                            }
                          }, {
                            "id": "node463",
                            "name": "4.63",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7686"
                            }
                          }, {
                            "id": "node464",
                            "name": "4.64",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7181"
                            }
                          }, {
                            "id": "node465",
                            "name": "4.65",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff4e63"
                            }
                          }, {
                            "id": "node466",
                            "name": "4.66",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff5367"
                            }
                          }
                      ]
                    }
                ]
              }
          ]
        }, {
          "id": "node167",
          "name": "1.67",
          "data": {
            "$area": 3,
            "$dim": 3,
            "$color": "#a872ff"
          },
          "children": [
              {
                "id": "node268",
                "name": "2.68",
                "data": {
                  "$area": 3,
                  "$dim": 3,
                  "$color": "#ef72ff"
                },
                "children": [
                    {
                      "id": "node369",
                      "name": "3.69",
                      "data": {
                        "$area": 3,
                        "$dim": 3,
                        "$color": "#ff6ec7"
                      },
                      "children": [
                          {
                            "id": "node470",
                            "name": "4.70",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff596d"
                            }
                          }, {
                            "id": "node471",
                            "name": "4.71",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7383"
                            }
                          }, {
                            "id": "node472",
                            "name": "4.72",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7383"
                            }
                          }, {
                            "id": "node473",
                            "name": "4.73",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6678"
                            }
                          }, {
                            "id": "node474",
                            "name": "4.74",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff596d"
                            }
                          }
                      ]
                    }, {
                      "id": "node375",
                      "name": "3.75",
                      "data": {
                        "$area": 10,
                        "$dim": 10,
                        "$color": "#ff46b8"
                      },
                      "children": [
                          {
                            "id": "node476",
                            "name": "4.76",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6274"
                            }
                          }, {
                            "id": "node477",
                            "name": "4.77",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff5569"
                            }
                          }, {
                            "id": "node478",
                            "name": "4.78",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6f7f"
                            }
                          }, {
                            "id": "node479",
                            "name": "4.79",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7383"
                            }
                          }, {
                            "id": "node480",
                            "name": "4.80",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff6678"
                            }
                          }
                      ]
                    }, {
                      "id": "node381",
                      "name": "3.81",
                      "data": {
                        "$area": 6,
                        "$dim": 6,
                        "$color": "#ff5dc1"
                      },
                      "children": [
                          {
                            "id": "node482",
                            "name": "4.82",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6375"
                            }
                          }, {
                            "id": "node483",
                            "name": "4.83",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff6779"
                            }
                          }, {
                            "id": "node484",
                            "name": "4.84",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff5a6e"
                            }
                          }, {
                            "id": "node485",
                            "name": "4.85",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff5a6e"
                            }
                          }
                      ]
                    }, {
                      "id": "node386",
                      "name": "3.86",
                      "data": {
                        "$area": 1,
                        "$dim": 1,
                        "$color": "#ff7acc"
                      },
                      "children": [
                          {
                            "id": "node487",
                            "name": "4.87",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6375"
                            }
                          }, {
                            "id": "node488",
                            "name": "4.88",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6b7c"
                            }
                          }, {
                            "id": "node489",
                            "name": "4.89",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff566a"
                            }
                          }, {
                            "id": "node490",
                            "name": "4.90",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff5a6e"
                            }
                          }
                      ]
                    }, {
                      "id": "node391",
                      "name": "3.91",
                      "data": {
                        "$area": 2,
                        "$dim": 2,
                        "$color": "#ff74ca"
                      },
                      "children": [
                          {
                            "id": "node492",
                            "name": "4.92",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7989"
                            }
                          }, {
                            "id": "node493",
                            "name": "4.93",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff5b6e"
                            }
                          }, {
                            "id": "node494",
                            "name": "4.94",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7989"
                            }
                          }, {
                            "id": "node495",
                            "name": "4.95",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff495e"
                            }
                          }, {
                            "id": "node496",
                            "name": "4.96",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6779"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node297",
                "name": "2.97",
                "data": {
                  "$area": 3,
                  "$dim": 3,
                  "$color": "#ef72ff"
                },
                "children": [
                    {
                      "id": "node398",
                      "name": "3.98",
                      "data": {
                        "$area": 10,
                        "$dim": 10,
                        "$color": "#ff40b6"
                      },
                      "children": [
                          {
                            "id": "node499",
                            "name": "4.99",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff5c6f"
                            }
                          }, {
                            "id": "node4100",
                            "name": "4.100",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7888"
                            }
                          }, {
                            "id": "node4101",
                            "name": "4.101",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff5569"
                            }
                          }, {
                            "id": "node4102",
                            "name": "4.102",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff5569"
                            }
                          }
                      ]
                    }, {
                      "id": "node3103",
                      "name": "3.103",
                      "data": {
                        "$area": 7,
                        "$dim": 7,
                        "$color": "#ff53bd"
                      },
                      "children": [
                          {
                            "id": "node4104",
                            "name": "4.104",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4105",
                            "name": "4.105",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff697b"
                            }
                          }, {
                            "id": "node4106",
                            "name": "4.106",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4107",
                            "name": "4.107",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4108",
                            "name": "4.108",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff697b"
                            }
                          }
                      ]
                    }, {
                      "id": "node3109",
                      "name": "3.109",
                      "data": {
                        "$area": 3,
                        "$dim": 3,
                        "$color": "#ff6cc7"
                      },
                      "children": [
                          {
                            "id": "node4110",
                            "name": "4.110",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7585"
                            }
                          }, {
                            "id": "node4111",
                            "name": "4.111",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6778"
                            }
                          }, {
                            "id": "node4112",
                            "name": "4.112",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff6a7c"
                            }
                          }, {
                            "id": "node4113",
                            "name": "4.113",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff6072"
                            }
                          }, {
                            "id": "node4114",
                            "name": "4.114",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6778"
                            }
                          }, {
                            "id": "node4115",
                            "name": "4.115",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff7182"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2116",
                "name": "2.116",
                "data": {
                  "$area": 7,
                  "$dim": 7,
                  "$color": "#ec60ff"
                },
                "children": [
                    {
                      "id": "node3117",
                      "name": "3.117",
                      "data": {
                        "$area": 3,
                        "$dim": 3,
                        "$color": "#ff62c3"
                      },
                      "children": [
                          {
                            "id": "node4118",
                            "name": "4.118",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff6577"
                            }
                          }, {
                            "id": "node4119",
                            "name": "4.119",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7686"
                            }
                          }, {
                            "id": "node4120",
                            "name": "4.120",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff6274"
                            }
                          }, {
                            "id": "node4121",
                            "name": "4.121",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff6577"
                            }
                          }, {
                            "id": "node4122",
                            "name": "4.122",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7989"
                            }
                          }, {
                            "id": "node4123",
                            "name": "4.123",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff6274"
                            }
                          }
                      ]
                    }, {
                      "id": "node3124",
                      "name": "3.124",
                      "data": {
                        "$area": 4,
                        "$dim": 4,
                        "$color": "#ff58bf"
                      },
                      "children": [
                          {
                            "id": "node4125",
                            "name": "4.125",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff4056"
                            }
                          }, {
                            "id": "node4126",
                            "name": "4.126",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff596d"
                            }
                          }, {
                            "id": "node4127",
                            "name": "4.127",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6c7d"
                            }
                          }, {
                            "id": "node4128",
                            "name": "4.128",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7989"
                            }
                          }
                      ]
                    }, {
                      "id": "node3129",
                      "name": "3.129",
                      "data": {
                        "$area": 6,
                        "$dim": 6,
                        "$color": "#ff45b8"
                      },
                      "children": [
                          {
                            "id": "node4130",
                            "name": "4.130",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5367"
                            }
                          }, {
                            "id": "node4131",
                            "name": "4.131",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4132",
                            "name": "4.132",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7485"
                            }
                          }, {
                            "id": "node4133",
                            "name": "4.133",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7485"
                            }
                          }, {
                            "id": "node4134",
                            "name": "4.134",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6f80"
                            }
                          }, {
                            "id": "node4135",
                            "name": "4.135",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6f80"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2136",
                "name": "2.136",
                "data": {
                  "$area": 2,
                  "$dim": 2,
                  "$color": "#ef76ff"
                },
                "children": [
                    {
                      "id": "node3137",
                      "name": "3.137",
                      "data": {
                        "$area": 4,
                        "$dim": 4,
                        "$color": "#ff67c5"
                      },
                      "children": [
                          {
                            "id": "node4138",
                            "name": "4.138",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff5569"
                            }
                          }, {
                            "id": "node4139",
                            "name": "4.139",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff475c"
                            }
                          }, {
                            "id": "node4140",
                            "name": "4.140",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff6375"
                            }
                          }
                      ]
                    }, {
                      "id": "node3141",
                      "name": "3.141",
                      "data": {
                        "$area": 6,
                        "$dim": 6,
                        "$color": "#ff5bc0"
                      },
                      "children": [
                          {
                            "id": "node4142",
                            "name": "4.142",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff6072"
                            }
                          }, {
                            "id": "node4143",
                            "name": "4.143",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff7080"
                            }
                          }, {
                            "id": "node4144",
                            "name": "4.144",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7c8b"
                            }
                          }, {
                            "id": "node4145",
                            "name": "4.145",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff586b"
                            }
                          }, {
                            "id": "node4146",
                            "name": "4.146",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff5c6f"
                            }
                          }
                      ]
                    }, {
                      "id": "node3147",
                      "name": "3.147",
                      "data": {
                        "$area": 1,
                        "$dim": 1,
                        "$color": "#ff79cc"
                      },
                      "children": [
                          {
                            "id": "node4148",
                            "name": "4.148",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff687a"
                            }
                          }, {
                            "id": "node4149",
                            "name": "4.149",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff576b"
                            }
                          }, {
                            "id": "node4150",
                            "name": "4.150",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6375"
                            }
                          }, {
                            "id": "node4151",
                            "name": "4.151",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6e7f"
                            }
                          }, {
                            "id": "node4152",
                            "name": "4.152",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6e7f"
                            }
                          }
                      ]
                    }, {
                      "id": "node3153",
                      "name": "3.153",
                      "data": {
                        "$area": 1,
                        "$dim": 1,
                        "$color": "#ff79cc"
                      },
                      "children": [
                          {
                            "id": "node4154",
                            "name": "4.154",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff6f7f"
                            }
                          }, {
                            "id": "node4155",
                            "name": "4.155",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff5e70"
                            }
                          }, {
                            "id": "node4156",
                            "name": "4.156",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7787"
                            }
                          }, {
                            "id": "node4157",
                            "name": "4.157",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff3b52"
                            }
                          }
                      ]
                    }, {
                      "id": "node3158",
                      "name": "3.158",
                      "data": {
                        "$area": 9,
                        "$dim": 9,
                        "$color": "#ff49b9"
                      },
                      "children": [
                          {
                            "id": "node4159",
                            "name": "4.159",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7b8a"
                            }
                          }, {
                            "id": "node4160",
                            "name": "4.160",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7686"
                            }
                          }, {
                            "id": "node4161",
                            "name": "4.161",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6d7e"
                            }
                          }, {
                            "id": "node4162",
                            "name": "4.162",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7686"
                            }
                          }, {
                            "id": "node4163",
                            "name": "4.163",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff576a"
                            }
                          }, {
                            "id": "node4164",
                            "name": "4.164",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff5266"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2165",
                "name": "2.165",
                "data": {
                  "$area": 3,
                  "$dim": 3,
                  "$color": "#ef72ff"
                },
                "children": [
                    {
                      "id": "node3166",
                      "name": "3.166",
                      "data": {
                        "$area": 2,
                        "$dim": 2,
                        "$color": "#ff73c9"
                      },
                      "children": [
                          {
                            "id": "node4167",
                            "name": "4.167",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff243e"
                            }
                          }, {
                            "id": "node4168",
                            "name": "4.168",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff5b6e"
                            }
                          }
                      ]
                    }, {
                      "id": "node3169",
                      "name": "3.169",
                      "data": {
                        "$area": 4,
                        "$dim": 4,
                        "$color": "#ff66c4"
                      },
                      "children": [
                          {
                            "id": "node4170",
                            "name": "4.170",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6d7e"
                            }
                          }, {
                            "id": "node4171",
                            "name": "4.171",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6072"
                            }
                          }, {
                            "id": "node4172",
                            "name": "4.172",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6072"
                            }
                          }, {
                            "id": "node4173",
                            "name": "4.173",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff5266"
                            }
                          }
                      ]
                    }, {
                      "id": "node3174",
                      "name": "3.174",
                      "data": {
                        "$area": 6,
                        "$dim": 6,
                        "$color": "#ff59bf"
                      },
                      "children": [
                          {
                            "id": "node4175",
                            "name": "4.175",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff6a7c"
                            }
                          }, {
                            "id": "node4176",
                            "name": "4.176",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff1531"
                            }
                          }
                      ]
                    }, {
                      "id": "node3177",
                      "name": "3.177",
                      "data": {
                        "$area": 2,
                        "$dim": 2,
                        "$color": "#ff73c9"
                      },
                      "children": [
                          {
                            "id": "node4178",
                            "name": "4.178",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff2b43"
                            }
                          }, {
                            "id": "node4179",
                            "name": "4.179",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7787"
                            }
                          }, {
                            "id": "node4180",
                            "name": "4.180",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff5e70"
                            }
                          }
                      ]
                    }, {
                      "id": "node3181",
                      "name": "3.181",
                      "data": {
                        "$area": 3,
                        "$dim": 3,
                        "$color": "#ff6cc7"
                      },
                      "children": [
                          {
                            "id": "node4182",
                            "name": "4.182",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6072"
                            }
                          }, {
                            "id": "node4183",
                            "name": "4.183",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff203a"
                            }
                          }
                      ]
                    }, {
                      "id": "node3184",
                      "name": "3.184",
                      "data": {
                        "$area": 3,
                        "$dim": 3,
                        "$color": "#ff6cc7"
                      },
                      "children": [
                          {
                            "id": "node4185",
                            "name": "4.185",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7080"
                            }
                          }, {
                            "id": "node4186",
                            "name": "4.186",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff6072"
                            }
                          }, {
                            "id": "node4187",
                            "name": "4.187",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff3048"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2188",
                "name": "2.188",
                "data": {
                  "$area": 10,
                  "$dim": 10,
                  "$color": "#eb52ff"
                },
                "children": [
                    {
                      "id": "node3189",
                      "name": "3.189",
                      "data": {
                        "$area": 9,
                        "$dim": 9,
                        "$color": "#ff17a6"
                      },
                      "children": [
                          {
                            "id": "node4190",
                            "name": "4.190",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5e70"
                            }
                          }, {
                            "id": "node4191",
                            "name": "4.191",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7787"
                            }
                          }, {
                            "id": "node4192",
                            "name": "4.192",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5e70"
                            }
                          }, {
                            "id": "node4193",
                            "name": "4.193",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6f7f"
                            }
                          }, {
                            "id": "node4194",
                            "name": "4.194",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5e70"
                            }
                          }
                      ]
                    }, {
                      "id": "node3195",
                      "name": "3.195",
                      "data": {
                        "$area": 2,
                        "$dim": 2,
                        "$color": "#ff68c5"
                      },
                      "children": [
                          {
                            "id": "node4196",
                            "name": "4.196",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff5e70"
                            }
                          }, {
                            "id": "node4197",
                            "name": "4.197",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7787"
                            }
                          }, {
                            "id": "node4198",
                            "name": "4.198",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff6f7f"
                            }
                          }, {
                            "id": "node4199",
                            "name": "4.199",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff3b52"
                            }
                          }
                      ]
                    }
                ]
              }
          ]
        }, {
          "id": "node1200",
          "name": "1.200",
          "data": {
            "$area": 7,
            "$dim": 7,
            "$color": "#9d61ff"
          },
          "children": [
              {
                "id": "node2201",
                "name": "2.201",
                "data": {
                  "$area": 4,
                  "$dim": 4,
                  "$color": "#ed66ff"
                },
                "children": [
                    {
                      "id": "node3202",
                      "name": "3.202",
                      "data": {
                        "$area": 6,
                        "$dim": 6,
                        "$color": "#ff66c4"
                      },
                      "children": [
                          {
                            "id": "node4203",
                            "name": "4.203",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff4a5f"
                            }
                          }, {
                            "id": "node4204",
                            "name": "4.204",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff354d"
                            }
                          }
                      ]
                    }, {
                      "id": "node3205",
                      "name": "3.205",
                      "data": {
                        "$area": 9,
                        "$dim": 9,
                        "$color": "#ff59bf"
                      },
                      "children": [
                          {
                            "id": "node4206",
                            "name": "4.206",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff6678"
                            }
                          }, {
                            "id": "node4207",
                            "name": "4.207",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff6375"
                            }
                          }, {
                            "id": "node4208",
                            "name": "4.208",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff6375"
                            }
                          }, {
                            "id": "node4209",
                            "name": "4.209",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff6f7f"
                            }
                          }, {
                            "id": "node4210",
                            "name": "4.210",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff6375"
                            }
                          }
                      ]
                    }, {
                      "id": "node3211",
                      "name": "3.211",
                      "data": {
                        "$area": 1,
                        "$dim": 1,
                        "$color": "#ff7bcc"
                      },
                      "children": [
                          {
                            "id": "node4212",
                            "name": "4.212",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4213",
                            "name": "4.213",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7c8b"
                            }
                          }, {
                            "id": "node4214",
                            "name": "4.214",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff6173"
                            }
                          }, {
                            "id": "node4215",
                            "name": "4.215",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7c8b"
                            }
                          }, {
                            "id": "node4216",
                            "name": "4.216",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff5d70"
                            }
                          }, {
                            "id": "node4217",
                            "name": "4.217",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6476"
                            }
                          }
                      ]
                    }, {
                      "id": "node3218",
                      "name": "3.218",
                      "data": {
                        "$area": 4,
                        "$dim": 4,
                        "$color": "#ff6fc8"
                      },
                      "children": [
                          {
                            "id": "node4219",
                            "name": "4.219",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff4d61"
                            }
                          }, {
                            "id": "node4220",
                            "name": "4.220",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff334b"
                            }
                          }
                      ]
                    }, {
                      "id": "node3221",
                      "name": "3.221",
                      "data": {
                        "$area": 9,
                        "$dim": 9,
                        "$color": "#ff59bf"
                      },
                      "children": [
                          {
                            "id": "node4222",
                            "name": "4.222",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff485d"
                            }
                          }, {
                            "id": "node4223",
                            "name": "4.223",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff384f"
                            }
                          }
                      ]
                    }, {
                      "id": "node3224",
                      "name": "3.224",
                      "data": {
                        "$area": 1,
                        "$dim": 1,
                        "$color": "#ff7bcc"
                      },
                      "children": [
                          {
                            "id": "node4225",
                            "name": "4.225",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff384f"
                            }
                          }, {
                            "id": "node4226",
                            "name": "4.226",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff485d"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2227",
                "name": "2.227",
                "data": {
                  "$area": 5,
                  "$dim": 5,
                  "$color": "#ec60ff"
                },
                "children": [
                    {
                      "id": "node3228",
                      "name": "3.228",
                      "data": {
                        "$area": 1,
                        "$dim": 1,
                        "$color": "#ff7ccd"
                      },
                      "children": [
                          {
                            "id": "node4229",
                            "name": "4.229",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7484"
                            }
                          }, {
                            "id": "node4230",
                            "name": "4.230",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff465b"
                            }
                          }, {
                            "id": "node4231",
                            "name": "4.231",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff687a"
                            }
                          }, {
                            "id": "node4232",
                            "name": "4.232",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff5d70"
                            }
                          }
                      ]
                    }, {
                      "id": "node3233",
                      "name": "3.233",
                      "data": {
                        "$area": 10,
                        "$dim": 10,
                        "$color": "#ff5dc1"
                      },
                      "children": [
                          {
                            "id": "node4234",
                            "name": "4.234",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff576a"
                            }
                          }, {
                            "id": "node4235",
                            "name": "4.235",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff5266"
                            }
                          }, {
                            "id": "node4236",
                            "name": "4.236",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7081"
                            }
                          }, {
                            "id": "node4237",
                            "name": "4.237",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6678"
                            }
                          }
                      ]
                    }, {
                      "id": "node3238",
                      "name": "3.238",
                      "data": {
                        "$area": 8,
                        "$dim": 8,
                        "$color": "#ff64c4"
                      },
                      "children": [
                          {
                            "id": "node4239",
                            "name": "4.239",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5367"
                            }
                          }, {
                            "id": "node4240",
                            "name": "4.240",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff596c"
                            }
                          }, {
                            "id": "node4241",
                            "name": "4.241",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5367"
                            }
                          }
                      ]
                    }, {
                      "id": "node3242",
                      "name": "3.242",
                      "data": {
                        "$area": 10,
                        "$dim": 10,
                        "$color": "#ff5dc1"
                      },
                      "children": [
                          {
                            "id": "node4243",
                            "name": "4.243",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff5569"
                            }
                          }, {
                            "id": "node4244",
                            "name": "4.244",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7182"
                            }
                          }, {
                            "id": "node4245",
                            "name": "4.245",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7182"
                            }
                          }, {
                            "id": "node4246",
                            "name": "4.246",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff475c"
                            }
                          }
                      ]
                    }, {
                      "id": "node3247",
                      "name": "3.247",
                      "data": {
                        "$area": 8,
                        "$dim": 8,
                        "$color": "#ff64c4"
                      },
                      "children": [
                          {
                            "id": "node4248",
                            "name": "4.248",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6a7c"
                            }
                          }, {
                            "id": "node4249",
                            "name": "4.249",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff4a5f"
                            }
                          }, {
                            "id": "node4250",
                            "name": "4.250",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff4a5f"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2251",
                "name": "2.251",
                "data": {
                  "$area": 1,
                  "$dim": 1,
                  "$color": "#ef79ff"
                },
                "children": [
                    {
                      "id": "node3252",
                      "name": "3.252",
                      "data": {
                        "$area": 7,
                        "$dim": 7,
                        "$color": "#ff26ac"
                      },
                      "children": [
                          {
                            "id": "node4253",
                            "name": "4.253",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff586b"
                            }
                          }, {
                            "id": "node4254",
                            "name": "4.254",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7b8a"
                            }
                          }, {
                            "id": "node4255",
                            "name": "4.255",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5c6f"
                            }
                          }, {
                            "id": "node4256",
                            "name": "4.256",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7283"
                            }
                          }, {
                            "id": "node4257",
                            "name": "4.257",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff6577"
                            }
                          }, {
                            "id": "node4258",
                            "name": "4.258",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7787"
                            }
                          }
                      ]
                    }, {
                      "id": "node3259",
                      "name": "3.259",
                      "data": {
                        "$area": 3,
                        "$dim": 3,
                        "$color": "#ff59bf"
                      },
                      "children": [
                          {
                            "id": "node4260",
                            "name": "4.260",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6a7c"
                            }
                          }, {
                            "id": "node4261",
                            "name": "4.261",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7787"
                            }
                          }, {
                            "id": "node4262",
                            "name": "4.262",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff596d"
                            }
                          }, {
                            "id": "node4263",
                            "name": "4.263",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7383"
                            }
                          }, {
                            "id": "node4264",
                            "name": "4.264",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff596d"
                            }
                          }, {
                            "id": "node4265",
                            "name": "4.265",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7787"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2266",
                "name": "2.266",
                "data": {
                  "$area": 1,
                  "$dim": 1,
                  "$color": "#ef79ff"
                },
                "children": [
                    {
                      "id": "node3267",
                      "name": "3.267",
                      "data": {
                        "$area": 10,
                        "$dim": 10,
                        "$color": "#ff55be"
                      },
                      "children": [
                          {
                            "id": "node4268",
                            "name": "4.268",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6072"
                            }
                          }, {
                            "id": "node4269",
                            "name": "4.269",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6c7d"
                            }
                          }, {
                            "id": "node4270",
                            "name": "4.270",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7989"
                            }
                          }, {
                            "id": "node4271",
                            "name": "4.271",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff596d"
                            }
                          }, {
                            "id": "node4272",
                            "name": "4.272",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7989"
                            }
                          }, {
                            "id": "node4273",
                            "name": "4.273",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6678"
                            }
                          }
                      ]
                    }, {
                      "id": "node3274",
                      "name": "3.274",
                      "data": {
                        "$area": 4,
                        "$dim": 4,
                        "$color": "#ff6fc8"
                      },
                      "children": [
                          {
                            "id": "node4275",
                            "name": "4.275",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff4e62"
                            }
                          }, {
                            "id": "node4276",
                            "name": "4.276",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4277",
                            "name": "4.277",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7a89"
                            }
                          }, {
                            "id": "node4278",
                            "name": "4.278",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5367"
                            }
                          }
                      ]
                    }, {
                      "id": "node3279",
                      "name": "3.279",
                      "data": {
                        "$area": 10,
                        "$dim": 10,
                        "$color": "#ff55be"
                      },
                      "children": [
                          {
                            "id": "node4280",
                            "name": "4.280",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7887"
                            }
                          }, {
                            "id": "node4281",
                            "name": "4.281",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff5064"
                            }
                          }, {
                            "id": "node4282",
                            "name": "4.282",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff384f"
                            }
                          }
                      ]
                    }, {
                      "id": "node3283",
                      "name": "3.283",
                      "data": {
                        "$area": 6,
                        "$dim": 6,
                        "$color": "#ff66c4"
                      },
                      "children": [
                          {
                            "id": "node4284",
                            "name": "4.284",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6f80"
                            }
                          }, {
                            "id": "node4285",
                            "name": "4.285",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5367"
                            }
                          }, {
                            "id": "node4286",
                            "name": "4.286",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff596c"
                            }
                          }, {
                            "id": "node4287",
                            "name": "4.287",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6476"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2288",
                "name": "2.288",
                "data": {
                  "$area": 9,
                  "$dim": 9,
                  "$color": "#e946ff"
                },
                "children": [
                    {
                      "id": "node3289",
                      "name": "3.289",
                      "data": {
                        "$area": 10,
                        "$dim": 10,
                        "$color": "#ff40b6"
                      },
                      "children": [
                          {
                            "id": "node4290",
                            "name": "4.290",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff3048"
                            }
                          }, {
                            "id": "node4291",
                            "name": "4.291",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff5064"
                            }
                          }
                      ]
                    }, {
                      "id": "node3292",
                      "name": "3.292",
                      "data": {
                        "$area": 1,
                        "$dim": 1,
                        "$color": "#ff79cc"
                      },
                      "children": [
                          {
                            "id": "node4293",
                            "name": "4.293",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff5064"
                            }
                          }, {
                            "id": "node4294",
                            "name": "4.294",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff5a6e"
                            }
                          }, {
                            "id": "node4295",
                            "name": "4.295",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7a8a"
                            }
                          }, {
                            "id": "node4296",
                            "name": "4.296",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff5a6e"
                            }
                          }
                      ]
                    }, {
                      "id": "node3297",
                      "name": "3.297",
                      "data": {
                        "$area": 5,
                        "$dim": 5,
                        "$color": "#ff60c2"
                      },
                      "children": [
                          {
                            "id": "node4298",
                            "name": "4.298",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7484"
                            }
                          }, {
                            "id": "node4299",
                            "name": "4.299",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff233c"
                            }
                          }, {
                            "id": "node4300",
                            "name": "4.300",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff687a"
                            }
                          }
                      ]
                    }, {
                      "id": "node3301",
                      "name": "3.301",
                      "data": {
                        "$area": 4,
                        "$dim": 4,
                        "$color": "#ff66c4"
                      },
                      "children": [
                          {
                            "id": "node4302",
                            "name": "4.302",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4303",
                            "name": "4.303",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7989"
                            }
                          }, {
                            "id": "node4304",
                            "name": "4.304",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff7081"
                            }
                          }, {
                            "id": "node4305",
                            "name": "4.305",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff6174"
                            }
                          }, {
                            "id": "node4306",
                            "name": "4.306",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff6779"
                            }
                          }, {
                            "id": "node4307",
                            "name": "4.307",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff6779"
                            }
                          }
                      ]
                    }
                ]
              }
          ]
        }, {
          "id": "node1308",
          "name": "1.308",
          "data": {
            "$area": 9,
            "$dim": 9,
            "$color": "#9858ff"
          },
          "children": [
              {
                "id": "node2309",
                "name": "2.309",
                "data": {
                  "$area": 2,
                  "$dim": 2,
                  "$color": "#ee71ff"
                },
                "children": [
                    {
                      "id": "node3310",
                      "name": "3.310",
                      "data": {
                        "$area": 1,
                        "$dim": 1,
                        "$color": "#ff7ccd"
                      },
                      "children": [
                          {
                            "id": "node4311",
                            "name": "4.311",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff495e"
                            }
                          }, {
                            "id": "node4312",
                            "name": "4.312",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff374e"
                            }
                          }
                      ]
                    }, {
                      "id": "node3313",
                      "name": "3.313",
                      "data": {
                        "$area": 9,
                        "$dim": 9,
                        "$color": "#ff5dc1"
                      },
                      "children": [
                          {
                            "id": "node4314",
                            "name": "4.314",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4315",
                            "name": "4.315",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4316",
                            "name": "4.316",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff374e"
                            }
                          }
                      ]
                    }, {
                      "id": "node3317",
                      "name": "3.317",
                      "data": {
                        "$area": 8,
                        "$dim": 8,
                        "$color": "#ff61c2"
                      },
                      "children": [
                          {
                            "id": "node4318",
                            "name": "4.318",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff6577"
                            }
                          }, {
                            "id": "node4319",
                            "name": "4.319",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff6174"
                            }
                          }, {
                            "id": "node4320",
                            "name": "4.320",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff5e71"
                            }
                          }, {
                            "id": "node4321",
                            "name": "4.321",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7585"
                            }
                          }, {
                            "id": "node4322",
                            "name": "4.322",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6f80"
                            }
                          }, {
                            "id": "node4323",
                            "name": "4.323",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7585"
                            }
                          }
                      ]
                    }, {
                      "id": "node3324",
                      "name": "3.324",
                      "data": {
                        "$area": 8,
                        "$dim": 8,
                        "$color": "#ff61c2"
                      },
                      "children": [
                          {
                            "id": "node4325",
                            "name": "4.325",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff2b43"
                            }
                          }, {
                            "id": "node4326",
                            "name": "4.326",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff5569"
                            }
                          }
                      ]
                    }, {
                      "id": "node3327",
                      "name": "3.327",
                      "data": {
                        "$area": 7,
                        "$dim": 7,
                        "$color": "#ff64c4"
                      },
                      "children": [
                          {
                            "id": "node4328",
                            "name": "4.328",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff7182"
                            }
                          }, {
                            "id": "node4329",
                            "name": "4.329",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff6678"
                            }
                          }, {
                            "id": "node4330",
                            "name": "4.330",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff6678"
                            }
                          }, {
                            "id": "node4331",
                            "name": "4.331",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff697a"
                            }
                          }, {
                            "id": "node4332",
                            "name": "4.332",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff7484"
                            }
                          }, {
                            "id": "node4333",
                            "name": "4.333",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff6375"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2334",
                "name": "2.334",
                "data": {
                  "$area": 7,
                  "$dim": 7,
                  "$color": "#ea4bff"
                },
                "children": [
                    {
                      "id": "node3335",
                      "name": "3.335",
                      "data": {
                        "$area": 2,
                        "$dim": 2,
                        "$color": "#ff73c9"
                      },
                      "children": [
                          {
                            "id": "node4336",
                            "name": "4.336",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff4359"
                            }
                          }, {
                            "id": "node4337",
                            "name": "4.337",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7888"
                            }
                          }, {
                            "id": "node4338",
                            "name": "4.338",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7181"
                            }
                          }, {
                            "id": "node4339",
                            "name": "4.339",
                            "data": {
                              "$area": 4,
                              "$dim": 4,
                              "$color": "#ff6274"
                            }
                          }, {
                            "id": "node4340",
                            "name": "4.340",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7181"
                            }
                          }
                      ]
                    }, {
                      "id": "node3341",
                      "name": "3.341",
                      "data": {
                        "$area": 7,
                        "$dim": 7,
                        "$color": "#ff55be"
                      },
                      "children": [
                          {
                            "id": "node4342",
                            "name": "4.342",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7686"
                            }
                          }, {
                            "id": "node4343",
                            "name": "4.343",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff6174"
                            }
                          }, {
                            "id": "node4344",
                            "name": "4.344",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff6476"
                            }
                          }, {
                            "id": "node4345",
                            "name": "4.345",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff6174"
                            }
                          }, {
                            "id": "node4346",
                            "name": "4.346",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7686"
                            }
                          }, {
                            "id": "node4347",
                            "name": "4.347",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff6a7c"
                            }
                          }
                      ]
                    }, {
                      "id": "node3348",
                      "name": "3.348",
                      "data": {
                        "$area": 5,
                        "$dim": 5,
                        "$color": "#ff61c2"
                      },
                      "children": [
                          {
                            "id": "node4349",
                            "name": "4.349",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff7080"
                            }
                          }, {
                            "id": "node4350",
                            "name": "4.350",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff5569"
                            }
                          }, {
                            "id": "node4351",
                            "name": "4.351",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7585"
                            }
                          }, {
                            "id": "node4352",
                            "name": "4.352",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7a8a"
                            }
                          }, {
                            "id": "node4353",
                            "name": "4.353",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff4a5f"
                            }
                          }
                      ]
                    }, {
                      "id": "node3354",
                      "name": "3.354",
                      "data": {
                        "$area": 7,
                        "$dim": 7,
                        "$color": "#ff55be"
                      },
                      "children": [
                          {
                            "id": "node4355",
                            "name": "4.355",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff6375"
                            }
                          }, {
                            "id": "node4356",
                            "name": "4.356",
                            "data": {
                              "$area": 7,
                              "$dim": 7,
                              "$color": "#ff1c37"
                            }
                          }
                      ]
                    }
                ]
              }, {
                "id": "node2357",
                "name": "2.357",
                "data": {
                  "$area": 8,
                  "$dim": 8,
                  "$color": "#e943ff"
                },
                "children": [
                    {
                      "id": "node3358",
                      "name": "3.358",
                      "data": {
                        "$area": 5,
                        "$dim": 5,
                        "$color": "#ff6cc7"
                      },
                      "children": [
                          {
                            "id": "node4359",
                            "name": "4.359",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff3950"
                            }
                          }, {
                            "id": "node4360",
                            "name": "4.360",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff6375"
                            }
                          }, {
                            "id": "node4361",
                            "name": "4.361",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff6375"
                            }
                          }
                      ]
                    }, {
                      "id": "node3362",
                      "name": "3.362",
                      "data": {
                        "$area": 3,
                        "$dim": 3,
                        "$color": "#ff74ca"
                      },
                      "children": [
                          {
                            "id": "node4363",
                            "name": "4.363",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff3950"
                            }
                          }, {
                            "id": "node4364",
                            "name": "4.364",
                            "data": {
                              "$area": 2,
                              "$dim": 2,
                              "$color": "#ff7182"
                            }
                          }, {
                            "id": "node4365",
                            "name": "4.365",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff5569"
                            }
                          }
                      ]
                    }, {
                      "id": "node3366",
                      "name": "3.366",
                      "data": {
                        "$area": 8,
                        "$dim": 8,
                        "$color": "#ff61c2"
                      },
                      "children": [
                          {
                            "id": "node4367",
                            "name": "4.367",
                            "data": {
                              "$area": 8,
                              "$dim": 8,
                              "$color": "#ff4359"
                            }
                          }, {
                            "id": "node4368",
                            "name": "4.368",
                            "data": {
                              "$area": 3,
                              "$dim": 3,
                              "$color": "#ff697b"
                            }
                          }, {
                            "id": "node4369",
                            "name": "4.369",
                            "data": {
                              "$area": 6,
                              "$dim": 6,
                              "$color": "#ff5267"
                            }
                          }
                      ]
                    }, {
                      "id": "node3370",
                      "name": "3.370",
                      "data": {
                        "$area": 3,
                        "$dim": 3,
                        "$color": "#ff74ca"
                      },
                      "children": [
                          {
                            "id": "node4371",
                            "name": "4.371",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff4056"
                            }
                          }, {
                            "id": "node4372",
                            "name": "4.372",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff4056"
                            }
                          }
                      ]
                    }, {
                      "id": "node3373",
                      "name": "3.373",
                      "data": {
                        "$area": 6,
                        "$dim": 6,
                        "$color": "#ff68c5"
                      },
                      "children": [
                          {
                            "id": "node4374",
                            "name": "4.374",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff4359"
                            }
                          }, {
                            "id": "node4375",
                            "name": "4.375",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7988"
                            }
                          }, {
                            "id": "node4376",
                            "name": "4.376",
                            "data": {
                              "$area": 9,
                              "$dim": 9,
                              "$color": "#ff4359"
                            }
                          }
                      ]
                    }, {
                      "id": "node3377",
                      "name": "3.377",
                      "data": {
                        "$area": 8,
                        "$dim": 8,
                        "$color": "#ff61c2"
                      },
                      "children": [
                          {
                            "id": "node4378",
                            "name": "4.378",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff4e63"
                            }
                          }, {
                            "id": "node4379",
                            "name": "4.379",
                            "data": {
                              "$area": 10,
                              "$dim": 10,
                              "$color": "#ff4e63"
                            }
                          }, {
                            "id": "node4380",
                            "name": "4.380",
                            "data": {
                              "$area": 1,
                              "$dim": 1,
                              "$color": "#ff7b8a"
                            }
                          }, {
                            "id": "node4381",
                            "name": "4.381",
                            "data": {
                              "$area": 5,
                              "$dim": 5,
                              "$color": "#ff6779"
                            }
                          }
                      ]
                    }
                ]
              }
          ]
        }
    ]
  };
  // end
  // init Icicle
  icicle = new $jit.Icicle({
    // id of the visualization container
    injectInto: 'infovis',
    // whether to add transition animations
    animate: animate,
    // nodes offset
    offset: 1,
    // whether to add cushion type nodes
    cushion: false,
    //show only three levels at a time
    constrained: true,
    levelsToShow: 3,
    // enable tips
    Tips: {
      enable: true,
      type: 'Native',
      // add positioning offsets
      offsetX: 20,
      offsetY: 20,
      // implement the onShow method to
      // add content to the tooltip when a node
      // is hovered
      onShow: function(tip, node){
        // count children
        var count = 0;
        node.eachSubnode(function(){
          count++;
        });
        // add tooltip info
        tip.innerHTML = "<div class=\"tip-title\"><b>Name:</b> " + node.name
            + "</div><div class=\"tip-text\">" + count + " children</div>";
      }
    },
    // Add events to nodes
    Events: {
      enable: true,
      onMouseEnter: function(node) {
        //add border and replot node
        node.setData('border', '#33dddd');
        icicle.fx.plotNode(node, icicle.canvas);
        icicle.labels.plotLabel(icicle.canvas, node, icicle.controller);
      },
      onMouseLeave: function(node) {
        node.removeData('border');
        icicle.fx.plot();
      },
      onClick: function(node){
        if (node) {
          //hide tips and selections
          icicle.tips.hide();
          if(icicle.events.hovered)
            this.onMouseLeave(icicle.events.hovered);
          //perform the enter animation
          icicle.enter(node);
        }
      },
      onRightClick: function(){
        //hide tips and selections
        icicle.tips.hide();
        if(icicle.events.hovered)
          this.onMouseLeave(icicle.events.hovered);
        //perform the out animation
        icicle.out();
      }
    },
    // Add canvas label styling
    Label: {
      type: labelType // "Native" or "HTML"
    },
    // Add the name of the node in the corresponding label
    // This method is called once, on label creation and only for DOM and not
    // Native labels.
    onCreateLabel: function(domElement, node){
      domElement.innerHTML = node.name;
      var style = domElement.style;
      style.fontSize = '0.9em';
      style.display = '';
      style.cursor = 'pointer';
      style.color = '#333';
      style.overflow = 'hidden';
    },
    // Change some label dom properties.
    // This method is called each time a label is plotted.
    onPlaceLabel: function(domElement, node){
      var style = domElement.style,
          width = node.getData('width'),
          height = node.getData('height');
      if(width < 7 || height < 7) {
        style.display = 'none';
      } else {
        style.display = '';
        style.width = width + 'px';
        style.height = height + 'px';
      }
    }
  });
  // load data
  icicle.loadJSON(json);
  // compute positions and plot
  icicle.refresh();
  //end
}

//init controls
function controls() {
  var jit = $jit;
  var gotoparent = jit.id('update');
  jit.util.addEvent(gotoparent, 'click', function() {
    icicle.out();
  });
  var select = jit.id('s-orientation');
  jit.util.addEvent(select, 'change', function () {
    icicle.layout.orientation = select[select.selectedIndex].value;
    icicle.refresh();
  });
  var levelsToShowSelect = jit.id('i-levels-to-show');
  jit.util.addEvent(levelsToShowSelect, 'change', function () {
    var index = levelsToShowSelect.selectedIndex;
    if(index == 0) {
      icicle.config.constrained = false;
    } else {
      icicle.config.constrained = true;
      icicle.config.levelsToShow = index;
    }
    icicle.refresh();
  });
}
//end
