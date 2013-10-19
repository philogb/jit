

function testcase () {
  var initTree = function ( tree ) {
    var json = '';

    if (tree) {
        var dataObject = new Smits.PhyloCanvas.NewickParse( tree );
        if (typeof(dataObject) === 'object') {
            json = smitsNode2JSON(dataObject.getRoot());
        }
    }
    st.loadJSON ( json );
    st.compute( );
//     st.onClick ( st.root );
//     st.fitScreen ();
  }
  var initCharacter = function ( character, bol ) {
    st.config.initCharacter = false;
    st.character = character || {};
    if ( bol ) {
      st.config.selectedCharacters = [st.config.firstCharacter];
    } else {
      st.config.selectedCharacters = [];
    } 
    st.colorCharacter ( );
    updateCharacter ( st.characterList );
    onSetCharacter ();
    st.onClick ( st.root );
    st.fitScreen ();
  }
  var phy = st;

  QUnit.test("testcharacterType", function () {
      QUnit.equal ( phy.characterType( [0,1], "quant" ), true , "quantitative");
//       QUnit.equal ( phy.characterType( [0,"string"], "quant" ), false , "quant");
//       QUnit.equal ( phy.characterType( [0,"string"], "quali" ), false , "quali");
      QUnit.equal ( phy.characterType( ["string","string"], "quali" ), true , "quali");
  });
  QUnit.test("Test Sum function", function () {
      QUnit.equal ( phy.sum( [0,1,10] ), 11, "Sum function");
      QUnit.equal ( phy.sum(  ), null, "Sum function");
      QUnit.equal ( phy.sum( [] ), null , "Sum function");
  });
  QUnit.test("Test mean function", function () {
      QUnit.equal ( phy.mean( [0,1,11] ), 4, "array input");
      QUnit.equal ( phy.sum(  ), null , "no array");
      QUnit.equal ( phy.sum( [] ), null , "empty array");
  });
  QUnit.test("Test variance function", function () {
    QUnit.equal ( phy.variance ( ), null , "null example" );
    QUnit.equal ( phy.variance ( [] ), null , "empty example" );
    QUnit.equal ( phy.variance ( [2,4,4,4,5,5,7,9] ), 4 , "wiki example" );
  });
  QUnit.test("Test sd function", function () {
    QUnit.equal ( phy.sd ( ), null , "null example" );
    QUnit.equal ( phy.sd ( [] ), null , "empty example" );
    QUnit.equal ( phy.sd ( [2,4,4,4,5,5,7,9] ), 2 , "wiki example" );
  });
  QUnit.test("Test quantitative character propogation", function () {
//     st.config.selectedCharacters = ['Inflorescence_shape','Inflorescence_arrangement'];
    initTree ( "(((c,t),((g,t),a)),t);" );
    initCharacter ( {'a' : {Inflorescence_shape:[20],Inflorescence_arrangement: [5]}, 'g' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'c' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'t' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}} ) ;
    st.config.Tips.onShow = function ( div , node ) {
      div.innerHTML = node.data.character['Inflorescence_arrangement'][0] + " " + node.data.character['Inflorescence_shape'][0] ;
    };
    var root = st.graph.getNode( st.root );
    
    QUnit.equal ( root.data.character['Inflorescence_shape'][0].toFixed(4) , "11.6667" , "average of inflorescence shape" );
    QUnit.equal ( root.data.character['Inflorescence_arrangement'][0] , 5 , "average of inflorescence arrangement" );  
    initCharacter ( {'a' : {Inflorescence_shape:[],Inflorescence_arrangement: []}, 'g' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'c' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'t' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}} );
    QUnit.equal ( root.data.character['Inflorescence_shape'][0] , 10 , "average of inflorescence shape" );
    QUnit.equal ( root.data.character['Inflorescence_arrangement'][0] , 5 , "average of inflorescence arrangement" );  
  });
  QUnit.test("Test sd of tree", function () {
    initTree ( "(((c,t),((g,t),a)),t);" );
    initCharacter ( {'a' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}, 'g' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'c' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'t' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}} );
    st.config.Tips.onShow = function ( div , node ) {
      div.innerHTML = node.data.character['Inflorescence_arrangement'][0] + " " + node.data.character['Inflorescence_shape'][0] ;
    };
    var root = st.graph.getNode( st.root );
    QUnit.equal ( st.sdAtTree(root, ['Inflorescence_shape','Inflorescence_arrangement'])['Inflorescence_shape'] , 0 , "sd of inflorescence shape" );
    QUnit.equal ( st.sdAtTree( root, ['Inflorescence_shape','Inflorescence_arrangement'] )['Inflorescence_arrangement'] , 0 , "sd of inflorescence arrangement" );
    
    initCharacter ( {'a' : {Inflorescence_shape:[15],Inflorescence_arrangement: [10]}, 'g' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'c' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'t' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}} );
    QUnit.equal ( Math.round( st.sdAtTree(root, ['Inflorescence_shape','Inflorescence_arrangement'])['Inflorescence_shape'] ), Math.round( 1.863389981249825 ), "sd of inflorescence shape" );
    QUnit.equal ( Math.round (st.sdAtTree( root, ['Inflorescence_shape','Inflorescence_arrangement'] )['Inflorescence_arrangement'] ), Math.round ( 1.863389981249825 ), "sd of inflorescence arrangement" );
  });
  QUnit.test("comparison operation", function () {
    initTree ("(((c,t),((g,t),a)),t);");
    initCharacter ( {'a' : {Inflorescence_shape:[20],Inflorescence_arrangement: [10]}, 'g' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'c' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'t' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}} );
    st.config.threshold = 0.1;
    st.config.Tips.onShow = function ( div , node ) {
      div.innerHTML = node.data.character['Inflorescence_arrangement'][0] + " " + node.data.character['Inflorescence_shape'][0] ;
    };
    var root = st.graph.getNode( st.root );
    st.checkQuant( ['Inflorescence_shape','Inflorescence_arrangement'] );
    QUnit.equal ( root.data.characterConsistency['Inflorescence_shape'] , true , "check inflorescence shape value at root is consistent with children" );
    QUnit.equal ( root.data.characterConsistency['Inflorescence_arrangement'] , true , "check inflorescence arrangement value at root is consistent with children" );
    
  });
  QUnit.test ("testing variance at tree", function() {
    initTree ( "(((c,t),((g,t),a)),t);" );
    initCharacter ( {'a' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}, 'g' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'c' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'t' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}} );
    st.config.Tips.onShow = function ( div , node ) {
      div.innerHTML = node.data.character['Inflorescence_arrangement'][0] + " " + node.data.character['Inflorescence_shape'][0] ;
    };
    var root = st.graph.getNode( st.root );
    QUnit.equal ( st.varianceAtTree(root, ['Inflorescence_shape','Inflorescence_arrangement'])['Inflorescence_shape'] , 0 , "sd of inflorescence shape" );
    QUnit.equal ( st.varianceAtTree( root, ['Inflorescence_shape','Inflorescence_arrangement'] )['Inflorescence_arrangement'] , 0 , "sd of inflorescence arrangement" );
    
    initCharacter ( {'a' : {Inflorescence_shape:[70],Inflorescence_arrangement: [35]}, 'g' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'c' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'t' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}} );
    QUnit.equal ( Math.round( st.varianceAtTree(root, ['Inflorescence_shape','Inflorescence_arrangement'])['Inflorescence_shape'] ), 500 , "sd of inflorescence shape" );
    QUnit.equal ( Math.round (st.varianceAtTree( root, ['Inflorescence_shape','Inflorescence_arrangement'] )['Inflorescence_arrangement'] ), 125, "sd of inflorescence arrangement" );
  });
  QUnit.test("Test qualitative character similarity", function () {
    initTree ("(((c,t),((g,t),a)),t);");
    initCharacter ( {'a' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']}, 'g' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']},'c' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']},'t' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']}} );
    st.config.Tips.onShow = function ( div , node ) {
      div.innerHTML = node.data.character['Inflorescence_arrangement'][0] + " " + node.data.character['Inflorescence_shape'][0] ;
    };
    var root = st.graph.getNode( st.root );
    st.checkQuali(  ['Inflorescence_name','Inflorescence_group'] );
    QUnit.equal ( root.data.characterConsistency['Inflorescence_name'] , true , "check inflorescence shape value at root is consistent with children" );
    QUnit.equal ( root.data.characterConsistency['Inflorescence_group'] , true , "check inflorescence arrangement value at root is consistent with children" );
    
    initCharacter ( {'a' : {Inflorescence_name:['globular'],Inflorescence_group: ['linear']}, 'g' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']},'c' : {Inflorescence_name:['linear'],Inflorescence_group: []},'t' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']}} );
    st.config.Tips.onShow = function ( div , node ) {
      div.innerHTML = node.data.character['height'][0] + " " + node.data.character['height'][0] ;
    };
    st.checkQuali(  ['Inflorescence_name','Inflorescence_group'] );
    var a = st.graph.getByName ('a'), aParent = a.getParents()[0];
    var c = st.graph.getByName ('c'), cParent = c.getParents()[0];
    QUnit.equal ( aParent.data.characterConsistency['Inflorescence_name'] , false , "check inflorescence shape value at root is consistent with children" );
    QUnit.equal ( cParent.data.characterConsistency['Inflorescence_group'] , false , "check inflorescence arrangement value at root is consistent with children" );

  });
  QUnit.test("Test quantitative character range", function () {
    initTree ("(((c,t),((g,t),a)),t);");
    st.config.firstCharacter = 'Inflorescence_name';
    initCharacter ( {'a' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']}, 'g' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']},'c' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']},'t' : {Inflorescence_name:['linear'],Inflorescence_group: ['linear']}} );

    var root = st.graph.getNode( st.root ),i;
    st.checkQuali(  ['Inflorescence_name','Inflorescence_group'] );
    QUnit.equal ( root.data.characterConsistency['Inflorescence_name'] , true , "check inflorescence shape value at root is consistent with children" );
    QUnit.equal ( root.data.characterConsistency['Inflorescence_group'] , true , "check inflorescence arrangement value at root is consistent with children" );
    
    var distinct = st.findDistinctCharacterStates ( 'Inflorescence_name');
    QUnit.equal ( 'linear' in distinct.hash , true , ' testing findDistinctCharacter function');
    QUnit.equal ( 'globular' in distinct.hash , false , ' testing findDistinctCharacter function');
    st.config.firstCharacter = 'Inflorescence_shape';
    initCharacter ( {'a' : {Inflorescence_shape:[20],Inflorescence_arrangement: [1]}, 'g' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'c' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]},'t' : {Inflorescence_shape:[10],Inflorescence_arrangement: [5]}} );
    
    var result = st.findQuantMinMax( root , ['Inflorescence_shape','Inflorescence_arrangement'] );
    QUnit.equal ( result['Inflorescence_shape'].min , 10 , "check the min of Inflorescence_shape" );
    QUnit.equal ( result['Inflorescence_shape'].max , 20 , "check the max Inflorescence_shape" );
    QUnit.equal ( result['Inflorescence_arrangement'].min , 1 , "check the max Inflorescence_arrangement" );
    QUnit.equal ( result['Inflorescence_arrangement'].max , 5 , "check the max Inflorescence_arrangement" );
    
    var res = st.findQuantRange ( result );
    
    QUnit.equal ( res[ 'Inflorescence_shape' ][ 8 ] , 19 , "check if Inflorescence_shape is 19" );
    QUnit.equal ( res[ 'Inflorescence_shape' ][ 4 ] , 15 , "check if Inflorescence_shape is 15" );
    QUnit.equal ( res[ 'Inflorescence_arrangement' ][ 2 ] , 2.2 , "check if Inflorescence_arrangement is 2.2" );
    QUnit.equal ( res[ 'Inflorescence_arrangement' ][ 9 ] , 5 , "check if Inflorescence_arrangement is 5" );

  });
  QUnit.test ( "Test function" , function ( ) {
    var array  = [10,20,30,50,60], num = [1,1,1,1,1], num2 = [1,2,3];
    QUnit.equal ( st.wtmean ( undefined , undefined ), null , "testing for value 1");
    QUnit.equal ( st.wtmean ( array , num ), 34 , "testing with actual data");
    QUnit.equal ( st.wtmean ( undefined , num), undefined , "testing for value 35");
    QUnit.equal ( st.wtmean ( undefined , num2), undefined , "testing unequal number of elements");
  });
  QUnit.test ( "Test weighted mean function" , function ( ) {
    var array = [];
    QUnit.equal ( st.hasProperty ( ) , false, "undefined");
    QUnit.equal ( st.hasProperty ( {} ) , false, "undefined");
    QUnit.equal ( st.hasProperty ( [] ) , false, "undefined");
    QUnit.equal ( st.hasProperty ( {value:true} ) , true, "undefined");
    QUnit.equal ( st.hasProperty ( [0] ) , true, "undefined");
  });
  QUnit.test ( "test population sd", function () {
    var u = [ 12, 11, 2 ];
    var n = [ 100 , 20 , 1 ];
    var sd = [ 1, 2 , 0 ];
    var up = st.meanPop ( n , u ) ;
    QUnit.equal ( up.toFixed ( 4 ) , "11.7521" , 'checking mean');
    QUnit.equal ( st.sdPop ( n , sd , u , up ).toFixed ( 4 ) , "1.5480" , "test sq" );
  });
