#tests models
tests_model = {

    'RGraph': [
        {
            'Title': 'Tree Animation',
            'Description': 
            """
            A static JSON Tree structure is used as input for this animation.<br /><br />
            Clicking on a node should move the tree and center that node.<br /><br />
            The centered node's children are displayed in a relations list in the right column.
            """,
            'Extras': ['excanvas.js'],
            'Example': True
        },
        {
            'Title': 'Test removing nodes.',
            'Description': 
            """
            Testing the RGraph with a simple static JSON structure and removing a subtree.
            The Subtree having "Matt Cameron" as root node should be removed with an animation
            customized by the form parameters when clicking on the "remove" button.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['excanvas.js']
        },
        {
            'Title': 'Test removing edges.',
            'Description': 
            """
            Testing the RGraph with a simple static JSON structure and removing edges.
            The edges Matt Cameron-Pearl Jam and Matt Cameron-Red Kross should be removed with
            an animation when clicking in the "remove" button.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['excanvas.js']
        },
        {
            'Title': 'Test Sum.',
            'Description': 
            """
            Testing the RGraph with a simple static JSON structure and adding a subgraph.
            Clicking on the sum button should add a subgraph as subtree of Pearl-Jam while performing
            a fade-in animation.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test Morph.',
            'Description': 
            """
            Testing the RGraph with a simple static JSON structure and morphing the structure to a graph.
            Clicking on the morph button should transform the current graph into another graph, performing
            fade-in-out animations.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Weighted Graph Animation',
            'Description': 
            """
            A static JSON graph structure is used for this animation.<br /><br />
            For each JSON node/edge the properties prefixed with the dollar sign ($) set the type of node/edge to be plotted, its style and its dimensions.<br /><br />
            Line weights are added programmatically, <em>onBeforePlotLine</em>.<br /><br />
            An <b>Elastic</b> transition is used instead of the linear transition for the animation.
            """,
            'Extras': ['excanvas.js'],
            'Example':True
        },
        {
            'Title': 'Test with node styles and edge styles.',
            'Description': 
            """
            Testing the RGraph with a simple static JSON structure.
            You can choose different node styles and edge styles that should be globally applied to the vis.
            Also, you can choose the random option, that sets random node and edges configuration. It overrides global configurations.
            Default values are none, that means that neither nodes nor edges are drawn by default.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['excanvas.js']
        },
        {
            'Title': 'Graph Operations',
            'Description': 
            """
            You can do the following operations with the RGraph<br /><br />
            1.- Removing subtrees or nodes<br /><br />
            2.- Removing edges<br /><br />
            3.- Adding another graph, also called sum<br /><br />
            4.- Morphing (or transforming) the graph into another one<br />
            """,
            'Extras': ['excanvas.js'],
            'Example':True
        }, 
        {
            'Title': 'Node Events',
            'Description': 
            """
            Testing new Node Event system.
            Triggered registered events should be logged in FFs console.
            
            """,
            'Extras': ['excanvas.js'],
            'Example':False
        } 
    ],

    
    'Hypertree': [
        {
            'Title': 'Tree Animation',
            'Description': 
            """
            A static JSON Tree structure is used as input for this animation.<br /><br />
            Clicking on a node should move the tree and center that node.<br /><br />
            The centered node's children are displayed in a relations list in the right column.
            """,
            'Extras': ['excanvas.js'],
            'Example':True
        },
        {
            'Title': 'Test with single node.',
            'Description': 
            """
            Loads a single node JSON dataset to the Hypertree.
            """,
            'Extras': ['excanvas.js']
        },
        {
            'Title': 'Test removing nodes.',
            'Description': 
            """
            Testing the Hypertree with a simple static JSON structure and removing a subtree.
            The Subtree having "Matt Cameron" as root node should be removed with an animation
            customized by the form parameters when clicking on the "remove" button.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['excanvas.js']
        },
        {
            'Title': 'Test removing edges.',
            'Description': 
            """
            Testing the Hypertree with a simple static JSON structure and removing edges.
            The edges Matt Cameron-Pearl Jam and Matt Cameron-Red Kross should be removed with
            an animation when clicking in the "remove" button.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['excanvas.js']
        },
        {
            'Title': 'Test Sum.',
            'Description': 
            """
            Testing the Hypertree with a simple static JSON structure and adding a subgraph.
            Clicking on the sum button should add a subgraph as subtree of Pearl-Jam while performing
            a fade-in animation.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test Morph.',
            'Description': 
            """
            Testing the Hypertree with a simple static JSON structure and morphing the structure to a graph.
            Clicking on the morph button should transform the current graph into another graph, performing
            fade-in-out animations.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Weighted Graph Animation',
            'Description': 
            """
            A static JSON graph structure is used for this animation.<br /><br />
            For each JSON node the "$type" and "$dim" parameters set the type of node to be plotted and its dimensions.<br /><br />
            Line weights are added programmatically, <em>onBeforePlotLine</em>.<br /><br />
            A <b>Back</b> transition is used instead of the linear transition for the animation.
            """,
            'Extras': ['excanvas.js'],
            'Example':True
        },
        {
            'Title': 'Test with not weighted random generated tree.',
            'Description': 
            """
            Just plotting a random not weighted Hypertree.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test with weighted random generated tree.',
            'Description': 
            """
            Just plotting a random weighted Hypertree.
            Nodes diameters must vary.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test with custom nodes and edges.',
            'Description': 
            """
            Testing Hypertree with custom nodes and edges.
            The user can select custom nodes (circle, square, etc). and
            custom edges from the form.
            He can also choose different animation options and easings.
            This test can be improved, for example by changing the color or
            overriding each node's style differently.
            """,
            'Extras': ['excanvas.js']
        },
        {
            'Title': 'Graph Operations',
            'Description': 
            """
            You can do the following operations with the Hypertree<br /><br />
            1.- Removing subtrees or nodes<br /><br />
            2.- Removing edges<br /><br />
            3.- Adding another graph, also called sum<br /><br />
            4.- Morphing (or transforming) the graph into another one<br />
            """,
            'Extras': ['excanvas.js'],
            'Example':True
        }
    ],
    
    'Spacetree': [
        {
            'Title': 'Test the Spacetree with an infinite client-side generator.',
            'Description': 
            """
             Testing the Spacetree with a client-side generator that returns a Tree of level = 3
             when the controller request method is called.<br>
             This should lead to an infinite Spacetree.<br>
             Also, the edges should have arrow as style.<br>
             The nodes belonging in the path between the clicked node and the root node are selected with a
             different color.<br>
             Clicking on a node should set focus to that node.<br>
             This test uses the generator.js file to create random generated trees.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test adding a subtree',
            'Description': 
            """
            Loads a static Spacetree and should add a subtree when clicking on the add button.<br>
            You can change the parameters for adding the subtree in the form.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test removing a subtree.',
            'Description': 
            """
            Loads a static Spacetree and should remove a subtree when clicking on the remove button.<br>
            You can change the parameters for removing the subtree in the form.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test unbalanced tree.',
            'Description': 
            """
            Tests the Spacetree layout algorithm with an unbalanced tree. <br>
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test Different node sizes',
            'Description': 
            """
            Testing a static Spacetree with rectangle nodes with different widths and heights.<br>
            You can also click on a node's name in the list to add focus to that node.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test Node types, Edge types, Animation types.',
            'Description': 
            """
            Tests a static Spacetree with different node, edge and animation types that you can choose from
            a form.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Tree Animation',
            'Description': 
            """
            A static JSON Tree structure is used as input for this animation.<br /><br />
            Clicking on a node should move the tree and center that node.<br /><br />
            Leaves color depend on the number of children they actually have.<br /><br />
            You can select the <b>tree orientation</b> by changing the select box in the right column.
            """,
            'Extras': ['excanvas.js'],
            'Example': True
        },
        {
            'Title': 'SpaceTree with on-demand nodes',
            'Description': 
            """
            This example shows how you can use the <b>request</b> controller method to create a SpaceTree with <b>on demand</b> nodes<br /><br />
            The basic JSON Tree structure is cloned and appended on demand on each node to create an <b>infinite large SpaceTree</b><br /><br />
            You can select the <b>tree orientation</b> by changing the select box in the right column.
            """,
            'Extras': ['excanvas.js'],
            'Example': True
        },
        {
            'Title': 'Add/Remove Subtrees',
            'Description': 
            """
            This example shows how to add/remove subtrees with the SpaceTree.<br /><br />
            <b>Add</b> a subtree by clicking on the <em>Add</em> button located in the right column.<br /><br />
            <b>Remove</b> a subtree by clicking on a red colored node
            """,
            'Extras': ['excanvas.js'],
            'Example': True
        },
        {
            'Title': 'MultiTree',
            'Description': 
            """
            A static JSON Tree structure is used as input for this animation.<br /><br />
            Clicking on a node should move the tree and center that node.<br /><br />
            Leaves color depend on the number of children they actually have.<br /><br />
            You can select the <b>tree orientation</b> by changing the select box in the right column.
            """,
            'Extras': ['excanvas.js'],
            'Example': False 
        },
        {
            'Title': 'loadJSON multiple times',
            'Description': 
            """
            Testing if loading different JSON tree/graph structures affects how the SpaceTree is displayed.
            """,
            'Extras': ['excanvas.js', 'generators.js'],
            'Example': False 
        }
   ],
   
    'Treemap': [
        {
            'Title': 'Test Squarified, SliceAndDice and Strip Treemap with random Tree',
            'Description': 
            """
            Loads a random generated weighted tree and renders it as Squarified Tree by default.<br> 
            """,
            'Extras': ['generators.js']
        },
        {
            'Title': 'Animated Squarified, SliceAndDice and Strip TreeMaps',
            'Description': 
            """
            In this example a static JSON tree is loaded into a Squarified Treemap.<br /><br />
            <b>Left click</b> to set a node as root for the visualization.<br /><br />
            <b>Right click</b> to set the parent node as root for the visualization.<br /><br />
            You can <b>choose a different tiling algorithm</b> below:
            
            """,
            'Extras': ['generators.js'],
            'Example': True
        },
        {
            'Title': 'TreeMap with on-demand nodes',
            'Description': 
            """
            This example shows how you can use the <b>request</b> controller method to create a TreeMap with on demand nodes<br /><br />
            This example makes use of native Canvas text and shadows, but can be easily adapted to use HTML like the other examples.<br /><br />
            There should be only one level shown at a time.<br /><br /> 
            Clicking on a band should show a new TreeMap with its most listened albums.<br /><br />            
            """,
            'Extras': ['generators.js'],
            'Example': True
        },
        {
            'Title': 'Cushion TreeMaps',
            'Description': 
            """
            In this example a static JSON tree is loaded into a Cushion Treemap.<br /><br />
            <b>Left click</b> to set a node as root for the visualization.<br /><br />
            <b>Right click</b> to set the parent node as root for the visualization.<br /><br />
            You can <b>choose a different tiling algorithm</b> below:
            
            """,
            'Extras': ['generators.js'],
            'Example': True
        },
   ],

    'ForceDirected': [
        {
            'Title': 'Tree Animation',
            'Description': 
            """
            A static JSON Tree structure is used as input for this animation.<br /><br />
            The centered node's children are displayed in a relations list in the right column.
            """,
            'Extras': ['excanvas.js'],
            'Example':True
        },
        {
            'Title': 'Weighted Graph Animation',
            'Description': 
            """
            A static JSON graph structure is used for this animation.<br /><br />
            For each JSON node/edge the properties prefixed with the dollar sign ($) set the type of node/edge to be plotted, its style and its dimensions.<br /><br />
            Line weights are added programmatically, <em>onBeforePlotLine</em>.<br /><br />
            An <b>Elastic</b> transition is used instead of the linear transition for the animation.
            """,
            'Extras': ['excanvas.js'],
            'Example':True
        },
        {
            'Title': 'Graph Operations',
            'Description': 
            """
            You can do the following operations with a ForceDirected viz:<br /><br />
            1.- Removing subtrees or nodes<br /><br />
            2.- Removing edges<br /><br />
            3.- Adding another graph, also called sum<br /><br />
            4.- Morphing (or transforming) the graph into another one<br />
            """,
            'Extras': ['excanvas.js'],
            'Example':True
        } 
    ],
    
    'Other': [
        {
            'Title': 'Implementing Node Types',
            'Description': 
            """
            In this example some custom node types are created for rendering pie charts with the RGraph.<br /><br /> 
            Multiple instances of the RGraph are created using these node types. (top)<br /><br />
            The SpaceTree is loaded with some custom data that individually changes nodes dimensions, making a bar chart (bottom).
            
            """,
            'Extras': ['excanvas.js'],
            'Build': ['RGraph', 'Spacetree'],
            'Example': True
            
        },
        {
            'Title': 'Composing Visualizations',
            'Description': 
            """
            In this example a RGraph is composed with another RGraph (for node rendering).<br /><br />
            The RGraph used for node rendering implements a custom node type defined in the <em>"Implementing Node Types"</em> example.<br /><br />
            This example shows that many visualizations can be composed to create new visualizations.
            
            """,
            'Extras': ['excanvas.js'],
            'Build': ['RGraph'],
            'Example': True
            
        },
        {
            'Title': 'Composing Visualizations 2',
            'Description': 
            """
            In this example a SpaceTree is composed with a RGraph (for node rendering).<br /><br />
            The RGraph used for node rendering implements a custom node type defined in the <em>"Implementing Node Types"</em> example.<br /><br />
            This example shows that many visualizations can be composed to create new visualizations.
            
            """,
            'Extras': ['excanvas.js'],
            'Build': ['RGraph', 'Spacetree'],
            'Example': True
            
        },
        {
            'Title': 'SVG and Native Labels',
            'Description': 
            """
            In this example we're using three different types of labels.<br /><br />
            HTML labels are classic DOM elements.<br />
            SVG labels are very similar to HTML labels (they're also DOM elements) but they can be rotated and transformed.<br />
            Native labels are drawn with the Native Canvas HTML5 API.<br /><br />.
            HTML labels are supported by all browsers. SVG labels are supported by all browsers except IE. Native Canvas labels are 
            supported by all browsers except Opera.
            """,
            'Extras': ['excanvas.js'],
            'Build': ['RGraph', 'Hypertree'],
            'Example': False 
            
        }
  ],
  'Sunburst': [
        {
            'Title': 'Animation and Expand/Collapse',
            'Description': 
            """
            A static JSON Tree structure is used as input for this animation.<br /><br />
            The centered node's children are displayed in a relations list in the right column.<br /><br />
            Left clicking will rotate the sunburst leaving the clicked node horizontal. The node will also change its color.<br /><br />.
            Right clicking will collapse/expand nodes.
            """,
            'Extras': ['excanvas.js'],
            'Example':False
        },
        {
            'Title': 'Rose Diagrams',
            'Description': 
            """
            A static JSON Tree structure is used as input for this animation that represents a rose pie chart.<br /><br />
            Hovering nodes should add a tooltip and change the node's color.
            """,
            'Extras': ['excanvas.js'],
            'Example':False
        },
        {
            'Title': 'Connected Sunburst',
            'Description': 
            """
            A static JSON Graph structure is used as input for this animation that represents a connected sunburst.<br />
            """,
            'Extras': ['excanvas.js'],
            'Example':False
        },
                {
            'Title': 'Sunburst of a Directory Tree',
            'Description': 
            """
            A static JSON Tree structure is used as input for this visualization.<br /><br />
            Tips are used to describe the file size and its last modified date.<br /><br />
            <b>Left click</b> to rotate the Sunburst and leave the clicked node horizontal.<br /><br />
            <b>Right click</b> to collapse/expand nodes.
            """,
            'Extras': ['excanvas.js'],
            'Example':True
        },

  ],

   'AreaChart': [
        {
            'Title': 'Area Chart Example',
            'Description': 
            """
            A static Area Chart example with gradients that displays tooltips when hovering the stacks.<br /><br />
            Left-click a Stack to apply a filter to it.<br /><br />
            Right-click to restore all stacks.<br /><br />
            Click the Update button to update the JSON data.
            """,
            'Extras': ['excanvas.js'],
            'Example': True
        }
    ],
    
   'BarChart': [
        {
            'Title': 'Bar Chart Example',
            'Description': 
            """
            A static vertical Bar Chart example with gradients. The Bar Chart displays tooltips when hovering the stacks. <br /><br />
            Click the Update button to update the JSON data.
            """,
            'Extras': ['excanvas.js'],
            'Example': True
        },
        {
            'Title': 'Bar Chart Example',
            'Description': 
            """
            A static horizontal Bar Chart example without gradients. The Bar Chart displays tooltips when hovering the stacks.<br /><br />
            Click the Update button to update the JSON data.
            """,
            'Extras': ['excanvas.js'],
            'Example': True
        }
    ],
    
   'PieChart': [
        {
            'Title': 'Pie Chart Example',
            'Description': 
            """
            A static Pie Chart example with gradients that displays tooltips when hovering the stacks.<br /><br />
            Click the Update button to update the JSON data.
            """,
            'Extras': ['excanvas.js'],
            'Example': True
        },
        {
            'Title': 'Mono Valued PieChart',
            'Description': 
            """
            More like a regular PieChart (mono valued).
            """,
            'Extras': ['excanvas.js'],
            'Example': False
        }
    ]

}   
