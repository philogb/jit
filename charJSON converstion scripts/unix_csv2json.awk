# This short awk script takes a WINDOWs formatted csv file and returns a charjson equivalent
# instructions and test case at the end

BEGIN { print "{";
		 # RS = "\r\n";  # uncomment to use in windows <<<<<<< Windows text file format
		}
END {  print "}" }
{	if (NR == 1)   
		{ #remove any quotes -  not all  csv files have them
		  # they will be added later
		    gsub(/\"/,"", $0); 
		   split($0, tags); 
		}
		 
	else { 
		split($0, vals);
		jrec = "\t{";  
		for (fi = 1; fi <= NF; ++fi) 
		{  														#print "%%" tags[i];
		   gsub(/\"/,"", vals[fi]);  		   					# for each column remove quotes
																#printf "    %d <= %d ",    i, NF;
		   if (fi == 1)
				 {  jrec = "\"" vals[fi]"\" "  ": {";   			# first column is species
				 	if (NR > 2)  jrec = ",\n" jrec;    			# prepend a comma between species character lists
				 }
			else 
				{ gsub(/\|\|/,"\|", vals[fi]); 					# remove internal column separators = ||
		          jrec =  jrec "\t\""  tags[fi]   "\"  : "; 
				  nif=split(vals[fi],arr,"\|");					# split column
																# printf "    %d %s",    nif,  tags[i];
				 jrec = jrec "[ ";
				 for (j = 1; j <= nif; ++j)
					{  														#printf " = %d %s\n",  j,  jrec;
					    if  ( arr[j]~/[0-9\.]+/ ) jrec = jrec  arr[j];  	#numeric  
					  	else  jrec = jrec  "\""  arr[j]  "\"" ; 			# string or bool 
					  	if (j<nif) 	jrec = jrec  ", " ;						# add comma between values in column
  					};
			    jrec = jrec "] ";
		      } 
		   if (fi > 1)            								# if not a taxon or species ie 1st column
			{ if (fi < NF) 	jrec = jrec ", " ; 					# then add a comma between character arrays 
			  if (fi == NF ) 	jrec = jrec " }";				# add a closing } for the loast character
		 	};
		print   jrec  ; 										# print
		jrec = ""; 
		}
	} 	
	
}
 
# Instructions and test cases
# 
# The original File must
# 	1. have column names in the first row for EVERY value including the first column
#   2. have species or taxon names in the first column
#
# It can have
#	1. numeric, strings, or boolean values
#   2. multiple character states, each separated by || i.e. two pipe characters
# 
# awk or gnuawk can be used.
# 	* for windows  you will need to install something like gawk from http://gnuwin32.sourceforge.net/packages/gawk.htm
#   * no software is required for macs (OS X) or linux 
#
# to use 
# 
# 1. open a command window or terminal get to the folder/directory in which you wish to work 
# 2. type a command as follows
#	 awk -F "," -f unix_csv2json.awk YOUR_INPUTFILE >> YOURDESIRED_outputfile.json
# 	e.g.
# 	awk -F "," -f unix_csv2json.awk hornwort.csv >> hornwarts.json
#
#
# Example 1
# --------------------------------------
# awk -F "," -f unix_csv2json.awk acacia.txt >> acacia.json
# takes ....
#  
# "scientificName","seed mass","Inflorescence colour","plant height","Phyllode length median","Inflorescence arrangement","Stipule length median","Inflorescence shape"," leaflet pairs 2nd leaf","range size","genome size","Phyllode arrangement","Pulvinus length median","first leaf pinnae pairs","section taxonomy"
# "Acacia diphylla","5.4","unknown","","","unknown","","unknown","1.9","","","unknown","","2.0","unknown"
# Acacia courtii,"","white to cream||pale yellow","20","115","simple","0.25","cylindrical","","2","","scattered","","","juliflorae"
# 
# makes ....
# {
# "Acacia diphylla" : {
# 	"seed mass" : [ 5.4] , 
# 	"Inflorescence colour" : [ "unknown"] , 
# 	"plant height" : [ ] , 
# 	"Phyllode length median" : [ ] , 
# 	"Inflorescence arrangement" : [ "unknown"] , 
# 	"Stipule length median" : [ ] , 
# 	"Inflorescence shape" : [ "unknown"] , 
# 	" leaflet pairs 2nd leaf" : [ 1.9] , 
# 	"range size" : [ ] , 
# 	"genome size" : [ ] , 
# 	"Phyllode arrangement" : [ "unknown"] , 
# 	"Pulvinus length median" : [ ] , 
# 	"first leaf pinnae pairs" : [ 2.0] , 
# 	"section taxonomy" : [ "unknown"]  }
# ,
# "Acacia courtii" : {
# 	"seed mass" : [ ] , 
# 	"Inflorescence colour" : [ "white to cream", "pale yellow"] , 
# 	"plant height" : [ 20] , 
# 	"Phyllode length median" : [ 115] , 
# 	"Inflorescence arrangement" : [ "simple"] , 
# 	"Stipule length median" : [ 0.25] , 
# 	"Inflorescence shape" : [ "cylindrical"] , 
# 	" leaflet pairs 2nd leaf" : [ ] , 
# 	"range size" : [ 2] , 
# 	"genome size" : [ ] , 
# 	"Phyllode arrangement" : [ "scattered"] , 
# 	"Pulvinus length median" : [ ] , 
# 	"first leaf pinnae pairs" : [ ] , 
# 	"section taxonomy" : [ "juliflorae"]  }
# }
#
# Example 2
# --------------------------------------
# awk -F "," -f tab2json.awk hornwort.csv >> hornwarts.json
#
# takes...
#
# taxon,raw max temp warmest period,modelled max temp warmest period,raw precipitation driest  quarter,modelled precipitation driest quarter,raw mean temp driest quater,modelled_mean_temp_driest_quater,raw thpk 1 1000 g thickness,modelled thpk 1 1000 g thickness
# Dendroceros subgenus apoceros,28,28.64999962,252.3333333,247,19,19.40000057,150,150
# Dendroceros_subgenus_dendroceros,27.44444444,28.05257573,169.1666667,167.2409091,15.88888889,16.75318181,272.0555556,301.3257576
# Megaceros_flagellaris,27.42857143,28.58099998,171.4285714,170.66,16,17.44700016,253.4285714,226.16
# Megaceros_gracilis,23.28333333,23.58369219,212.0583333,212.48,11.83333333,12.2307692,279.0416667,278.2092308
# Megaceros_pellucidus,18.09090909,18.35666676,264.1818182,267.1666667,11.90909091,12.20333341,308.6363636,322.6333333
# Anthoceros fragilis,30,30.19999981,55,61,18.75,18.89999962,285.25,295.5
# Anthoceros laminiferus,27,27.79999924,211,211,16,16.10000038,599,599
# Anthoceros_punctatus,30,28.08274507,61,143.051634,18.5,15.41660129,295.5,292.8313725
# Folioceros fuciformis,28.5,29.2249999,157.75,157.75,18.75,19.04999971,195.25,195.25
# Notothylas javanicus,38,38.5,0,0,22.5,23.25,150,150
# Phaeoceros engelii,25.16666667,,84.16666667,,18.16666667,,597.3333333,
# Phaeoceros evanidus,28,28.25,135.6,144.5,14.2,13.875,227.8,219
# Phaeoceros tuberosus,31.66666667,33.15000057,33.16666667,28.75,21.16666667,21.64999962,315.8333333,277.75
# Phaeoceros_carolinianus ,25.828125,27.29704755,157.328125,158.4253968,13.1875,14.16438104,267.40625,276.8314286
# Phaeoceros_inflatus,23.51428571,25.36589483||23,149.8,158.1031579,14.34285714,15.77442107,256.2285714,270.7410526
#
# makes..... 
# 
# {
# "Dendroceros subgenus apoceros" : {
# 	"raw max temp warmest period"  : [ 28] , 
# 	"modelled max temp warmest period"  : [ 28.64999962] , 
# 	"raw precipitation driest  quarter"  : [ 252.3333333] , 
# 	"modelled precipitation driest quarter"  : [ 247] , 
# 	"raw mean temp driest quater"  : [ 19] , 
# 	"modelled_mean_temp_driest_quater"  : [ 19.40000057] , 
# 	"raw thpk 1 1000 g thickness"  : [ 150] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 150]  }
# ,
# "Dendroceros_subgenus_dendroceros" : {
# 	"raw max temp warmest period"  : [ 27.44444444] , 
# 	"modelled max temp warmest period"  : [ 28.05257573] , 
# 	"raw precipitation driest  quarter"  : [ 169.1666667] , 
# 	"modelled precipitation driest quarter"  : [ 167.2409091] , 
# 	"raw mean temp driest quater"  : [ 15.88888889] , 
# 	"modelled_mean_temp_driest_quater"  : [ 16.75318181] , 
# 	"raw thpk 1 1000 g thickness"  : [ 272.0555556] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 301.3257576]  }
# ,
# "Megaceros_flagellaris" : {
# 	"raw max temp warmest period"  : [ 27.42857143] , 
# 	"modelled max temp warmest period"  : [ 28.58099998] , 
# 	"raw precipitation driest  quarter"  : [ 171.4285714] , 
# 	"modelled precipitation driest quarter"  : [ 170.66] , 
# 	"raw mean temp driest quater"  : [ 16] , 
# 	"modelled_mean_temp_driest_quater"  : [ 17.44700016] , 
# 	"raw thpk 1 1000 g thickness"  : [ 253.4285714] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 226.16]  }
# ,
# "Megaceros_gracilis" : {
# 	"raw max temp warmest period"  : [ 23.28333333] , 
# 	"modelled max temp warmest period"  : [ 23.58369219] , 
# 	"raw precipitation driest  quarter"  : [ 212.0583333] , 
# 	"modelled precipitation driest quarter"  : [ 212.48] , 
# 	"raw mean temp driest quater"  : [ 11.83333333] , 
# 	"modelled_mean_temp_driest_quater"  : [ 12.2307692] , 
# 	"raw thpk 1 1000 g thickness"  : [ 279.0416667] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 278.2092308]  }
# ,
# "Megaceros_pellucidus" : {
# 	"raw max temp warmest period"  : [ 18.09090909] , 
# 	"modelled max temp warmest period"  : [ 18.35666676] , 
# 	"raw precipitation driest  quarter"  : [ 264.1818182] , 
# 	"modelled precipitation driest quarter"  : [ 267.1666667] , 
# 	"raw mean temp driest quater"  : [ 11.90909091] , 
# 	"modelled_mean_temp_driest_quater"  : [ 12.20333341] , 
# 	"raw thpk 1 1000 g thickness"  : [ 308.6363636] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 322.6333333]  }
# ,
# "Anthoceros fragilis" : {
# 	"raw max temp warmest period"  : [ 30] , 
# 	"modelled max temp warmest period"  : [ 30.19999981] , 
# 	"raw precipitation driest  quarter"  : [ 55] , 
# 	"modelled precipitation driest quarter"  : [ 61] , 
# 	"raw mean temp driest quater"  : [ 18.75] , 
# 	"modelled_mean_temp_driest_quater"  : [ 18.89999962] , 
# 	"raw thpk 1 1000 g thickness"  : [ 285.25] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 295.5]  }
# ,
# "Anthoceros laminiferus" : {
# 	"raw max temp warmest period"  : [ 27] , 
# 	"modelled max temp warmest period"  : [ 27.79999924] , 
# 	"raw precipitation driest  quarter"  : [ 211] , 
# 	"modelled precipitation driest quarter"  : [ 211] , 
# 	"raw mean temp driest quater"  : [ 16] , 
# 	"modelled_mean_temp_driest_quater"  : [ 16.10000038] , 
# 	"raw thpk 1 1000 g thickness"  : [ 599] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 599]  }
# ,
# "Anthoceros_punctatus" : {
# 	"raw max temp warmest period"  : [ 30] , 
# 	"modelled max temp warmest period"  : [ 28.08274507] , 
# 	"raw precipitation driest  quarter"  : [ 61] , 
# 	"modelled precipitation driest quarter"  : [ 143.051634] , 
# 	"raw mean temp driest quater"  : [ 18.5] , 
# 	"modelled_mean_temp_driest_quater"  : [ 15.41660129] , 
# 	"raw thpk 1 1000 g thickness"  : [ 295.5] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 292.8313725]  }
# ,
# "Folioceros fuciformis" : {
# 	"raw max temp warmest period"  : [ 28.5] , 
# 	"modelled max temp warmest period"  : [ 29.2249999] , 
# 	"raw precipitation driest  quarter"  : [ 157.75] , 
# 	"modelled precipitation driest quarter"  : [ 157.75] , 
# 	"raw mean temp driest quater"  : [ 18.75] , 
# 	"modelled_mean_temp_driest_quater"  : [ 19.04999971] , 
# 	"raw thpk 1 1000 g thickness"  : [ 195.25] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 195.25]  }
# ,
# "Notothylas javanicus" : {
# 	"raw max temp warmest period"  : [ 38] , 
# 	"modelled max temp warmest period"  : [ 38.5] , 
# 	"raw precipitation driest  quarter"  : [ 0] , 
# 	"modelled precipitation driest quarter"  : [ 0] , 
# 	"raw mean temp driest quater"  : [ 22.5] , 
# 	"modelled_mean_temp_driest_quater"  : [ 23.25] , 
# 	"raw thpk 1 1000 g thickness"  : [ 150] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 150]  }
# ,
# "Phaeoceros engelii" : {
# 	"raw max temp warmest period"  : [ 25.16666667] , 
# 	"modelled max temp warmest period"  : [ ] , 
# 	"raw precipitation driest  quarter"  : [ 84.16666667] , 
# 	"modelled precipitation driest quarter"  : [ ] , 
# 	"raw mean temp driest quater"  : [ 18.16666667] , 
# 	"modelled_mean_temp_driest_quater"  : [ ] , 
# 	"raw thpk 1 1000 g thickness"  : [ 597.3333333] , 
# 	"modelled thpk 1 1000 g thickness"  : [ ]  }
# ,
# "Phaeoceros evanidus" : {
# 	"raw max temp warmest period"  : [ 28] , 
# 	"modelled max temp warmest period"  : [ 28.25] , 
# 	"raw precipitation driest  quarter"  : [ 135.6] , 
# 	"modelled precipitation driest quarter"  : [ 144.5] , 
# 	"raw mean temp driest quater"  : [ 14.2] , 
# 	"modelled_mean_temp_driest_quater"  : [ 13.875] , 
# 	"raw thpk 1 1000 g thickness"  : [ 227.8] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 219]  }
# ,
# "Phaeoceros tuberosus" : {
# 	"raw max temp warmest period"  : [ 31.66666667] , 
# 	"modelled max temp warmest period"  : [ 33.15000057] , 
# 	"raw precipitation driest  quarter"  : [ 33.16666667] , 
# 	"modelled precipitation driest quarter"  : [ 28.75] , 
# 	"raw mean temp driest quater"  : [ 21.16666667] , 
# 	"modelled_mean_temp_driest_quater"  : [ 21.64999962] , 
# 	"raw thpk 1 1000 g thickness"  : [ 315.8333333] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 277.75]  }
# ,
# "Phaeoceros_carolinianus " : {
# 	"raw max temp warmest period"  : [ 25.828125] , 
# 	"modelled max temp warmest period"  : [ 27.29704755] , 
# 	"raw precipitation driest  quarter"  : [ 157.328125] , 
# 	"modelled precipitation driest quarter"  : [ 158.4253968] , 
# 	"raw mean temp driest quater"  : [ 13.1875] , 
# 	"modelled_mean_temp_driest_quater"  : [ 14.16438104] , 
# 	"raw thpk 1 1000 g thickness"  : [ 267.40625] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 276.8314286]  }
# ,
# "Phaeoceros_inflatus" : {
# 	"raw max temp warmest period"  : [ 23.51428571] , 
# 	"modelled max temp warmest period"  : [ 25.36589483, 23] , 
# 	"raw precipitation driest  quarter"  : [ 149.8] , 
# 	"modelled precipitation driest quarter"  : [ 158.1031579] , 
# 	"raw mean temp driest quater"  : [ 14.34285714] , 
# 	"modelled_mean_temp_driest_quater"  : [ 15.77442107] , 
# 	"raw thpk 1 1000 g thickness"  : [ 256.2285714] , 
# 	"modelled thpk 1 1000 g thickness"  : [ 270.7410526]  }
# }



