/*
 * File: PhyloJiVE.js
 *
 * © Copyright 2012 Temi.Varghese@csiro.au, Garry.Jolley-Rogers@csiro.au &
 * Joe.Miller@csiro.au as part of the
 * Centre for Australian National Biodiversity Research, Canberra and
 * The Commonwealth Scientific and Industrial Research Organisation, Australia.
 *
 * Newick parsing in this visualization is made possible by jsPhyloSVG by
 * Smits SA, Ouverney CC, 2010. Please see Extras/PhyloJiVE/jsPhyloSVG/readme.txt
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
/*
  Class: Phylo
  
  A Tree layout with advanced contraction and expansion animations.
    
  Inspired by:

  SpaceTree Visualisation of JIT
  
  Note:

  This visualization was built and engineered from scratch, taking only the papers as inspiration, and only shares some features with the visualization described in those papers.

  Implements:
  
  All <Loader> methods
  
  Constructor Options:
  
  Inherits options from
  
  - <Options.Canvas>
  - <Options.Controller>
  - <Options.Tree>
  - <Options.Node>
  - <Options.Edge>
  - <Options.Label>
  - <Options.Events>
  - <Options.Tips>
  - <Options.NodeStyles>
  - <Options.Navigation>
  
  Additionally, there are other parameters and some default values changed
  
  constrained - (boolean) Default's *true*. Whether to show the entire tree when loaded or just the number of levels specified by _levelsToShow_.
  levelsToShow - (number) Default's *2*. The number of levels to show for a subtree. This number is relative to the selected node.
  levelDistance - (number) Default's *30*. The distance between two consecutive levels of the tree.
  Node.type - Described in <Options.Node>. Default's set to *rectangle*.
  offsetX - (number) Default's *0*. The x-offset distance from the selected node to the center of the canvas.
  offsetY - (number) Default's *0*. The y-offset distance from the selected node to the center of the canvas.
  duration - Described in <Options.Fx>. It's default value has been changed to *700*.
  
  Instance Properties:
  
  canvas - Access a <Canvas> instance.
  graph - Access a <Graph> instance.
  op - Access a <Phylo.Op> instance.
  fx - Access a <Phylo.Plot> instance.
  labels - Access a <Phylo.Label> interface implementation.

*/
$jit.Phylo = (function () {
  // Define some private methods first...
  // Nodes in path
  var nodesInPath = [];
  // Nodes to contract
  function getNodesToHide(node) {
    node = node || this.clickedNode;
    if (!this.config.constrained) {
      return [];
    }
    var i, Geom = this.geom;
    var graph = this.graph;
    var canvas = this.canvas;
    var level = node._depth,
      nodeArray = [];
    graph.eachNode(function (n) {
      if (n.exist && !n.selected) {
        if (n.isDescendantOf(node.id)) {
          if (n._depth <= level) {
            nodeArray.push(n);
          }
        } else {
          nodeArray.push(n);
        }
      }
    });
    var leafLevel = Geom.getRightLevelToShow(node, canvas);
    node.eachLevel(leafLevel, leafLevel, function (n) {
      if (n.exist && !n.selected) {
        nodeArray.push(n);
      }
    });

    for (i = 0; i < nodesInPath.length; i += 1) {
      var n = this.graph.getNode(nodesInPath[i]);
      if (!n.isDescendantOf(node.id)) {
        nodeArray.push(n);
      }
    }
    return nodeArray;
  }
  // Nodes to expand
  function getNodesToShow(node) {
    var nodeArray = [],
      config = this.config;
    node = node || this.clickedNode;
    this.clickedNode.eachLevel(0, config.levelsToShow, function (n) {
      if (config.multitree && !('$orn' in n.data) && n.anySubnode(function (ch) {
        return ch.exist && !ch.drawn;
      })) {
        nodeArray.push(n);
      } else if (n.drawn && !n.anySubnode("drawn")) {
        nodeArray.push(n);
      }
    });
    return nodeArray;
  }
  // Now define the actual class.
  return new Class({

    Implements: [Loader, Extras, Layouts.PhyloJiVE],

    initialize: function (controller) {
      var $Phylo = $jit.Phylo;

      var config = {
        levelsToShow: 2,
        levelDistance: 30,
        constrained: true,
        Node: {
          type: 'rectangle'
        },
        duration: 700,
        offsetX: 0,
        offsetY: 0
      };

      this.controller = this.config = $.merge(
      Options("Canvas", "Fx", "Tree", "PhyloJiVE", "Node", "Edge", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), config, controller);

      var canvasConfig = this.config;
      if (canvasConfig.useCanvas) {
        this.canvas = canvasConfig.useCanvas;
        this.config.labelContainer = this.canvas.id + '-label';
      } else {
        if (canvasConfig.background) {
          canvasConfig.background = $.merge({
            type: 'Circles'
          }, canvasConfig.background);
        }
        this.canvas = new Canvas(this, canvasConfig);
        this.config.labelContainer = (typeof canvasConfig.injectInto === 'string' ? canvasConfig.injectInto : canvasConfig.injectInto.id) + '-label';
      }

      this.graphOptions = {
        'klass': Complex
      };
      this.graph = new Graph(this.graphOptions, this.config.Node, this.config.Edge);
      this.labels = new $Phylo.Label[canvasConfig.Label.type](this);
      this.fx = new $Phylo.Plot(this, $Phylo);
      this.op = new $Phylo.Op(this);
      this.group = new $Phylo.Group(this);
      this.geom = new $Phylo.Geom(this);
      this.clickedNode = null;
      // initialize extras
      this.initializeExtras();
    },
    hasProperty: function (obj) {
      if (typeof obj === 'undefined') {
        return false;
      }
      var i;
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          return true;
        }
      }
      return false;
    },
    sum: function (array) {
      if (!array || array.length === 0) {
        return;
      }
      return $.reduce(array, function (acc, value) {
        return acc + value;
      }, 0);
    },
    //     sumArray : function ( num1 , num2 )  {
    //       if ( !num1 || !num2 || num1.length !== num2.length ) {
    //         return ;
    //       }
    //       var i , result = [];
    //       for ( i = 0 ; i < num1.length ; i += 1 ) {
    //         result.push ( num1 +
    //       }
    //     },
    mean: function (sample) {
      if (!sample || sample.length === 0) {
        return;
      }
      return this.sum(sample) / sample.length;
    },
    wtmean: function (sample, number) {
      if (!sample || sample.length === 0 || !number || number.length === 0 || number.length !== sample.length) {
        return;
      }
      var i, sum = 0,
        count = 0;
      for (i = 0; i < number.length; i += 1) {
        sum += number[i] * sample[i];
        count += number[i];
      }
      return sum / count;
    },
    variance: function (sample) {
      if (!sample || sample.length === 0) {
        return;
      }
      var avg, num, total;
      avg = this.mean(sample);
      num = sample.length;
      total = $.reduce(sample, function (acc, value) {
        var diff = value - avg;
        return acc + diff * diff;
      }, 0);
      return total / num;
    },
    sd: function (sample) {
      if (!sample || sample.length === 0) {
        return;
      }
      return Math.sqrt(this.variance(sample));
    },
    square: function (num) {
      return $jit.util.map(num, function (elem) {
        return elem * elem;
      });
    },
    multiply: function (num1, num2) {
      if (!num1 || !num2 || num1.length !== num2.length) {
        return;
      }
      var i, result = [];
      for (i = 0; i < num1.length; i += 1) {
        result.push(num1[i] * num2[i]);
      }
      return result;
    },
    variancePop: function (num, sd, ui, up) {
      if (!num || !sd || !ui || num.length !== sd.length || sd.length !== ui.length) {
        return;
      }
      if (num.length === 1) {
        return 0;
      }
      var sumNum = this.sum(num),
        sqUp = up * up,
        lessNum, sqSd, sqUi;
      lessNum = $jit.util.map(num, function (elem) {
        return elem - 1;
      });
      sqSd = this.square(sd);
      sqUi = this.square(ui);
      return (this.sum(this.multiply(lessNum, sqSd)) + this.sum(this.multiply(num, sqUi)) - sumNum * sqUp) / (sumNum - 1);
    },
    sdPop: function (num, sd, ui, up) {
      if (!num || !sd || !ui || num.length !== sd.length || sd.length !== ui.length) {
        return;
      }
      return Math.sqrt(this.variancePop(num, sd, ui, up));
    },
    meanPop: function (ni, ui) {
      if (!ni || !ui || ni.length != ui.length) {
        return;
      }
      return this.sum(this.multiply(ni, ui)) / this.sum(ni);
    },
    isQuant: function (data) {
      if (typeof data[0] === 'number') {
        return true;
      } else {
        return false;
      }
    },
    isQuali: function (data) {
      if (typeof data[0] === 'string') {
        return true;
      } else {
        return false;
      }
    },
    characterType: function (data, testcase) {
      if (!data || data.length === 0) {
        return;
      }
      switch (testcase) {
      case "quant":
        return this.isQuant(data);
        break;
      case "quali":
        return this.isQuali(data);
        break;
      }
    },
    intersect: function (setA, setB) {
      if (!setA || !setB || setA.length === 0 || setB.length === 0) {
        return [];
      }
      /*else if ( !setA || setA.length == 0 ) {
        return setB;
      } else if ( !setB || setB.length == 0 ) {
        return setA;
      }*/
      var hashA = {},
        i, result = [];
      for (i = 0; i < setA.length; i += 1) {
        hashA[setA[i]] = true;
      }
      for (i = 0; i < setB.length; i += 1) {
        if (hashA[setB[i]]) {
          result.push(setB[i]);
        }
      }
      return result;
    },
    union: function (setA, setB) {
      setA = setA || [];
      setB = setB || [];
      var i, j, sets = [setA, setB],
        char, union = {};
      for (i = 0; i < sets.length; i += 1) {
        char = sets[i];
        for (j = 0; j < char.length; j += 1) {
          union[char[j]] = char[j];
        }
      }
      char = [];
      for (i in union) {
        if (union.hasOwnProperty(i)) {
          char.push(union[i]);
        }
      }
      return char;
    },
    setCollapsed: function (node) {
      if (node.data.$type === 'triangle') {
        node.collapsed = true;
      } else {
        node.collapsed = false;
      }
    },
    nodesExpCol: function (node) {
      var level = 0;
      if (node.collapsed) {
        node.eachSubgraph(function (elem) {
          if (!elem.exist) {
            elem.exist = true;
            elem.drawn = true;
          }
          if (!elem.data.leaf) {
            elem.data.$type = 'circle';
          } else {
            elem.data.$type = 'none';
          }
          elem.collapsed = false;
          if (level < elem._depth) {
            level = elem._depth + 1;
          }
        });
        if (!node.data.leaf) {
          node.data.$type = 'circle';
        } else {
          node.data.$type = 'none';
        }
      } else {
        node.eachSubgraph(function (elem) {
          elem.exist = false;
          elem.drawn = false;
          if (!elem.data.leaf) {
            elem.data.$type = 'circle';
          } else {
            elem.data.$type = 'none';
          }
          elem.collapsed = true;
        });
        node.exist = true;
        node.drawn = true;
        level = false;
        if (!node.data.leaf) {
          node.data.$type = 'triangle';
        } else {
          node.data.$type = 'none';
        }
      }
      return level;
    },
    fitchParsimony: function (node, characterList) {
      function downPass(node) {
        var childrenChar = {},
          key, i, j;
        node.eachSubnode(function (snode) {
          char = downPass(snode);
          for (i = 0; i < characterList.length; i += 1) {
            key = characterList[i];
            childrenChar[key] = childrenChar[key] || [];
            childrenChar[key].push(char[key]);
          }
          //           childrenChar.push( char );
        });
        if (node.data.leaf) {
          return node.data.character || [];
          //           return node.data.colorCharacter ;
        }
        var parentChar = {};
        for (j = 0; j < characterList.length; j += 1) {
          key = characterList[j];
          // find intersection
          var intersection = childrenChar[key][0] || [],
            union = {};
          for (i = 0; i < childrenChar[key].length; i += 1) {
            char = childrenChar[key][i] || [];
            intersection = that.intersect(intersection, char);
          }
          if (intersection.length > 0) {
            parentChar[key] = intersection;
          } else {
            // union
            char = childrenChar[key][0] || []
            for (i = 1; i < childrenChar[key].length; i += 1) {
              char = that.union(char, childrenChar[key][i]);
            }
            parentChar[key] = char;
            //change shape of node to indicate union
            /*        node.data.$type = 'square';
              node.data.$dim = 10;*/
          }
        }
        node.data.colorCharacter = parentChar[that.config.firstCharacter];
        return node.data.character = parentChar;
      }

      function upPass(node) {
        function $upPass(n) {
          if (n.data.leaf) {
            return;
          }
          var key, morphData = n.data.character,
            p = n.getParents()[0],
            fp, i;

          for (key in morphData) {
            if (morphData.hasOwnProperty(key)) {
              var sp = morphData[key],
                fa = p.data.character[key];
              fp = that.intersect(sp, fa);
              if (fp.length !== fa.length) {
                var cIntersect;
                n.eachSubnode(function (subn) {
                  if (!cIntersect) {
                    cIntersect = subn.data.character[key];
                    return;
                  }
                  cIntersect = that.intersect(cIntersect, subn.data.character[key]);
                });
                if (cIntersect && cIntersect.length !== 0) {
                  var cUnion = [],
                    aIntersect;
                  n.eachSubnode(function (subn) {
                    cUnion = that.union(cUnion, subn.data.character[key]);
                  });
                  aIntersect = that.intersect(cUnion, fa);
                  fp = that.union(aIntersect, n.data.character[key]);
                } else {
                  fp = that.union(n.data.character[key], fa);
                }
              }
              n.data.character[key] = fp;
            }
          }
          n.eachSubnode(function (sn) {
            $upPass(sn);
          });
          n.data.colorCharacter = n.data.character[that.config.firstCharacter];
        }
        //         var that = this;
        node.eachSubnode(function (n) {
          $upPass(n);
        });
        return [];
      };

      if (characterList && characterList.length != 0) {
        var i, char, j, that = this,
          result;
        downPass(node);
        upPass(node);
      }

    },
    setCharacter: function (firstCharacter) {
      firstCharacter = firstCharacter || this.config.firstCharacter;
      if (!firstCharacter) {
        return;
      }
      var speciesHash = this.character,
        speciesName, char, i;
      for (i in this.graph.nodes) {
        if (this.graph.nodes.hasOwnProperty(i)) {
          var node = this.graph.nodes[i];
          node.data.character = {};
          if (node.data.leaf) {
            for (key in speciesHash) {
              if (speciesHash.hasOwnProperty(key)) {
                var speciesCharacter = speciesHash[key][firstCharacter];
                if (node.name === key) {
                  node.data.colorCharacter = speciesCharacter;
                  node.data.character = speciesHash[key];
                  break;
                }
              }
            }
          }
        }
      }
    },
    sdAtTree: function (root, characters) {
      var samples = {},
        char, result = {};
      for (i = 0; i < characters.length; i += 1) {
        samples[characters[i]] = [];
      }
      root.eachSubgraph(function (node) {
        if (node.data.leaf) {
          for (i = 0; i < characters.length; i += 1) {
            char = characters[i];
            if (node.data.character[char] && typeof node.data.character[char][0] !== "undefined") {
              samples[char].push(node.data.character[char][0]);
            }
          }
        }
      });
      for (i = 0; i < characters.length; i += 1) {
        char = characters[i];
        result[char] = this.sd(samples[char]);
      }
      return result;
    },
    varianceAtTree: function (root, characters) {
      var samples = {},
        char, result = {};
      for (i = 0; i < characters.length; i += 1) {
        samples[characters[i]] = [];
      }
      root.eachSubgraph(function (node) {
        if (node.data.leaf) {
          for (i = 0; i < characters.length; i += 1) {
            char = characters[i];
            if (node.data.character[char] && typeof node.data.character[char][0] !== "undefined") {
              samples[char].push(node.data.character[char][0]);
            }
          }
        }
      });
      for (i = 0; i < characters.length; i += 1) {
        char = characters[i];
        result[char] = this.variance(samples[char]);
      }
      return result;
    },
    meanAtTree: function (root, characters) {
      var samples = {},
        char, result = {};
      for (i = 0; i < characters.length; i += 1) {
        samples[characters[i]] = {
          value: [],
          number: []
        };
      }
      root.eachSubgraph(function (node) {
        if (node.data.leaf) {
          for (i = 0; i < characters.length; i += 1) {
            char = characters[i];
            if (node.data.character[char] && typeof node.data.character[char][0] !== "undefined") {
              samples[char].value.push(node.data.character[char][0]);
              samples[char].number.push(1);
            }
          }
        }
      });
      for (i = 0; i < characters.length; i += 1) {
        char = characters[i];
        result[char] = this.wtmean(samples[char].value, samples[char].number);
      }
      return result;
    },
    checkQuant: function (characters) {
      var n = this.config.threshold,
        root = this.graph.getNode(this.root),
        meanTree = this.meanAtTree(root, characters),
        //         varTree = this.varianceAtTree( root , characters ),
        sdTree = this.sdAtTree(root, characters),
        i, that = this,
        count = 0;

      function compareFunction(mean, sd, mTree, sTree) {
        var test1 = Math.abs(mean - mTree) > sTree;
        var test2 = sd > sTree;
        return !(test1 && test2);
      }
      (function $checkQuant(node) {
        var childrenValues = {},
          result, sd = {},
          ui = {},
          num = {},
          ans, char;
        node.data.characterConsistency = node.data.characterConsistency || {};
        node.data.stat = {};
        for (i = 0; i < characters.length; i += 1) {
          char = characters[i];
          childrenValues[characters[i]] = [];
          node.data.stat[characters[i]] = {
            sd: undefined,
            u: undefined,
            n: undefined
          };
          sd[char] = [];
          ui[char] = [];
          num[char] = [];
        }
        node.eachSubnode(function (n) {
          ans = $checkQuant(n);
          result = ans.character;
          for (i = 0; i < characters.length; i += 1) {
            if (result[characters[i]] && typeof result[characters[i]][0] !== "undefined") {
              childrenValues[characters[i]].push(result[characters[i]][0]);
              sd[characters[i]].push(ans.stat[characters[i]].sd);
              ui[characters[i]].push(ans.stat[characters[i]].u);
              num[characters[i]].push(ans.stat[characters[i]].n);
            }
          }
        });
        if (!node.data.leaf) {
          for (i = 0; i < characters.length; i += 1) {
            char = characters[i];
            if (childrenValues[char].length !== 0) {
              node.data.stat[char].u = that.meanPop(num[char], ui[char]);
              node.data.character[char] = [node.data.stat[char].u];
              node.data.stat[char].n = that.sum(num[char]);
              node.data.stat[char].sd = that.sdPop(num[char], sd[char], ui[char], node.data.stat[characters[i]].u);
              result = compareFunction(node.data.stat[char].u, node.data.stat[char].sd, meanTree[char], sdTree[char]);
            } else {
              node.data.stat[char] = {
                sd: undefined,
                u: undefined,
                n: undefined
              };
              result = true;
            }

            node.data.characterConsistency[char] = result;
          }
        } else {
          for (i = 0; i < characters.length; i += 1) {
            result = node.data.character;
            if (result[characters[i]] && typeof result[characters[i]][0] !== "undefined") {
              node.data.stat[characters[i]] = {
                sd: 0,
                u: result[characters[i]][0],
                n: 1
              };
            } else {
              node.data.stat[characters[i]] = {
                sd: undefined,
                u: undefined,
                n: undefined
              };
            }
          }
        }
        return node.data;
      })(root);
    },
    checkQuali: function (characters) {
      var root = this.graph.getNode(this.root),
        i, that = this;

      function compareFunction(sample) {
        var test1 = sample[0],
          test2;
        for (var j = 0; j < sample.length; j += 1) {
          test2 = sample[j];
          var result = that.intersect(test1, test2);
          if (result.length !== test1.length || result.length !== test2.length) {
            return false;
          }
          test1 = result;
        }
        return true;
      }(function $checkQuali(node) {
        var childrenValues = {},
          result;
        node.data.characterConsistency = node.data.characterConsistency || {};
        for (i = 0; i < characters.length; i += 1) {
          childrenValues[characters[i]] = [];
        }
        node.eachSubnode(function (n) {
          result = $checkQuali(n);
          for (i = 0; i < characters.length; i += 1) {
            if (result[characters[i]]) {
              childrenValues[characters[i]].push(result[characters[i]]);
            }
          }
        });
        if (!node.data.leaf) {
          for (i = 0; i < characters.length; i += 1) {
            var char = characters[i];
            result = compareFunction(childrenValues[char]);
            node.data.characterConsistency[char] = result;
          }
        }
        return node.data.character;
      })(root);
    },
    quantParsimony: function (root, characters) {
      var methods = this.calcMethods;
      //       this.sdOfTree = this.sdAtTree ( root , characters );
      (function $quantParsimony(node) {
        var childrenValues = {};
        for (i = 0; i < characters.length; i += 1) {
          childrenValues[characters[i]] = [];
        }
        node.eachSubnode(function (n) {
          var result = $quantParsimony(n);
          for (i = 0; i < characters.length; i += 1) {
            if (result[characters[i]] && typeof result[characters[i]][0] !== "undefined") {
              childrenValues[characters[i]].push(result[characters[i]][0]);
            }
          }
        });
        if (!node.data.leaf) {
          for (i = 0; i < characters.length; i += 1) {
            var char = characters[i];
            var value = node.data.character[char];
            var mean = st.mean(childrenValues[char]);
            node.data.character[char] = [mean];
          }
        }
        return node.data.character;
      })(root);
    },
    listCharacters: function () {
      var aSpecies, i, result = [];
      for (aSpecies in this.character) {
        for (i in this.character[aSpecies]) {
          result.push(i);
        }
        return result;
      }
    },
    findAllCharTypes: function (root) {
      var type = {
        quant: [],
        quali: []
      },
        all = [],
        quali = {},
        quant = {},
        key, that = this,
        first = this.config.firstCharacter,
        charTypeMapping = {},
        i;
      if (all && all.length === 0) {
        all = this.listCharacters();
        if ( this.config.selectedCharacters.length !== 0 ) {
          // if the first character is not defined
          if ( typeof this.config.selectedCharacters [ 0 ] === 'undefined' ) {
            this.config.selectedCharacters [ 0 ] = all [ 0 ];
          }
          this.config.firstCharacter = this.config.selectedCharacters [ 0 ];
        } else if ( all.length !== 0  ) {
          this.config.selectedCharacters = [ all [ 0 ] ];
          this.config.firstCharacter = all [ 0 ];              
        }
      }
      if (all && all.length !== 0) {
        root.eachSubgraph(function (node) {
          if (node.data.leaf) {
            //           for ( key in node.data.character ){
            for (i = 0; i < all.length; i += 1) {
              key = all[i];
              //               if ( node.data.character.hasOwnProperty ( key ) ) {
              if (that.characterType(node.data.character[key], 'quali')) {
                quali[key] = true;
                charTypeMapping[key] = that.config.typeEnum.quali;
              } else if (that.characterType(node.data.character[key], 'quant')) {
                quant[key] = true;
                charTypeMapping[key] = that.config.typeEnum.quant;
              }
              //               }
            }
          }
        });
      }
      /*      if ( this.character && this.hasProperty ( this.character )) { 
        all.push ( first ) ;         
      }*/
      for (key in quali) {
        if (quali.hasOwnProperty(key)) {
          type.quali.push(key);
          /*           if ( key !== first ) {
              all.push ( key );
           }*/
        }
      }
      for (key in quant) {
        if (quant.hasOwnProperty(key)) {
          type.quant.push(key);
          /*           if ( key !== first ) {
              all.push ( key );
           }*/
        }
      }
      this.characterList = all;
      this.charTypeMapping = charTypeMapping;
      return type;
    },
    findQuantMinMax: function (root, quantCharacters) {
      var char, min, max, result = {},
        i;
      for (i = 0; i < quantCharacters.length; i += 1) {
        char = quantCharacters[i];
        result[char] = result[char] || {};
        result[char].min = min = Number.MAX_VALUE;
        result[char].max = max = Number.MIN_VALUE;
        root.eachSubgraph(function (node) {
          if (node.data.leaf) {
            var charState = node.data.character[char] && node.data.character[char][0];
            if (typeof charState !== 'undefined') {
              min = min < charState ? min : charState;
              max = max > charState ? max : charState;
            }
          }
        });
        result[char].min = min;
        result[char].max = max;
      }
      return result;
    },
    findQuantRange: function (quantMinMax) {
      var result = {},
        char, rangeCount = this.config.rangeCount,
        stepsize, i;
      for (char in quantMinMax) {
        if (quantMinMax.hasOwnProperty(char)) {
          var min = quantMinMax[char].min,
            max = quantMinMax[char].max;
          stepsize = (max - min) / rangeCount;
          result[char] = [];
          for (i = 1; i <= rangeCount; i += 1) {
            result[char].push((min + i * stepsize).toFixed(2));
          }
        }
      }
      return result;
    },
    colorCharacter: function (colorOverwrite) {
      var speciesHash = this.character,
        speciesName, char, i, that = this,
        box, node, characterValue, j, html;
      if ( this.hasProperty ( speciesHash ) ) {
        var rootNode = this.graph.getNode(this.root),
          string;
        var color = this.config.color;
        var distinct = {};
        var legendColorCollection = {};
        var pointerCollection = {};
        var legendCollection = {};
        var pointer = 0;
        var legendRows = '',
          multiple = false,
          firstCharacter, firstSpecies;

        //get character list
        var characterKey = [];
        for (speciesName in speciesHash) {
          if (speciesHash.hasOwnProperty(speciesName)) {
            for (char in speciesHash[speciesName]) {
              if (speciesHash[speciesName].hasOwnProperty(char)) {
                characterKey.push(char);
              }
            }
            break;
          }
        }

        function $colorCharacter(root, characterColorCollection) {
          var firstCharacter = that.config.firstCharacter,
            key, charArray, char, i, quantColor = that.config.quantColor,
            currentAdj;
          root.eachSubgraph(function (node) {
            node.data.color = node.data.color || {};

            // delete all colors
            for (adj in node.adjacencies) {
              if (node.adjacencies.hasOwnProperty(adj)) {
                currentAdj = node.adjacencies[adj];
                currentAdj.data && delete currentAdj.data.$color;
                //                 //adj.data && delete adj.data.$color;
              }
            }


            for (i = 0; i < that.characterGroups.quali.length; i += 1) {
              char = that.characterGroups.quali[i];
              charArray = node.data.character[char];
              key = charArray && charArray.length === 1 && charArray[0] || '';

              if (key) {
                key = key.replace(/ /g, '');
                node.data.color[char] = characterColorCollection[char].color;
                if (char === firstCharacter) {
                  for (adj in node.adjacencies) {
                    if (node.adjacencies.hasOwnProperty(adj)) {
                      currentAdj = node.adjacencies[adj];
                      var nodeTo = node.adjacencies[adj].nodeTo;
                      var nodeFrom = node.adjacencies[adj].nodeFrom;
                      if (nodeTo._depth < node._depth || nodeFrom._depth < node._depth) {
                        if (charArray.length === 1) {
                          currentAdj.data.$color = characterColorCollection[firstCharacter][charArray[0]].color;
                          break;
                        } else {
                          delete currentAdj.data.$color;
                        }
                      }
                    }
                  }
                }
              } else {
                node.data.color[char] = characterColorCollection[char]['multiple'];
              }
            }
            for (i = 0; i < that.characterGroups.quant.length; i += 1) {
              char = that.characterGroups.quant[i];
              charArray = node.data.character[char];
              key = charArray && charArray.length === 1 && charArray[0] || '';

              if (key) {
                var rangeArray = that.range[char];
                var index = that.findIndex(key, rangeArray);
                //                 node.data.color[ char ] = characterColorCollection [ char ][ index ];
                node.data.color[char] = quantColor[index];
                if (char === firstCharacter) {
                  for (adj in node.adjacencies) {
                    if (node.adjacencies.hasOwnProperty(adj)) {
                      var currentAdj = node.adjacencies[adj];
                      var nodeTo = node.adjacencies[adj].nodeTo;
                      var nodeFrom = node.adjacencies[adj].nodeFrom;
                      if (nodeTo._depth < node._depth || nodeFrom._depth < node._depth) {
                        if (charArray.length === 1) {
                          //                           currentAdj.data.$color = characterColorCollection [ firstCharacter ][ key ];
                          currentAdj.data.$color = quantColor[index];
                          break;
                        } else {
                          delete currentAdj.data.$color;
                        }
                      }
                    }
                  }
                }
              }
            }
          });
        }
        //append to legend table
        distinct = legendColorCollection[firstCharacter];
        if (!this.config.initCharacter) {
          this.setCharacter(this.config.firstCharacter);
          this.config.initCharacter = true;
        }
        this.characterGroups = this.findAllCharTypes(rootNode);
        this.fitchParsimony(rootNode, this.characterGroups.quali);
        this.quantParsimony(rootNode, this.characterGroups.quant);
        this.checkQuali(this.characterGroups.quali);
        this.checkQuant(this.characterGroups.quant);
        this.characterMinMax = this.findQuantMinMax(rootNode, this.characterGroups.quant);
        this.range = this.findQuantRange(this.characterMinMax);
        html = this.createLegend();
        $colorCharacter(this.graph.getNode(this.root), this.colorCoding);
        return html;

      }
    },
    findDistinctCharacterStates: function (character) {
      var i, result = [],
        temp = {},
        node, char, j;

      for (i in this.graph.nodes) {
        if (this.graph.nodes.hasOwnProperty(i)) {
          node = this.graph.nodes[i];
          char = node.data.character[character];
          if (node.data.leaf && char) {
            for (j = 0; j < char.length; j++) {
              temp[char[j]] = character;
            }
          }
        }
      }

      for (i in temp) {
        if (temp.hasOwnProperty(i)) {
          result.push(i);
        }
      }
      return {
        hash: temp,
        array: result
      };
    },
    createLegend: function () {


      // find distinct character states for different characters
      var list, root, i, char, temp = {},
        ds = {},
        j, dschar, sh, jj, shapes = this.config.shapes,
        dsAlt = {},
        dscharAlt, color = this.config.color,
        shapePointer = 0,
        rangeArray, label, quantColor = this.config.quantColor,
        quantShape = this.config.quantShape,
        heading, content;
      root = this.graph.getNode(this.root);
      list = this.characterGroups.quali;

      // qualitative characters
      if (!list) {
        this.findAllCharTypes(root);
        list = this.characterGroups.quali;
      }
      if (list) {
        for (i = 0; i < list.length; i += 1) {
          char = list[i];
          temp[char] = this.findDistinctCharacterStates(char).array;
          temp[char] && temp[char].push('multiple');
        }
      }
      for (i in temp) {
        if (temp.hasOwnProperty(i)) {
          char = temp[i];
          dschar = [];
          dscharAlt = {};
          for (j = 0; j < char.length; j += 1) {
            jj = color.length > j ? j : color.length - 1;
            sh = shapes.length > shapePointer ? shapePointer : shapes.length - 1;
            dschar.push({
              color: color[jj],
              name: char[j],
              shape: shapes[sh]
            });
            dscharAlt[char[j]] = {
              color: color[jj],
              shape: shapes[sh]
            };
          }
          ds[i] = dschar;
          dsAlt[i] = dscharAlt;
          shapePointer++;
        }
      }

      // quantitative characters
      for (i = 0; i < this.characterGroups.quant.length; i += 1) {
        char = this.characterGroups.quant[i];
        rangeArray = this.range[char];
        dschar = [];
        dscharAlt = {};
        for (j = 0; j < rangeArray.length; j += 1) {
          //           jj = color.length > j ? j : color.length - 1;
          jj = quantColor.length > j ? j : quantColor.length - 1;
          sh = shapes.length > shapePointer ? shapePointer : shapes.length - 1;
          label = (j === 0 ? this.characterMinMax[char].min.toFixed(2) : rangeArray[j - 1]) + ' - ' + rangeArray[j];
          /*          dschar.push ({ color: color[jj], name: label , shape: shapes [ sh ] });
          dscharAlt[label] = {color: color[jj],shape: shapes [ sh ] };*/
          dschar.push({
            color: quantColor[j],
            name: label,
            shape: quantShape
          });
          dscharAlt[label] = {
            color: quantColor[j],
            shape: quantShape
          };

        }
        ds[char] = dschar;
        dsAlt[char] = dscharAlt;
        shapePointer++;
      }

      // formatting
      heading = '';
      content = '';
      //       list = this.characterList;
      list = this.config.selectedCharacters;
      for (i = 0; i < list.length; i += 1) {
        label = '';
        char = list[i];
        if ( typeof char !== 'undefined' ) {
          dschar = ds[char] || [];
          heading = '<tr><th colspan="2">' + char.replace(/_/g, ' ') + '</th></tr>';
          for (j = 0; j < dschar.length; j += 1) {
            sh = dschar[j];
            label += '<tr><td><div class ="' + sh.shape + '" style="background-color:' + sh.color + ';"></div></td><td>' + sh.name + '</td></tr>';
          }
          if (label) {
            content += heading + label;
          }
        }
      }
      this.colorCoding = dsAlt;
      this.colorCodingQuali = ds;
      return content;
    },
    findIndex: function (value, rangeArray) {
      var i;
      if (typeof value === 'undefined' || typeof rangeArray === 'undefined') {
        return;
      }
      for (i = 0; i < rangeArray.length; i += 1) {
        if (value <= rangeArray[i]) {
          break;
        }
      }
      return i === rangeArray.length ? i - 1 : i;
    },
    /*
        Method: plot
        
        Plots the <Phylo>. This is a shortcut to *fx.plot*.

        */
    plot: function () {
      this.fx.plot(this.controller);
    },
    /*
    Method: zoom
      
    Zoom in or out of the tree. This causes clades to collapse or expand. It is dependent on the values of scroll.
    
    Parameters:

    scroll - (number) positive for zoom in and negative for zoom out.
  */
    fitScreen: function () {
      var size = this.canvas.getSize(),
        key, i;
      var overflow = false;
      //     var nodes = this.graph.nodes;
      var clicked = this.clickedNode.id || this.root;
      var height = 0,
        root = this.graph.getNode(clicked),
        depth = this.graph.depth;
      this.config.onBeforeCompute({
        name: ''
      });
      for (key in depth) {
        if (depth.hasOwnProperty(key)) {
          if (depth[key]) {
            var nodes = depth[key];
            var tempHeight = 0;
            for (i = 0; i < nodes.length; i += 1) {
              var node = nodes[i];
              if (height < size.height) {
                if (node.data.leaf) {
                  tempHeight += node.getData('height', 'start') + 8;
                } else {
                  tempHeight += node.getData('height', 'start') / 2;
                }
                node.drawn = true;
                node.exist = true;
              }
            }
            if (tempHeight + height < size.height && !overflow) {
              height += tempHeight;
              this.zoomIndex = parseInt(key, 10);
            } else {
              for (i = 0; i < nodes.length; i += 1) {
                var node = nodes[i];
                node.exist = false;
                node.drawn = false;
                node.collapsed = true;
              }
              overflow = true;
            }
          }
        }
      }
      var canvas = this.canvas,
        ox = canvas.translateOffsetX,
        oy = canvas.translateOffsetY;
      this.canvas.translate(-1 * ox, -1 * oy);
      this.computePositions(this.graph.getNode(this.root), '');
      this.plot();
      this.config.onAfterCompute();
    },
    /*
    Method: zoom
      
    Zoom in or out of the tree. This causes clades to collapse or expand. It is dependent on the values of scroll.
    
    Parameters:

    scroll - (number) positive for zoom in and negative for zoom out.
  */

    zoom: function (scroll) {
      if (!this.busy) {
        this.busy = true;
        this.config.onBeforeCompute({
          name: ''
        });
        var viz = this,
          graph = viz.graph,
          flag = true,
          node = viz.graph.getNode(viz.root),
          step = 2,
          min = 1,
          max = graph.depth.length - 1,
          j;
        if (typeof viz.zoomIndex === 'undefined') {
          viz.zoomIndex = 1;
        }
        var i = viz.zoomIndex;
        if (i < 1) {
          i = 1;
        } else if (i > graph.depth.length - 1) {
          i = graph.depth.length - 1;
        }
        var show = scroll < 0 ? false : true;
        // calculate the step size
        step = Math.round(graph.depth.length / 10);
        step = Math.max(step, 2);
        var maxDepth = graph.depth.length;
        var nodelist = graph.depth[i];
        for (j = nodelist.length - 1; j >= 0; j -= 1) {
          var n = nodelist[j];
          n.eachLevel(1, step, function (subn) {
            var nodeVisible = show ? !subn.exist : subn.exist;
            if (nodeVisible) {
              subn.exist = show;
              subn.drawn = show;
            }
          });
        }
        viz.computePositions(node, '');
        viz.plot();
        viz.config.onAfterCompute('Depth ' + i);
        //         show ? i+=step : i-=step;
        i += (show ? +1 : -1) * step;
        viz.zoomIndex = i;
        this.busy = false;
      }
    },


    /*
        Method: switchPosition
        
        Switches the tree orientation.

        Parameters:

        pos - (string) The new tree orientation. Possible values are "top", "left", "right" and "bottom".
        method - (string) Set this to "animate" if you want to animate the tree when switching its position. You can also set this parameter to "replot" to just replot the subtree.
        onComplete - (optional|object) This callback is called once the "switching" animation is complete.

        Example:

        (start code js)
          st.switchPosition("right", "animate", {
            onComplete: function() {
              alert('completed!');
            } 
          });
        (end code)
        */
    switchPosition: function (pos, method, onComplete) {
      var Geom = this.geom,
        Plot = this.fx,
        that = this;
      if (!Plot.busy) {
        Plot.busy = true;
        this.contract({
          onComplete: function () {
            Geom.switchOrientation(pos);
            that.compute('end', false);
            Plot.busy = false;
            if (method === 'animate') {
              that.onClick(that.clickedNode.id, onComplete);
            } else if (method === 'replot') {
              that.select(that.clickedNode.id, onComplete);
            }
          }
        }, pos);
      }
    },

    /*
        Method: switchAlignment
      
        Switches the tree alignment.

        Parameters:

      align - (string) The new tree alignment. Possible values are "left", "center" and "right".
      method - (string) Set this to "animate" if you want to animate the tree after aligning its position. You can also set this parameter to "replot" to just replot the subtree.
      onComplete - (optional|object) This callback is called once the "switching" animation is complete.

        Example:

        (start code js)
          st.switchAlignment("right", "animate", {
          onComplete: function() {
            alert('completed!');
          } 
          });
        (end code)
      */
    switchAlignment: function (align, method, onComplete) {
      this.config.align = align;
      if (method === 'animate') {
        this.select(this.clickedNode.id, onComplete);
      } else if (method === 'replot') {
        this.onClick(this.clickedNode.id, onComplete);
      }
    },

    /*
        Method: addNodeInPath
      
        Adds a node to the current path as selected node. The selected node will be visible (as in non-collapsed) at all times.
        

        Parameters:

      id - (string) A <Graph.Node> id.

        Example:

        (start code js)
          st.addNodeInPath("nodeId");
        (end code)
      */
    addNodeInPath: function (id) {
      nodesInPath.push(id);
      this.select((this.clickedNode && this.clickedNode.id) || this.root);
    },

    /*
      Method: clearNodesInPath
      
      Removes all nodes tagged as selected by the <Phylo.addNodeInPath> method.
      
      See also:
      
      <Phylo.addNodeInPath>
    
      Example:

      (start code js)
        st.clearNodesInPath();
      (end code)
      */
    clearNodesInPath: function (id) {
      nodesInPath.length = 0;
      this.select((this.clickedNode && this.clickedNode.id) || this.root);
    },

    /*
        Method: refresh
        
        Computes positions and plots the tree.
        
      */
    refresh: function () {
      this.reposition();
      this.select((this.clickedNode && this.clickedNode.id) || this.root);
    },

    reposition: function () {
      this.graph.computeLevels(this.root, 0, "ignore");
      this.geom.setRightLevelToShow(this.clickedNode, this.canvas);
      this.graph.eachNode(function (n) {
        if (n.exist) {
          n.drawn = true;
        }
      });
      this.compute('end');
    },

    requestNodes: function (node, onComplete) {
      var handler = $.merge(this.controller, onComplete),
        lev = this.config.levelsToShow;
      if (handler.request) {
        var leaves = [],
          d = node._depth;
        node.eachLevel(0, lev, function (n) {
          if (n.drawn && !n.anySubnode()) {
            leaves.push(n);
            n._level = lev - (n._depth - d);
          }
        });
        this.group.requestNodes(leaves, handler);
      } else {
        handler.onComplete();
      }
    },

    contract: function (onComplete, switched) {
      var orn = this.config.orientation;
      var Geom = this.geom,
        Group = this.group;
      if (switched) {
        Geom.switchOrientation(switched);
      }
      var nodes = getNodesToHide.call(this);
      if (switched) {
        Geom.switchOrientation(orn);
      }
      Group.contract(nodes, $.merge(this.controller, onComplete));
    },

    move: function (node, onComplete) {
      this.compute('end', false);
      var move = onComplete.Move,
        offset = {
          'x': move.offsetX,
          'y': move.offsetY
        };
      this.fx.animate($.merge(this.controller, {
        modes: ['linear']
      }, onComplete));
    },

    expand: function (node, onComplete) {
      var nodeArray = getNodesToShow.call(this, node);
      this.group.expand(nodeArray, $.merge(this.controller, onComplete));
    },

    selectPath: function (node) {
      var that = this,
        i, ns;
      this.graph.eachNode(function (n) {
        n.selected = false;
      });

      function path(node) {
        if (node === null || node.selected) {
          return;
        }
        node.selected = true;
        $.each(that.group.getSiblings([node])[node.id], function (n) {
          n.exist = true;
          n.drawn = true;
        });
        var parents = node.getParents();
        parents = (parents.length > 0) ? parents[0] : null;
        path(parents);
      }
      for (i = 0, ns = [node.id].concat(nodesInPath); i < ns.length; i += 1) {
        path(this.graph.getNode(ns[i]));
      }
    },

    /*
        Method: setRoot
    
        Switches the current root node. Changes the topology of the Tree.
    
        Parameters:
          id - (string) The id of the node to be set as root.
          method - (string) Set this to "animate" if you want to animate the tree after adding the subtree. You can also set this parameter to "replot" to just replot the subtree.
          onComplete - (optional|object) An action to perform after the animation (if any).

        Example:

        (start code js)
          st.setRoot('nodeId', 'animate', {
            onComplete: function() {
              alert('complete!');
            }
          });
        (end code)
    */
    setRoot: function (id, method, onComplete) {
      if (this.busy) {
        return;
      }
      this.busy = true;
      var that = this,
        canvas = this.canvas;
      var clickedNode = this.graph.getNode(id);

      function $setRoot() {
        this.root = id;
        var node = this.graph.getNode(id);
        this.clickedNode = clickedNode;
        this.graph.computeLevels(this.root, 0, "ignore");
        node.collapsed = true;
        this.nodesExpCol(node);
        this.computePositions(node, 'end', true);
        this.computeLeaves(this.graph.getNode(id), 0);
        this.fitchParsimony(this.graph.getNode(id));
        this.colorCharacter();
        this.fx.animate({
          modes: ['linear', 'node-property:alpha'],
          onComplete: function () {
            that.busy = false;
          }
        });
      }

      if (method === 'animate') {
        $setRoot.call(this);
      } else if (method === 'replot') {
        $setRoot.call(this);
      }
      this.zoomIndex = this.graph.depth.length - 1;
    },

    /*
          Method: addSubtree
        
            Adds a subtree.
        
          Parameters:
              subtree - (object) A JSON Tree object. See also <Loader.loadJSON>.
              method - (string) Set this to "animate" if you want to animate the tree after adding the subtree. You can also set this parameter to "replot" to just replot the subtree.
              onComplete - (optional|object) An action to perform after the animation (if any).
    
          Example:

          (start code js)
            st.addSubtree(json, 'animate', {
                onComplete: function() {
                  alert('complete!');
                }
            });
          (end code)
        */
    addSubtree: function (subtree, method, onComplete) {
      if (method === 'replot') {
        this.op.sum(subtree, $.extend({
          type: 'replot'
        }, onComplete || {}));
      } else if (method === 'animate') {
        this.op.sum(subtree, $.extend({
          type: 'fade:seq'
        }, onComplete || {}));
      }
    },

    /*
          Method: removeSubtree
        
            Removes a subtree.
        
          Parameters:
              id - (string) The _id_ of the subtree to be removed.
              removeRoot - (boolean) Default's *false*. Remove the root of the subtree or only its subnodes.
              method - (string) Set this to "animate" if you want to animate the tree after removing the subtree. You can also set this parameter to "replot" to just replot the subtree.
              onComplete - (optional|object) An action to perform after the animation (if any).

          Example:

          (start code js)
            st.removeSubtree('idOfSubtreeToBeRemoved', false, 'animate', {
              onComplete: function() {
                alert('complete!');
              }
            });
          (end code)
    
        */
    removeSubtree: function (id, removeRoot, method, onComplete) {
      var node = this.graph.getNode(id),
        subids = [];
      node.eachLevel(+!removeRoot, false, function (n) {
        subids.push(n.id);
      });
      if (method === 'replot') {
        this.op.removeNode(subids, $.extend({
          type: 'replot'
        }, onComplete || {}));
      } else if (method === 'animate') {
        this.op.removeNode(subids, $.extend({
          type: 'fade:seq'
        }, onComplete || {}));
      }
    },

    /*
          Method: select
        
            Selects a node in the <Phylo> without performing an animation. Useful when selecting 
            nodes which are currently hidden or deep inside the tree.

          Parameters:
            id - (string) The id of the node to select.
            onComplete - (optional|object) an onComplete callback.

          Example:
          (start code js)
            st.select('mynodeid', {
              onComplete: function() {
                alert('complete!');
              }
            });
          (end code)
        */
    select: function (id, onComplete) {
      var group = this.group,
        geom = this.geom;
      var node = this.graph.getNode(id),
        canvas = this.canvas;
      var root = this.graph.getNode(this.root);
      var complete = $.merge(this.controller, onComplete);
      var that = this;

      complete.onBeforeCompute(node);
      this.selectPath(node);
      this.clickedNode = node;
      this.requestNodes(node, {
        onComplete: function () {
          group.hide(group.prepare(getNodesToHide.call(that)), complete);
          geom.setRightLevelToShow(node, canvas);
          that.compute("current");
          that.graph.eachNode(function (n) {
            var pos = n.pos.getc(true);
            n.startPos.setc(pos.x, pos.y);
            n.endPos.setc(pos.x, pos.y);
            n.visited = false;
          });
          var offset = {
            x: complete.offsetX,
            y: complete.offsetY
          };
          that.geom.translate(node.endPos.add(offset).$scale(-1), ["start", "current", "end"]);
          group.show(getNodesToShow.call(that));
          that.plot();
          complete.onAfterCompute(that.clickedNode);
          complete.onComplete();
        }
      });
    },

    /*
        Method: onClick
    
        Animates the <Phylo> to center the node specified by *id*.
            
        Parameters:
        
        id - (string) A node id.
        options - (optional|object) A group of options and callbacks described below.
        onComplete - (object) An object callback called when the animation finishes.
        Move - (object) An object that has as properties _offsetX_ or _offsetY_ for adding some offset position to the centered node.

        Example:

        (start code js)
          st.onClick('mynodeid', {
            Move: {
              enable: true,
              offsetX: 30,
              offsetY: 5
            },
            onComplete: function() {
                alert('yay!');
            }
          });
        (end code)
    
        */
    onClick: function (id, options) {
      var canvas = this.canvas,
        that = this,
        Geom = this.geom,
        config = this.config;
      var innerController = {
        Move: {
          enable: true,
          offsetX: config.offsetX || 0,
          offsetY: config.offsetY || 0
        },
        setRightLevelToShowConfig: false,
        onBeforeRequest: $.empty,
        onBeforeContract: $.empty,
        onBeforeMove: $.empty,
        onBeforeExpand: $.empty
      };
      var complete = $.merge(this.controller, innerController, options);

      if (!this.busy) {
        this.busy = true;
        var node = this.graph.getNode(id);
        this.selectPath(node, this.clickedNode);
        this.clickedNode = node;
        complete.onBeforeCompute(node);
        complete.onBeforeRequest(node);
        complete.onBeforeContract(node);
        Geom.setRightLevelToShow(node, canvas, complete.setRightLevelToShowConfig);
        complete.onBeforeMove(node);
        var nodes = getNodesToShow.call(this, node);
        that.group.show(nodes);
        that.computePositions(node, '');
        complete.onAfterCompute(id);
        this.busy = false;
      }
    }
  });

})();

