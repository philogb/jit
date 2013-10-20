    function init() {

        phylogenyExplorer_init({
        	codeBase:'../..',
            width: 550,
            width:800,        
        	alignName:true,
        	lateralise:false, 
       		levelsToShow:5,
        	branchMultiplier:1,
            presentClade: function (clade) {
              var tmpl = st.config.tmpl, nodeList = [], node,  split;
              var html = '', names = [], formattedNames = [], output = [], header = [' ','links',' ',' ', ' ', ' '], temp, link;
              output.push ( header );
                for (var i = 0; ((i < clade.length) & (i < 30)); i++) {
             		  (function  ( index ) {
                                 var node = clade[i], sampleid, result, rel, LSID, genus,  species, genus_plus_species;

                                 temp = [];  
                                 Taxon = node.name.match(/[^\d]*/); 
                                 genus_plus_species = Taxon[0].replace(/\s+/g,'+');
                                 ApIIgenus_plus_species = 'genus=' + Taxon[0].replace(/\s+/g,'&species=');      

                  
                   
                                // bie species page
                                  result = Taxon ? '<a class="thumbImage1" rel="' +Taxon[0]+i+ '"' +
                                        'title="ALA page"' + 
                                        ' href="http://bie.ala.org.au/species/' + genus_plus_species + '">' +Taxon[0]+'</a>': ' ';
                                 temp.push ( result ); 
								
                                 // NSL - australian national species list
                                  result = Taxon ?  '<a class="thumbImage1" rel="' +Taxon[0]+i+ '"' +
                                 		  'title= "NSL nomenclator "' + 
                                          ' href="http://biodiversity.org.au/name/' +genus_plus_species+ '"' +
                                          ' "rel="' +Taxon[0]+i+ '" ' + 'class="thumbImage1"><id="thumb1"><div class="forward"></div> </id="thumb1"></a>': ' ';
                        
                                 temp.push ( result );
                                
                                // Aust. Plant image index
                                result = Taxon ?  '<a class="thumbImage1" rel="' +Taxon[0]+i+ '"' +
                                 		  'title= "Aust. Plant image index"' + 
                                           ' href= "http://www.anbg.gov.au/cgi-bin/apiiGenus?' + ApIIgenus_plus_species + '"' +
                                          ' "rel="' +Taxon[0]+i+ '" ' + 'class="thumbImage1"><id="thumb1"><div class="forward"></div> </id="thumb1"></a>': ' ';                                          
                                 temp.push ( result );            
                                 
						         // density map
                                  result = Taxon ?  '<a class="thumbImage1" rel="' +Taxon[0]+i+ '"' +
                                 		  'title= "ALA density map (given sufficient samples)"' + 
                                          ' href= "http://biocache.ala.org.au/ws/density/map?q=' +genus_plus_species+ '"' +
                                          ' "rel="' +Taxon[0]+i+ '" ' + 'class="thumbImage1"><id="thumb1"><div class="forward"></div> </id="thumb1"></a>': ' ';
                                temp.push ( result );
                                
                                 // ALA Spatial portal 
                               //. result = Taxon ? '<a class="thumbImage1" "rel="' + Taxon[0]+i+ '" ' +
                                //.			' title="' +Taxon[0]+ ' in ALA spatial portal' + 
                                //.			' id="'+Taxon[0].replace(/\s+/g,'ALA_iMAP')+index + '" ' +
                                //.			 'class="thumbImage" rel="'+Taxon[0]+index+ '" title="" href="" id="thumb1"></a>' : '';
                                 //.        temp.push ( result );
                                
                                // ALA density map from LSID  
                               //. result = Taxon ? '<a class="thumbImage1" ' + 
                                //.		 'rel="' + Taxon[0]+i+ '"'+
                                //.		  'title="'+Taxon[0]+ " in density map with LSID " +
                                //.		  ' id= "'+Taxon[0].replace(/\s+/g,'ALA_dMap')+index +
                                //.		   'class="thumbImage1" rel="'+Taxon[0]+index+'" title="" href="" id="thumb1"></a>' : '';
                              // temp.push ( result );       
					//.	$.ajax({
       				//.		 type: "POST",
        			//.		 data: "{'prefix':''}",
        			//.		 url: "http://bie.ala.org.au/ws/guid/Anaspides+Tasmaniae",
        			//.		 contentType: "application/json; charset=utf-8",
        			//.		dataType: "json",
        			//.		success: functionToCallWhenSucceed,
       				//.		failure: funcitonToCallWhenFailed
					//.		});
                                //http://bie.ala.org.au/ws/guid/Anaspides+Tasmaniae
								 output.push ( temp );
                               })( i );    

                 			}  //for
  				result = '';
                result = '<tr><th>' + output[0].join ( '</th><th>' ) + '</th></tr>';
                    for ( i = 1; i < output.length ; i++ ) {
                               result += '<tr><td>' + output[i].join ( '</td><td>' ) + '</td></tr>';
                             }
                return '<table>'+result+'</table>';

            }, //presentClade 
            
            onPresentClade:function ( ) {
                		  $('.thumbImage1').colorbox({iframe:true,width:'70%',height:'70%'});
           			},  // onPresentClade
           
            tree: '((Folioceros_fuciformis:0.007667365048364433,(Anthoceros_fragilis:0.005369261896034483,(Anthoceros_laminiferus:0.011621228506591308,Anthoceros_punctatus:2.100100506802205E-6):0.0027929350821030707):0.012281999999150084):0.0400709772514759,(((Dendroceros_subgenus_apoceros:0.0012025949078822151,Dendroceros_subgenus_dendroceros:0.0024332420478173633):0.006421131153429474,(Megaceros_flagellaris:0.008984623535641459,(Megaceros_gracilis:0.0012074724370825796,Megaceros_pellucidus:0.004013224017395373):0.003744210327868966):0.00542385295016945):0.023689622298502563,(Notothylas_javanicus:0.036702751435909745,((Phaeoceros_tuberosus:0.002448206437464337,Phaeoceros_carolinianus:0.0024347868455663196):0.001504447318880206,(Phaeoceros_engellii:0.0023787045835393372,(Phaeoceros_inflatus:2.100100506802205E-6,Phaeoceros_evanidus:0.01728824049672087):0.010690121488212884):6.006911375427831E-4):0.005347250770554118):0.014788598652250115):0.0400709772514759);',
            character: {
    "Anthoceros punctatus": {
        "modelled annual mean moisture index": [
            0.6837124164
        ],
        "modelled annual mean rad": [
            17.1466667213
        ],
        "modelled annual mean temp": [
            16.0416993341
        ],
        "modelled annual precipitation": [
            1039.2849673203
        ],
        "modelled clpk 1 1000 g clay": [
            18998.3660130718
        ],
        "modelled erosional": [
            85.9191176471
        ],
        "modelled highest period moisture index": [
            0.8894836614
        ],
        "modelled highest period radiation": [
            25.3393464394
        ],
        "modelled hydraulic conductivity ksat": [
            157.4640522876
        ],
        "modelled isothermality": [
            0.4932352942
        ],
        "modelled lowest period moisture index": [
            0.3231372576
        ],
        "modelled lowest period radiation": [
            9.081829987
        ],
        "modelled max temp warmest period": [
            28.0827450671
        ],
        "modelled mean diurnal range": [
            11.3729411867
        ],
        "modelled mean moisture index coldest quarter": [
            0.8600326849
        ],
        "modelled mean moisture index highest quarter MI": [
            0.8941764697
        ],
        "modelled mean moisture index lowest quater MI": [
            0.3734836587
        ],
        "modelled mean moisture index warmest quarter": [
            0.4585424874
        ],
        "modelled mean temp coldest quarter": [
            10.5782352927
        ],
        "modelled mean temp driest quater": [
            15.4166012935
        ],
        "modelled mean temp warmer quarter": [
            20.968431512
        ],
        "modelled mean temp wettest quarter": [
            15.8052941168
        ],
        "modelled min temp coldest period": [
            4.1385621225
        ],
        "modelled moisture index seasonality": [
            33.0339869281
        ],
        "modelled phos": [
            0.0438125788
        ],
        "modelled precipitation coldets quarter": [
            255.5509803922
        ],
        "modelled precipitation driest period": [
            5.322875817
        ],
        "modelled precipitation driest quarter": [
            143.0516339869
        ],
        "modelled precipitation seasonality": [
            39.0823529412
        ],
        "modelled precipitation warmest quarter": [
            292.9124183007
        ],
        "modelled precipitation wettest period": [
            36.9261437908
        ],
        "modelled precipitation wettest quarter": [
            423.4202614379
        ],
        "modelled radiation coldest quarter": [
            10.6616340562
        ],
        "modelled radiation driest quarter": [
            17.4772549498
        ],
        "modelled radiation seasonality": [
            33.0607843137
        ],
        "modelled radiation warmest quarter": [
            22.9215031792
        ],
        "modelled radiation wettest quarter": [
            15.7764050234
        ],
        "modelled relief": [
            64.9002548406
        ],
        "modelled ridgetopflat": [
            1.964869281
        ],
        "modelled rockalklty": [
            4.9215686275
        ],
        "modelled rockgrainsz": [
            4.1215686275
        ],
        "modelled rockhardness": [
            5.8725490196
        ],
        "modelled rocknutrnt": [
            4.7078431373
        ],
        "modelled roughness": [
            19.0273797546
        ],
        "modelled sapk 1 1000 g sand": [
            64840.3594771241
        ],
        "modelled slope": [
            4.4690577426
        ],
        "modelled soildepth": [
            0.9153594758
        ],
        "modelled solpawhc": [
            107.6281045752
        ],
        "modelled temperature annual range": [
            23.24398698
        ],
        "modelled temperature seasonality": [
            1.4140000156
        ],
        "modelled thpk 1 1000 g thickness": [
            292.831372549
        ],
        "modelled twi": [
            5.5785338397
        ],
        "modelled valleybottom": [
            8.4109477124
        ],
        "modelled whpk 1 1000 g water cap": [
            44557.6633986928
        ],
        "raw annual mean moisture index": [
            1e-7
        ],
        "raw annual mean rad": [
            19
        ],
        "raw annual mean temp": [
            21.5
        ],
        "raw annual precipitation": [
            1111
        ],
        "raw clpk 1 1000 g clay": [
            18000
        ],
        "raw erosional": [
            100
        ],
        "raw highest period moisture index": [
            1
        ],
        "raw highest period radiation": [
            25.5
        ],
        "raw hydraulic conductivity ksat": [
            200
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            14
        ],
        "raw max temp warmest period": [
            30
        ],
        "raw mean diurnal range": [
            9
        ],
        "raw mean moisture index coldest quarter": [
            0
        ],
        "raw mean moisture index highest quarter MI": [
            0.5
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            17
        ],
        "raw mean temp driest quater": [
            18.5
        ],
        "raw mean temp warmer quarter": [
            24.5
        ],
        "raw mean temp wettest quarter": [
            24.5
        ],
        "raw min temp coldest period": [
            11
        ],
        "raw moisture index seasonality": [
            57
        ],
        "raw precipitation coldets quarter": [
            82
        ],
        "raw precipitation driest period": [
            0
        ],
        "raw precipitation driest quarter": [
            61
        ],
        "raw precipitation seasonality": [
            99.5
        ],
        "raw precipitation warmest quarter": [
            574.5
        ],
        "raw precipitation wettest period": [
            72.5
        ],
        "raw precipitation wettest quarter": [
            716
        ],
        "raw radiation coldest quarter": [
            15.5
        ],
        "raw radiation driest quarter": [
            19
        ],
        "raw radiation seasonality": [
            18.5
        ],
        "raw radiation warmest quarter": [
            22
        ],
        "raw radiation wettest quarter": [
            19
        ],
        "raw relief": [
            125
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            4
        ],
        "raw rockgrainsz": [
            8
        ],
        "raw rockhardness": [
            7
        ],
        "raw rocknutrnt": [
            4
        ],
        "raw roughness": [
            11
        ],
        "raw sapk 1 1000 g sand": [
            63000
        ],
        "raw slope": [
            6
        ],
        "raw soildepth": [
            1
        ],
        "raw solpawhc": [
            177
        ],
        "raw temperature annual range": [
            18
        ],
        "raw temperature seasonality": [
            1
        ],
        "raw thpk 1 1000 g thickness": [
            295.5
        ],
        "raw twi": [
            5.5
        ],
        "raw valleybottom": [
            0
        ]
    },
    "Anthoceros fragilis": {
        "modelled annual mean moisture index": [
            0.6050000191
        ],
        "modelled annual mean rad": [
            19.6500005722
        ],
        "modelled annual mean temp": [
            21.75
        ],
        "modelled annual precipitation": [
            1111
        ],
        "modelled clpk 1 1000 g clay": [
            18000
        ],
        "modelled erosional": [
            100
        ],
        "modelled highest period moisture index": [
            1
        ],
        "modelled highest period radiation": [
            26.1500005722
        ],
        "modelled hydraulic conductivity ksat": [
            200
        ],
        "modelled isothermality": [
            0.5150000155
        ],
        "modelled lowest period moisture index": [
            0.1199999973
        ],
        "modelled lowest period radiation": [
            14.3499999046
        ],
        "modelled max temp warmest period": [
            30.1999998093
        ],
        "modelled mean diurnal range": [
            9.6500000954
        ],
        "modelled mean moisture index coldest quarter": [
            0.5400000066
        ],
        "modelled mean moisture index highest quarter MI": [
            0.9950000048
        ],
        "modelled mean moisture index lowest quater MI": [
            0.1750000007
        ],
        "modelled mean moisture index warmest quarter": [
            0.7150000036
        ],
        "modelled mean temp coldest quarter": [
            17.4500007629
        ],
        "modelled mean temp driest quater": [
            18.8999996185
        ],
        "modelled mean temp warmer quarter": [
            25.1499996185
        ],
        "modelled mean temp wettest quarter": [
            24.8500003815
        ],
        "modelled min temp coldest period": [
            11.5999999046
        ],
        "modelled moisture index seasonality": [
            57
        ],
        "modelled phos": [
            0.0198370004
        ],
        "modelled precipitation coldets quarter": [
            82
        ],
        "modelled precipitation driest period": [
            0
        ],
        "modelled precipitation driest quarter": [
            61
        ],
        "modelled precipitation seasonality": [
            99.5
        ],
        "modelled precipitation warmest quarter": [
            574.5
        ],
        "modelled precipitation wettest period": [
            72.5
        ],
        "modelled precipitation wettest quarter": [
            716
        ],
        "modelled radiation coldest quarter": [
            15.9499998093
        ],
        "modelled radiation driest quarter": [
            19.1999998093
        ],
        "modelled radiation seasonality": [
            18.5
        ],
        "modelled radiation warmest quarter": [
            22.3999996185
        ],
        "modelled radiation wettest quarter": [
            19.6000003815
        ],
        "modelled relief": [
            125.4036026001
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            4
        ],
        "modelled rockgrainsz": [
            8
        ],
        "modelled rockhardness": [
            7
        ],
        "modelled rocknutrnt": [
            4
        ],
        "modelled roughness": [
            11.5456476212
        ],
        "modelled sapk 1 1000 g sand": [
            63000
        ],
        "modelled slope": [
            6.512172699
        ],
        "modelled soildepth": [
            1.25
        ],
        "modelled solpawhc": [
            177
        ],
        "modelled temperature annual range": [
            18.6500005722
        ],
        "modelled temperature seasonality": [
            1.0499999523
        ],
        "modelled thpk 1 1000 g thickness": [
            295.5
        ],
        "modelled twi": [
            5.6324121952
        ],
        "modelled valleybottom": [
            0
        ],
        "modelled whpk 1 1000 g water cap": [
            50000
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            19
        ],
        "raw annual mean temp": [
            21.75
        ],
        "raw annual precipitation": [
            1107
        ],
        "raw clpk 1 1000 g clay": [
            19000
        ],
        "raw erosional": [
            100
        ],
        "raw highest period moisture index": [
            1
        ],
        "raw highest period radiation": [
            25.25
        ],
        "raw hydraulic conductivity ksat": [
            250
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            14
        ],
        "raw max temp warmest period": [
            30
        ],
        "raw mean diurnal range": [
            8.5
        ],
        "raw mean moisture index coldest quarter": [
            0
        ],
        "raw mean moisture index highest quarter MI": [
            0.25
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            17.5
        ],
        "raw mean temp driest quater": [
            18.75
        ],
        "raw mean temp warmer quarter": [
            24.75
        ],
        "raw mean temp wettest quarter": [
            24.75
        ],
        "raw min temp coldest period": [
            11.5
        ],
        "raw moisture index seasonality": [
            61.5
        ],
        "raw precipitation coldets quarter": [
            74.5
        ],
        "raw precipitation driest period": [
            0
        ],
        "raw precipitation driest quarter": [
            55
        ],
        "raw precipitation seasonality": [
            103.75
        ],
        "raw precipitation warmest quarter": [
            608.75
        ],
        "raw precipitation wettest period": [
            75.75
        ],
        "raw precipitation wettest quarter": [
            731.5
        ],
        "raw radiation coldest quarter": [
            15.25
        ],
        "raw radiation driest quarter": [
            19
        ],
        "raw radiation seasonality": [
            18.25
        ],
        "raw radiation warmest quarter": [
            21.5
        ],
        "raw radiation wettest quarter": [
            19
        ],
        "raw relief": [
            162
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            4
        ],
        "raw rockgrainsz": [
            8
        ],
        "raw rockhardness": [
            7
        ],
        "raw rocknutrnt": [
            4
        ],
        "raw roughness": [
            15.5
        ],
        "raw sapk 1 1000 g sand": [
            61500
        ],
        "raw slope": [
            7.5
        ],
        "raw soildepth": [
            1
        ],
        "raw solpawhc": [
            183
        ],
        "raw temperature annual range": [
            17.5
        ],
        "raw temperature seasonality": [
            1
        ],
        "raw thpk 1 1000 g thickness": [
            285.25
        ],
        "raw twi": [
            4.75
        ],
        "raw valleybottom": [
            0
        ]
    },
    "Anthoceros laminiferus": {
        "modelled annual mean moisture index": [
            0.9200000167
        ],
        "modelled annual mean rad": [
            16.8999996185
        ],
        "modelled annual mean temp": [
            19.3999996185
        ],
        "modelled annual precipitation": [
            1778
        ],
        "modelled clpk 1 1000 g clay": [
            14000
        ],
        "modelled erosional": [
            100
        ],
        "modelled highest period moisture index": [
            1
        ],
        "modelled highest period radiation": [
            22.8999996185
        ],
        "modelled hydraulic conductivity ksat": [
            300
        ],
        "modelled isothermality": [
            0.4900000095
        ],
        "modelled lowest period moisture index": [
            0.7300000191
        ],
        "modelled lowest period radiation": [
            10.8000001907
        ],
        "modelled max temp warmest period": [
            27.7999992371
        ],
        "modelled mean diurnal range": [
            9.5
        ],
        "modelled mean moisture index coldest quarter": [
            1
        ],
        "modelled mean moisture index highest quarter MI": [
            1
        ],
        "modelled mean moisture index lowest quater MI": [
            0.75
        ],
        "modelled mean moisture index warmest quarter": [
            0.9200000167
        ],
        "modelled mean temp coldest quarter": [
            14.6000003815
        ],
        "modelled mean temp driest quater": [
            16.1000003815
        ],
        "modelled mean temp warmer quarter": [
            23.5
        ],
        "modelled mean temp wettest quarter": [
            23.1000003815
        ],
        "modelled min temp coldest period": [
            8.1999998093
        ],
        "modelled moisture index seasonality": [
            12
        ],
        "modelled phos": [
            0.0327499993
        ],
        "modelled precipitation coldets quarter": [
            258
        ],
        "modelled precipitation driest period": [
            11
        ],
        "modelled precipitation driest quarter": [
            211
        ],
        "modelled precipitation seasonality": [
            46
        ],
        "modelled precipitation warmest quarter": [
            670
        ],
        "modelled precipitation wettest period": [
            66
        ],
        "modelled precipitation wettest quarter": [
            730
        ],
        "modelled radiation coldest quarter": [
            12.8999996185
        ],
        "modelled radiation driest quarter": [
            16.2999992371
        ],
        "modelled radiation seasonality": [
            24
        ],
        "modelled radiation warmest quarter": [
            20.1000003815
        ],
        "modelled radiation wettest quarter": [
            18.2999992371
        ],
        "modelled relief": [
            178.5762023926
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            5
        ],
        "modelled rockgrainsz": [
            3
        ],
        "modelled rockhardness": [
            4
        ],
        "modelled rocknutrnt": [
            4
        ],
        "modelled roughness": [
            72.862159729
        ],
        "modelled sapk 1 1000 g sand": [
            69000
        ],
        "modelled slope": [
            10.0389699936
        ],
        "modelled soildepth": [
            1
        ],
        "modelled solpawhc": [
            169
        ],
        "modelled temperature annual range": [
            19.5
        ],
        "modelled temperature seasonality": [
            1.2000000477
        ],
        "modelled thpk 1 1000 g thickness": [
            599
        ],
        "modelled twi": [
            2.5513501167
        ],
        "modelled valleybottom": [
            0
        ],
        "modelled whpk 1 1000 g water cap": [
            117000
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            16
        ],
        "raw annual mean temp": [
            19
        ],
        "raw annual precipitation": [
            1778
        ],
        "raw clpk 1 1000 g clay": [
            14000
        ],
        "raw erosional": [
            100
        ],
        "raw highest period moisture index": [
            1
        ],
        "raw highest period radiation": [
            22
        ],
        "raw hydraulic conductivity ksat": [
            300
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            10
        ],
        "raw max temp warmest period": [
            27
        ],
        "raw mean diurnal range": [
            9
        ],
        "raw mean moisture index coldest quarter": [
            1
        ],
        "raw mean moisture index highest quarter MI": [
            1
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            14
        ],
        "raw mean temp driest quater": [
            16
        ],
        "raw mean temp warmer quarter": [
            23
        ],
        "raw mean temp wettest quarter": [
            23
        ],
        "raw min temp coldest period": [
            8
        ],
        "raw moisture index seasonality": [
            12
        ],
        "raw precipitation coldets quarter": [
            258
        ],
        "raw precipitation driest period": [
            11
        ],
        "raw precipitation driest quarter": [
            211
        ],
        "raw precipitation seasonality": [
            46
        ],
        "raw precipitation warmest quarter": [
            670
        ],
        "raw precipitation wettest period": [
            66
        ],
        "raw precipitation wettest quarter": [
            730
        ],
        "raw radiation coldest quarter": [
            12
        ],
        "raw radiation driest quarter": [
            16
        ],
        "raw radiation seasonality": [
            24
        ],
        "raw radiation warmest quarter": [
            20
        ],
        "raw radiation wettest quarter": [
            18
        ],
        "raw relief": [
            178
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            5
        ],
        "raw rockgrainsz": [
            3
        ],
        "raw rockhardness": [
            4
        ],
        "raw rocknutrnt": [
            4
        ],
        "raw roughness": [
            72
        ],
        "raw sapk 1 1000 g sand": [
            69000
        ],
        "raw slope": [
            10
        ],
        "raw soildepth": [
            1
        ],
        "raw solpawhc": [
            169
        ],
        "raw temperature annual range": [
            19
        ],
        "raw temperature seasonality": [
            1
        ],
        "raw thpk 1 1000 g thickness": [
            599
        ],
        "raw twi": [
            2
        ],
        "raw valleybottom": [
            0
        ]
    },
    "Dendroceros subgenus dendroceros": {
        "modelled annual mean moisture index": [
            0.8323181818
        ],
        "modelled annual mean rad": [
            17.9524242387
        ],
        "modelled annual mean temp": [
            19.2898482727
        ],
        "modelled annual precipitation": [
            1888.3636363636
        ],
        "modelled clpk 1 1000 g clay": [
            25214.7727272727
        ],
        "modelled erosional": [
            92.8787878788
        ],
        "modelled highest period moisture index": [
            0.998939395
        ],
        "modelled highest period radiation": [
            24.5178788503
        ],
        "modelled hydraulic conductivity ksat": [
            205.6212121212
        ],
        "modelled isothermality": [
            0.5086363656
        ],
        "modelled lowest period moisture index": [
            0.4447727201
        ],
        "modelled lowest period radiation": [
            12.1872727221
        ],
        "modelled max temp warmest period": [
            28.0525757327
        ],
        "modelled mean diurnal range": [
            9.485757533
        ],
        "modelled mean moisture index coldest quarter": [
            0.8951666693
        ],
        "modelled mean moisture index highest quarter MI": [
            0.9978787867
        ],
        "modelled mean moisture index lowest quater MI": [
            0.5378636367
        ],
        "modelled mean moisture index warmest quarter": [
            0.8636969721
        ],
        "modelled mean temp coldest quarter": [
            14.951212141
        ],
        "modelled mean temp driest quater": [
            16.7531818144
        ],
        "modelled mean temp warmer quarter": [
            22.9656060132
        ],
        "modelled mean temp wettest quarter": [
            22.5318182165
        ],
        "modelled min temp coldest period": [
            9.4287879063
        ],
        "modelled moisture index seasonality": [
            25.9621212121
        ],
        "modelled phos": [
            0.0453631317
        ],
        "modelled precipitation coldets quarter": [
            235.6090909091
        ],
        "modelled precipitation driest period": [
            6.7242424242
        ],
        "modelled precipitation driest quarter": [
            167.2409090909
        ],
        "modelled precipitation seasonality": [
            68.203030303
        ],
        "modelled precipitation warmest quarter": [
            790.2136363636
        ],
        "modelled precipitation wettest period": [
            88.2606060606
        ],
        "modelled precipitation wettest quarter": [
            970.5196969697
        ],
        "modelled radiation coldest quarter": [
            14.1262121605
        ],
        "modelled radiation driest quarter": [
            17.7987878742
        ],
        "modelled radiation seasonality": [
            21.6636363636
        ],
        "modelled radiation warmest quarter": [
            20.8286361521
        ],
        "modelled radiation wettest quarter": [
            18.6671213323
        ],
        "modelled relief": [
            151.1616860035
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            4.7151515152
        ],
        "modelled rockgrainsz": [
            5.5742424242
        ],
        "modelled rockhardness": [
            6.2560606061
        ],
        "modelled rocknutrnt": [
            4.5742424242
        ],
        "modelled roughness": [
            14.6029429806
        ],
        "modelled sapk 1 1000 g sand": [
            54667.803030303
        ],
        "modelled slope": [
            8.4508264353
        ],
        "modelled soildepth": [
            1.1122727402
        ],
        "modelled solpawhc": [
            155.3090909091
        ],
        "modelled temperature annual range": [
            18.6489395503
        ],
        "modelled temperature seasonality": [
            1.0938939283
        ],
        "modelled thpk 1 1000 g thickness": [
            301.3257575758
        ],
        "modelled twi": [
            5.6370893103
        ],
        "modelled valleybottom": [
            7.1212121212
        ],
        "modelled whpk 1 1000 g water cap": [
            51557.1969696969
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            17.6111111111
        ],
        "raw annual mean temp": [
            18.5
        ],
        "raw annual precipitation": [
            1925.8333333333
        ],
        "raw clpk 1 1000 g clay": [
            26833.3333333333
        ],
        "raw erosional": [
            94.4444444444
        ],
        "raw highest period moisture index": [
            0.9444444444
        ],
        "raw highest period radiation": [
            24.1111111111
        ],
        "raw hydraulic conductivity ksat": [
            196.1111111111
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            11.8333333333
        ],
        "raw max temp warmest period": [
            27.4444444444
        ],
        "raw mean diurnal range": [
            9.2777777778
        ],
        "raw mean moisture index coldest quarter": [
            0.3888888889
        ],
        "raw mean moisture index highest quarter MI": [
            0.9444444444
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0.0555555556
        ],
        "raw mean temp coldest quarter": [
            14.1111111111
        ],
        "raw mean temp driest quater": [
            15.8888888889
        ],
        "raw mean temp warmer quarter": [
            22.1666666667
        ],
        "raw mean temp wettest quarter": [
            21.7222222222
        ],
        "raw min temp coldest period": [
            8.5555555556
        ],
        "raw moisture index seasonality": [
            24.3333333333
        ],
        "raw precipitation coldets quarter": [
            238.8888888889
        ],
        "raw precipitation driest period": [
            6.5
        ],
        "raw precipitation driest quarter": [
            169.1666666667
        ],
        "raw precipitation seasonality": [
            69.4444444444
        ],
        "raw precipitation warmest quarter": [
            812.7222222222
        ],
        "raw precipitation wettest period": [
            91.2777777778
        ],
        "raw precipitation wettest quarter": [
            998.7222222222
        ],
        "raw radiation coldest quarter": [
            13.6666666667
        ],
        "raw radiation driest quarter": [
            17.1666666667
        ],
        "raw radiation seasonality": [
            21.3333333333
        ],
        "raw radiation warmest quarter": [
            20.3333333333
        ],
        "raw radiation wettest quarter": [
            18.2777777778
        ],
        "raw relief": [
            163.1111111111
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            4.3888888889
        ],
        "raw rockgrainsz": [
            5.5
        ],
        "raw rockhardness": [
            6.0555555556
        ],
        "raw rocknutrnt": [
            4.4444444444
        ],
        "raw roughness": [
            11.8888888889
        ],
        "raw sapk 1 1000 g sand": [
            52583.3333333333
        ],
        "raw slope": [
            8.5
        ],
        "raw soildepth": [
            0.8333333333
        ],
        "raw solpawhc": [
            156.6666666667
        ],
        "raw temperature annual range": [
            18.6111111111
        ],
        "raw temperature seasonality": [
            0.6111111111
        ],
        "raw thpk 1 1000 g thickness": [
            272.0555555556
        ],
        "raw twi": [
            5.0555555556
        ],
        "raw valleybottom": [
            5.5555555556
        ]
    },
    "Dendroceros subgenus apoceros": {
        "modelled annual mean moisture index": [
            0.9350000024
        ],
        "modelled annual mean rad": [
            18.0500001907
        ],
        "modelled annual mean temp": [
            20.1999998093
        ],
        "modelled annual precipitation": [
            2948
        ],
        "modelled clpk 1 1000 g clay": [
            42000
        ],
        "modelled erosional": [
            100
        ],
        "modelled highest period moisture index": [
            1
        ],
        "modelled highest period radiation": [
            25.0500001907
        ],
        "modelled hydraulic conductivity ksat": [
            300
        ],
        "modelled isothermality": [
            0.5400000215
        ],
        "modelled lowest period moisture index": [
            0.5549999774
        ],
        "modelled lowest period radiation": [
            12.4000000954
        ],
        "modelled max temp warmest period": [
            28.6499996185
        ],
        "modelled mean diurnal range": [
            9.4500002861
        ],
        "modelled mean moisture index coldest quarter": [
            1
        ],
        "modelled mean moisture index highest quarter MI": [
            1
        ],
        "modelled mean moisture index lowest quater MI": [
            0.7350000143
        ],
        "modelled mean moisture index warmest quarter": [
            0.9200000167
        ],
        "modelled mean temp coldest quarter": [
            16.4500007629
        ],
        "modelled mean temp driest quater": [
            19.4000005722
        ],
        "modelled mean temp warmer quarter": [
            23.4000005722
        ],
        "modelled mean temp wettest quarter": [
            22.6499996185
        ],
        "modelled min temp coldest period": [
            11.3000001907
        ],
        "modelled moisture index seasonality": [
            14
        ],
        "modelled phos": [
            0.0769999996
        ],
        "modelled precipitation coldets quarter": [
            428.5
        ],
        "modelled precipitation driest period": [
            12.5
        ],
        "modelled precipitation driest quarter": [
            247
        ],
        "modelled precipitation seasonality": [
            68.5
        ],
        "modelled precipitation warmest quarter": [
            1054
        ],
        "modelled precipitation wettest period": [
            131
        ],
        "modelled precipitation wettest quarter": [
            1492
        ],
        "modelled radiation coldest quarter": [
            14.75
        ],
        "modelled radiation driest quarter": [
            19.6499996185
        ],
        "modelled radiation seasonality": [
            20
        ],
        "modelled radiation warmest quarter": [
            20.75
        ],
        "modelled radiation wettest quarter": [
            18.0500001907
        ],
        "modelled relief": [
            93.9310970306
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            6
        ],
        "modelled rockgrainsz": [
            4
        ],
        "modelled rockhardness": [
            7
        ],
        "modelled rocknutrnt": [
            6
        ],
        "modelled roughness": [
            4.0198574662
        ],
        "modelled sapk 1 1000 g sand": [
            44000
        ],
        "modelled slope": [
            5.4142469168
        ],
        "modelled soildepth": [
            1.1000000238
        ],
        "modelled solpawhc": [
            171
        ],
        "modelled temperature annual range": [
            17.4000005722
        ],
        "modelled temperature seasonality": [
            0.9499999881
        ],
        "modelled thpk 1 1000 g thickness": [
            150
        ],
        "modelled twi": [
            5.4885058403
        ],
        "modelled valleybottom": [
            0
        ],
        "modelled whpk 1 1000 g water cap": [
            33000
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            18
        ],
        "raw annual mean temp": [
            20
        ],
        "raw annual precipitation": [
            3017.6666666667
        ],
        "raw clpk 1 1000 g clay": [
            42000
        ],
        "raw erosional": [
            100
        ],
        "raw highest period moisture index": [
            1
        ],
        "raw highest period radiation": [
            25
        ],
        "raw hydraulic conductivity ksat": [
            300
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            12
        ],
        "raw max temp warmest period": [
            28
        ],
        "raw mean diurnal range": [
            9
        ],
        "raw mean moisture index coldest quarter": [
            1
        ],
        "raw mean moisture index highest quarter MI": [
            1
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            16
        ],
        "raw mean temp driest quater": [
            19
        ],
        "raw mean temp warmer quarter": [
            23
        ],
        "raw mean temp wettest quarter": [
            22
        ],
        "raw min temp coldest period": [
            11
        ],
        "raw moisture index seasonality": [
            13.6666666667
        ],
        "raw precipitation coldets quarter": [
            437
        ],
        "raw precipitation driest period": [
            12.6666666667
        ],
        "raw precipitation driest quarter": [
            252.3333333333
        ],
        "raw precipitation seasonality": [
            68.6666666667
        ],
        "raw precipitation warmest quarter": [
            1077.3333333333
        ],
        "raw precipitation wettest period": [
            134.3333333333
        ],
        "raw precipitation wettest quarter": [
            1531
        ],
        "raw radiation coldest quarter": [
            14
        ],
        "raw radiation driest quarter": [
            19
        ],
        "raw radiation seasonality": [
            20
        ],
        "raw radiation warmest quarter": [
            20
        ],
        "raw radiation wettest quarter": [
            18
        ],
        "raw relief": [
            113
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            6
        ],
        "raw rockgrainsz": [
            4
        ],
        "raw rockhardness": [
            7
        ],
        "raw rocknutrnt": [
            6
        ],
        "raw roughness": [
            4.6666666667
        ],
        "raw sapk 1 1000 g sand": [
            44000
        ],
        "raw slope": [
            6.3333333333
        ],
        "raw soildepth": [
            1
        ],
        "raw solpawhc": [
            165.6666666667
        ],
        "raw temperature annual range": [
            17
        ],
        "raw temperature seasonality": [
            0
        ],
        "raw thpk 1 1000 g thickness": [
            150
        ],
        "raw twi": [
            5.3333333333
        ],
        "raw valleybottom": [
            0
        ]
    },
    "Folioceros fuciformis": {
        "modelled annual mean moisture index": [
            0.8325000107
        ],
        "modelled annual mean rad": [
            18.5249996185
        ],
        "modelled annual mean temp": [
            20.9250001907
        ],
        "modelled annual precipitation": [
            2179.25
        ],
        "modelled clpk 1 1000 g clay": [
            35250
        ],
        "modelled erosional": [
            100
        ],
        "modelled highest period moisture index": [
            1
        ],
        "modelled highest period radiation": [
            25.2750000954
        ],
        "modelled hydraulic conductivity ksat": [
            250
        ],
        "modelled isothermality": [
            0.5450000167
        ],
        "modelled lowest period moisture index": [
            0.3475000001
        ],
        "modelled lowest period radiation": [
            13.3499999046
        ],
        "modelled max temp warmest period": [
            29.2249999046
        ],
        "modelled mean diurnal range": [
            9.5
        ],
        "modelled mean moisture index coldest quarter": [
            0.8774999976
        ],
        "modelled mean moisture index highest quarter MI": [
            1
        ],
        "modelled mean moisture index lowest quater MI": [
            0.4975000024
        ],
        "modelled mean moisture index warmest quarter": [
            0.8824999928
        ],
        "modelled mean temp coldest quarter": [
            17.125
        ],
        "modelled mean temp driest quater": [
            19.0499997139
        ],
        "modelled mean temp warmer quarter": [
            24.0749998093
        ],
        "modelled mean temp wettest quarter": [
            23.5500001907
        ],
        "modelled min temp coldest period": [
            11.75
        ],
        "modelled moisture index seasonality": [
            28.5
        ],
        "modelled phos": [
            0.0491249994
        ],
        "modelled precipitation coldets quarter": [
            234.25
        ],
        "modelled precipitation driest period": [
            5.5
        ],
        "modelled precipitation driest quarter": [
            157.75
        ],
        "modelled precipitation seasonality": [
            79
        ],
        "modelled precipitation warmest quarter": [
            919.25
        ],
        "modelled precipitation wettest period": [
            108.75
        ],
        "modelled precipitation wettest quarter": [
            1209.25
        ],
        "modelled radiation coldest quarter": [
            15.4999997616
        ],
        "modelled radiation driest quarter": [
            18.9500002861
        ],
        "modelled radiation seasonality": [
            18.75
        ],
        "modelled radiation warmest quarter": [
            21
        ],
        "modelled radiation wettest quarter": [
            18.4499998093
        ],
        "modelled relief": [
            191.561460495
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            4.5
        ],
        "modelled rockgrainsz": [
            4.5
        ],
        "modelled rockhardness": [
            6.5
        ],
        "modelled rocknutrnt": [
            5.5
        ],
        "modelled roughness": [
            11.7312440872
        ],
        "modelled sapk 1 1000 g sand": [
            46500
        ],
        "modelled slope": [
            10.01773417
        ],
        "modelled soildepth": [
            1.2000000179
        ],
        "modelled solpawhc": [
            164.5
        ],
        "modelled temperature annual range": [
            17.4500000477
        ],
        "modelled temperature seasonality": [
            0.9424999952
        ],
        "modelled thpk 1 1000 g thickness": [
            195.25
        ],
        "modelled twi": [
            7.2423673272
        ],
        "modelled valleybottom": [
            0
        ],
        "modelled whpk 1 1000 g water cap": [
            35500
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            18
        ],
        "raw annual mean temp": [
            20.5
        ],
        "raw annual precipitation": [
            2179.25
        ],
        "raw clpk 1 1000 g clay": [
            35250
        ],
        "raw erosional": [
            100
        ],
        "raw highest period moisture index": [
            1
        ],
        "raw highest period radiation": [
            25
        ],
        "raw hydraulic conductivity ksat": [
            250
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            13
        ],
        "raw max temp warmest period": [
            28.5
        ],
        "raw mean diurnal range": [
            9
        ],
        "raw mean moisture index coldest quarter": [
            0.75
        ],
        "raw mean moisture index highest quarter MI": [
            1
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            16.75
        ],
        "raw mean temp driest quater": [
            18.75
        ],
        "raw mean temp warmer quarter": [
            23.75
        ],
        "raw mean temp wettest quarter": [
            23
        ],
        "raw min temp coldest period": [
            11
        ],
        "raw moisture index seasonality": [
            28.5
        ],
        "raw precipitation coldets quarter": [
            234.25
        ],
        "raw precipitation driest period": [
            5.5
        ],
        "raw precipitation driest quarter": [
            157.75
        ],
        "raw precipitation seasonality": [
            79
        ],
        "raw precipitation warmest quarter": [
            919.25
        ],
        "raw precipitation wettest period": [
            108.75
        ],
        "raw precipitation wettest quarter": [
            1209.25
        ],
        "raw radiation coldest quarter": [
            15.25
        ],
        "raw radiation driest quarter": [
            18.75
        ],
        "raw radiation seasonality": [
            18.75
        ],
        "raw radiation warmest quarter": [
            20.75
        ],
        "raw radiation wettest quarter": [
            18
        ],
        "raw relief": [
            191
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            4.5
        ],
        "raw rockgrainsz": [
            4.5
        ],
        "raw rockhardness": [
            6.5
        ],
        "raw rocknutrnt": [
            5.5
        ],
        "raw roughness": [
            11.25
        ],
        "raw sapk 1 1000 g sand": [
            46500
        ],
        "raw slope": [
            9.5
        ],
        "raw soildepth": [
            1
        ],
        "raw solpawhc": [
            164.5
        ],
        "raw temperature annual range": [
            17
        ],
        "raw temperature seasonality": [
            0.25
        ],
        "raw thpk 1 1000 g thickness": [
            195.25
        ],
        "raw twi": [
            6.75
        ],
        "raw valleybottom": [
            0
        ]
    },
    "Megaceros flagellaris": {
        "modelled annual mean moisture index": [
            0.8511999941
        ],
        "modelled annual mean rad": [
            17.7549997139
        ],
        "modelled annual mean temp": [
            20.1320000076
        ],
        "modelled annual precipitation": [
            2004.6
        ],
        "modelled clpk 1 1000 g clay": [
            24337.5
        ],
        "modelled erosional": [
            100
        ],
        "modelled highest period moisture index": [
            1
        ],
        "modelled highest period radiation": [
            24.4609998512
        ],
        "modelled hydraulic conductivity ksat": [
            230
        ],
        "modelled isothermality": [
            0.519799999
        ],
        "modelled lowest period moisture index": [
            0.4349999921
        ],
        "modelled lowest period radiation": [
            11.9399999428
        ],
        "modelled max temp warmest period": [
            28.5809999847
        ],
        "modelled mean diurnal range": [
            9.3529999971
        ],
        "modelled mean moisture index coldest quarter": [
            0.9477999979
        ],
        "modelled mean moisture index highest quarter MI": [
            1
        ],
        "modelled mean moisture index lowest quater MI": [
            0.5399000007
        ],
        "modelled mean moisture index warmest quarter": [
            0.8883000004
        ],
        "modelled mean temp coldest quarter": [
            16.0029999352
        ],
        "modelled mean temp driest quater": [
            17.4470001602
        ],
        "modelled mean temp warmer quarter": [
            23.6520002556
        ],
        "modelled mean temp wettest quarter": [
            23.2579998207
        ],
        "modelled min temp coldest period": [
            10.5970001769
        ],
        "modelled moisture index seasonality": [
            24.44
        ],
        "modelled phos": [
            0.0236599989
        ],
        "modelled precipitation coldets quarter": [
            229.2
        ],
        "modelled precipitation driest period": [
            8.44
        ],
        "modelled precipitation driest quarter": [
            170.66
        ],
        "modelled precipitation seasonality": [
            66.77
        ],
        "modelled precipitation warmest quarter": [
            871.37
        ],
        "modelled precipitation wettest period": [
            92.64
        ],
        "modelled precipitation wettest quarter": [
            1050.83
        ],
        "modelled radiation coldest quarter": [
            14.0290001678
        ],
        "modelled radiation driest quarter": [
            17.2499999809
        ],
        "modelled radiation seasonality": [
            21.92
        ],
        "modelled radiation warmest quarter": [
            20.4790001106
        ],
        "modelled radiation wettest quarter": [
            18.3959999466
        ],
        "modelled relief": [
            180.825651741
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            4.92
        ],
        "modelled rockgrainsz": [
            6.22
        ],
        "modelled rockhardness": [
            6.34
        ],
        "modelled rocknutrnt": [
            4.34
        ],
        "modelled roughness": [
            41.1613443279
        ],
        "modelled sapk 1 1000 g sand": [
            52267.5
        ],
        "modelled slope": [
            10.5619576693
        ],
        "modelled soildepth": [
            1.3479999959
        ],
        "modelled solpawhc": [
            183.33
        ],
        "modelled temperature annual range": [
            17.9670000267
        ],
        "modelled temperature seasonality": [
            1.0439999992
        ],
        "modelled thpk 1 1000 g thickness": [
            226.16
        ],
        "modelled twi": [
            5.7365186501
        ],
        "modelled valleybottom": [
            1.0625
        ],
        "modelled whpk 1 1000 g water cap": [
            35632.5
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            17
        ],
        "raw annual mean temp": [
            18.8571428571
        ],
        "raw annual precipitation": [
            1932.7142857143
        ],
        "raw clpk 1 1000 g clay": [
            23678.5714285714
        ],
        "raw erosional": [
            100
        ],
        "raw highest period moisture index": [
            1
        ],
        "raw highest period radiation": [
            24.1428571429
        ],
        "raw hydraulic conductivity ksat": [
            242.8571428571
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            11
        ],
        "raw max temp warmest period": [
            27.4285714286
        ],
        "raw mean diurnal range": [
            9
        ],
        "raw mean moisture index coldest quarter": [
            0.4285714286
        ],
        "raw mean moisture index highest quarter MI": [
            1
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            14.5714285714
        ],
        "raw mean temp driest quater": [
            16
        ],
        "raw mean temp warmer quarter": [
            22.5714285714
        ],
        "raw mean temp wettest quarter": [
            22.1428571429
        ],
        "raw min temp coldest period": [
            9.2857142857
        ],
        "raw moisture index seasonality": [
            23.5714285714
        ],
        "raw precipitation coldets quarter": [
            226.2857142857
        ],
        "raw precipitation driest period": [
            8.4285714286
        ],
        "raw precipitation driest quarter": [
            171.4285714286
        ],
        "raw precipitation seasonality": [
            64.8571428571
        ],
        "raw precipitation warmest quarter": [
            833.5714285714
        ],
        "raw precipitation wettest period": [
            89
        ],
        "raw precipitation wettest quarter": [
            1003.5714285714
        ],
        "raw radiation coldest quarter": [
            13.1428571429
        ],
        "raw radiation driest quarter": [
            16.4285714286
        ],
        "raw radiation seasonality": [
            22.8571428571
        ],
        "raw radiation warmest quarter": [
            20.2857142857
        ],
        "raw radiation wettest quarter": [
            17.8571428571
        ],
        "raw relief": [
            182.5714285714
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            4
        ],
        "raw rockgrainsz": [
            4.8571428571
        ],
        "raw rockhardness": [
            5.1428571429
        ],
        "raw rocknutrnt": [
            3.7142857143
        ],
        "raw roughness": [
            29.7142857143
        ],
        "raw sapk 1 1000 g sand": [
            54535.7142857143
        ],
        "raw slope": [
            10.1428571429
        ],
        "raw soildepth": [
            1
        ],
        "raw solpawhc": [
            188.7142857143
        ],
        "raw temperature annual range": [
            18
        ],
        "raw temperature seasonality": [
            0.4285714286
        ],
        "raw thpk 1 1000 g thickness": [
            253.4285714286
        ],
        "raw twi": [
            4.8571428571
        ],
        "raw valleybottom": [
            0
        ]
    },
    "Megaceros gracilis": {
        "modelled annual mean moisture index": [
            0.8419692351
        ],
        "modelled annual mean rad": [
            15.4089230904
        ],
        "modelled annual mean temp": [
            11.7830769011
        ],
        "modelled annual precipitation": [
            1282.2246153846
        ],
        "modelled clpk 1 1000 g clay": [
            21682.3076923077
        ],
        "modelled erosional": [
            98.4807692308
        ],
        "modelled highest period moisture index": [
            0.9973846157
        ],
        "modelled highest period radiation": [
            24.0646153729
        ],
        "modelled hydraulic conductivity ksat": [
            180.3692307692
        ],
        "modelled isothermality": [
            0.4703076909
        ],
        "modelled lowest period moisture index": [
            0.48273846
        ],
        "modelled lowest period radiation": [
            7.0495384554
        ],
        "modelled max temp warmest period": [
            23.5836921927
        ],
        "modelled mean diurnal range": [
            10.2701538335
        ],
        "modelled mean moisture index coldest quarter": [
            0.9867076942
        ],
        "modelled mean moisture index highest quarter MI": [
            0.9953846163
        ],
        "modelled mean moisture index lowest quater MI": [
            0.5702769235
        ],
        "modelled mean moisture index warmest quarter": [
            0.6286461528
        ],
        "modelled mean temp coldest quarter": [
            6.664307713
        ],
        "modelled mean temp driest quater": [
            12.2307692
        ],
        "modelled mean temp warmer quarter": [
            16.8929231204
        ],
        "modelled mean temp wettest quarter": [
            11.9966153483
        ],
        "modelled min temp coldest period": [
            1.7335384761
        ],
        "modelled moisture index seasonality": [
            22.3753846154
        ],
        "modelled phos": [
            0.0354398355
        ],
        "modelled precipitation coldets quarter": [
            316.5815384615
        ],
        "modelled precipitation driest period": [
            13.1261538462
        ],
        "modelled precipitation driest quarter": [
            212.48
        ],
        "modelled precipitation seasonality": [
            25.9846153846
        ],
        "modelled precipitation warmest quarter": [
            333.4307692308
        ],
        "modelled precipitation wettest period": [
            39.5076923077
        ],
        "modelled precipitation wettest quarter": [
            446.7507692308
        ],
        "modelled radiation coldest quarter": [
            8.8353845684
        ],
        "modelled radiation driest quarter": [
            17.0212307989
        ],
        "modelled radiation seasonality": [
            39.0307692308
        ],
        "modelled radiation warmest quarter": [
            21.3784615619
        ],
        "modelled radiation wettest quarter": [
            14.3270768371
        ],
        "modelled relief": [
            156.8749819389
        ],
        "modelled ridgetopflat": [
            0.2884615385
        ],
        "modelled rockalklty": [
            4.6646153846
        ],
        "modelled rockgrainsz": [
            4.6615384615
        ],
        "modelled rockhardness": [
            5.8615384615
        ],
        "modelled rocknutrnt": [
            4.5569230769
        ],
        "modelled roughness": [
            9.5328148233
        ],
        "modelled sapk 1 1000 g sand": [
            58780.7692307692
        ],
        "modelled slope": [
            9.5631930516
        ],
        "modelled soildepth": [
            1.0756923059
        ],
        "modelled solpawhc": [
            151.4553846154
        ],
        "modelled temperature annual range": [
            21.8473846553
        ],
        "modelled temperature seasonality": [
            1.4144307659
        ],
        "modelled thpk 1 1000 g thickness": [
            278.2092307692
        ],
        "modelled twi": [
            4.8256355231
        ],
        "modelled valleybottom": [
            0.4807692308
        ],
        "modelled whpk 1 1000 g water cap": [
            45223.0769230769
        ],
        "raw annual mean moisture index": [
            0.0083333333
        ],
        "raw annual mean rad": [
            15
        ],
        "raw annual mean temp": [
            11.5
        ],
        "raw annual precipitation": [
            1295.7833333333
        ],
        "raw clpk 1 1000 g clay": [
            22614.5833333333
        ],
        "raw erosional": [
            98.5166666667
        ],
        "raw highest period moisture index": [
            0.9583333333
        ],
        "raw highest period radiation": [
            23.625
        ],
        "raw hydraulic conductivity ksat": [
            181.4166666667
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            6.7916666667
        ],
        "raw max temp warmest period": [
            23.2833333333
        ],
        "raw mean diurnal range": [
            9.8083333333
        ],
        "raw mean moisture index coldest quarter": [
            0.6333333333
        ],
        "raw mean moisture index highest quarter MI": [
            0.8583333333
        ],
        "raw mean moisture index lowest quater MI": [
            0.0083333333
        ],
        "raw mean moisture index warmest quarter": [
            0.0083333333
        ],
        "raw mean temp coldest quarter": [
            6.4
        ],
        "raw mean temp driest quater": [
            11.8333333333
        ],
        "raw mean temp warmer quarter": [
            16.6
        ],
        "raw mean temp wettest quarter": [
            11.9
        ],
        "raw min temp coldest period": [
            1.75
        ],
        "raw moisture index seasonality": [
            22.375
        ],
        "raw precipitation coldets quarter": [
            312.6666666667
        ],
        "raw precipitation driest period": [
            13.0083333333
        ],
        "raw precipitation driest quarter": [
            212.0583333333
        ],
        "raw precipitation seasonality": [
            26.6833333333
        ],
        "raw precipitation warmest quarter": [
            347.1833333333
        ],
        "raw precipitation wettest period": [
            40.8166666667
        ],
        "raw precipitation wettest quarter": [
            460.0583333333
        ],
        "raw radiation coldest quarter": [
            8.4333333333
        ],
        "raw radiation driest quarter": [
            16.5416666667
        ],
        "raw radiation seasonality": [
            38.6916666667
        ],
        "raw radiation warmest quarter": [
            20.8916666667
        ],
        "raw radiation wettest quarter": [
            13.8916666667
        ],
        "raw relief": [
            157
        ],
        "raw ridgetopflat": [
            0.1
        ],
        "raw rockalklty": [
            4.4083333333
        ],
        "raw rockgrainsz": [
            4.6083333333
        ],
        "raw rockhardness": [
            5.8
        ],
        "raw rocknutrnt": [
            4.35
        ],
        "raw roughness": [
            9.5166666667
        ],
        "raw sapk 1 1000 g sand": [
            57129.1666666667
        ],
        "raw slope": [
            9.1583333333
        ],
        "raw soildepth": [
            0.6083333333
        ],
        "raw solpawhc": [
            151.35
        ],
        "raw temperature annual range": [
            21.4333333333
        ],
        "raw temperature seasonality": [
            0.9416666667
        ],
        "raw thpk 1 1000 g thickness": [
            279.0416666667
        ],
        "raw twi": [
            4.5416666667
        ],
        "raw valleybottom": [
            0.6083333333
        ]
    },
    "Megaceros pellucidus": {
        "modelled annual mean moisture index": [
            0.9756666799
        ],
        "modelled annual mean rad": [
            12.0000000954
        ],
        "modelled annual mean temp": [
            8.4266665936
        ],
        "modelled annual precipitation": [
            1407.3333333333
        ],
        "modelled clpk 1 1000 g clay": [
            24058.3333333333
        ],
        "modelled erosional": [
            99.1666666667
        ],
        "modelled highest period moisture index": [
            1
        ],
        "modelled highest period radiation": [
            20.980000178
        ],
        "modelled hydraulic conductivity ksat": [
            166.6666666667
        ],
        "modelled isothermality": [
            0.4939999938
        ],
        "modelled lowest period moisture index": [
            0.8756666621
        ],
        "modelled lowest period radiation": [
            3.9166666349
        ],
        "modelled max temp warmest period": [
            18.3566667557
        ],
        "modelled mean diurnal range": [
            8.6166667461
        ],
        "modelled mean moisture index coldest quarter": [
            1
        ],
        "modelled mean moisture index highest quarter MI": [
            1
        ],
        "modelled mean moisture index lowest quater MI": [
            0.9139999986
        ],
        "modelled mean moisture index warmest quarter": [
            0.9393333415
        ],
        "modelled mean temp coldest quarter": [
            4.6199999571
        ],
        "modelled mean temp driest quater": [
            12.2033334096
        ],
        "modelled mean temp warmer quarter": [
            12.313333416
        ],
        "modelled mean temp wettest quarter": [
            6.9966665745
        ],
        "modelled min temp coldest period": [
            1.009999985
        ],
        "modelled moisture index seasonality": [
            4.4
        ],
        "modelled phos": [
            0.0296393858
        ],
        "modelled precipitation coldets quarter": [
            405
        ],
        "modelled precipitation driest period": [
            18.4333333333
        ],
        "modelled precipitation driest quarter": [
            267.1666666667
        ],
        "modelled precipitation seasonality": [
            17.3666666667
        ],
        "modelled precipitation warmest quarter": [
            272.2
        ],
        "modelled precipitation wettest period": [
            36.7
        ],
        "modelled precipitation wettest quarter": [
            425.8333333333
        ],
        "modelled radiation coldest quarter": [
            5.6500000318
        ],
        "modelled radiation driest quarter": [
            17.3266669591
        ],
        "modelled radiation seasonality": [
            50.7666666667
        ],
        "modelled radiation warmest quarter": [
            18.4133333206
        ],
        "modelled radiation wettest quarter": [
            11.630000035
        ],
        "modelled relief": [
            187.601335907
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            5.8
        ],
        "modelled rockgrainsz": [
            5.0333333333
        ],
        "modelled rockhardness": [
            5.7666666667
        ],
        "modelled rocknutrnt": [
            5.7666666667
        ],
        "modelled roughness": [
            11.1428800742
        ],
        "modelled sapk 1 1000 g sand": [
            54641.6666666666
        ],
        "modelled slope": [
            12.2245521386
        ],
        "modelled soildepth": [
            1.0466666738
        ],
        "modelled solpawhc": [
            160.1666666667
        ],
        "modelled temperature annual range": [
            17.3433331172
        ],
        "modelled temperature seasonality": [
            1.0673333148
        ],
        "modelled thpk 1 1000 g thickness": [
            322.6333333333
        ],
        "modelled twi": [
            5.1204978943
        ],
        "modelled valleybottom": [
            0.8333333333
        ],
        "modelled whpk 1 1000 g water cap": [
            53558.3333333333
        ],
        "raw annual mean moisture index": [
            0.0909090909
        ],
        "raw annual mean rad": [
            11.7272727273
        ],
        "raw annual mean temp": [
            7.9090909091
        ],
        "raw annual precipitation": [
            1400
        ],
        "raw clpk 1 1000 g clay": [
            25386.3636363636
        ],
        "raw erosional": [
            99.3636363636
        ],
        "raw highest period moisture index": [
            1
        ],
        "raw highest period radiation": [
            20.8181818182
        ],
        "raw hydraulic conductivity ksat": [
            172.7272727273
        ],
        "raw lowest period moisture index": [
            0.0909090909
        ],
        "raw lowest period radiation": [
            3.8181818182
        ],
        "raw max temp warmest period": [
            18.0909090909
        ],
        "raw mean diurnal range": [
            8.2727272727
        ],
        "raw mean moisture index coldest quarter": [
            1
        ],
        "raw mean moisture index highest quarter MI": [
            1
        ],
        "raw mean moisture index lowest quater MI": [
            0.0909090909
        ],
        "raw mean moisture index warmest quarter": [
            0.0909090909
        ],
        "raw mean temp coldest quarter": [
            4.2727272727
        ],
        "raw mean temp driest quater": [
            11.9090909091
        ],
        "raw mean temp warmer quarter": [
            11.9090909091
        ],
        "raw mean temp wettest quarter": [
            6.2727272727
        ],
        "raw min temp coldest period": [
            0.6363636364
        ],
        "raw moisture index seasonality": [
            4.5454545455
        ],
        "raw precipitation coldets quarter": [
            404.1818181818
        ],
        "raw precipitation driest period": [
            18
        ],
        "raw precipitation driest quarter": [
            264.1818181818
        ],
        "raw precipitation seasonality": [
            17.6363636364
        ],
        "raw precipitation warmest quarter": [
            269
        ],
        "raw precipitation wettest period": [
            36.3636363636
        ],
        "raw precipitation wettest quarter": [
            423.1818181818
        ],
        "raw radiation coldest quarter": [
            5.0909090909
        ],
        "raw radiation driest quarter": [
            17.1818181818
        ],
        "raw radiation seasonality": [
            50.5454545455
        ],
        "raw radiation warmest quarter": [
            18.0909090909
        ],
        "raw radiation wettest quarter": [
            11
        ],
        "raw relief": [
            214.8181818182
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            5.8181818182
        ],
        "raw rockgrainsz": [
            4.9090909091
        ],
        "raw rockhardness": [
            5.8181818182
        ],
        "raw rocknutrnt": [
            5.8181818182
        ],
        "raw roughness": [
            11.5454545455
        ],
        "raw sapk 1 1000 g sand": [
            52431.8181818182
        ],
        "raw slope": [
            13
        ],
        "raw soildepth": [
            0.7272727273
        ],
        "raw solpawhc": [
            167.5454545455
        ],
        "raw temperature annual range": [
            16.9090909091
        ],
        "raw temperature seasonality": [
            0.8181818182
        ],
        "raw thpk 1 1000 g thickness": [
            308.6363636364
        ],
        "raw twi": [
            4.3636363636
        ],
        "raw valleybottom": [
            0.5454545455
        ]
    },
    "Notothylas javanicus": {
        "modelled annual mean moisture index": [
            0.2800000012
        ],
        "modelled annual mean rad": [
            22.1500005722
        ],
        "modelled annual mean temp": [
            26.4499998093
        ],
        "modelled annual precipitation": [
            732
        ],
        "modelled clpk 1 1000 g clay": [
            41500
        ],
        "modelled erosional": [
            100
        ],
        "modelled highest period moisture index": [
            0.9199999869
        ],
        "modelled highest period radiation": [
            26.8000001907
        ],
        "modelled hydraulic conductivity ksat": [
            65
        ],
        "modelled isothermality": [
            0.5400000215
        ],
        "modelled lowest period moisture index": [
            0.0049999999
        ],
        "modelled lowest period radiation": [
            17
        ],
        "modelled max temp warmest period": [
            38.5
        ],
        "modelled mean diurnal range": [
            14.9500002861
        ],
        "modelled mean moisture index coldest quarter": [
            0.0299999993
        ],
        "modelled mean moisture index highest quarter MI": [
            0.8199999928
        ],
        "modelled mean moisture index lowest quater MI": [
            0.0099999998
        ],
        "modelled mean moisture index warmest quarter": [
            0.2599999979
        ],
        "modelled mean temp coldest quarter": [
            21
        ],
        "modelled mean temp driest quater": [
            23.25
        ],
        "modelled mean temp warmer quarter": [
            30.5
        ],
        "modelled mean temp wettest quarter": [
            29.3500003815
        ],
        "modelled min temp coldest period": [
            10.7999997139
        ],
        "modelled moisture index seasonality": [
            120
        ],
        "modelled phos": [
            0.0149999997
        ],
        "modelled precipitation coldets quarter": [
            14
        ],
        "modelled precipitation driest period": [
            0
        ],
        "modelled precipitation driest quarter": [
            0
        ],
        "modelled precipitation seasonality": [
            126
        ],
        "modelled precipitation warmest quarter": [
            239.5
        ],
        "modelled precipitation wettest period": [
            52
        ],
        "modelled precipitation wettest quarter": [
            546
        ],
        "modelled radiation coldest quarter": [
            18.8500003815
        ],
        "modelled radiation driest quarter": [
            21.9499998093
        ],
        "modelled radiation seasonality": [
            13.5
        ],
        "modelled radiation warmest quarter": [
            25.25
        ],
        "modelled radiation wettest quarter": [
            22.4000005722
        ],
        "modelled relief": [
            98.6766052246
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            5.5
        ],
        "modelled rockgrainsz": [
            4.5
        ],
        "modelled rockhardness": [
            4.5
        ],
        "modelled rocknutrnt": [
            5
        ],
        "modelled roughness": [
            17.0805878639
        ],
        "modelled sapk 1 1000 g sand": [
            37000
        ],
        "modelled slope": [
            5.9404842854
        ],
        "modelled soildepth": [
            1.0000000298
        ],
        "modelled solpawhc": [
            117.5
        ],
        "modelled temperature annual range": [
            27.75
        ],
        "modelled temperature seasonality": [
            1.2549999952
        ],
        "modelled thpk 1 1000 g thickness": [
            150
        ],
        "modelled twi": [
            8.5943181515
        ],
        "modelled valleybottom": [
            0
        ],
        "modelled whpk 1 1000 g water cap": [
            20500
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            22
        ],
        "raw annual mean temp": [
            26
        ],
        "raw annual precipitation": [
            732
        ],
        "raw clpk 1 1000 g clay": [
            41500
        ],
        "raw erosional": [
            100
        ],
        "raw highest period moisture index": [
            0
        ],
        "raw highest period radiation": [
            26
        ],
        "raw hydraulic conductivity ksat": [
            65
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            16.5
        ],
        "raw max temp warmest period": [
            38
        ],
        "raw mean diurnal range": [
            14.5
        ],
        "raw mean moisture index coldest quarter": [
            0
        ],
        "raw mean moisture index highest quarter MI": [
            0
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            20.5
        ],
        "raw mean temp driest quater": [
            22.5
        ],
        "raw mean temp warmer quarter": [
            30
        ],
        "raw mean temp wettest quarter": [
            29
        ],
        "raw min temp coldest period": [
            10.5
        ],
        "raw moisture index seasonality": [
            120
        ],
        "raw precipitation coldets quarter": [
            14
        ],
        "raw precipitation driest period": [
            0
        ],
        "raw precipitation driest quarter": [
            0
        ],
        "raw precipitation seasonality": [
            126
        ],
        "raw precipitation warmest quarter": [
            239.5
        ],
        "raw precipitation wettest period": [
            52
        ],
        "raw precipitation wettest quarter": [
            546
        ],
        "raw radiation coldest quarter": [
            18.5
        ],
        "raw radiation driest quarter": [
            21.5
        ],
        "raw radiation seasonality": [
            13.5
        ],
        "raw radiation warmest quarter": [
            25
        ],
        "raw radiation wettest quarter": [
            22
        ],
        "raw relief": [
            98
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            5.5
        ],
        "raw rockgrainsz": [
            4.5
        ],
        "raw rockhardness": [
            4.5
        ],
        "raw rocknutrnt": [
            5
        ],
        "raw roughness": [
            16.5
        ],
        "raw sapk 1 1000 g sand": [
            37000
        ],
        "raw slope": [
            5.5
        ],
        "raw soildepth": [
            0.5
        ],
        "raw solpawhc": [
            117.5
        ],
        "raw temperature annual range": [
            27
        ],
        "raw temperature seasonality": [
            1
        ],
        "raw thpk 1 1000 g thickness": [
            150
        ],
        "raw twi": [
            8
        ],
        "raw valleybottom": [
            0
        ]
    },
    "Phaeoceros carolinianus": {
        "modelled annual mean moisture index": [
            0.7365444446
        ],
        "modelled annual mean rad": [
            17.1275078493
        ],
        "modelled annual mean temp": [
            16.1311112493
        ],
        "modelled annual precipitation": [
            1255.8687301587
        ],
        "modelled clpk 1 1000 g clay": [
            21822.0634920634
        ],
        "modelled erosional": [
            91.9027777778
        ],
        "modelled highest period moisture index": [
            0.9502539679
        ],
        "modelled highest period radiation": [
            24.715031606
        ],
        "modelled hydraulic conductivity ksat": [
            152.3
        ],
        "modelled isothermality": [
            0.4938333283
        ],
        "modelled lowest period moisture index": [
            0.3612952372
        ],
        "modelled lowest period radiation": [
            9.6579523886
        ],
        "modelled max temp warmest period": [
            27.2970475527
        ],
        "modelled mean diurnal range": [
            10.9151110977
        ],
        "modelled mean moisture index coldest quarter": [
            0.8659396845
        ],
        "modelled mean moisture index highest quarter MI": [
            0.9381000012
        ],
        "modelled mean moisture index lowest quater MI": [
            0.4386444416
        ],
        "modelled mean moisture index warmest quarter": [
            0.5990571438
        ],
        "modelled mean temp coldest quarter": [
            11.0153809807
        ],
        "modelled mean temp driest quater": [
            14.1643810366
        ],
        "modelled mean temp warmer quarter": [
            21.0059206676
        ],
        "modelled mean temp wettest quarter": [
            18.1127459956
        ],
        "modelled min temp coldest period": [
            5.1418412599
        ],
        "modelled moisture index seasonality": [
            31.663015873
        ],
        "modelled phos": [
            0.0397253511
        ],
        "modelled precipitation coldets quarter": [
            243.0065079365
        ],
        "modelled precipitation driest period": [
            7.4119047619
        ],
        "modelled precipitation driest quarter": [
            158.4253968254
        ],
        "modelled precipitation seasonality": [
            45.0196825397
        ],
        "modelled precipitation warmest quarter": [
            418.6682539683
        ],
        "modelled precipitation wettest period": [
            49.3933333333
        ],
        "modelled precipitation wettest quarter": [
            535.4804761905
        ],
        "modelled radiation coldest quarter": [
            11.5418730642
        ],
        "modelled radiation driest quarter": [
            16.7123016274
        ],
        "modelled radiation seasonality": [
            30.5920634921
        ],
        "modelled radiation warmest quarter": [
            21.9849682202
        ],
        "modelled radiation wettest quarter": [
            17.2387459149
        ],
        "modelled relief": [
            97.2765801426
        ],
        "modelled ridgetopflat": [
            0.6339285714
        ],
        "modelled rockalklty": [
            4.7514285714
        ],
        "modelled rockgrainsz": [
            4.3793650794
        ],
        "modelled rockhardness": [
            5.7
        ],
        "modelled rocknutrnt": [
            4.7347619048
        ],
        "modelled roughness": [
            13.9966933051
        ],
        "modelled sapk 1 1000 g sand": [
            61094.5238095238
        ],
        "modelled slope": [
            6.4187526792
        ],
        "modelled soildepth": [
            0.9957460357
        ],
        "modelled solpawhc": [
            125.65
        ],
        "modelled temperature annual range": [
            22.1440794706
        ],
        "modelled temperature seasonality": [
            1.3577285743
        ],
        "modelled thpk 1 1000 g thickness": [
            276.8314285714
        ],
        "modelled twi": [
            6.0713178382
        ],
        "modelled valleybottom": [
            5.5426587302
        ],
        "modelled whpk 1 1000 g water cap": [
            41211.3919047619
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            16.0625
        ],
        "raw annual mean temp": [
            15.203125
        ],
        "raw annual precipitation": [
            1208.296875
        ],
        "raw clpk 1 1000 g clay": [
            20792.96875
        ],
        "raw erosional": [
            90.5625
        ],
        "raw highest period moisture index": [
            0.703125
        ],
        "raw highest period radiation": [
            23.421875
        ],
        "raw hydraulic conductivity ksat": [
            141.09375
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            8.8125
        ],
        "raw max temp warmest period": [
            25.828125
        ],
        "raw mean diurnal range": [
            10.046875
        ],
        "raw mean moisture index coldest quarter": [
            0.40625
        ],
        "raw mean moisture index highest quarter MI": [
            0.640625
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0.015625
        ],
        "raw mean temp coldest quarter": [
            10.265625
        ],
        "raw mean temp driest quater": [
            13.1875
        ],
        "raw mean temp warmer quarter": [
            19.796875
        ],
        "raw mean temp wettest quarter": [
            16.9375
        ],
        "raw min temp coldest period": [
            4.53125
        ],
        "raw moisture index seasonality": [
            29.625
        ],
        "raw precipitation coldets quarter": [
            232.109375
        ],
        "raw precipitation driest period": [
            7.28125
        ],
        "raw precipitation driest quarter": [
            157.328125
        ],
        "raw precipitation seasonality": [
            42.140625
        ],
        "raw precipitation warmest quarter": [
            401.015625
        ],
        "raw precipitation wettest period": [
            45.546875
        ],
        "raw precipitation wettest quarter": [
            506.40625
        ],
        "raw radiation coldest quarter": [
            10.625
        ],
        "raw radiation driest quarter": [
            15.6875
        ],
        "raw radiation seasonality": [
            29.78125
        ],
        "raw radiation warmest quarter": [
            20.71875
        ],
        "raw radiation wettest quarter": [
            16.421875
        ],
        "raw relief": [
            100.15625
        ],
        "raw ridgetopflat": [
            0.484375
        ],
        "raw rockalklty": [
            4.109375
        ],
        "raw rockgrainsz": [
            3.84375
        ],
        "raw rockhardness": [
            5.1875
        ],
        "raw rocknutrnt": [
            4
        ],
        "raw roughness": [
            13.9375
        ],
        "raw sapk 1 1000 g sand": [
            57734.375
        ],
        "raw slope": [
            6.078125
        ],
        "raw soildepth": [
            0.5
        ],
        "raw solpawhc": [
            116.21875
        ],
        "raw temperature annual range": [
            21.03125
        ],
        "raw temperature seasonality": [
            0.90625
        ],
        "raw thpk 1 1000 g thickness": [
            267.40625
        ],
        "raw twi": [
            5.46875
        ],
        "raw valleybottom": [
            4.953125
        ]
    },
    "Phaeoceros inflatus": {
        "modelled annual mean moisture index": [
            0.7523631571
        ],
        "modelled annual mean rad": [
            15.7872632313
        ],
        "modelled annual mean temp": [
            14.148368388
        ],
        "modelled annual precipitation": [
            1072.0410526316
        ],
        "modelled clpk 1 1000 g clay": [
            20124.6052631579
        ],
        "modelled erosional": [
            85.6052631579
        ],
        "modelled highest period moisture index": [
            0.9810842105
        ],
        "modelled highest period radiation": [
            24.9694211327
        ],
        "modelled hydraulic conductivity ksat": [
            130.0578947368
        ],
        "modelled isothermality": [
            0.4845000008
        ],
        "modelled lowest period moisture index": [
            0.323263157
        ],
        "modelled lowest period radiation": [
            7.2001579207
        ],
        "modelled max temp warmest period": [
            25.3658948326
        ],
        "modelled mean diurnal range": [
            10.2003158394
        ],
        "modelled mean moisture index coldest quarter": [
            0.9645894769
        ],
        "modelled mean moisture index highest quarter MI": [
            0.9754421075
        ],
        "modelled mean moisture index lowest quater MI": [
            0.4105263146
        ],
        "modelled mean moisture index warmest quarter": [
            0.4492105245
        ],
        "modelled mean temp coldest quarter": [
            9.284631582
        ],
        "modelled mean temp driest quater": [
            15.7744210745
        ],
        "modelled mean temp warmer quarter": [
            18.8259999486
        ],
        "modelled mean temp wettest quarter": [
            13.4179999638
        ],
        "modelled min temp coldest period": [
            4.3915789415
        ],
        "modelled moisture index seasonality": [
            34.51
        ],
        "modelled phos": [
            0.0319927152
        ],
        "modelled precipitation coldets quarter": [
            293.6242105263
        ],
        "modelled precipitation driest period": [
            7.7615789474
        ],
        "modelled precipitation driest quarter": [
            158.1031578947
        ],
        "modelled precipitation seasonality": [
            32.4805263158
        ],
        "modelled precipitation warmest quarter": [
            240.0526315789
        ],
        "modelled precipitation wettest period": [
            34.3584210526
        ],
        "modelled precipitation wettest quarter": [
            384.7031578947
        ],
        "modelled radiation coldest quarter": [
            9.1081578742
        ],
        "modelled radiation driest quarter": [
            19.6293685346
        ],
        "modelled radiation seasonality": [
            39.0931578947
        ],
        "modelled radiation warmest quarter": [
            22.166210543
        ],
        "modelled radiation wettest quarter": [
            13.3475263033
        ],
        "modelled relief": [
            74.8392543699
        ],
        "modelled ridgetopflat": [
            4.1447368421
        ],
        "modelled rockalklty": [
            4.9478947368
        ],
        "modelled rockgrainsz": [
            4.0494736842
        ],
        "modelled rockhardness": [
            5.6621052632
        ],
        "modelled rocknutrnt": [
            4.4805263158
        ],
        "modelled roughness": [
            17.1395764974
        ],
        "modelled sapk 1 1000 g sand": [
            60505.3947368421
        ],
        "modelled slope": [
            4.8369444082
        ],
        "modelled soildepth": [
            0.9438947287
        ],
        "modelled solpawhc": [
            110.2721052632
        ],
        "modelled temperature annual range": [
            20.8948948519
        ],
        "modelled temperature seasonality": [
            1.3039000004
        ],
        "modelled thpk 1 1000 g thickness": [
            270.7410526316
        ],
        "modelled twi": [
            5.8377228775
        ],
        "modelled valleybottom": [
            11.2171052632
        ],
        "modelled whpk 1 1000 g water cap": [
            38992.5510526315
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            14.5428571429
        ],
        "raw annual mean temp": [
            12.8285714286
        ],
        "raw annual precipitation": [
            1000.6
        ],
        "raw clpk 1 1000 g clay": [
            18821.4285714286
        ],
        "raw erosional": [
            77.6
        ],
        "raw highest period moisture index": [
            0.7714285714
        ],
        "raw highest period radiation": [
            23.1428571429
        ],
        "raw hydraulic conductivity ksat": [
            122.2857142857
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            6.4571428571
        ],
        "raw max temp warmest period": [
            23.5142857143
        ],
        "raw mean diurnal range": [
            9.2
        ],
        "raw mean moisture index coldest quarter": [
            0.4285714286
        ],
        "raw mean moisture index highest quarter MI": [
            0.7428571429
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            8.3714285714
        ],
        "raw mean temp driest quater": [
            14.3428571429
        ],
        "raw mean temp warmer quarter": [
            17.3428571429
        ],
        "raw mean temp wettest quarter": [
            12.3428571429
        ],
        "raw min temp coldest period": [
            3.6
        ],
        "raw moisture index seasonality": [
            32.3428571429
        ],
        "raw precipitation coldets quarter": [
            272.2571428571
        ],
        "raw precipitation driest period": [
            7.2285714286
        ],
        "raw precipitation driest quarter": [
            149.8
        ],
        "raw precipitation seasonality": [
            30.2857142857
        ],
        "raw precipitation warmest quarter": [
            235.7714285714
        ],
        "raw precipitation wettest period": [
            32.0857142857
        ],
        "raw precipitation wettest quarter": [
            363.1714285714
        ],
        "raw radiation coldest quarter": [
            8.2571428571
        ],
        "raw radiation driest quarter": [
            18
        ],
        "raw radiation seasonality": [
            37
        ],
        "raw radiation warmest quarter": [
            20.4285714286
        ],
        "raw radiation wettest quarter": [
            12.1714285714
        ],
        "raw relief": [
            73.2285714286
        ],
        "raw ridgetopflat": [
            4.2571428571
        ],
        "raw rockalklty": [
            4.2
        ],
        "raw rockgrainsz": [
            3.6571428571
        ],
        "raw rockhardness": [
            4.6
        ],
        "raw rocknutrnt": [
            3.8
        ],
        "raw roughness": [
            15.9714285714
        ],
        "raw sapk 1 1000 g sand": [
            55707.1428571429
        ],
        "raw slope": [
            4.4
        ],
        "raw soildepth": [
            0.3142857143
        ],
        "raw solpawhc": [
            99.3714285714
        ],
        "raw temperature annual range": [
            19.4857142857
        ],
        "raw temperature seasonality": [
            0.8857142857
        ],
        "raw thpk 1 1000 g thickness": [
            256.2285714286
        ],
        "raw twi": [
            5.7428571429
        ],
        "raw valleybottom": [
            9.3714285714
        ]
    },
    "Phaeoceros tuberosus": {
        "modelled annual mean moisture index": [
            0.3124999981
        ],
        "modelled annual mean rad": [
            19.4000000954
        ],
        "modelled annual mean temp": [
            17.6749999523
        ],
        "modelled annual precipitation": [
            369.5
        ],
        "modelled clpk 1 1000 g clay": [
            16375
        ],
        "modelled erosional": [
            57.8125
        ],
        "modelled highest period moisture index": [
            0.7574999928
        ],
        "modelled highest period radiation": [
            28.8750004768
        ],
        "modelled hydraulic conductivity ksat": [
            200
        ],
        "modelled isothermality": [
            0.484999992
        ],
        "modelled lowest period moisture index": [
            0.0299999993
        ],
        "modelled lowest period radiation": [
            9.7249999046
        ],
        "modelled max temp warmest period": [
            33.1500005722
        ],
        "modelled mean diurnal range": [
            13.2000000477
        ],
        "modelled mean moisture index coldest quarter": [
            0.7025000006
        ],
        "modelled mean moisture index highest quarter MI": [
            0.7099999934
        ],
        "modelled mean moisture index lowest quater MI": [
            0.044999999
        ],
        "modelled mean moisture index warmest quarter": [
            0.0574999992
        ],
        "modelled mean temp coldest quarter": [
            11.5250000954
        ],
        "modelled mean temp driest quater": [
            21.6499996185
        ],
        "modelled mean temp warmer quarter": [
            24.25
        ],
        "modelled mean temp wettest quarter": [
            12.1749999523
        ],
        "modelled min temp coldest period": [
            5.6000000238
        ],
        "modelled moisture index seasonality": [
            90.25
        ],
        "modelled phos": [
            0.0180416674
        ],
        "modelled precipitation coldets quarter": [
            160.25
        ],
        "modelled precipitation driest period": [
            0
        ],
        "modelled precipitation driest quarter": [
            28.75
        ],
        "modelled precipitation seasonality": [
            59.75
        ],
        "modelled precipitation warmest quarter": [
            48.75
        ],
        "modelled precipitation wettest period": [
            15
        ],
        "modelled precipitation wettest quarter": [
            174.5
        ],
        "modelled radiation coldest quarter": [
            12.2000000477
        ],
        "modelled radiation driest quarter": [
            27.0499997139
        ],
        "modelled radiation seasonality": [
            34.75
        ],
        "modelled radiation warmest quarter": [
            26.0750002861
        ],
        "modelled radiation wettest quarter": [
            11.0250000954
        ],
        "modelled relief": [
            10.535130471
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            5
        ],
        "modelled rockgrainsz": [
            5.5
        ],
        "modelled rockhardness": [
            5.5
        ],
        "modelled rocknutrnt": [
            3.75
        ],
        "modelled roughness": [
            1.172922425
        ],
        "modelled sapk 1 1000 g sand": [
            68250
        ],
        "modelled slope": [
            0.6775645409
        ],
        "modelled soildepth": [
            0.875
        ],
        "modelled solpawhc": [
            120
        ],
        "modelled temperature annual range": [
            27.5250000954
        ],
        "modelled temperature seasonality": [
            1.7350000143
        ],
        "modelled thpk 1 1000 g thickness": [
            277.75
        ],
        "modelled twi": [
            7.6787025928
        ],
        "modelled valleybottom": [
            35.9375
        ],
        "modelled whpk 1 1000 g water cap": [
            23578.75
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            18.6666666667
        ],
        "raw annual mean temp": [
            16.5
        ],
        "raw annual precipitation": [
            378
        ],
        "raw clpk 1 1000 g clay": [
            14916.6666666667
        ],
        "raw erosional": [
            69.5
        ],
        "raw highest period moisture index": [
            0
        ],
        "raw highest period radiation": [
            28.5
        ],
        "raw hydraulic conductivity ksat": [
            233.3333333333
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            9.1666666667
        ],
        "raw max temp warmest period": [
            31.6666666667
        ],
        "raw mean diurnal range": [
            12.5
        ],
        "raw mean moisture index coldest quarter": [
            0
        ],
        "raw mean moisture index highest quarter MI": [
            0
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            10.8333333333
        ],
        "raw mean temp driest quater": [
            21.1666666667
        ],
        "raw mean temp warmer quarter": [
            23
        ],
        "raw mean temp wettest quarter": [
            11.6666666667
        ],
        "raw min temp coldest period": [
            5
        ],
        "raw moisture index seasonality": [
            89.1666666667
        ],
        "raw precipitation coldets quarter": [
            161.6666666667
        ],
        "raw precipitation driest period": [
            0
        ],
        "raw precipitation driest quarter": [
            33.1666666667
        ],
        "raw precipitation seasonality": [
            59
        ],
        "raw precipitation warmest quarter": [
            47.8333333333
        ],
        "raw precipitation wettest period": [
            15
        ],
        "raw precipitation wettest quarter": [
            176.3333333333
        ],
        "raw radiation coldest quarter": [
            11.5
        ],
        "raw radiation driest quarter": [
            26.5
        ],
        "raw radiation seasonality": [
            35.1666666667
        ],
        "raw radiation warmest quarter": [
            25.6666666667
        ],
        "raw radiation wettest quarter": [
            10.3333333333
        ],
        "raw relief": [
            12.3333333333
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            4.1666666667
        ],
        "raw rockgrainsz": [
            5
        ],
        "raw rockhardness": [
            6
        ],
        "raw rocknutrnt": [
            3.8333333333
        ],
        "raw roughness": [
            1
        ],
        "raw sapk 1 1000 g sand": [
            71500
        ],
        "raw slope": [
            0.3333333333
        ],
        "raw soildepth": [
            0.5
        ],
        "raw solpawhc": [
            122.6666666667
        ],
        "raw temperature annual range": [
            26.3333333333
        ],
        "raw temperature seasonality": [
            1.1666666667
        ],
        "raw thpk 1 1000 g thickness": [
            315.8333333333
        ],
        "raw twi": [
            6.6666666667
        ],
        "raw valleybottom": [
            29
        ]
    },
    "Phaeoceros engellii": {
        "modelled annual mean moisture index": [],
        "modelled annual mean rad": [],
        "modelled annual mean temp": [],
        "modelled annual precipitation": [],
        "modelled clpk 1 1000 g clay": [],
        "modelled erosional": [],
        "modelled highest period moisture index": [],
        "modelled highest period radiation": [],
        "modelled hydraulic conductivity ksat": [],
        "modelled isothermality": [],
        "modelled lowest period moisture index": [],
        "modelled lowest period radiation": [],
        "modelled max temp warmest period": [],
        "modelled mean diurnal range": [],
        "modelled mean moisture index coldest quarter": [],
        "modelled mean moisture index highest quarter MI": [],
        "modelled mean moisture index lowest quater MI": [],
        "modelled mean moisture index warmest quarter": [],
        "modelled mean temp coldest quarter": [],
        "modelled mean temp driest quater": [],
        "modelled mean temp warmer quarter": [],
        "modelled mean temp wettest quarter": [],
        "modelled min temp coldest period": [],
        "modelled moisture index seasonality": [],
        "modelled phos": [],
        "modelled precipitation coldets quarter": [],
        "modelled precipitation driest period": [],
        "modelled precipitation driest quarter": [],
        "modelled precipitation seasonality": [],
        "modelled precipitation warmest quarter": [],
        "modelled precipitation wettest period": [],
        "modelled precipitation wettest quarter": [],
        "modelled radiation coldest quarter": [],
        "modelled radiation driest quarter": [],
        "modelled radiation seasonality": [],
        "modelled radiation warmest quarter": [],
        "modelled radiation wettest quarter": [],
        "modelled relief": [],
        "modelled ridgetopflat": [],
        "modelled rockalklty": [],
        "modelled rockgrainsz": [],
        "modelled rockhardness": [],
        "modelled rocknutrnt": [],
        "modelled roughness": [],
        "modelled sapk 1 1000 g sand": [],
        "modelled slope": [],
        "modelled soildepth": [],
        "modelled solpawhc": [],
        "modelled temperature annual range": [],
        "modelled temperature seasonality": [],
        "modelled thpk 1 1000 g thickness": [],
        "modelled twi": [],
        "modelled valleybottom": [],
        "modelled whpk 1 1000 g water cap": [],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            16
        ],
        "raw annual mean temp": [
            13.8333333333
        ],
        "raw annual precipitation": [
            683.8333333333
        ],
        "raw clpk 1 1000 g clay": [
            9833.3333333333
        ],
        "raw erosional": [
            67.1666666667
        ],
        "raw highest period moisture index": [
            0.6666666667
        ],
        "raw highest period radiation": [
            26
        ],
        "raw hydraulic conductivity ksat": [
            266.6666666667
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            6.1666666667
        ],
        "raw max temp warmest period": [
            25.1666666667
        ],
        "raw mean diurnal range": [
            10
        ],
        "raw mean moisture index coldest quarter": [
            0
        ],
        "raw mean moisture index highest quarter MI": [
            0.6666666667
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            9.5
        ],
        "raw mean temp driest quater": [
            18.1666666667
        ],
        "raw mean temp warmer quarter": [
            18.5
        ],
        "raw mean temp wettest quarter": [
            9.6666666667
        ],
        "raw min temp coldest period": [
            5
        ],
        "raw moisture index seasonality": [
            61.3333333333
        ],
        "raw precipitation coldets quarter": [
            267.8333333333
        ],
        "raw precipitation driest period": [
            0
        ],
        "raw precipitation driest quarter": [
            84.1666666667
        ],
        "raw precipitation seasonality": [
            46
        ],
        "raw precipitation warmest quarter": [
            85.6666666667
        ],
        "raw precipitation wettest period": [
            24.5
        ],
        "raw precipitation wettest quarter": [
            272.8333333333
        ],
        "raw radiation coldest quarter": [
            8.3333333333
        ],
        "raw radiation driest quarter": [
            24
        ],
        "raw radiation seasonality": [
            43.6666666667
        ],
        "raw radiation warmest quarter": [
            23.6666666667
        ],
        "raw radiation wettest quarter": [
            7.8333333333
        ],
        "raw relief": [
            29.6666666667
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            4.3333333333
        ],
        "raw rockgrainsz": [
            4.3333333333
        ],
        "raw rockhardness": [
            2.1666666667
        ],
        "raw rocknutrnt": [
            2.1666666667
        ],
        "raw roughness": [
            21.6666666667
        ],
        "raw sapk 1 1000 g sand": [
            81666.6666666667
        ],
        "raw slope": [
            1.5
        ],
        "raw soildepth": [
            0.6666666667
        ],
        "raw solpawhc": [
            124.8333333333
        ],
        "raw temperature annual range": [
            20.1666666667
        ],
        "raw temperature seasonality": [
            1
        ],
        "raw thpk 1 1000 g thickness": [
            597.3333333333
        ],
        "raw twi": [
            8.8333333333
        ],
        "raw valleybottom": [
            6.1666666667
        ]
    },
    "Phaeoceros evanidus": {
        "modelled annual mean moisture index": [
            0.7600000054
        ],
        "modelled annual mean rad": [
            17.4749999046
        ],
        "modelled annual mean temp": [
            17.6499996185
        ],
        "modelled annual precipitation": [
            1174
        ],
        "modelled clpk 1 1000 g clay": [
            36312.5
        ],
        "modelled erosional": [
            75
        ],
        "modelled highest period moisture index": [
            0.962500006
        ],
        "modelled highest period radiation": [
            24.5249996185
        ],
        "modelled hydraulic conductivity ksat": [
            200
        ],
        "modelled isothermality": [
            0.5150000006
        ],
        "modelled lowest period moisture index": [
            0.400000006
        ],
        "modelled lowest period radiation": [
            10.2999997139
        ],
        "modelled max temp warmest period": [
            28.25
        ],
        "modelled mean diurnal range": [
            11.6499998569
        ],
        "modelled mean moisture index coldest quarter": [
            0.9274999946
        ],
        "modelled mean moisture index highest quarter MI": [
            0.9399999976
        ],
        "modelled mean moisture index lowest quater MI": [
            0.4825000018
        ],
        "modelled mean moisture index warmest quarter": [
            0.6875
        ],
        "modelled mean temp coldest quarter": [
            12.5
        ],
        "modelled mean temp driest quater": [
            13.875
        ],
        "modelled mean temp warmer quarter": [
            22.2500004768
        ],
        "modelled mean temp wettest quarter": [
            21.8999996185
        ],
        "modelled min temp coldest period": [
            5.5750000477
        ],
        "modelled moisture index seasonality": [
            25.25
        ],
        "modelled phos": [
            0.0735000009
        ],
        "modelled precipitation coldets quarter": [
            186.5
        ],
        "modelled precipitation driest period": [
            5.75
        ],
        "modelled precipitation driest quarter": [
            144.5
        ],
        "modelled precipitation seasonality": [
            45.5
        ],
        "modelled precipitation warmest quarter": [
            452
        ],
        "modelled precipitation wettest period": [
            45.75
        ],
        "modelled precipitation wettest quarter": [
            509.5
        ],
        "modelled radiation coldest quarter": [
            12.1000001431
        ],
        "modelled radiation driest quarter": [
            15.5250000954
        ],
        "modelled radiation seasonality": [
            27.5
        ],
        "modelled radiation warmest quarter": [
            21.7000002861
        ],
        "modelled radiation wettest quarter": [
            19.7750000954
        ],
        "modelled relief": [
            77.4553109407
        ],
        "modelled ridgetopflat": [
            0
        ],
        "modelled rockalklty": [
            4.75
        ],
        "modelled rockgrainsz": [
            3
        ],
        "modelled rockhardness": [
            4.5
        ],
        "modelled rocknutrnt": [
            4.75
        ],
        "modelled roughness": [
            16.6225522161
        ],
        "modelled sapk 1 1000 g sand": [
            43625
        ],
        "modelled slope": [
            4.8600849956
        ],
        "modelled soildepth": [
            1.1749999821
        ],
        "modelled solpawhc": [
            159.5
        ],
        "modelled temperature annual range": [
            22.6749997139
        ],
        "modelled temperature seasonality": [
            1.3325000107
        ],
        "modelled thpk 1 1000 g thickness": [
            219
        ],
        "modelled twi": [
            10.4112542868
        ],
        "modelled valleybottom": [
            28.125
        ],
        "modelled whpk 1 1000 g water cap": [
            35500
        ],
        "raw annual mean moisture index": [
            0
        ],
        "raw annual mean rad": [
            17.4
        ],
        "raw annual mean temp": [
            17.4
        ],
        "raw annual precipitation": [
            1239.4
        ],
        "raw clpk 1 1000 g clay": [
            37300
        ],
        "raw erosional": [
            90
        ],
        "raw highest period moisture index": [
            0.6
        ],
        "raw highest period radiation": [
            24.2
        ],
        "raw hydraulic conductivity ksat": [
            220
        ],
        "raw lowest period moisture index": [
            0
        ],
        "raw lowest period radiation": [
            10.6
        ],
        "raw max temp warmest period": [
            28
        ],
        "raw mean diurnal range": [
            11
        ],
        "raw mean moisture index coldest quarter": [
            0
        ],
        "raw mean moisture index highest quarter MI": [
            0.6
        ],
        "raw mean moisture index lowest quater MI": [
            0
        ],
        "raw mean moisture index warmest quarter": [
            0
        ],
        "raw mean temp coldest quarter": [
            12.8
        ],
        "raw mean temp driest quater": [
            14.2
        ],
        "raw mean temp warmer quarter": [
            22
        ],
        "raw mean temp wettest quarter": [
            21.6
        ],
        "raw min temp coldest period": [
            5.8
        ],
        "raw moisture index seasonality": [
            26.6
        ],
        "raw precipitation coldets quarter": [
            177.4
        ],
        "raw precipitation driest period": [
            4.6
        ],
        "raw precipitation driest quarter": [
            135.6
        ],
        "raw precipitation seasonality": [
            52.8
        ],
        "raw precipitation warmest quarter": [
            497.4
        ],
        "raw precipitation wettest period": [
            52.4
        ],
        "raw precipitation wettest quarter": [
            579.6
        ],
        "raw radiation coldest quarter": [
            12.2
        ],
        "raw radiation driest quarter": [
            15.8
        ],
        "raw radiation seasonality": [
            25.8
        ],
        "raw radiation warmest quarter": [
            21.2
        ],
        "raw radiation wettest quarter": [
            19.2
        ],
        "raw relief": [
            81.6
        ],
        "raw ridgetopflat": [
            0
        ],
        "raw rockalklty": [
            4.6
        ],
        "raw rockgrainsz": [
            3
        ],
        "raw rockhardness": [
            4.8
        ],
        "raw rocknutrnt": [
            5
        ],
        "raw roughness": [
            15.4
        ],
        "raw sapk 1 1000 g sand": [
            42950
        ],
        "raw slope": [
            4.6
        ],
        "raw soildepth": [
            0.8
        ],
        "raw solpawhc": [
            160.8
        ],
        "raw temperature annual range": [
            21.6
        ],
        "raw temperature seasonality": [
            1
        ],
        "raw thpk 1 1000 g thickness": [
            227.8
        ],
        "raw twi": [
            10.4
        ],
        "raw valleybottom": [
            13.6
        ]
    }
}
        });
        //testcase();
    } 