/*  QUnit.test ( "Test findIndex function" , function ( ) {
    var array  = [10,20,30,50,60];
    QUnit.equal ( st.findIndex ( 1 , array), 0 , "testing for value 1");
    QUnit.equal ( st.findIndex ( 100, array ), 4 , "testing for value 100");
    QUnit.equal ( st.findIndex ( 35, array), 3 , "testing for value 35");
    QUnit.equal ( st.findIndex ( undefined, array), undefined , "testing for value undefined");
    QUnit.equal ( st.findIndex ( 5, undefined), undefined , "testing for value undefined");
  });*/
  QUnit.test ( "Test findAllCharTypes function" , function ( ) {
    var root = st.graph.getNode( st.root );
    var group = st.findAllCharTypes ( root ) ;
    QUnit.equal ( st.characterList [ 0 ] , st.config.firstCharacter , "testing for value firstCharacter");
    QUnit.equal ( st.characterList.length , group.quali.length + group.quant.length , "testing for length ");
    st.createLegend ();
  });
  QUnit.test("Test quantitative character range", function () {
    st.config.firstCharacter = 'height';
    initTree ("((raccoon:19.19959,bear:6.80041):0 .84600,((sea_lion:11.99700,seal:12.00300):7.52973,((monkey:100.85930,cat:47.14069):20.59201,weasel:18.87953):2.09460):3.87382,dog:25.46154);");

    initCharacter ( {'dog':{'phagy':['coprophage','carnivore'],'height':[1]},'raccoon':{'phagy':['omnivore'],'height':[0.8]},'bear':{'phagy':['omnivore'],'height':[2]},'sea lion':{'phagy':['carnivore'],'height':[1]},'seal':{'phagy':['carnivore'],'height':[1.1]},'weasel':{'phagy':['carnivore'],'height':[0.3]},'monkey':{'phagy':['omnivore'],'height':[0.5]},'cat':{'phagy':['carnivore'],'height':[0.3]}},true );

    var node = st.graph.getByName ( 'monkey' ),
             parent = node.getParents ()[0], grandparent;
    QUnit.equal ( parent.data.stat.height.sd.toFixed ( 4 ) , "0.1414", "testing sd" );
    QUnit.equal ( parent.data.stat.height.n , 2, "testing population" );
    QUnit.equal ( parent.data.stat.height.u.toFixed ( 4 ) , "0.4000", "testing mean" );
    
    node = st.graph.getByName ( 'weasel' ),
             parent = node.getParents ()[0];
    QUnit.equal ( parent.data.stat.height.sd.toFixed ( 4 ) , "0.1155", "testing sd" );
    QUnit.equal ( parent.data.stat.height.n , 3, "testing population" );
    QUnit.equal ( parent.data.stat.height.u.toFixed ( 4 ) , "0.3667", "testing mean" )
    
    node = st.graph.getByName ( 'seal' ),
             parent = node.getParents ()[0];
    QUnit.equal ( parent.data.stat.height.sd.toFixed ( 4 ) , "0.0707", "testing sd" );
    QUnit.equal ( parent.data.stat.height.n , 2, "testing population" );
    QUnit.equal ( parent.data.stat.height.u.toFixed ( 4 ) , "1.0500", "testing mean" )
    
    node = st.graph.getByName ( 'bear' ),
             parent = node.getParents ()[0];
    QUnit.equal ( parent.data.stat.height.sd.toFixed ( 4 ) , "0.8485", "testing sd" );
    QUnit.equal ( parent.data.stat.height.n , 2, "testing population" );
    QUnit.equal ( parent.data.stat.height.u.toFixed ( 4 ) , "1.4000", "testing mean" )
    node = st.graph.getByName ( 'seal' ),
             parent = node.getParents ()[0],
             grandparent = parent.getParents ()[0];
    QUnit.equal ( grandparent.data.stat.height.sd.toFixed ( 4 ) , "0.3847", "testing sd" );
    QUnit.equal ( grandparent.data.stat.height.n , 5, "testing population" );
    QUnit.equal ( grandparent.data.stat.height.u.toFixed ( 4 ) , "0.6400", "testing mean" )
    node = st.graph.getByName ( 'dog' ),
             parent = node.getParents ()[0],
             grandparent = parent.getParents ()[0];
    QUnit.equal ( parent.data.stat.height.sd.toFixed ( 4 ) , "0.5548", "testing sd" );
    QUnit.equal ( parent.data.stat.height.n , 8, "testing population" );
    QUnit.equal ( parent.data.stat.height.u.toFixed ( 4 ) , "0.8750", "testing mean" )
  });

};