$jit.Phylo.$extend = true;

/*
  Class: Phylo.Op
    
  Custom extension of <Graph.Op>.

  Extends:

  All <Graph.Op> methods
  
  See also:
  
  <Graph.Op>

*/
$jit.Phylo.Op = new Class({

  Implements: Graph.Op

});

/*
    
    Performs operations on group of nodes.

*/
$jit.Phylo.Group = new Class({

  initialize: function (viz) {
    this.viz = viz;
    this.canvas = viz.canvas;
    this.config = viz.config;
    this.animation = new Animation;
    this.nodes = null;
  },

  /*
    
      Calls the request method on the controller to request a subtree for each node. 
    */
  requestNodes: function (nodes, controller) {
    var counter = 0,
      len = nodes.length,
      nodeSelected = {},
      i;
    var complete = function () {
        controller.onComplete();
      };
    var viz = this.viz;
    if (len === 0) {
      complete();
    }
    for (i = 0; i < len; i += 1) {
      nodeSelected[nodes[i].id] = nodes[i];
      controller.request(nodes[i].id, nodes[i]._level, {
        onComplete: function (nodeId, data) {
          if (data && data.children) {
            data.id = nodeId;
            viz.op.sum(data, {
              type: 'nothing'
            });
          }
          if (++counter === len) {
            viz.graph.computeLevels(viz.root, 0);
            complete();
          }
        }
      });
    }
  },

  /*
    
      Collapses group of nodes. 
    */
  contract: function (nodes, controller) {
    var viz = this.viz;
    var that = this;

    nodes = this.prepare(nodes);
    this.animation.setOptions($.merge(controller, {
      $animating: false,
      compute: function (delta) {
        if (delta === 1) {
          delta = 0.99;
        }
        that.plotStep(1 - delta, controller, this.$animating);
        this.$animating = 'contract';
      },

      complete: function () {
        that.hide(nodes, controller);
      }
    })).start();
  },

  hide: function (nodes, controller) {
    var viz = this.viz,
      i;
    for (i = 0; i < nodes.length; i += 1) {
      // TODO nodes are requested on demand, but not
      // deleted when hidden. Would that be a good feature?
      // Currently that feature is buggy, so I'll turn it off
      // Actually this feature is buggy because trimming should take
      // place onAfterCompute and not right after collapsing nodes.
      if (true || !controller || !controller.request) {
        nodes[i].eachLevel(1, false, function (elem) {
          if (elem.exist) {
            $.extend(elem, {
              'drawn': false,
              'exist': false
            });
          }
        });
      } else {
        var ids = [];
        nodes[i].eachLevel(1, false, function (n) {
          ids.push(n.id);
        });
        viz.op.removeNode(ids, {
          'type': 'nothing'
        });
        viz.labels.clearLabels();
      }
    }
    controller.onComplete();
  },


  /*
      Expands group of nodes. 
    */
  expand: function (nodes, controller) {
    var that = this;
    this.show(nodes);
    this.animation.setOptions($.merge(controller, {
      $animating: false,
      compute: function (delta) {
        that.plotStep(delta, controller, this.$animating);
        this.$animating = 'expand';
      },

      complete: function () {
        that.plotStep(undefined, controller, false);
        controller.onComplete();
      }
    })).start();

  },

  show: function (nodes) {
    var config = this.config;
    this.prepare(nodes);
    $.each(nodes, function (n) {
      // check for root nodes if multitree
      if (config.multitree && !('$orn' in n.data)) {
        delete n.data.$orns;
        var orns = ' ';
        n.eachSubnode(function (ch) {
          if (('$orn' in ch.data) && orns.indexOf(ch.data.$orn) < 0 && ch.exist && !ch.drawn) {
            orns += ch.data.$orn + ' ';
          }
        });
        n.data.$orns = orns;
      }
      n.eachLevel(0, config.levelsToShow, function (n) {
        if (n.exist) {
          n.drawn = true;
        }
      });
    });
  },

  prepare: function (nodes) {
    this.nodes = this.getNodesWithChildren(nodes);
    return this.nodes;
  },

  /*
      Filters an array of nodes leaving only nodes with children.
    */
  getNodesWithChildren: function (nodes) {
    var ans = [],
      config = this.config,
      root = this.viz.root,
      i, j, desc;
    nodes.sort(function (a, b) {
      return (a._depth <= b._depth) - (a._depth >= b._depth);
    });
    for (i = 0; i < nodes.length; i += 1) {
      if (nodes[i].anySubnode("exist")) {
        for (j = i + 1, desc = false; !desc && j < nodes.length; j += 1) {
          if (!config.multitree || '$orn' in nodes[j].data) {
            desc = desc || nodes[i].isDescendantOf(nodes[j].id);
          }
        }
        if (!desc) {
          ans.push(nodes[i]);
        }
      }
    }
    return ans;
  },

  plotStep: function (delta, controller, animating) {
    var viz = this.viz,
      config = this.config,
      canvas = viz.canvas,
      ctx = canvas.getCtx(),
      nodes = this.nodes;
    var i, node;
    // hide nodes that are meant to be collapsed/expanded
    var nds = {};
    for (i = 0; i < nodes.length; i += 1) {
      node = nodes[i];
      nds[node.id] = [];
      var root = config.multitree && !('$orn' in node.data);
      var orns = root && node.data.$orns;
      node.eachSubgraph(function (n) {
        // TODO(nico): Cleanup
        // special check for root node subnodes when
        // multitree is checked.
        if (root && orns && orns.indexOf(n.data.$orn) > 0 && n.drawn) {
          n.drawn = false;
          nds[node.id].push(n);
        } else if ((!root || !orns) && n.drawn) {
          n.drawn = false;
          nds[node.id].push(n);
        }
      });
      node.drawn = true;
    }
    // plot the whole (non-scaled) tree
    if (nodes.length > 0) {
      viz.fx.plot();
    }
    // show nodes that were previously hidden
    for (i in nds) {
      $.each(nds[i], function (n) {
        n.drawn = true;
      });
    }
    // plot each scaled subtree
    for (i = 0; i < nodes.length; i += 1) {
      node = nodes[i];
      ctx.save();
      viz.fx.plotSubtree(node, controller, delta, animating);
      ctx.restore();
    }
  },
  /*
Gets the siblings of the nodes in the array.
*/
  getSiblings: function (nodes) {
    var siblings = {};
    $.each(nodes, function (n) {
      var par = n.getParents();
      if (par.length === 0) {
        siblings[n.id] = [n];
      } else {
        var ans = [];
        par[0].eachSubnode(function (sn) {
          ans.push(sn);
        });
        siblings[n.id] = ans;
      }
    });
    return siblings;
  }
});

