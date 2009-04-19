#tests models

from build import mootools

tests_model = {

    'RGraph': [
        {
            'Title': 'Test animation with simple static tree.',
            'Description': 
            """
            Testing the RGraph with a simple static JSON structure.
            Clicking on a node should move the tree and center that node.
            Not other animations should happen.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['excanvas.js']
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
            'Title': 'Test with K6 weighted graph.',
            'Description': 
            """
            Testing the RGraph with a simple static JSON K6 graph structure with wieghted nodes and edges.
            Clicking on a node should move the graph and center that node.
            Not other animations should happen.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['generators.js', 'excanvas.js']
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
        }]
    ,

    
    'Hypertree': [
        {
            'Title': 'Test animation with simple static tree.',
            'Description': 
            """
            Testing the Hypertree with a simple static JSON structure.
            Clicking on a node should move the tree and center that node.
            Not other animations should happen.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['excanvas.js']
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
            'Title': 'Test with K6 weighted graph.',
            'Description': 
            """
            Testing the Hypertree with a simple static JSON K6 graph structure with wieghted nodes and edges.
            Clicking on a node should move the graph and center that node.
            Not other animations should happen.
            Nodes diameter should not be transformed when moving the tree.
            The centered node's children should be displayed in a relations list.
            """,
            'Extras': ['excanvas.js']
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
        }
    ],
    
    'Spacetree': [
        {
            'Title': 'Test the Spacetree with an infinite client-side generator.',
            'Description': 
            """
             Testing the Spacetree with a client-side generator that returns a Tree of level <= 3
             when the controller request method is called.
             This should lead to an infinite Spacetree.
             Also, the edges should have arrow as style.
             The nodes belonging in the path between the clicked node and the root node are selected with a
             different color.
             Clicking on a node should set focus to that node.
             This test uses the generator.js file to create random generated trees.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test adding a subtree',
            'Description': 
            """
            Loads a static Spacetree and should add a subtree when clicking on the add button.
            You can change the parameters for adding the subtree in the form.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test removing a subtree.',
            'Description': 
            """
            Loads a static Spacetree and should remove a subtree when clicking on the remove button.
            You can change the parameters for removing the subtree in the form.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test unbalanced tree.',
            'Description': 
            """
            Tests the Spacetree layout algorithm with an unbalanced tree. Currently this test does not pass.
            This is a known bug and probably will remain like this for version 1.1.0.
            """,
            'Extras': ['generators.js', 'excanvas.js']
        },
        {
            'Title': 'Test Different node sizes',
            'Description': 
            """
            Testing a static Spacetree with rectangle nodes with different width and height.
            You can also click in a node's name in the list to add focus to that node.
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
        }
   ],
    
    'Treemap': [
        {
            'Title': 'Test Squarified Treemap with static 50 artist feed.',
            'Description': 
            """
            Test Squarified Treemap with static 50 artist dataset.
            Clicking on a Node should set the Node as root.
            Right clicking should set the current root's parent as root.
            Hovering the Treemap nodes should pop-up a tooltip.
            Treemap nodes should have colors.
            """,
            'Extras': [mootools]
        },
        {
            'Title': 'Test SliceAndDice Treemap with static 50 artist feed.',
            'Description': 
            """
            Test SliceAndDice Treemap with static 50 artist dataset.
            Clicking on a Node should set the Node as root.
            Right clicking should set the current root's parent as root.
            Hovering the Treemap nodes should pop-up a tooltip.
            Treemap nodes should have colors.
            """,
            'Extras': [mootools]
        },
        {
            'Title': 'Test Strip Treemap with static 50 artist feed.',
            'Description': 
            """
            Test Strip Treemap with static 50 artist dataset.
            Clicking on a Node should set the Node as root.
            Right clicking should set the current root's parent as root.
            Hovering the Treemap nodes should pop-up a tooltip.
            Treemap nodes should have colors.
            """,
            'Extras': [mootools]
        },
        {
            'Title': 'Test Squarified Treemap with random Tree.',
            'Description': 
            """
            Loads a random generated weighted tree and renders it as Squarified Tree.
            """,
            'Extras': ['generators.js', mootools]
        },
        {
            'Title': 'Test SliceAndDice Treemap with random Tree.',
            'Description': 
            """
            Loads a random generated weighted tree and renders it as SliceAndDice Tree.
            """,
            'Extras': ['generators.js', mootools]        
        },
        {
            'Title': 'Test Strip Treemap with random Tree.',
            'Description': 
            """
            Loads a random generated weighted tree and renders it as Strip Tree.
            """,
            'Extras': ['generators.js', mootools]        
        },
        {
            'Title': 'Test Squarified 50 artists Treemap with a request controller method.',
            'Description': 
            """
            The Treemap should not have colors.
            There should be only one level shown at a time.
            clicking on a band should show a new treemap with the most listened albums.
            """,
            'Extras': [mootools]        
        }
   ]   
}