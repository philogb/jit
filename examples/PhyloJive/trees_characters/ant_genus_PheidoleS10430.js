    function init() {

        phylogenyExplorer_init({
	    tree: '(((((((((((((((((((((Pheidole_biconstricta,Pheidole_xanthogaster),Pheidole_dossena),(Pheidole_obscurithorax,Pheidole_jelskii)),Pheidole_indistincta),((((((((((Pheidole_vallicola,(Pheidole_diversipilosa,Pheidole_crassicornis)),(Pheidole_perpilosa,Pheidole_cockerelli)),Pheidole_sciara),(Pheidole_tetra,Pheidole_hyatti)),Pheidole_sciophila),Pheidole_morrisi),((Pheidole_violacea,Pheidole_dentata),(Pheidole_indagatrix,Pheidole_fiorii))),(((Pheidole_desertorum,Pheidole_sitiens),(Pheidole_obtusospinosa_A,Pheidole_obtusospinosa_B)),((Pheidole_vistana,Pheidole_granulata),Pheidole_portalensis))),(Pheidole_sicaria,Pheidole_titanis)),Pheidole_sensitiva)),((Pheidole_laticornis,Pheidole_cocciphaga),Pheidole_astur)),Pheidole_fissiceps),(((Pheidole_tristicula,Pheidole_rhinoceros),(Pheidole_cephalica,Pheidole_absurda)),Pheidole_subarmata)),(((((Pheidole_boruca,Pheidole_prostrata),((((Pheidole_metallescens,Pheidole_constipata),(((Pheidole_bicarinata,Pheidole_vinelandica),Pheidole_littoralis),(Pheidole_adrianoi,Pheidole_davisi))),((((((Pheidole_bobjohnsoni,(Pheidole_ceres,Pheidole_rugulosa)),(Pheidole_californica,(Pheidole_micula,(Pheidole_macrops,Pheidole_yaqui)))),Pheidole_clementensis),Pheidole_hoplitica),(Pheidole_soritis,Pheidole_rufescens)),(Pheidole_tepicana,(Pheidole_polymorpha_A,Pheidole_polymorpha_B)))),Pheidole_harlequina)),Pheidole_sospes),((Pheidole_browni,(Pheidole_umphreyi,Pheidole_boltoni)),(Pheidole_truncula,Pheidole_scrobifera))),(Pheidole_moerens,Pheidole_flavens))),(((Pheidole_caltrop,(((Pheidole_amazonica,Pheidole_nitidicollis),Pheidole_cramptoni),Pheidole_minutula)),Pheidole_erratilis),(Pheidole_mamore,Pheidole_allarmata))),((((((Pheidole_anastasii,(Pheidole_bilimeki,Pheidole_floridana)),Pheidole_clydei),((((((((Pheidole_pacifica_A,Pheidole_coloradensis_B),Pheidole_coloradensis_A),Pheidole_inquilina),Pheidole_pacifica_B),(Pheidole_pilifera,Pheidole_carrolli)),Pheidole_artemisia),(Pheidole_cavigenis,Pheidole_senex)),(Pheidole_spadonia,Pheidole_cerebrosior))),Pheidole_pelor),(((Pheidole_tysoni,Pheidole_juniperae),Pheidole_casta),((Pheidole_tucsonica,Pheidole_xerophila),Pheidole_gilvescens))),((((((((((Pheidole_sp.1Madg,Pheidole_sp.d_Madg),Pheidole_sp.b_Madg),(Pheidole_sp.a_Ghana,Pheidole_sp.c_Ghana)),Pheidole_megacephala_Aust),Pheidole_sp.8_Ivory_Coast),(Pheidole_sp.d_Ghana,Pheidole_sp.5_Ivory_Coast)),Pheidole_sp.b_Ghana),((Pheidole_sp.a_Indonesia,Pheidole_plagiara_Vietnam),Pheidole_sp.a_PNG)),(Pheidole_sp.b_Indonesia,Pheidole_sp._Sumatra)),(((((((((Pheidole_sp._Aust,Pheidole_sexspinosa_Palau),Pheidole_sp.d_PNG),(Pheidole_sp.b_PNG,Pheidole_sp.e_PNG)),Pheidole_sp.c_PNG),Pheidole_oceanica_Palau),Pheidole_variabilis_Aust),Pheidole_ampla_Aust),(Pheidole_sp.a_Madg,Pheidole_sp.c_Madg)),(((Pheidole_quadrensis_Borneo,Pheidole_quadricuspis_Borneo),Pheidole_tandjongensis_Thailand),((Pheidole_comata_Borneo,(Pheidole_dugasi_Thailand,Pheidole_gatesi_Vietnam)),(Pheidole_protea_Thailand,Pheidole_noda_Vietnam))))))),(((Pheidole_striaticeps,Pheidole_furtiva),Pheidole_pallidula_France),Pheidole_laselva)),((Pheidole_diana,Pheidole_innupta),((Pheidole_sagittaria,Pheidole_nitella),(Pheidole_barbata,(Pheidole_militicida,Pheidole_psammophila))))),(Pheidole_rhea_B,Pheidole_rhea_A)),Pheidole_fimbriata),(((Cephalotes_unimaculatus,Cephalotes_sp.),Procryptocerus_batesi),Tranopelta_subterranea)),(Myrmica_incompleta,((Atta_sp.,Trachymyrmex_jamaicensis),Cyphomyrmex_sp.))),((((Oxyopomyrmex_insularis,Goniomma_hispanicum),((Aphaenogaster_senilis,Aphaenogaster_texana),Messor_bouvieri)),Aphaenogaster_sp.),(Messor_julianus,Messor_pergandei))),Ocymyrmex_picardi),Pogonomyrmex_maricopa),((Prenolepis_imparis,Lasius_alienus),Brachymyrmex_sp.));',
	       character: { },
	   tmpl : '<table style="border: none"><tbody><tr><th></th><th>links</th><th> </th><th> </th><th> </th><th> </th></tr><% _.each(nodeList , function( value ) { %> <tr><td><a href="http://bie.ala.org.au/species/<%= value.plus %>" title="<%= value.name %> ALA species page" rel="<%= value.rel %>" class="thumbImage1"><%= value.name %></a></td><td><a href="http://biodiversity.org.au/name/<%= value.plus %>" title="about <%= value.name %> in NSL nomenclator " rel="<%= value.rel %>" class="thumbImage1"><id="thumb1"><div class="forward"></div> </id="thumb1"></a></td><td><a href="http://www.anbg.gov.au/cgi-bin/apiiGenus?genus=<%= value.genus %>&species=<%= value.species %>" title="images of <%= value.name %> in Aust. plant Image Index" rel="<%= value.rel %>" class="thumbImage1"><id="thumb1"><div class="forward"></div> </id="thumb1"></a><td><a href="http://biocache.ala.org.au/ws/density/map?q=<%= value.name %>" title="<%= value.name %> Aus density Map (if sufficient samples)" rel="<%= value.rel %>" class="thumbImage1"><id="thumb1"><div class="forward"></div></id="thumb1"></a></td></td><td><a href="http://eol.org/search/show?q=<%= value.plus %>&amp;type[]=taxon_concept&amp;type[]=image&amp;commit=Filter" title="images of <%= value.name %> in EOL" rel="<%= value.rel %>" class="thumbImage1"><id="thumb1"><div class="forward"></div> </id="thumb1"></a></td></tr> <% }); %></tbody></table></div>',

        	codeBase:'../..',
            width: 800,
            height:1000,        
        	alignName:true,
        	lateralise:false, 
       		levelsToShow:15,
        	branchMultiplier:1,
            presentClade: function (clade) {
              var tmpl = st.config.tmpl,
                nodeList = [],
                node, html, split;
                for (var i = 0; ((i < clade.length) & (i < 30)); i++) {
                  node = {}
                  node.name = clade [ i ].name;
                  node.plus = clade [ i ].name.replace(/\s+/g,'+');
                  split = node.name.split( /\s+/ );
                  if ( split.length > 1 ){
                    node.genus = split [ 0 ];
                    node.species = split [ 1 ];              
                  } else {
                    node.species = split [ 0 ];
                  }
                  node.rel = node.species + '' + i;
                  node.index = i;
                  nodeList.push ( node );            
                }
              if ( tmpl ) {
                tmpl = _.template ( tmpl );
                html = tmpl ( {nodeList: nodeList});
              } else {
                
              }
              return html;

            }//presentClade 

        });
        //testcase();
    } 