/*
  Phylo.Geom

  Performs low level geometrical computations.

  Access:

  This instance can be accessed with the _geom_ parameter of the st instance created.

  Example:

  (start code js)
    var st = new Phylo(canvas, config);
    st.geom.translate //or can also call any other <Phylo.Geom> method
  (end code)

*/

$jit.Phylo.Geom = new Class({
  Implements: Graph.Geom,
  /*
      Changes the tree current orientation to the one specified.

      You should usually use <Phylo.switchPosition> instead.
    */
  switchOrientation: function (orn) {
    this.config.orientation = orn;
  },

  /*
      Makes a value dispatch according to the current layout
      Works like a CSS property, either _top-right-bottom-left_ or _top|bottom - left|right_.
    */
  dispatch: function () {
    // TODO(nico) should store Array.prototype.slice.call somewhere.
    var args = Array.prototype.slice.call(arguments);
    var s = args.shift(),
      len = args.length;
    var val = function (a) {
        return typeof a === 'function' ? a() : a;
      };
    if (len === 2) {
      return (s === "top" || s === "bottom") ? val(args[0]) : val(args[1]);
    } else if (len === 4) {
      switch (s) {
      case "top":
        return val(args[0]);
      case "right":
        return val(args[1]);
      case "bottom":
        return val(args[2]);
      case "left":
        return val(args[3]);
      }
    }
    return undefined;
  },

  /*
      Returns label height or with, depending on the tree current orientation.
    */
  getSize: function (n, invert) {
    var data = n.data,
      config = this.config;
    var siblingOffset = config.siblingOffset;
    var s = (config.multitree && ('$orn' in data) && data.$orn) || config.orientation;
    var w = n.getData('width') + siblingOffset;
    var h = n.getData('height') + siblingOffset;
    if (!invert) {
      return this.dispatch(s, h, w);
    } else {
      return this.dispatch(s, w, h);
    }
  },

  /*
      Calculates a subtree base size. This is an utility function used by _getBaseSize_
    */
  getTreeBaseSize: function (node, level, leaf) {
    var size = this.getSize(node, true),
      baseHeight = 0,
      that = this;
    if (leaf(level, node)) {
      return size;
    }
    if (level === 0) {
      return 0;
    }
    node.eachSubnode(function (elem) {
      baseHeight += that.getTreeBaseSize(elem, level - 1, leaf);
    });
    return (size > baseHeight ? size : baseHeight) + this.config.subtreeOffset;
  },


  /*
      getEdge
      
      Returns a Complex instance with the begin or end position of the edge to be plotted.

      Parameters:

      node - A <Graph.Node> that is connected to this edge.
      type - Returns the begin or end edge position. Possible values are 'begin' or 'end'.

      Returns:

      A <Complex> number specifying the begin or end position.
    */
  getEdge: function (node, type, s) {
    var $C = function (a, b) {
        return function () {
          return node.pos.add(new Complex(a, b));
        };
      };
    var dim = this.node;
    var w = node.getData('width');
    var h = node.getData('height');

    if (type === 'begin') {
      if (dim.align === "center") {
        return this.dispatch(s, $C(0, h / 2), $C(-w / 2, 0), $C(0, -h / 2), $C(w / 2, 0));
      } else if (dim.align === "left") {
        return this.dispatch(s, $C(0, h), $C(0, 0), $C(0, 0), $C(w, 0));
      } else if (dim.align === "right") {
        return this.dispatch(s, $C(0, 0), $C(-w, 0), $C(0, -h), $C(0, 0));
      } else {
        throw "align: not implemented";
      }


    } else if (type === 'end') {
      if (dim.align === "center") {
        return this.dispatch(s, $C(0, -h / 2), $C(w / 2, 0), $C(0, h / 2), $C(-w / 2, 0));
      } else if (dim.align === "left") {
        return this.dispatch(s, $C(0, 0), $C(w, 0), $C(0, h), $C(0, 0));
      } else if (dim.align === "right") {
        return this.dispatch(s, $C(0, -h), $C(0, 0), $C(0, 0), $C(-w, 0));
      } else {
        throw "align: not implemented";
      }
    }
  },

  /*
      Adjusts the tree position due to canvas scaling or translation.
    */
  getScaledTreePosition: function (node, scale) {
    var dim = this.node;
    var w = node.getData('width');
    var h = node.getData('height');
    var s = (this.config.multitree && ('$orn' in node.data) && node.data.$orn) || this.config.orientation;

    var $C = function (a, b) {
        return function () {
          return node.pos.add(new Complex(a, b)).$scale(1 - scale);
        };
      };
    if (dim.align === "left") {
      return this.dispatch(s, $C(0, h), $C(0, 0), $C(0, 0), $C(w, 0));
    } else if (dim.align === "center") {
      return this.dispatch(s, $C(0, h / 2), $C(-w / 2, 0), $C(0, -h / 2), $C(w / 2, 0));
    } else if (dim.align === "right") {
      return this.dispatch(s, $C(0, 0), $C(-w, 0), $C(0, -h), $C(0, 0));
    } else {
      throw "align: not implemented";
    }
  },

  /*
      treeFitsInCanvas
      
      Returns a Boolean if the current subtree fits in canvas.

      Parameters:

      node - A <Graph.Node> which is the current root of the subtree.
      canvas - The <Canvas> object.
      level - The depth of the subtree to be considered.
    */
  treeFitsInCanvas: function (node, canvas, level) {
    var csize = canvas.getSize();
    var s = (this.config.multitree && ('$orn' in node.data) && node.data.$orn) || this.config.orientation;

    var size = this.dispatch(s, csize.width, csize.height);
    var baseSize = this.getTreeBaseSize(node, level, function (level, node) {
      return level === 0 || !node.anySubnode();
    });
    return (baseSize < size);
  }
});
/*
  Class: Phylo.Util
  
  Custom extension of <Graph.Plot>.

  Extends:

  All <Graph.Util> methods
  
  See also:
  
  <Graph.Util>

*/
Graph.Util.eachAdjacency = function (node, action, flags) {
  var adj = node.adjacencies,
    filter = this.filter(flags),
    id, i;
  var keys = new Array();
  var nodeList = new Array();
  for (id in adj) {
    keys.push(id);
    if (node !== adj[id].nodeTo) {
      nodeList.push(adj[id].nodeTo);
    } else {
      nodeList.push(adj[id].nodeFrom);
    }
  }
  // TODO: change this function
  if (isLateralise()) {
    var cmp = function (node1, node2) {
        node1.data.len = node1.data.len || 0;
        node2.data.len = node2.data.len || 0;
        return node1.data.len - node2.data.len;
      };
    nodeList = nodeList.sort(cmp);
    keys = new Array();
    for (i = 0; i < nodeList.length; i += 1) {
      keys.push(nodeList[i].id);
    }
  }
  if (node.data.rotate) {
    keys = keys.reverse();
  }
  for (id in keys) {
    if ( keys.hasOwnProperty ( id ) ) {
      var a = adj[keys[id]];
      if (filter(a)) {
        if (a.nodeFrom !== node) {
          var tmp = a.nodeFrom;
          a.nodeFrom = a.nodeTo;
          a.nodeTo = tmp;
        }
        action(a, id);
      }
    }
  }
};

