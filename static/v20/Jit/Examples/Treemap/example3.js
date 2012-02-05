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


function init(){
  //init data
  var json = {
    "children": [
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "A Perfect Circle", 
               "playcount": "276", 
               "$color": "#8E7032", 
               "image": "http://userserve-ak.last.fm/serve/300x300/11403219.jpg", 
               "$area": 276
             }, 
             "id": "album-Thirteenth Step", 
             "name": "Thirteenth Step"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "A Perfect Circle", 
               "playcount": "271", 
               "$color": "#906E32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/11393921.jpg", 
               "$area": 271
             }, 
             "id": "album-Mer De Noms", 
             "name": "Mer De Noms"
           }
         ], 
         "data": {
           "playcount": 547, 
           "$area": 547
         }, 
         "id": "artist_A Perfect Circle", 
         "name": "A Perfect Circle"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Mad Season", 
               "playcount": "209", 
               "$color": "#AA5532", 
               "image": "http://userserve-ak.last.fm/serve/300x300/32349839.jpg", 
               "$area": 209
             }, 
             "id": "album-Above", 
             "name": "Above"
           }
         ], 
         "data": {
           "playcount": 209, 
           "$area": 209
         }, 
         "id": "artist_Mad Season", 
         "name": "Mad Season"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Stone Temple Pilots", 
               "playcount": "260", 
               "$color": "#956932", 
               "image": "http://userserve-ak.last.fm/serve/300x300/38753425.jpg", 
               "$area": 260
             }, 
             "id": "album-Tiny Music... Songs From the Vatican Gift Shop", 
             "name": "Tiny Music... Songs From the Vatican Gift Shop"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Stone Temple Pilots", 
               "playcount": "254", 
               "$color": "#976732", 
               "image": "http://images.amazon.com/images/P/B000002IU3.01.LZZZZZZZ.jpg", 
               "$area": 254
             }, 
             "id": "album-Core", 
             "name": "Core"
           }
         ], 
         "data": {
           "playcount": 514, 
           "$area": 514
         }, 
         "id": "artist_Stone Temple Pilots", 
         "name": "Stone Temple Pilots"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Bush", 
               "playcount": "181", 
               "$color": "#B54932", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8673371.jpg", 
               "$area": 181
             }, 
             "id": "album-The Science of Things", 
             "name": "The Science of Things"
           }
         ], 
         "data": {
           "playcount": 181, 
           "$area": 181
         }, 
         "id": "artist_Bush", 
         "name": "Bush"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Foo Fighters", 
               "playcount": "229", 
               "$color": "#A15D32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/32579429.jpg", 
               "$area": 229
             }, 
             "id": "album-Echoes, Silence, Patience &amp; Grace", 
             "name": "Echoes, Silence, Patience &amp; Grace"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Foo Fighters", 
               "playcount": "185", 
               "$color": "#B34B32", 
               "image": "http://images.amazon.com/images/P/B0009HLDFU.01.MZZZZZZZ.jpg", 
               "$area": 185
             }, 
             "id": "album-In Your Honor (disc 2)", 
             "name": "In Your Honor (disc 2)"
           }
         ], 
         "data": {
           "playcount": 414, 
           "$area": 414
         }, 
         "id": "artist_Foo Fighters", 
         "name": "Foo Fighters"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Luis Alberto Spinetta", 
               "playcount": "398", 
               "$color": "#5DA132", 
               "image": "http://images.amazon.com/images/P/B00005LNP5.01._SCMZZZZZZZ_.jpg", 
               "$area": 398
             }, 
             "id": "album-Elija Y Gane", 
             "name": "Elija Y Gane"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Luis Alberto Spinetta", 
               "playcount": "203", 
               "$color": "#AC5232", 
               "image": "http://images.amazon.com/images/P/B0000B193V.01._SCMZZZZZZZ_.jpg", 
               "$area": 203
             }, 
             "id": "album-Para los Arboles", 
             "name": "Para los Arboles"
           }
         ], 
         "data": {
           "playcount": 601, 
           "$area": 601
         }, 
         "id": "artist_Luis Alberto Spinetta", 
         "name": "Luis Alberto Spinetta"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Alice in Chains", 
               "playcount": "224", 
               "$color": "#A35B32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/26497553.jpg", 
               "$area": 224
             }, 
             "id": "album-Music Bank", 
             "name": "Music Bank"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Alice in Chains", 
               "playcount": "217", 
               "$color": "#A65832", 
               "image": "http://images.amazon.com/images/P/B0000296JW.01.MZZZZZZZ.jpg", 
               "$area": 217
             }, 
             "id": "album-Music Bank (disc 1)", 
             "name": "Music Bank (disc 1)"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Alice in Chains", 
               "playcount": "215", 
               "$color": "#A75732", 
               "image": "http://images.amazon.com/images/P/B0000296JW.01.MZZZZZZZ.jpg", 
               "$area": 215
             }, 
             "id": "album-Music Bank (disc 2)", 
             "name": "Music Bank (disc 2)"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Alice in Chains", 
               "playcount": "181", 
               "$color": "#B54932", 
               "image": "http://images.amazon.com/images/P/B0000296JW.01.MZZZZZZZ.jpg", 
               "$area": 181
             }, 
             "id": "album-Music Bank (disc 3)", 
             "name": "Music Bank (disc 3)"
           }
         ], 
         "data": {
           "playcount": 837, 
           "$area": 837
         }, 
         "id": "artist_Alice in Chains", 
         "name": "Alice in Chains"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Tool", 
               "playcount": "627", 
               "$color": "#00FF32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8480501.jpg", 
               "$area": 627
             }, 
             "id": "album-10,000 Days", 
             "name": "10,000 Days"
           }
         ], 
         "data": {
           "playcount": 627, 
           "$area": 627
         }, 
         "id": "artist_Tool", 
         "name": "Tool"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Chris Cornell", 
               "playcount": "261", 
               "$color": "#946A32", 
               "image": "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png", 
               "$area": 261
             }, 
             "id": "album-2006-09-07: O-Bar, Stockholm, Sweden", 
             "name": "2006-09-07: O-Bar, Stockholm, Sweden"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Chris Cornell", 
               "playcount": "211", 
               "$color": "#A95532", 
               "image": "http://userserve-ak.last.fm/serve/300x300/25402479.jpg", 
               "$area": 211
             }, 
             "id": "album-Lost and Found", 
             "name": "Lost and Found"
           }
         ], 
         "data": {
           "playcount": 472, 
           "$area": 472
         }, 
         "id": "artist_Chris Cornell", 
         "name": "Chris Cornell"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Disturbed", 
               "playcount": "197", 
               "$color": "#AE5032", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8634627.jpg", 
               "$area": 197
             }, 
             "id": "album-The Sickness", 
             "name": "The Sickness"
           }
         ], 
         "data": {
           "playcount": 197, 
           "$area": 197
         }, 
         "id": "artist_Disturbed", 
         "name": "Disturbed"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Erykah Badu", 
               "playcount": "493", 
               "$color": "#36C832", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8591345.jpg", 
               "$area": 493
             }, 
             "id": "album-Mama's Gun", 
             "name": "Mama's Gun"
           }
         ], 
         "data": {
           "playcount": 493, 
           "$area": 493
         }, 
         "id": "artist_Erykah Badu", 
         "name": "Erykah Badu"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Audioslave", 
               "playcount": "249", 
               "$color": "#996532", 
               "image": "http://userserve-ak.last.fm/serve/300x300/32070871.jpg", 
               "$area": 249
             }, 
             "id": "album-Audioslave", 
             "name": "Audioslave"
           }
         ], 
         "data": {
           "playcount": 249, 
           "$area": 249
         }, 
         "id": "artist_Audioslave", 
         "name": "Audioslave"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Soda Stereo", 
               "playcount": "359", 
               "$color": "#6C9232", 
               "image": "http://userserve-ak.last.fm/serve/300x300/15858421.jpg", 
               "$area": 359
             }, 
             "id": "album-Comfort y M\u00fasica Para Volar", 
             "name": "Comfort y M\u00fasica Para Volar"
           }
         ], 
         "data": {
           "playcount": 359, 
           "$area": 359
         }, 
         "id": "artist_Soda Stereo", 
         "name": "Soda Stereo"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Sinch", 
               "playcount": "302", 
               "$color": "#847A32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8776205.jpg", 
               "$area": 302
             }, 
             "id": "album-Clearing the Channel", 
             "name": "Clearing the Channel"
           }
         ], 
         "data": {
           "playcount": 302, 
           "$area": 302
         }, 
         "id": "artist_Sinch", 
         "name": "Sinch"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Dave Matthews Band", 
               "playcount": "177", 
               "$color": "#B74732", 
               "image": "http://userserve-ak.last.fm/serve/300x300/32457599.jpg", 
               "$area": 177
             }, 
             "id": "album-Crash", 
             "name": "Crash"
           }
         ], 
         "data": {
           "playcount": 177, 
           "$area": 177
         }, 
         "id": "artist_Dave Matthews Band", 
         "name": "Dave Matthews Band"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Pearl Jam", 
               "playcount": "207", 
               "$color": "#AA5432", 
               "image": "http://userserve-ak.last.fm/serve/300x300/30352203.jpg", 
               "$area": 207
             }, 
             "id": "album-Vs.", 
             "name": "Vs."
           }
         ], 
         "data": {
           "playcount": 207, 
           "$area": 207
         }, 
         "id": "artist_Pearl Jam", 
         "name": "Pearl Jam"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Kr\u00f8m", 
               "playcount": "486", 
               "$color": "#39C532", 
               "image": "http://userserve-ak.last.fm/serve/300x300/26053425.jpg", 
               "$area": 486
             }, 
             "id": "album-It All Makes Sense Now", 
             "name": "It All Makes Sense Now"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Agua de Annique", 
               "playcount": "251", 
               "$color": "#986632", 
               "image": "http://userserve-ak.last.fm/serve/300x300/9658733.jpg", 
               "$area": 251
             }, 
             "id": "album-Air", 
             "name": "Air"
           }
         ], 
         "data": {
           "playcount": 737, 
           "$area": 737
         }, 
         "id": "artist_Kr\u00f8m", 
         "name": "Kr\u00f8m"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Temple of the Dog", 
               "playcount": "345", 
               "$color": "#728C32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8605651.jpg", 
               "$area": 345
             }, 
             "id": "album-Temple Of The Dog", 
             "name": "Temple Of The Dog"
           }
         ], 
         "data": {
           "playcount": 345, 
           "$area": 345
         }, 
         "id": "artist_Temple of the Dog", 
         "name": "Temple of the Dog"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Nine Inch Nails", 
               "playcount": "318", 
               "$color": "#7D8132", 
               "image": "http://userserve-ak.last.fm/serve/300x300/29274729.jpg", 
               "$area": 318
             }, 
             "id": "album-And All That Could Have Been (Still)", 
             "name": "And All That Could Have Been (Still)"
           }
         ], 
         "data": {
           "playcount": 318, 
           "$area": 318
         }, 
         "id": "artist_Nine Inch Nails", 
         "name": "Nine Inch Nails"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Tryo", 
               "playcount": "256", 
               "$color": "#966832", 
               "image": "http://userserve-ak.last.fm/serve/300x300/32595059.jpg", 
               "$area": 256
             }, 
             "id": "album-Mamagubida", 
             "name": "Mamagubida"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Tryo", 
               "playcount": "220", 
               "$color": "#A55932", 
               "image": "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png", 
               "$area": 220
             }, 
             "id": "album-Reggae \u00e0 Coup de Cirque", 
             "name": "Reggae \u00e0 Coup de Cirque"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Tryo", 
               "playcount": "181", 
               "$color": "#B54932", 
               "image": "http://userserve-ak.last.fm/serve/300x300/16799743.jpg", 
               "$area": 181
             }, 
             "id": "album-Grain de sable", 
             "name": "Grain de sable"
           }
         ], 
         "data": {
           "playcount": 657, 
           "$area": 657
         }, 
         "id": "artist_Tryo", 
         "name": "Tryo"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Sublime", 
               "playcount": "258", 
               "$color": "#966832", 
               "image": "http://cdn.last.fm/flatness/catalogue/noimage/2/default_album_medium.png", 
               "$area": 258
             }, 
             "id": "album-Best Of", 
             "name": "Best Of"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Sublime", 
               "playcount": "176", 
               "$color": "#B74732", 
               "image": "http://userserve-ak.last.fm/serve/300x300/5264426.jpg", 
               "$area": 176
             }, 
             "id": "album-Robbin' The Hood", 
             "name": "Robbin' The Hood"
           }
         ], 
         "data": {
           "playcount": 434, 
           "$area": 434
         }, 
         "id": "artist_Sublime", 
         "name": "Sublime"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Red Hot Chili Peppers", 
               "playcount": "418", 
               "$color": "#55AA32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8590493.jpg", 
               "$area": 418
             }, 
             "id": "album-One Hot Minute", 
             "name": "One Hot Minute"
           }
         ], 
         "data": {
           "playcount": 418, 
           "$area": 418
         }, 
         "id": "artist_Red Hot Chili Peppers", 
         "name": "Red Hot Chili Peppers"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Guns N' Roses", 
               "playcount": "275", 
               "$color": "#8F6F32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/17597653.jpg", 
               "$area": 275
             }, 
             "id": "album-Chinese Democracy", 
             "name": "Chinese Democracy"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Guns N' Roses", 
               "playcount": "203", 
               "$color": "#AC5232", 
               "image": "http://userserve-ak.last.fm/serve/300x300/15231979.jpg", 
               "$area": 203
             }, 
             "id": "album-Use Your Illusion II", 
             "name": "Use Your Illusion II"
           }
         ], 
         "data": {
           "playcount": 478, 
           "$area": 478
         }, 
         "id": "artist_Guns N' Roses", 
         "name": "Guns N' Roses"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Wax Tailor", 
               "playcount": "208", 
               "$color": "#AA5432", 
               "image": "http://images.amazon.com/images/P/B0007LCNNE.01.MZZZZZZZ.jpg", 
               "$area": 208
             }, 
             "id": "album-Tales of the Forgotten Melodies", 
             "name": "Tales of the Forgotten Melodies"
           }
         ], 
         "data": {
           "playcount": 208, 
           "$area": 208
         }, 
         "id": "artist_Wax Tailor", 
         "name": "Wax Tailor"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Radiohead", 
               "playcount": "208", 
               "$color": "#AA5432", 
               "image": "http://userserve-ak.last.fm/serve/300x300/7862623.png", 
               "$area": 208
             }, 
             "id": "album-In Rainbows", 
             "name": "In Rainbows"
           }
         ], 
         "data": {
           "playcount": 208, 
           "$area": 208
         }, 
         "id": "artist_Radiohead", 
         "name": "Radiohead"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Soundgarden", 
               "playcount": "317", 
               "$color": "#7E8032", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8600371.jpg", 
               "$area": 317
             }, 
             "id": "album-Down On The Upside", 
             "name": "Down On The Upside"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Soundgarden", 
               "playcount": "290", 
               "$color": "#897532", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8590515.jpg", 
               "$area": 290
             }, 
             "id": "album-Superunknown", 
             "name": "Superunknown"
           }
         ], 
         "data": {
           "playcount": 607, 
           "$area": 607
         }, 
         "id": "artist_Soundgarden", 
         "name": "Soundgarden"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Blind Melon", 
               "playcount": "247", 
               "$color": "#9A6432", 
               "image": "http://userserve-ak.last.fm/serve/300x300/15113951.jpg", 
               "$area": 247
             }, 
             "id": "album-Nico", 
             "name": "Nico"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Blind Melon", 
               "playcount": "218", 
               "$color": "#A65832", 
               "image": "http://userserve-ak.last.fm/serve/300x300/45729417.jpg", 
               "$area": 218
             }, 
             "id": "album-Soup", 
             "name": "Soup"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Blind Melon", 
               "playcount": "197", 
               "$color": "#AE5032", 
               "image": "http://images.amazon.com/images/P/B00005V5PW.01.MZZZZZZZ.jpg", 
               "$area": 197
             }, 
             "id": "album-Classic Masters", 
             "name": "Classic Masters"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Blind Melon", 
               "playcount": "194", 
               "$color": "#B04E32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/15157989.jpg", 
               "$area": 194
             }, 
             "id": "album-Blind Melon", 
             "name": "Blind Melon"
           }
         ], 
         "data": {
           "playcount": 856, 
           "$area": 856
         }, 
         "id": "artist_Blind Melon", 
         "name": "Blind Melon"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Incubus", 
               "playcount": "537", 
               "$color": "#24DA32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/17594883.jpg", 
               "$area": 537
             }, 
             "id": "album-Make Yourself", 
             "name": "Make Yourself"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Incubus", 
               "playcount": "258", 
               "$color": "#966832", 
               "image": "http://userserve-ak.last.fm/serve/300x300/31550385.jpg", 
               "$area": 258
             }, 
             "id": "album-Light Grenades", 
             "name": "Light Grenades"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Incubus", 
               "playcount": "181", 
               "$color": "#B54932", 
               "image": "http://userserve-ak.last.fm/serve/300x300/32309285.jpg", 
               "$area": 181
             }, 
             "id": "album-Morning View", 
             "name": "Morning View"
           }
         ], 
         "data": {
           "playcount": 976, 
           "$area": 976
         }, 
         "id": "artist_Incubus", 
         "name": "Incubus"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Jack Johnson", 
               "playcount": "198", 
               "$color": "#AE5032", 
               "image": "http://userserve-ak.last.fm/serve/300x300/8599099.jpg", 
               "$area": 198
             }, 
             "id": "album-On And On", 
             "name": "On And On"
           }, 
           {
             "children": [], 
             "data": {
               "artist": "Jack Johnson", 
               "playcount": "186", 
               "$color": "#B34B32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/30082075.jpg", 
               "$area": 186
             }, 
             "id": "album-Brushfire Fairytales", 
             "name": "Brushfire Fairytales"
           }
         ], 
         "data": {
           "playcount": 384, 
           "$area": 384
         }, 
         "id": "artist_Jack Johnson", 
         "name": "Jack Johnson"
       }, 
       {
         "children": [
           {
             "children": [], 
             "data": {
               "artist": "Mother Love Bone", 
               "playcount": "349", 
               "$color": "#718D32", 
               "image": "http://userserve-ak.last.fm/serve/300x300/21881921.jpg", 
               "$area": 349
             }, 
             "id": "album-Mother Love Bone", 
             "name": "Mother Love Bone"
           }
         ], 
         "data": {
           "playcount": 349, 
           "$area": 349
         }, 
         "id": "artist_Mother Love Bone", 
         "name": "Mother Love Bone"
       }
     ], 
     "data": {}, 
     "id": "root", 
     "name": "Top Albums"
   };
  //end
  //init TreeMap
  var tm = new $jit.TM.Squarified({
    //where to inject the visualization
    injectInto: 'infovis',
    //no parent frames
    titleHeight: 0,
    //enable animations
    animate: animate,
    //no box offsets
    offset: 0,
    //add cushion gradients
    cushion: useGradients,
    //duration of the animation
    duration: 1500,
    //Enable tips
    Tips: {
      enable: true,
      //add positioning offsets
      offsetX: 20,
      offsetY: 20,
      //implement the onShow method to
      //add content to the tooltip when a node
      //is hovered
      onShow: function(tip, node, isLeaf, domElement) {
        var html = "<div class=\"tip-title\">" + node.name 
          + "</div><div class=\"tip-text\">";
        var data = node.data;
        if(data.artist) {
          html += "Artist: " + data.artist + "<br />";
        }
        if(data.playcount) {
          html += "Play count: " + data.playcount;
        }
        if(data.image) {
          html += "<img src=\""+ data.image +"\" class=\"album\" />";
        }
        tip.innerHTML =  html; 
      }  
    },
    //Add the name of the node in the correponding label
    //This method is called once, on label creation.
    onCreateLabel: function(domElement, node){
        domElement.innerHTML = node.name;
        var style = domElement.style;
        style.display = '';
        style.cursor = 'default';
        style.border = '1px solid transparent';
        domElement.onmouseover = function() {
          style.border = '1px solid #9FD4FF';
        };
        domElement.onmouseout = function() {
          style.border = '1px solid transparent';
        };
    }
  });

  tm.loadJSON(json);
  tm.refresh();
  //end
  //add events to radio buttons
  var sq = $jit.id('r-sq'),
      st = $jit.id('r-st'),
      sd = $jit.id('r-sd');
  var util = $jit.util;
  util.addEvent(sq, 'change', function() {
    if(!sq.checked) return;
    util.extend(tm, new $jit.Layouts.TM.Squarified);
    tm.refresh();
  });
  util.addEvent(st, 'change', function() {
    if(!st.checked) return;
    util.extend(tm, new $jit.Layouts.TM.Strip);
    tm.layout.orientation = "v";
    tm.refresh();
  });
  util.addEvent(sd, 'change', function() {
    if(!sd.checked) return;
    util.extend(tm, new $jit.Layouts.TM.SliceAndDice);
    tm.layout.orientation = "v";
    tm.refresh();
  });
  //add event to the back button
  var back = $jit.id('back');
  $jit.util.addEvent(back, 'click', function() {
    tm.out();
  });
}