/*
  Class: Phylo.Plot
  
  Custom extension of <Graph.Plot>.

  Extends:

  All <Graph.Plot> methods
  
  See also:
  
  <Graph.Plot>

*/
Graph.Plot.plotTree = function (node, opt, animating) {
  var that = this,
    viz = this.viz,
    canvas = viz.canvas,
    config = this.config,
    ctx = canvas.getCtx();
  var nodeAlpha = node.getData('alpha');
  if (viz.clickedNode.id === node.id) {
    ctx.save();
    ctx.strokeStyle = 'yellow';
  }
  node.eachSubnode(function (elem) {
    if (opt.plotSubtree(node, elem) && elem.exist && elem.drawn) {
      var adj = node.getAdjacency(elem.id);
      !animating && opt.onBeforePlotLine(adj);
      that.plotLine(adj, canvas, animating);
      !animating && opt.onAfterPlotLine(adj);
      that.plotTree(elem, opt, animating);
    }
  });
  if (node.drawn) {
    !animating && opt.onBeforePlotNode(node);
    this.plotNode(node, canvas, animating);
    !animating && opt.onAfterPlotNode(node);
    if (!opt.hideLabels && opt.withLabels && nodeAlpha >= 0.95) {
      this.labels.plotLabel(canvas, node, opt);
    } else {
      this.labels.hideLabel(node, false);
    }
  } else {
    this.labels.hideLabel(node, true);
  }
  if (viz.clickedNode.id === node.id) {
    ctx.restore();
  }
};

$jit.Phylo.Plot = new Class({

  Implements: Graph.Plot,

  /*
      Plots a subtree from the PhyloJiVE.
    */
  plotSubtree: function (node, opt, scale, animating) {
    var viz = this.viz,
      canvas = viz.canvas,
      config = viz.config;
    scale = Math.min(Math.max(0.001, scale), 1);
    if (scale >= 0) {
      node.drawn = false;
      var ctx = canvas.getCtx();
      var diff = viz.geom.getScaledTreePosition(node, scale);
      ctx.translate(diff.x, diff.y);
      ctx.scale(scale, scale);
    }
    this.plotTree(node, $.merge(opt, {
      'withLabels': true,
      'hideLabels': !! scale,
      'plotSubtree': function (n, ch) {
        var root = config.multitree && !('$orn' in node.data);
        var orns = root && node.getData('orns');
        return !root || orns.indexOf(node.getData('orn')) > -1;
      }
    }), animating);
    if (scale >= 0) {
      node.drawn = true;
    }
  },

  /*
        Method: getAlignedPos
        
        Returns a *x, y* object with the position of the top/left corner of a <Phylo> node.
        
        Parameters:
        
        pos - (object) A <Graph.Node> position.
        width - (number) The width of the node.
        height - (number) The height of the node.
        
    */
  getAlignedPos: function (pos, width, height) {
    var nconfig = this.node;
    var square, orn;
    if (nconfig.align === "center") {
      square = {
        x: pos.x - width / 2,
        y: pos.y - height / 2
      };
    } else if (nconfig.align === "left") {
      orn = this.config.orientation;
      if (orn === "bottom" || orn === "top") {
        square = {
          x: pos.x - width / 2,
          y: pos.y
        };
      } else {
        square = {
          x: pos.x,
          y: pos.y - height / 2
        };
      }
    } else if (nconfig.align === "right") {
      orn = this.config.orientation;
      if (orn === "bottom" || orn === "top") {
        square = {
          x: pos.x - width / 2,
          y: pos.y - height
        };
      } else {
        square = {
          x: pos.x - width,
          y: pos.y - height / 2
        };
      }
    } else {
      throw "align: not implemented";
    }

    return square;
  },

  getOrientation: function (adj) {
    var config = this.config;
    var orn = config.orientation;

    if (config.multitree) {
      var nodeFrom = adj.nodeFrom;
      var nodeTo = adj.nodeTo;
      orn = (('$orn' in nodeFrom.data) && nodeFrom.data.$orn) || (('$orn' in nodeTo.data) && nodeTo.data.$orn);
    }

    return orn;
  }
});

/*
  Class: Phylo.Label

  Custom extension of <Graph.Label>. 
  Contains custom <Graph.Label.SVG>, <Graph.Label.HTML> and <Graph.Label.Native> extensions.

  Extends:

  All <Graph.Label> methods and subclasses.

  See also:

  <Graph.Label>, <Graph.Label.Native>, <Graph.Label.HTML>, <Graph.Label.SVG>.
*/
$jit.Phylo.Label = {};

/*
  Phylo.Label.Native

  Custom extension of <Graph.Label.Native>.

  Extends:

  All <Graph.Label.Native> methods

  See also:

  <Graph.Label.Native>
*/
$jit.Phylo.Label.Native = new Class({
  Implements: Graph.Label.Native,

  renderLabel: function (canvas, node, controller) {
    var ctx = canvas.getCtx(),
      coord = node.pos.getc(true),
      width = node.getData('width'),
      height = node.getData('height'),
      pos = this.viz.fx.getAlignedPos(coord, width, height);
    ctx.fillText(node.name, pos.x + width / 2, pos.y + height / 2);
  }
});

$jit.Phylo.Label.DOM = new Class({
  Implements: Graph.Label.DOM,

  /* 
      placeLabel

      Overrides abstract method placeLabel in <Graph.Plot>.

      Parameters:

      tag - A DOM label element.
      node - A <Graph.Node>.
      controller - A configuration/controller object passed to the visualization.
    
    */
  placeLabel: function (tag, node, controller) {
    var pos = node.pos.getc(true).clone(),
      config = this.viz.config,
      dim = config.Node,
      canvas = this.viz.canvas,
      w = node.getData('width'),
      h = node.getData('height'),
      radius = canvas.getSize(),
      labelPos, orn;
    if (config.alignName) {
      pos.x = this.viz.graph.maxXpos;
    }
    var ox = canvas.translateOffsetX,
      oy = canvas.translateOffsetY,
      sx = canvas.scaleOffsetX,
      sy = canvas.scaleOffsetY,
      posx = pos.x * sx + ox,
      posy = pos.y * sy + oy;

    if (dim.align === "left") {
      labelPos = {
        x: Math.round(posx + 10),
        y: Math.round(posy - h / 2)
      };
      if (!controller.alignName && !node.data.leaf) {
        labelPos.x += controller.collapsedXOffset;
      }
      tag.style.textAlign = 'left';
    } else {
      throw "align: not implemented";
    }

    var style = tag.style;
    style.left = labelPos.x + 'px';
    style.top = labelPos.y + 'px';
    style.display = this.fitsInCanvas(labelPos, canvas) ? 'inline' : 'none';
    controller.onPlaceLabel(tag, node);
  }
});

/*
  Phylo.Label.SVG

  Custom extension of <Graph.Label.SVG>.

  Extends:

  All <Graph.Label.SVG> methods

  See also:

  <Graph.Label.SVG>
*/
$jit.Phylo.Label.SVG = new Class({
  Implements: [$jit.Phylo.Label.DOM, Graph.Label.SVG],

  initialize: function (viz) {
    this.viz = viz;
  }
});

/*
  Phylo.Label.HTML

  Custom extension of <Graph.Label.HTML>.

  Extends:

  All <Graph.Label.HTML> methods.

  See also:

  <Graph.Label.HTML>

*/
$jit.Phylo.Label.HTML = new Class({
  Implements: [$jit.Phylo.Label.DOM, Graph.Label.HTML],

  initialize: function (viz) {
    this.viz = viz;
  }
});


/*
  Class: Phylo.Plot.NodeTypes

  This class contains a list of <Graph.Node> built-in types. 
  Node types implemented are 'none', 'circle', 'rectangle', 'ellipse' and 'square'.

  You can add your custom node types, customizing your visualization to the extreme.

  Example:

  (start code js)
    Phylo.Plot.NodeTypes.implement({
      'mySpecialType': {
        'render': function(node, canvas) {
          //print your custom node to canvas
        },
        //optional
        'contains': function(node, pos) {
          //return true if pos is inside the node or false otherwise
        }
      }
    });
  (end code)

*/
$jit.Phylo.Plot.NodeTypes = new Class({
  'none': {
    'render': $.empty,
    'contains': $.lambda(false)
  },
  'circle': {
    'render': function (node, canvas) {
      var dim = node.getData('dim'),
        pos = this.getAlignedPos(node.pos.getc(true), dim, dim),
        dim2 = dim / 2;
      this.nodeHelper.circle.render('fill', {
        x: pos.x,
        y: pos.y + dim2
      }, dim2, canvas);
    },
    'contains': function (node, pos) {
      if (!node.exist) {
        return false;
      }
      var dim = node.getData('dim'),
        npos = this.getAlignedPos(node.pos.getc(true), dim, dim),
        dim2 = dim / 2;
      return this.nodeHelper.circle.contains({
        x: npos.x,
        y: npos.y + dim2
      }, pos, dim2 + 10);
    }
  },
  'square': {
    'render': function (node, canvas) {
      var dim = node.getData('dim'),
        dim2 = dim / 2,
        pos = this.getAlignedPos(node.pos.getc(true), dim, dim);
      this.nodeHelper.square.render('fill', {
        x: pos.x,
        y: pos.y + dim2
      }, dim2, canvas);
    },
    'contains': function (node, pos) {
      if (!node.exist) {
        return false;
      }
      var dim = node.getData('dim'),
        npos = this.getAlignedPos(node.pos.getc(true), dim, dim),
        dim2 = dim / 2;
      return this.nodeHelper.square.contains({
        x: npos.x,
        y: npos.y + dim2
      }, pos, dim2);
    }
  },
  'ellipse': {
    'render': function (node, canvas) {
      var width = node.getData('width'),
        height = node.getData('height'),
        pos = this.getAlignedPos(node.pos.getc(true), width, height);
      this.nodeHelper.ellipse.render('fill', {
        x: pos.x + width / 2,
        y: pos.y + height / 2
      }, width, height, canvas);
    },
    'contains': function (node, pos) {
      if (!node.exist) {
        return false;
      }
      var width = node.getData('width'),
        height = node.getData('height'),
        npos = this.getAlignedPos(node.pos.getc(true), width, height);
      this.nodeHelper.ellipse.contains({
        x: npos.x + width / 2,
        y: npos.y + height / 2
      }, pos, width, height);
    }
  },
  'rectangle': {
    'render': function (node, canvas) {
      var width = node.getData('width'),
        height = node.getData('height'),
        pos = this.getAlignedPos(node.pos.getc(true), width, height);
      this.nodeHelper.rectangle.render('fill', {
        x: pos.x + width / 2,
        y: pos.y + height / 2
      }, width, height, canvas);
    },
    'contains': function (node, pos) {
      if (!node.exist) {
        return false;
      }
      var width = node.getData('width'),
        height = node.getData('height'),
        npos = this.getAlignedPos(node.pos.getc(true), width, height);
      this.nodeHelper.rectangle.contains({
        x: npos.x + width / 2,
        y: npos.y + height / 2
      }, pos, width, height);
    }
  },
  'triangle': {
    'render': function (node, canvas) {
      var width = node.getData('width'),
        height = node.getData('height'),
        dim = node.getData('dim'),
        pos = this.getAlignedPos(node.pos.getc(true), width, height);
      this.nodeHelper.triangle.render('fill', {
        x: pos.x + width / 2,
        y: pos.y + height / 2
      }, dim, canvas);
    },
    'contains': function (node, pos) {
      if (!node.exist) {
        return false;
      }
      var width = node.getData('width'),
        height = node.getData('height'),
        dim = node.getData('dim'),
        npos = this.getAlignedPos(node.pos.getc(true), width, height);
      return this.nodeHelper.triangle.contains({
        x: npos.x + width / 2,
        y: npos.y + height / 2
      }, pos, dim);
    }
  }
});

/*
  Class: Phylo.Plot.EdgeTypes

  This class contains a list of <Graph.Adjacence> built-in types. 
  Edge types implemented are 'none', 'line', 'arrow', 'quadratic:begin', 'quadratic:end', 'bezier'.

  You can add your custom edge types, customizing your visualization to the extreme.

  Example:

  (start code js)
    Phylo.Plot.EdgeTypes.implement({
      'mySpecialType': {
        'render': function(adj, canvas) {
          //print your custom edge to canvas
        },
        //optional
        'contains': function(adj, pos) {
          //return true if pos is inside the arc or false otherwise
        }
      }
    });
  (end code)

*/
$jit.Phylo.Plot.EdgeTypes = new Class({
  'none': $.empty,
  'line': {
    'render': function (adj, canvas) {
      var orn = this.getOrientation(adj),
        nodeFrom = adj.nodeFrom,
        nodeTo = adj.nodeTo,
        rel = nodeFrom._depth < nodeTo._depth,
        from = (rel ? nodeFrom : nodeTo).getPos(),
        to = (rel ? nodeTo : nodeFrom).getPos(),
        middle1 = {
          x: (from.x),
          y: from.y
        },
        middle2 = {
          x: middle1.x,
          y: to.y
        };
      this.edgeHelper.line.render(from, middle2, canvas);
      this.edgeHelper.line.render(middle2, to, canvas);
      if (!nodeTo.anySubnode() && this.config.alignName) {
        var ctx = canvas.getCtx();
        ctx.save();
        ctx.lineWidth = 2;
        ctx.lineCap = 'butt';
        ctx.fillStyle = ctx.strokeStyle = '#ccb';
        ctx.beginPath();
        ctx.dashedLine(to.x, to.y, this.viz.graph.maxXpos, to.y, [4, 2]);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
    },
    'contains': function (adj, pos) {
      var orn = this.getOrientation(adj),
        nodeFrom = adj.nodeFrom,
        nodeTo = adj.nodeTo,
        rel = nodeFrom._depth < nodeTo._depth,
        from = this.viz.geom.getEdge(rel ? nodeFrom : nodeTo, 'begin', orn),
        to = this.viz.geom.getEdge(rel ? nodeTo : nodeFrom, 'end', orn);
      return this.edgeHelper.line.contains(from, to, pos, this.edge.epsilon);
    }
  },
  'arrow': {
    'render': function (adj, canvas) {
      var orn = this.getOrientation(adj),
        node = adj.nodeFrom,
        child = adj.nodeTo,
        dim = adj.getData('dim'),
        from = this.viz.geom.getEdge(node, 'begin', orn),
        to = this.viz.geom.getEdge(child, 'end', orn),
        direction = adj.data.$direction,
        inv = (direction && direction.length > 1 && direction[0] !== node.id);
      this.edgeHelper.arrow.render(from, to, dim, inv, canvas);
    },
    'contains': function (adj, pos) {
      var orn = this.getOrientation(adj),
        nodeFrom = adj.nodeFrom,
        nodeTo = adj.nodeTo,
        rel = nodeFrom._depth < nodeTo._depth,
        from = this.viz.geom.getEdge(rel ? nodeFrom : nodeTo, 'begin', orn),
        to = this.viz.geom.getEdge(rel ? nodeTo : nodeFrom, 'end', orn);
      return this.edgeHelper.arrow.contains(from, to, pos, this.edge.epsilon);
    }
  },
  'quadratic:begin': {
    'render': function (adj, canvas) {
      var orn = this.getOrientation(adj);
      var nodeFrom = adj.nodeFrom,
        nodeTo = adj.nodeTo,
        rel = nodeFrom._depth < nodeTo._depth,
        begin = this.viz.geom.getEdge(rel ? nodeFrom : nodeTo, 'begin', orn),
        end = this.viz.geom.getEdge(rel ? nodeTo : nodeFrom, 'end', orn),
        dim = adj.getData('dim'),
        ctx = canvas.getCtx();
      ctx.beginPath();
      ctx.moveTo(begin.x, begin.y);
      switch (orn) {
      case "left":
        ctx.quadraticCurveTo(begin.x + dim, begin.y, end.x, end.y);
        break;
      case "right":
        ctx.quadraticCurveTo(begin.x - dim, begin.y, end.x, end.y);
        break;
      case "top":
        ctx.quadraticCurveTo(begin.x, begin.y + dim, end.x, end.y);
        break;
      case "bottom":
        ctx.quadraticCurveTo(begin.x, begin.y - dim, end.x, end.y);
        break;
      }
      ctx.stroke();
    }
  },
  'quadratic:end': {
    'render': function (adj, canvas) {
      var orn = this.getOrientation(adj);
      var nodeFrom = adj.nodeFrom,
        nodeTo = adj.nodeTo,
        rel = nodeFrom._depth < nodeTo._depth,
        begin = this.viz.geom.getEdge(rel ? nodeFrom : nodeTo, 'begin', orn),
        end = this.viz.geom.getEdge(rel ? nodeTo : nodeFrom, 'end', orn),
        dim = adj.getData('dim'),
        ctx = canvas.getCtx();
      ctx.beginPath();
      ctx.moveTo(begin.x, begin.y);
      switch (orn) {
      case "left":
        ctx.quadraticCurveTo(end.x - dim, end.y, end.x, end.y);
        break;
      case "right":
        ctx.quadraticCurveTo(end.x + dim, end.y, end.x, end.y);
        break;
      case "top":
        ctx.quadraticCurveTo(end.x, end.y - dim, end.x, end.y);
        break;
      case "bottom":
        ctx.quadraticCurveTo(end.x, end.y + dim, end.x, end.y);
        break;
      }
      ctx.stroke();
    }
  },
  'bezier': {
    'render': function (adj, canvas) {
      var orn = this.getOrientation(adj),
        nodeFrom = adj.nodeFrom,
        nodeTo = adj.nodeTo,
        rel = nodeFrom._depth < nodeTo._depth,
        begin = this.viz.geom.getEdge(rel ? nodeFrom : nodeTo, 'begin', orn),
        end = this.viz.geom.getEdge(rel ? nodeTo : nodeFrom, 'end', orn),
        dim = adj.getData('dim'),
        ctx = canvas.getCtx();
      ctx.beginPath();
      ctx.moveTo(begin.x, begin.y);
      switch (orn) {
      case "left":
        ctx.bezierCurveTo(begin.x + dim, begin.y, end.x - dim, end.y, end.x, end.y);
        break;
      case "right":
        ctx.bezierCurveTo(begin.x - dim, begin.y, end.x + dim, end.y, end.x, end.y);
        break;
      case "top":
        ctx.bezierCurveTo(begin.x, begin.y + dim, end.x, end.y - dim, end.x, end.y);
        break;
      case "bottom":
        ctx.bezierCurveTo(begin.x, begin.y - dim, end.x, end.y + dim, end.x, end.y);
        break;
      }
      ctx.stroke();
    }
  },
  'rectangular': {
    'render': function (adj, canvas) {
      var orn = this.getOrientation(adj),
        nodeFrom = adj.nodeFrom,
        nodeTo = adj.nodeTo,
        rel = nodeFrom._depth < nodeTo._depth,
        from = this.viz.geom.getEdge(rel ? nodeFrom : nodeTo, 'begin', orn),
        to = this.viz.geom.getEdge(rel ? nodeTo : nodeFrom, 'end', orn),
        middle = {
          x: from.x,
          y: to.y
        };
      this.edgeHelper.line.render(from, middle, canvas);
      this.edgeHelper.line.render(middle, to, canvas);
    },
    'contains': function (adj, pos) {
      var orn = this.getOrientation(adj),
        nodeFrom = adj.nodeFrom,
        nodeTo = adj.nodeTo,
        rel = nodeFrom._depth < nodeTo._depth,
        from = this.viz.geom.getEdge(rel ? nodeFrom : nodeTo, 'begin', orn),
        to = this.viz.geom.getEdge(rel ? nodeTo : nodeFrom, 'end', orn);
      return this.edgeHelper.line.contains(from, to, pos, this.edge.epsilon);
    }
  }
});
//modified to enable collapsing and expanding on mouse wheel
Extras.Classes.Navigation.implement({
  onMouseWheel: function (e, win, scroll) {

    if (!this.config.zooming) {
      return;
    }
    $.event.stop($.event.get(e, win));
    this.viz.zoom(scroll);
  }
});

/*
      Method: computeLevels
    
      Performs a BFS traversal setting the correct depth for each node.
        
      Also implemented by:
      
      <Graph>.
      
      Note:
      
      The depth of each node can then be accessed by 
      >node._depth

      Parameters:

      graph - (object) A <Graph>.
      id - (string) A starting node id for the BFS traversal.
      startDepth - (optional|number) A minimum depth value. Default's 0.

    */
Graph.Util.computeLevels = function (graph, id, startDepth, flags) {
  startDepth = startDepth || 0;
  var filter = this.filter(flags);
  this.eachNode(graph, function (elem) {
    elem._flag = false;
    elem._depth = -1;
  }, flags);
  var root = graph.getNode(id);
  root._depth = startDepth;
  var queue = [root];
  graph.depth = [];
  var that = this;
  while (queue.length !== 0) {
    var node = queue.pop();
    node._flag = true;
    this.eachAdjacency(node, function (adj) {
      var n = adj.nodeTo;
      if (n._flag === false && filter(n)) {
        if (n._depth < 0) {
          n._depth = node._depth + 1 + startDepth;
          // store all nodes of equal depth in an array
          if (!graph.depth[n._depth]) {
            graph.depth[n._depth] = [];
          }
          graph.depth[n._depth].push(n);
        }
        queue.unshift(n);
      }
    }, flags);
  }
};

/*
make the vertex at the end of the branch line. 
*/
NodeHelper.triangle = {
  render: function (type, pos, dim, canvas) {
    var ctx = canvas.getCtx(),
      c1x = pos.x,
      c1y = pos.y,
      c2x = c1x + dim,
      c2y = pos.y - dim,
      c3x = c2x,
      c3y = pos.y + dim;
    ctx.beginPath();
    ctx.moveTo(c1x, c1y);
    ctx.lineTo(c2x, c2y);
    ctx.lineTo(c3x, c3y);
    ctx.closePath();
    ctx[type]();
  },
  contains: function (npos, pos, dim) {
    var a = new Complex(npos.x, npos.y),
      b = new Complex(a.x + dim, npos.y - dim),
      c = new Complex(b.x, npos.y + dim),
      pos = new Complex(pos.x, pos.y),
      negOne = new Complex(-1, -1),
      v0 = new Complex(c.x - a.x, c.y - a.y),
      v1 = new Complex(b.x - a.x, b.y - a.y),
      v2 = new Complex(pos.x - a.x, pos.y - a.y),
      dot00 = v0.x * v0.x + v0.y * v0.y,
      dot01 = v0.x * v1.x + v0.y * v1.y,
      dot02 = v0.x * v2.x + v0.y * v2.y,
      dot11 = v1.x * v1.x + v1.y * v1.y,
      dot12 = v1.x * v2.x + v1.y * v2.y,
      inv = 1 / (dot00 * dot11 - dot01 * dot01),
      u = (dot11 * dot02 - dot01 * dot12) * inv,
      v = (dot00 * dot12 - dot01 * dot02) * inv;

    return (u > 0) && (v > 0) && (u + v < 1);
  }
};

var CP = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
if (CP && CP.lineTo) {
  CP.dashedLine = function (x, y, x2, y2, dashArray) {
    if (!dashArray) {
      dashArray = [10, 5];
    }
    var dashCount = dashArray.length;
    this.moveTo(x, y);
    var dx = (x2 - x),
      dy = (y2 - y);
    var slope = dy / dx;
    var distRemaining = Math.sqrt(dx * dx + dy * dy);
    var dashIndex = 0,
      draw = true;
    while (distRemaining >= 0.1) {
      dashIndex += 1;
      var dashLength = dashArray[dashIndex % dashCount];
      if (dashLength > distRemaining) {
        dashLength = distRemaining;
      }
      var xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
      x += xStep;
      y += slope * xStep;
      this[draw ? 'lineTo' : 'moveTo'](x, y);
      distRemaining -= dashLength;
      draw = !draw;
    }
  };
}
