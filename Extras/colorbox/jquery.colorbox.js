


<!DOCTYPE html>
<html>
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# githubog: http://ogp.me/ns/fb/githubog#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>colorbox/colorbox/jquery.colorbox.js at master · jackmoore/colorbox · GitHub</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub" />
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

    
    

    <meta content="authenticity_token" name="csrf-param" />
<meta content="dtUFk+zCA0KjGVP32c+hohzIMsEb0PqYY/qA/McSM8Y=" name="csrf-token" />

    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github-7c372a292745323c14c18e58c1d046031f9243c2.css" media="screen" rel="stylesheet" type="text/css" />
    <link href="https://a248.e.akamai.net/assets.github.com/stylesheets/bundles/github2-2f631983b042cbba70e616b31fb2f3e192cc8db8.css" media="screen" rel="stylesheet" type="text/css" />
    
    
    

    <script src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/frameworks-31b6b84bca1e7d3f3907f63a4dd7f9bbda3a0eda.js" type="text/javascript"></script>
    
    <script defer="defer" src="https://a248.e.akamai.net/assets.github.com/javascripts/bundles/github-0e4b556bfe827111f491ab221385f9a5d1bf7baa.js" type="text/javascript"></script>
    
    

      <link rel='permalink' href='/jackmoore/colorbox/blob/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346/colorbox/jquery.colorbox.js'>
    <meta property="og:title" content="colorbox"/>
    <meta property="og:type" content="githubog:gitrepository"/>
    <meta property="og:url" content="https://github.com/jackmoore/colorbox"/>
    <meta property="og:image" content="https://a248.e.akamai.net/assets.github.com/images/gravatars/gravatar-140.png?1329275859"/>
    <meta property="og:site_name" content="GitHub"/>
    <meta property="og:description" content="colorbox - A light-weight, customizable lightbox plugin for jQuery"/>

    <meta name="description" content="colorbox - A light-weight, customizable lightbox plugin for jQuery" />

  <link href="https://github.com/jackmoore/colorbox/commits/master.atom" rel="alternate" title="Recent Commits to colorbox:master" type="application/atom+xml" />

  </head>


  <body class="logged_out page-blob linux vis-public env-production " data-blob-contribs-enabled="yes">
    <div id="wrapper">

    
    
    

      <div id="header" class="true clearfix">
        <div class="container clearfix">
          <a class="site-logo" href="https://github.com">
            <!--[if IE]>
            <img alt="GitHub" class="github-logo" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7.png?1323882717" />
            <img alt="GitHub" class="github-logo-hover" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7-hover.png?1324325376" />
            <![endif]-->
            <img alt="GitHub" class="github-logo-4x" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x.png?1323882717" />
            <img alt="GitHub" class="github-logo-4x-hover" height="30" src="https://a248.e.akamai.net/assets.github.com/images/modules/header/logov7@4x-hover.png?1324325376" />
          </a>

                  <!--
      make sure to use fully qualified URLs here since this nav
      is used on error pages on other domains
    -->
    <ul class="top-nav logged_out">
        <li class="pricing"><a href="https://github.com/plans">Signup and Pricing</a></li>
        <li class="explore"><a href="https://github.com/explore">Explore GitHub</a></li>
      <li class="features"><a href="https://github.com/features">Features</a></li>
        <li class="blog"><a href="https://github.com/blog">Blog</a></li>
      <li class="login"><a href="https://github.com/login?return_to=%2Fjackmoore%2Fcolorbox%2Fblob%2Fmaster%2Fcolorbox%2Fjquery.colorbox.js">Login</a></li>
    </ul>



          
        </div>
      </div>

      

            <div class="site hfeed" itemscope itemtype="http://schema.org/WebPage">
      <div class="container hentry">
        <div class="pagehead repohead instapaper_ignore readability-menu">
        <div class="title-actions-bar">
          



              <ul class="pagehead-actions">



          <li>
            <a href="/login?return_to=%2Fjackmoore%2Fcolorbox" class="minibutton btn-i-type-i-switcher switcher count btn-watches js-toggler-target watch-button entice tooltipped leftwards" title="You must be logged in to use this feature" rel="nofollow"><span><span class="icon"></span><i>1,415</i> Watch</span></a>
          </li>
          <li>
            <a href="/login?return_to=%2Fjackmoore%2Fcolorbox" class="minibutton btn-i-type-i-switcher switcher count btn-forks js-toggler-target fork-button entice tooltipped leftwards"  title="You must be logged in to use this feature" rel="nofollow"><span><span class="icon"></span><i>225</i> Fork</span></a>
          </li>

    </ul>

          <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title">
            <span class="repo-label"><span class="public">public</span></span>
            <span class="mega-icon public-repo"></span>
            <span class="author vcard">
<a href="/jackmoore" class="url fn" itemprop="url" rel="author">              <span itemprop="title">jackmoore</span>
              </a></span> /
            <strong><a href="/jackmoore/colorbox" class="js-current-repository">colorbox</a></strong>
          </h1>
        </div>

          

  <ul class="tabs">
    <li><a href="/jackmoore/colorbox" class="selected" highlight="repo_sourcerepo_downloadsrepo_commitsrepo_tagsrepo_branches">Code</a></li>
    <li><a href="/jackmoore/colorbox/network" highlight="repo_network">Network</a>
    <li><a href="/jackmoore/colorbox/pulls" highlight="repo_pulls">Pull Requests <span class='counter'>20</span></a></li>

      <li><a href="/jackmoore/colorbox/issues" highlight="repo_issues">Issues <span class='counter'>78</span></a></li>


    <li><a href="/jackmoore/colorbox/graphs" highlight="repo_graphsrepo_contributors">Graphs</a></li>

  </ul>
 
<div class="frame frame-center tree-finder" style="display:none"
      data-tree-list-url="/jackmoore/colorbox/tree-list/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346"
      data-blob-url-prefix="/jackmoore/colorbox/blob/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346"
    >

  <div class="breadcrumb">
    <span class="bold"><a href="/jackmoore/colorbox">colorbox</a></span> /
    <input class="tree-finder-input js-navigation-enable" type="text" name="query" autocomplete="off" spellcheck="false">
  </div>

    <div class="octotip">
      <p>
        <a href="/jackmoore/colorbox/dismiss-tree-finder-help" class="dismiss js-dismiss-tree-list-help" title="Hide this notice forever" rel="nofollow">Dismiss</a>
        <span class="bold">Octotip:</span> You've activated the <em>file finder</em>
        by pressing <span class="kbd">t</span> Start typing to filter the
        file list. Use <span class="kbd badmono">↑</span> and
        <span class="kbd badmono">↓</span> to navigate,
        <span class="kbd">enter</span> to view files.
      </p>
    </div>

  <table class="tree-browser" cellpadding="0" cellspacing="0">
    <tr class="js-header"><th>&nbsp;</th><th>name</th></tr>
    <tr class="js-no-results no-results" style="display: none">
      <th colspan="2">No matching files</th>
    </tr>
    <tbody class="js-results-list js-navigation-container">
    </tbody>
  </table>
</div>

<div id="jump-to-line" style="display:none">
  <h2>Jump to Line</h2>
  <form accept-charset="UTF-8">
    <input class="textfield" type="text">
    <div class="full-button">
      <button type="submit" class="classy">
        <span>Go</span>
      </button>
    </div>
  </form>
</div>


<div class="subnav-bar">

  <ul class="actions subnav">
    <li><a href="/jackmoore/colorbox/tags" class="" highlight="repo_tags">Tags <span class="counter">1</span></a></li>
    <li><a href="/jackmoore/colorbox/downloads" class="blank downloads-blank" highlight="repo_downloads">Downloads <span class="counter">0</span></a></li>
    
  </ul>

  <ul class="scope">
    <li class="switcher">

      <div class="context-menu-container js-menu-container js-context-menu">
        <a href="#"
           class="minibutton bigger switcher js-menu-target js-commitish-button btn-branch repo-tree"
           data-hotkey="w"
           data-master-branch="master"
           data-ref="master">
          <span><span class="icon"></span><i>branch:</i> master</span>
        </a>

        <div class="context-pane commitish-context js-menu-content">
          <a href="javascript:;" class="close js-menu-close"><span class="mini-icon remove-close"></span></a>
          <div class="context-title">Switch Branches/Tags</div>
          <div class="context-body pane-selector commitish-selector js-navigation-container">
            <div class="filterbar">
              <input type="text" id="context-commitish-filter-field" class="js-navigation-enable" placeholder="Filter branches/tags" data-filterable />

              <ul class="tabs">
                <li><a href="#" data-filter="branches" class="selected">Branches</a></li>
                <li><a href="#" data-filter="tags">Tags</a></li>
              </ul>
            </div>

            <div class="js-filter-tab js-filter-branches" data-filterable-for="context-commitish-filter-field">
              <div class="no-results js-not-filterable">Nothing to show</div>
                <div class="commitish-item branch-commitish selector-item js-navigation-item js-navigation-target">
                  <h4>
                      <a href="/jackmoore/colorbox/blob/gh-pages/colorbox/jquery.colorbox.js" class="js-navigation-open" data-name="gh-pages" rel="nofollow">gh-pages</a>
                  </h4>
                </div>
                <div class="commitish-item branch-commitish selector-item js-navigation-item js-navigation-target">
                  <h4>
                      <a href="/jackmoore/colorbox/blob/master/colorbox/jquery.colorbox.js" class="js-navigation-open" data-name="master" rel="nofollow">master</a>
                  </h4>
                </div>
            </div>

            <div class="js-filter-tab js-filter-tags" style="display:none" data-filterable-for="context-commitish-filter-field">
              <div class="no-results js-not-filterable">Nothing to show</div>
                <div class="commitish-item tag-commitish selector-item js-navigation-item js-navigation-target">
                  <h4>
                      <a href="/jackmoore/colorbox/blob/v1.3.16/colorbox/jquery.colorbox.js" class="js-navigation-open" data-name="v1.3.16" rel="nofollow">v1.3.16</a>
                  </h4>
                </div>
            </div>
          </div>
        </div><!-- /.commitish-context-context -->
      </div>

    </li>
  </ul>

  <ul class="subnav with-scope">

    <li><a href="/jackmoore/colorbox" class="selected" highlight="repo_source">Files</a></li>
    <li><a href="/jackmoore/colorbox/commits/master" highlight="repo_commits">Commits</a></li>
    <li><a href="/jackmoore/colorbox/branches" class="" highlight="repo_branches" rel="nofollow">Branches <span class="counter">2</span></a></li>
  </ul>

</div>

  
  
  


          

        </div><!-- /.repohead -->

        





<!-- block_view_fragment_key: views8/v8/blob:v21:069396e37b827544bdc80f7353e67996 -->
  <div id="slider">

    <div class="breadcrumb" data-path="colorbox/jquery.colorbox.js/">
      <b itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/jackmoore/colorbox/tree/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346" class="js-rewrite-sha" itemprop="url"><span itemprop="title">colorbox</span></a></b> / <span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/jackmoore/colorbox/tree/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346/colorbox" class="js-rewrite-sha" itemscope="url"><span itemprop="title">colorbox</span></a></span> / <strong class="final-path">jquery.colorbox.js</strong> <span class="js-clippy mini-icon clippy " data-clipboard-text="colorbox/jquery.colorbox.js" data-copied-hint="copied!" data-copy-hint="copy to clipboard"></span>
    </div>


      <div class="commit file-history-tease" data-path="colorbox/jquery.colorbox.js/">
        <img class="main-avatar" height="24" src="https://secure.gravatar.com/avatar/ff8f4d60e37abfd3870391aa2966c188?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
        <span class="author"><a href="/jackmoore">jackmoore</a></span>
        <time class="js-relative-date" datetime="2012-05-08T08:11:54-07:00" title="2012-05-08 08:11:54">May 08, 2012</time>
        <div class="commit-title">
            <a href="/jackmoore/colorbox/commit/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346" class="message">Failed to check for existance of console.</a>
        </div>

        <div class="participation">
          <p class="quickstat"><a href="#blob_contributors_box" rel="facebox"><strong>2</strong> contributors</a></p>
              <a class="avatar tooltipped downwards" title="jackmoore" href="/jackmoore/colorbox/commits/master/colorbox/jquery.colorbox.js?author=jackmoore"><img height="20" src="https://secure.gravatar.com/avatar/ff8f4d60e37abfd3870391aa2966c188?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>
    <a class="avatar tooltipped downwards" title="invalid-email-address" href="/jackmoore/colorbox/commits/master/colorbox/jquery.colorbox.js?author=invalid-email-address"><img height="20" src="https://secure.gravatar.com/avatar/ce30ff98042f5e49ecdb62caa21ab7e2?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="20" /></a>


        </div>
        <div id="blob_contributors_box" style="display:none">
          <h2>Users on GitHub who have contributed to this file</h2>
          <ul class="facebox-user-list">
            <li>
              <img height="24" src="https://secure.gravatar.com/avatar/ff8f4d60e37abfd3870391aa2966c188?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
              <a href="/jackmoore">jackmoore</a>
            </li>
            <li>
              <img height="24" src="https://secure.gravatar.com/avatar/ce30ff98042f5e49ecdb62caa21ab7e2?s=140&amp;d=https://a248.e.akamai.net/assets.github.com%2Fimages%2Fgravatars%2Fgravatar-140.png" width="24" />
              <a href="/invalid-email-address">invalid-email-address</a>
            </li>
          </ul>
        </div>
      </div>

    <div class="frames">
      <div class="frame frame-center" data-path="colorbox/jquery.colorbox.js/" data-permalink-url="/jackmoore/colorbox/blob/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346/colorbox/jquery.colorbox.js" data-title="colorbox/colorbox/jquery.colorbox.js at master · jackmoore/colorbox · GitHub" data-type="blob">

        <div id="files" class="bubble">
          <div class="file">
            <div class="meta">
              <div class="info">
                <span class="icon"><b class="mini-icon text-file"></b></span>
                <span class="mode" title="File Mode">100644</span>
                  <span>926 lines (775 sloc)</span>
                <span>25.509 kb</span>
              </div>
              <ul class="button-group actions">
                  <li>
                    <a class="grouped-button file-edit-link minibutton bigger lighter js-rewrite-sha" href="/jackmoore/colorbox/edit/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346/colorbox/jquery.colorbox.js" data-method="post" rel="nofollow" data-hotkey="e"><span>Edit this file</span></a>
                  </li>

                <li>
                  <a href="/jackmoore/colorbox/raw/master/colorbox/jquery.colorbox.js" class="minibutton btn-raw grouped-button bigger lighter" id="raw-url"><span><span class="icon"></span>Raw</span></a>
                </li>
                  <li>
                    <a href="/jackmoore/colorbox/blame/master/colorbox/jquery.colorbox.js" class="minibutton btn-blame grouped-button bigger lighter"><span><span class="icon"></span>Blame</span></a>
                  </li>
                <li>
                  <a href="/jackmoore/colorbox/commits/master/colorbox/jquery.colorbox.js" class="minibutton btn-history grouped-button bigger lighter" rel="nofollow"><span><span class="icon"></span>History</span></a>
                </li>
              </ul>
            </div>
              <div class="data type-javascript">
      <table cellpadding="0" cellspacing="0" class="lines">
        <tr>
          <td>
            <pre class="line_numbers"><span id="L1" rel="#L1">1</span>
<span id="L2" rel="#L2">2</span>
<span id="L3" rel="#L3">3</span>
<span id="L4" rel="#L4">4</span>
<span id="L5" rel="#L5">5</span>
<span id="L6" rel="#L6">6</span>
<span id="L7" rel="#L7">7</span>
<span id="L8" rel="#L8">8</span>
<span id="L9" rel="#L9">9</span>
<span id="L10" rel="#L10">10</span>
<span id="L11" rel="#L11">11</span>
<span id="L12" rel="#L12">12</span>
<span id="L13" rel="#L13">13</span>
<span id="L14" rel="#L14">14</span>
<span id="L15" rel="#L15">15</span>
<span id="L16" rel="#L16">16</span>
<span id="L17" rel="#L17">17</span>
<span id="L18" rel="#L18">18</span>
<span id="L19" rel="#L19">19</span>
<span id="L20" rel="#L20">20</span>
<span id="L21" rel="#L21">21</span>
<span id="L22" rel="#L22">22</span>
<span id="L23" rel="#L23">23</span>
<span id="L24" rel="#L24">24</span>
<span id="L25" rel="#L25">25</span>
<span id="L26" rel="#L26">26</span>
<span id="L27" rel="#L27">27</span>
<span id="L28" rel="#L28">28</span>
<span id="L29" rel="#L29">29</span>
<span id="L30" rel="#L30">30</span>
<span id="L31" rel="#L31">31</span>
<span id="L32" rel="#L32">32</span>
<span id="L33" rel="#L33">33</span>
<span id="L34" rel="#L34">34</span>
<span id="L35" rel="#L35">35</span>
<span id="L36" rel="#L36">36</span>
<span id="L37" rel="#L37">37</span>
<span id="L38" rel="#L38">38</span>
<span id="L39" rel="#L39">39</span>
<span id="L40" rel="#L40">40</span>
<span id="L41" rel="#L41">41</span>
<span id="L42" rel="#L42">42</span>
<span id="L43" rel="#L43">43</span>
<span id="L44" rel="#L44">44</span>
<span id="L45" rel="#L45">45</span>
<span id="L46" rel="#L46">46</span>
<span id="L47" rel="#L47">47</span>
<span id="L48" rel="#L48">48</span>
<span id="L49" rel="#L49">49</span>
<span id="L50" rel="#L50">50</span>
<span id="L51" rel="#L51">51</span>
<span id="L52" rel="#L52">52</span>
<span id="L53" rel="#L53">53</span>
<span id="L54" rel="#L54">54</span>
<span id="L55" rel="#L55">55</span>
<span id="L56" rel="#L56">56</span>
<span id="L57" rel="#L57">57</span>
<span id="L58" rel="#L58">58</span>
<span id="L59" rel="#L59">59</span>
<span id="L60" rel="#L60">60</span>
<span id="L61" rel="#L61">61</span>
<span id="L62" rel="#L62">62</span>
<span id="L63" rel="#L63">63</span>
<span id="L64" rel="#L64">64</span>
<span id="L65" rel="#L65">65</span>
<span id="L66" rel="#L66">66</span>
<span id="L67" rel="#L67">67</span>
<span id="L68" rel="#L68">68</span>
<span id="L69" rel="#L69">69</span>
<span id="L70" rel="#L70">70</span>
<span id="L71" rel="#L71">71</span>
<span id="L72" rel="#L72">72</span>
<span id="L73" rel="#L73">73</span>
<span id="L74" rel="#L74">74</span>
<span id="L75" rel="#L75">75</span>
<span id="L76" rel="#L76">76</span>
<span id="L77" rel="#L77">77</span>
<span id="L78" rel="#L78">78</span>
<span id="L79" rel="#L79">79</span>
<span id="L80" rel="#L80">80</span>
<span id="L81" rel="#L81">81</span>
<span id="L82" rel="#L82">82</span>
<span id="L83" rel="#L83">83</span>
<span id="L84" rel="#L84">84</span>
<span id="L85" rel="#L85">85</span>
<span id="L86" rel="#L86">86</span>
<span id="L87" rel="#L87">87</span>
<span id="L88" rel="#L88">88</span>
<span id="L89" rel="#L89">89</span>
<span id="L90" rel="#L90">90</span>
<span id="L91" rel="#L91">91</span>
<span id="L92" rel="#L92">92</span>
<span id="L93" rel="#L93">93</span>
<span id="L94" rel="#L94">94</span>
<span id="L95" rel="#L95">95</span>
<span id="L96" rel="#L96">96</span>
<span id="L97" rel="#L97">97</span>
<span id="L98" rel="#L98">98</span>
<span id="L99" rel="#L99">99</span>
<span id="L100" rel="#L100">100</span>
<span id="L101" rel="#L101">101</span>
<span id="L102" rel="#L102">102</span>
<span id="L103" rel="#L103">103</span>
<span id="L104" rel="#L104">104</span>
<span id="L105" rel="#L105">105</span>
<span id="L106" rel="#L106">106</span>
<span id="L107" rel="#L107">107</span>
<span id="L108" rel="#L108">108</span>
<span id="L109" rel="#L109">109</span>
<span id="L110" rel="#L110">110</span>
<span id="L111" rel="#L111">111</span>
<span id="L112" rel="#L112">112</span>
<span id="L113" rel="#L113">113</span>
<span id="L114" rel="#L114">114</span>
<span id="L115" rel="#L115">115</span>
<span id="L116" rel="#L116">116</span>
<span id="L117" rel="#L117">117</span>
<span id="L118" rel="#L118">118</span>
<span id="L119" rel="#L119">119</span>
<span id="L120" rel="#L120">120</span>
<span id="L121" rel="#L121">121</span>
<span id="L122" rel="#L122">122</span>
<span id="L123" rel="#L123">123</span>
<span id="L124" rel="#L124">124</span>
<span id="L125" rel="#L125">125</span>
<span id="L126" rel="#L126">126</span>
<span id="L127" rel="#L127">127</span>
<span id="L128" rel="#L128">128</span>
<span id="L129" rel="#L129">129</span>
<span id="L130" rel="#L130">130</span>
<span id="L131" rel="#L131">131</span>
<span id="L132" rel="#L132">132</span>
<span id="L133" rel="#L133">133</span>
<span id="L134" rel="#L134">134</span>
<span id="L135" rel="#L135">135</span>
<span id="L136" rel="#L136">136</span>
<span id="L137" rel="#L137">137</span>
<span id="L138" rel="#L138">138</span>
<span id="L139" rel="#L139">139</span>
<span id="L140" rel="#L140">140</span>
<span id="L141" rel="#L141">141</span>
<span id="L142" rel="#L142">142</span>
<span id="L143" rel="#L143">143</span>
<span id="L144" rel="#L144">144</span>
<span id="L145" rel="#L145">145</span>
<span id="L146" rel="#L146">146</span>
<span id="L147" rel="#L147">147</span>
<span id="L148" rel="#L148">148</span>
<span id="L149" rel="#L149">149</span>
<span id="L150" rel="#L150">150</span>
<span id="L151" rel="#L151">151</span>
<span id="L152" rel="#L152">152</span>
<span id="L153" rel="#L153">153</span>
<span id="L154" rel="#L154">154</span>
<span id="L155" rel="#L155">155</span>
<span id="L156" rel="#L156">156</span>
<span id="L157" rel="#L157">157</span>
<span id="L158" rel="#L158">158</span>
<span id="L159" rel="#L159">159</span>
<span id="L160" rel="#L160">160</span>
<span id="L161" rel="#L161">161</span>
<span id="L162" rel="#L162">162</span>
<span id="L163" rel="#L163">163</span>
<span id="L164" rel="#L164">164</span>
<span id="L165" rel="#L165">165</span>
<span id="L166" rel="#L166">166</span>
<span id="L167" rel="#L167">167</span>
<span id="L168" rel="#L168">168</span>
<span id="L169" rel="#L169">169</span>
<span id="L170" rel="#L170">170</span>
<span id="L171" rel="#L171">171</span>
<span id="L172" rel="#L172">172</span>
<span id="L173" rel="#L173">173</span>
<span id="L174" rel="#L174">174</span>
<span id="L175" rel="#L175">175</span>
<span id="L176" rel="#L176">176</span>
<span id="L177" rel="#L177">177</span>
<span id="L178" rel="#L178">178</span>
<span id="L179" rel="#L179">179</span>
<span id="L180" rel="#L180">180</span>
<span id="L181" rel="#L181">181</span>
<span id="L182" rel="#L182">182</span>
<span id="L183" rel="#L183">183</span>
<span id="L184" rel="#L184">184</span>
<span id="L185" rel="#L185">185</span>
<span id="L186" rel="#L186">186</span>
<span id="L187" rel="#L187">187</span>
<span id="L188" rel="#L188">188</span>
<span id="L189" rel="#L189">189</span>
<span id="L190" rel="#L190">190</span>
<span id="L191" rel="#L191">191</span>
<span id="L192" rel="#L192">192</span>
<span id="L193" rel="#L193">193</span>
<span id="L194" rel="#L194">194</span>
<span id="L195" rel="#L195">195</span>
<span id="L196" rel="#L196">196</span>
<span id="L197" rel="#L197">197</span>
<span id="L198" rel="#L198">198</span>
<span id="L199" rel="#L199">199</span>
<span id="L200" rel="#L200">200</span>
<span id="L201" rel="#L201">201</span>
<span id="L202" rel="#L202">202</span>
<span id="L203" rel="#L203">203</span>
<span id="L204" rel="#L204">204</span>
<span id="L205" rel="#L205">205</span>
<span id="L206" rel="#L206">206</span>
<span id="L207" rel="#L207">207</span>
<span id="L208" rel="#L208">208</span>
<span id="L209" rel="#L209">209</span>
<span id="L210" rel="#L210">210</span>
<span id="L211" rel="#L211">211</span>
<span id="L212" rel="#L212">212</span>
<span id="L213" rel="#L213">213</span>
<span id="L214" rel="#L214">214</span>
<span id="L215" rel="#L215">215</span>
<span id="L216" rel="#L216">216</span>
<span id="L217" rel="#L217">217</span>
<span id="L218" rel="#L218">218</span>
<span id="L219" rel="#L219">219</span>
<span id="L220" rel="#L220">220</span>
<span id="L221" rel="#L221">221</span>
<span id="L222" rel="#L222">222</span>
<span id="L223" rel="#L223">223</span>
<span id="L224" rel="#L224">224</span>
<span id="L225" rel="#L225">225</span>
<span id="L226" rel="#L226">226</span>
<span id="L227" rel="#L227">227</span>
<span id="L228" rel="#L228">228</span>
<span id="L229" rel="#L229">229</span>
<span id="L230" rel="#L230">230</span>
<span id="L231" rel="#L231">231</span>
<span id="L232" rel="#L232">232</span>
<span id="L233" rel="#L233">233</span>
<span id="L234" rel="#L234">234</span>
<span id="L235" rel="#L235">235</span>
<span id="L236" rel="#L236">236</span>
<span id="L237" rel="#L237">237</span>
<span id="L238" rel="#L238">238</span>
<span id="L239" rel="#L239">239</span>
<span id="L240" rel="#L240">240</span>
<span id="L241" rel="#L241">241</span>
<span id="L242" rel="#L242">242</span>
<span id="L243" rel="#L243">243</span>
<span id="L244" rel="#L244">244</span>
<span id="L245" rel="#L245">245</span>
<span id="L246" rel="#L246">246</span>
<span id="L247" rel="#L247">247</span>
<span id="L248" rel="#L248">248</span>
<span id="L249" rel="#L249">249</span>
<span id="L250" rel="#L250">250</span>
<span id="L251" rel="#L251">251</span>
<span id="L252" rel="#L252">252</span>
<span id="L253" rel="#L253">253</span>
<span id="L254" rel="#L254">254</span>
<span id="L255" rel="#L255">255</span>
<span id="L256" rel="#L256">256</span>
<span id="L257" rel="#L257">257</span>
<span id="L258" rel="#L258">258</span>
<span id="L259" rel="#L259">259</span>
<span id="L260" rel="#L260">260</span>
<span id="L261" rel="#L261">261</span>
<span id="L262" rel="#L262">262</span>
<span id="L263" rel="#L263">263</span>
<span id="L264" rel="#L264">264</span>
<span id="L265" rel="#L265">265</span>
<span id="L266" rel="#L266">266</span>
<span id="L267" rel="#L267">267</span>
<span id="L268" rel="#L268">268</span>
<span id="L269" rel="#L269">269</span>
<span id="L270" rel="#L270">270</span>
<span id="L271" rel="#L271">271</span>
<span id="L272" rel="#L272">272</span>
<span id="L273" rel="#L273">273</span>
<span id="L274" rel="#L274">274</span>
<span id="L275" rel="#L275">275</span>
<span id="L276" rel="#L276">276</span>
<span id="L277" rel="#L277">277</span>
<span id="L278" rel="#L278">278</span>
<span id="L279" rel="#L279">279</span>
<span id="L280" rel="#L280">280</span>
<span id="L281" rel="#L281">281</span>
<span id="L282" rel="#L282">282</span>
<span id="L283" rel="#L283">283</span>
<span id="L284" rel="#L284">284</span>
<span id="L285" rel="#L285">285</span>
<span id="L286" rel="#L286">286</span>
<span id="L287" rel="#L287">287</span>
<span id="L288" rel="#L288">288</span>
<span id="L289" rel="#L289">289</span>
<span id="L290" rel="#L290">290</span>
<span id="L291" rel="#L291">291</span>
<span id="L292" rel="#L292">292</span>
<span id="L293" rel="#L293">293</span>
<span id="L294" rel="#L294">294</span>
<span id="L295" rel="#L295">295</span>
<span id="L296" rel="#L296">296</span>
<span id="L297" rel="#L297">297</span>
<span id="L298" rel="#L298">298</span>
<span id="L299" rel="#L299">299</span>
<span id="L300" rel="#L300">300</span>
<span id="L301" rel="#L301">301</span>
<span id="L302" rel="#L302">302</span>
<span id="L303" rel="#L303">303</span>
<span id="L304" rel="#L304">304</span>
<span id="L305" rel="#L305">305</span>
<span id="L306" rel="#L306">306</span>
<span id="L307" rel="#L307">307</span>
<span id="L308" rel="#L308">308</span>
<span id="L309" rel="#L309">309</span>
<span id="L310" rel="#L310">310</span>
<span id="L311" rel="#L311">311</span>
<span id="L312" rel="#L312">312</span>
<span id="L313" rel="#L313">313</span>
<span id="L314" rel="#L314">314</span>
<span id="L315" rel="#L315">315</span>
<span id="L316" rel="#L316">316</span>
<span id="L317" rel="#L317">317</span>
<span id="L318" rel="#L318">318</span>
<span id="L319" rel="#L319">319</span>
<span id="L320" rel="#L320">320</span>
<span id="L321" rel="#L321">321</span>
<span id="L322" rel="#L322">322</span>
<span id="L323" rel="#L323">323</span>
<span id="L324" rel="#L324">324</span>
<span id="L325" rel="#L325">325</span>
<span id="L326" rel="#L326">326</span>
<span id="L327" rel="#L327">327</span>
<span id="L328" rel="#L328">328</span>
<span id="L329" rel="#L329">329</span>
<span id="L330" rel="#L330">330</span>
<span id="L331" rel="#L331">331</span>
<span id="L332" rel="#L332">332</span>
<span id="L333" rel="#L333">333</span>
<span id="L334" rel="#L334">334</span>
<span id="L335" rel="#L335">335</span>
<span id="L336" rel="#L336">336</span>
<span id="L337" rel="#L337">337</span>
<span id="L338" rel="#L338">338</span>
<span id="L339" rel="#L339">339</span>
<span id="L340" rel="#L340">340</span>
<span id="L341" rel="#L341">341</span>
<span id="L342" rel="#L342">342</span>
<span id="L343" rel="#L343">343</span>
<span id="L344" rel="#L344">344</span>
<span id="L345" rel="#L345">345</span>
<span id="L346" rel="#L346">346</span>
<span id="L347" rel="#L347">347</span>
<span id="L348" rel="#L348">348</span>
<span id="L349" rel="#L349">349</span>
<span id="L350" rel="#L350">350</span>
<span id="L351" rel="#L351">351</span>
<span id="L352" rel="#L352">352</span>
<span id="L353" rel="#L353">353</span>
<span id="L354" rel="#L354">354</span>
<span id="L355" rel="#L355">355</span>
<span id="L356" rel="#L356">356</span>
<span id="L357" rel="#L357">357</span>
<span id="L358" rel="#L358">358</span>
<span id="L359" rel="#L359">359</span>
<span id="L360" rel="#L360">360</span>
<span id="L361" rel="#L361">361</span>
<span id="L362" rel="#L362">362</span>
<span id="L363" rel="#L363">363</span>
<span id="L364" rel="#L364">364</span>
<span id="L365" rel="#L365">365</span>
<span id="L366" rel="#L366">366</span>
<span id="L367" rel="#L367">367</span>
<span id="L368" rel="#L368">368</span>
<span id="L369" rel="#L369">369</span>
<span id="L370" rel="#L370">370</span>
<span id="L371" rel="#L371">371</span>
<span id="L372" rel="#L372">372</span>
<span id="L373" rel="#L373">373</span>
<span id="L374" rel="#L374">374</span>
<span id="L375" rel="#L375">375</span>
<span id="L376" rel="#L376">376</span>
<span id="L377" rel="#L377">377</span>
<span id="L378" rel="#L378">378</span>
<span id="L379" rel="#L379">379</span>
<span id="L380" rel="#L380">380</span>
<span id="L381" rel="#L381">381</span>
<span id="L382" rel="#L382">382</span>
<span id="L383" rel="#L383">383</span>
<span id="L384" rel="#L384">384</span>
<span id="L385" rel="#L385">385</span>
<span id="L386" rel="#L386">386</span>
<span id="L387" rel="#L387">387</span>
<span id="L388" rel="#L388">388</span>
<span id="L389" rel="#L389">389</span>
<span id="L390" rel="#L390">390</span>
<span id="L391" rel="#L391">391</span>
<span id="L392" rel="#L392">392</span>
<span id="L393" rel="#L393">393</span>
<span id="L394" rel="#L394">394</span>
<span id="L395" rel="#L395">395</span>
<span id="L396" rel="#L396">396</span>
<span id="L397" rel="#L397">397</span>
<span id="L398" rel="#L398">398</span>
<span id="L399" rel="#L399">399</span>
<span id="L400" rel="#L400">400</span>
<span id="L401" rel="#L401">401</span>
<span id="L402" rel="#L402">402</span>
<span id="L403" rel="#L403">403</span>
<span id="L404" rel="#L404">404</span>
<span id="L405" rel="#L405">405</span>
<span id="L406" rel="#L406">406</span>
<span id="L407" rel="#L407">407</span>
<span id="L408" rel="#L408">408</span>
<span id="L409" rel="#L409">409</span>
<span id="L410" rel="#L410">410</span>
<span id="L411" rel="#L411">411</span>
<span id="L412" rel="#L412">412</span>
<span id="L413" rel="#L413">413</span>
<span id="L414" rel="#L414">414</span>
<span id="L415" rel="#L415">415</span>
<span id="L416" rel="#L416">416</span>
<span id="L417" rel="#L417">417</span>
<span id="L418" rel="#L418">418</span>
<span id="L419" rel="#L419">419</span>
<span id="L420" rel="#L420">420</span>
<span id="L421" rel="#L421">421</span>
<span id="L422" rel="#L422">422</span>
<span id="L423" rel="#L423">423</span>
<span id="L424" rel="#L424">424</span>
<span id="L425" rel="#L425">425</span>
<span id="L426" rel="#L426">426</span>
<span id="L427" rel="#L427">427</span>
<span id="L428" rel="#L428">428</span>
<span id="L429" rel="#L429">429</span>
<span id="L430" rel="#L430">430</span>
<span id="L431" rel="#L431">431</span>
<span id="L432" rel="#L432">432</span>
<span id="L433" rel="#L433">433</span>
<span id="L434" rel="#L434">434</span>
<span id="L435" rel="#L435">435</span>
<span id="L436" rel="#L436">436</span>
<span id="L437" rel="#L437">437</span>
<span id="L438" rel="#L438">438</span>
<span id="L439" rel="#L439">439</span>
<span id="L440" rel="#L440">440</span>
<span id="L441" rel="#L441">441</span>
<span id="L442" rel="#L442">442</span>
<span id="L443" rel="#L443">443</span>
<span id="L444" rel="#L444">444</span>
<span id="L445" rel="#L445">445</span>
<span id="L446" rel="#L446">446</span>
<span id="L447" rel="#L447">447</span>
<span id="L448" rel="#L448">448</span>
<span id="L449" rel="#L449">449</span>
<span id="L450" rel="#L450">450</span>
<span id="L451" rel="#L451">451</span>
<span id="L452" rel="#L452">452</span>
<span id="L453" rel="#L453">453</span>
<span id="L454" rel="#L454">454</span>
<span id="L455" rel="#L455">455</span>
<span id="L456" rel="#L456">456</span>
<span id="L457" rel="#L457">457</span>
<span id="L458" rel="#L458">458</span>
<span id="L459" rel="#L459">459</span>
<span id="L460" rel="#L460">460</span>
<span id="L461" rel="#L461">461</span>
<span id="L462" rel="#L462">462</span>
<span id="L463" rel="#L463">463</span>
<span id="L464" rel="#L464">464</span>
<span id="L465" rel="#L465">465</span>
<span id="L466" rel="#L466">466</span>
<span id="L467" rel="#L467">467</span>
<span id="L468" rel="#L468">468</span>
<span id="L469" rel="#L469">469</span>
<span id="L470" rel="#L470">470</span>
<span id="L471" rel="#L471">471</span>
<span id="L472" rel="#L472">472</span>
<span id="L473" rel="#L473">473</span>
<span id="L474" rel="#L474">474</span>
<span id="L475" rel="#L475">475</span>
<span id="L476" rel="#L476">476</span>
<span id="L477" rel="#L477">477</span>
<span id="L478" rel="#L478">478</span>
<span id="L479" rel="#L479">479</span>
<span id="L480" rel="#L480">480</span>
<span id="L481" rel="#L481">481</span>
<span id="L482" rel="#L482">482</span>
<span id="L483" rel="#L483">483</span>
<span id="L484" rel="#L484">484</span>
<span id="L485" rel="#L485">485</span>
<span id="L486" rel="#L486">486</span>
<span id="L487" rel="#L487">487</span>
<span id="L488" rel="#L488">488</span>
<span id="L489" rel="#L489">489</span>
<span id="L490" rel="#L490">490</span>
<span id="L491" rel="#L491">491</span>
<span id="L492" rel="#L492">492</span>
<span id="L493" rel="#L493">493</span>
<span id="L494" rel="#L494">494</span>
<span id="L495" rel="#L495">495</span>
<span id="L496" rel="#L496">496</span>
<span id="L497" rel="#L497">497</span>
<span id="L498" rel="#L498">498</span>
<span id="L499" rel="#L499">499</span>
<span id="L500" rel="#L500">500</span>
<span id="L501" rel="#L501">501</span>
<span id="L502" rel="#L502">502</span>
<span id="L503" rel="#L503">503</span>
<span id="L504" rel="#L504">504</span>
<span id="L505" rel="#L505">505</span>
<span id="L506" rel="#L506">506</span>
<span id="L507" rel="#L507">507</span>
<span id="L508" rel="#L508">508</span>
<span id="L509" rel="#L509">509</span>
<span id="L510" rel="#L510">510</span>
<span id="L511" rel="#L511">511</span>
<span id="L512" rel="#L512">512</span>
<span id="L513" rel="#L513">513</span>
<span id="L514" rel="#L514">514</span>
<span id="L515" rel="#L515">515</span>
<span id="L516" rel="#L516">516</span>
<span id="L517" rel="#L517">517</span>
<span id="L518" rel="#L518">518</span>
<span id="L519" rel="#L519">519</span>
<span id="L520" rel="#L520">520</span>
<span id="L521" rel="#L521">521</span>
<span id="L522" rel="#L522">522</span>
<span id="L523" rel="#L523">523</span>
<span id="L524" rel="#L524">524</span>
<span id="L525" rel="#L525">525</span>
<span id="L526" rel="#L526">526</span>
<span id="L527" rel="#L527">527</span>
<span id="L528" rel="#L528">528</span>
<span id="L529" rel="#L529">529</span>
<span id="L530" rel="#L530">530</span>
<span id="L531" rel="#L531">531</span>
<span id="L532" rel="#L532">532</span>
<span id="L533" rel="#L533">533</span>
<span id="L534" rel="#L534">534</span>
<span id="L535" rel="#L535">535</span>
<span id="L536" rel="#L536">536</span>
<span id="L537" rel="#L537">537</span>
<span id="L538" rel="#L538">538</span>
<span id="L539" rel="#L539">539</span>
<span id="L540" rel="#L540">540</span>
<span id="L541" rel="#L541">541</span>
<span id="L542" rel="#L542">542</span>
<span id="L543" rel="#L543">543</span>
<span id="L544" rel="#L544">544</span>
<span id="L545" rel="#L545">545</span>
<span id="L546" rel="#L546">546</span>
<span id="L547" rel="#L547">547</span>
<span id="L548" rel="#L548">548</span>
<span id="L549" rel="#L549">549</span>
<span id="L550" rel="#L550">550</span>
<span id="L551" rel="#L551">551</span>
<span id="L552" rel="#L552">552</span>
<span id="L553" rel="#L553">553</span>
<span id="L554" rel="#L554">554</span>
<span id="L555" rel="#L555">555</span>
<span id="L556" rel="#L556">556</span>
<span id="L557" rel="#L557">557</span>
<span id="L558" rel="#L558">558</span>
<span id="L559" rel="#L559">559</span>
<span id="L560" rel="#L560">560</span>
<span id="L561" rel="#L561">561</span>
<span id="L562" rel="#L562">562</span>
<span id="L563" rel="#L563">563</span>
<span id="L564" rel="#L564">564</span>
<span id="L565" rel="#L565">565</span>
<span id="L566" rel="#L566">566</span>
<span id="L567" rel="#L567">567</span>
<span id="L568" rel="#L568">568</span>
<span id="L569" rel="#L569">569</span>
<span id="L570" rel="#L570">570</span>
<span id="L571" rel="#L571">571</span>
<span id="L572" rel="#L572">572</span>
<span id="L573" rel="#L573">573</span>
<span id="L574" rel="#L574">574</span>
<span id="L575" rel="#L575">575</span>
<span id="L576" rel="#L576">576</span>
<span id="L577" rel="#L577">577</span>
<span id="L578" rel="#L578">578</span>
<span id="L579" rel="#L579">579</span>
<span id="L580" rel="#L580">580</span>
<span id="L581" rel="#L581">581</span>
<span id="L582" rel="#L582">582</span>
<span id="L583" rel="#L583">583</span>
<span id="L584" rel="#L584">584</span>
<span id="L585" rel="#L585">585</span>
<span id="L586" rel="#L586">586</span>
<span id="L587" rel="#L587">587</span>
<span id="L588" rel="#L588">588</span>
<span id="L589" rel="#L589">589</span>
<span id="L590" rel="#L590">590</span>
<span id="L591" rel="#L591">591</span>
<span id="L592" rel="#L592">592</span>
<span id="L593" rel="#L593">593</span>
<span id="L594" rel="#L594">594</span>
<span id="L595" rel="#L595">595</span>
<span id="L596" rel="#L596">596</span>
<span id="L597" rel="#L597">597</span>
<span id="L598" rel="#L598">598</span>
<span id="L599" rel="#L599">599</span>
<span id="L600" rel="#L600">600</span>
<span id="L601" rel="#L601">601</span>
<span id="L602" rel="#L602">602</span>
<span id="L603" rel="#L603">603</span>
<span id="L604" rel="#L604">604</span>
<span id="L605" rel="#L605">605</span>
<span id="L606" rel="#L606">606</span>
<span id="L607" rel="#L607">607</span>
<span id="L608" rel="#L608">608</span>
<span id="L609" rel="#L609">609</span>
<span id="L610" rel="#L610">610</span>
<span id="L611" rel="#L611">611</span>
<span id="L612" rel="#L612">612</span>
<span id="L613" rel="#L613">613</span>
<span id="L614" rel="#L614">614</span>
<span id="L615" rel="#L615">615</span>
<span id="L616" rel="#L616">616</span>
<span id="L617" rel="#L617">617</span>
<span id="L618" rel="#L618">618</span>
<span id="L619" rel="#L619">619</span>
<span id="L620" rel="#L620">620</span>
<span id="L621" rel="#L621">621</span>
<span id="L622" rel="#L622">622</span>
<span id="L623" rel="#L623">623</span>
<span id="L624" rel="#L624">624</span>
<span id="L625" rel="#L625">625</span>
<span id="L626" rel="#L626">626</span>
<span id="L627" rel="#L627">627</span>
<span id="L628" rel="#L628">628</span>
<span id="L629" rel="#L629">629</span>
<span id="L630" rel="#L630">630</span>
<span id="L631" rel="#L631">631</span>
<span id="L632" rel="#L632">632</span>
<span id="L633" rel="#L633">633</span>
<span id="L634" rel="#L634">634</span>
<span id="L635" rel="#L635">635</span>
<span id="L636" rel="#L636">636</span>
<span id="L637" rel="#L637">637</span>
<span id="L638" rel="#L638">638</span>
<span id="L639" rel="#L639">639</span>
<span id="L640" rel="#L640">640</span>
<span id="L641" rel="#L641">641</span>
<span id="L642" rel="#L642">642</span>
<span id="L643" rel="#L643">643</span>
<span id="L644" rel="#L644">644</span>
<span id="L645" rel="#L645">645</span>
<span id="L646" rel="#L646">646</span>
<span id="L647" rel="#L647">647</span>
<span id="L648" rel="#L648">648</span>
<span id="L649" rel="#L649">649</span>
<span id="L650" rel="#L650">650</span>
<span id="L651" rel="#L651">651</span>
<span id="L652" rel="#L652">652</span>
<span id="L653" rel="#L653">653</span>
<span id="L654" rel="#L654">654</span>
<span id="L655" rel="#L655">655</span>
<span id="L656" rel="#L656">656</span>
<span id="L657" rel="#L657">657</span>
<span id="L658" rel="#L658">658</span>
<span id="L659" rel="#L659">659</span>
<span id="L660" rel="#L660">660</span>
<span id="L661" rel="#L661">661</span>
<span id="L662" rel="#L662">662</span>
<span id="L663" rel="#L663">663</span>
<span id="L664" rel="#L664">664</span>
<span id="L665" rel="#L665">665</span>
<span id="L666" rel="#L666">666</span>
<span id="L667" rel="#L667">667</span>
<span id="L668" rel="#L668">668</span>
<span id="L669" rel="#L669">669</span>
<span id="L670" rel="#L670">670</span>
<span id="L671" rel="#L671">671</span>
<span id="L672" rel="#L672">672</span>
<span id="L673" rel="#L673">673</span>
<span id="L674" rel="#L674">674</span>
<span id="L675" rel="#L675">675</span>
<span id="L676" rel="#L676">676</span>
<span id="L677" rel="#L677">677</span>
<span id="L678" rel="#L678">678</span>
<span id="L679" rel="#L679">679</span>
<span id="L680" rel="#L680">680</span>
<span id="L681" rel="#L681">681</span>
<span id="L682" rel="#L682">682</span>
<span id="L683" rel="#L683">683</span>
<span id="L684" rel="#L684">684</span>
<span id="L685" rel="#L685">685</span>
<span id="L686" rel="#L686">686</span>
<span id="L687" rel="#L687">687</span>
<span id="L688" rel="#L688">688</span>
<span id="L689" rel="#L689">689</span>
<span id="L690" rel="#L690">690</span>
<span id="L691" rel="#L691">691</span>
<span id="L692" rel="#L692">692</span>
<span id="L693" rel="#L693">693</span>
<span id="L694" rel="#L694">694</span>
<span id="L695" rel="#L695">695</span>
<span id="L696" rel="#L696">696</span>
<span id="L697" rel="#L697">697</span>
<span id="L698" rel="#L698">698</span>
<span id="L699" rel="#L699">699</span>
<span id="L700" rel="#L700">700</span>
<span id="L701" rel="#L701">701</span>
<span id="L702" rel="#L702">702</span>
<span id="L703" rel="#L703">703</span>
<span id="L704" rel="#L704">704</span>
<span id="L705" rel="#L705">705</span>
<span id="L706" rel="#L706">706</span>
<span id="L707" rel="#L707">707</span>
<span id="L708" rel="#L708">708</span>
<span id="L709" rel="#L709">709</span>
<span id="L710" rel="#L710">710</span>
<span id="L711" rel="#L711">711</span>
<span id="L712" rel="#L712">712</span>
<span id="L713" rel="#L713">713</span>
<span id="L714" rel="#L714">714</span>
<span id="L715" rel="#L715">715</span>
<span id="L716" rel="#L716">716</span>
<span id="L717" rel="#L717">717</span>
<span id="L718" rel="#L718">718</span>
<span id="L719" rel="#L719">719</span>
<span id="L720" rel="#L720">720</span>
<span id="L721" rel="#L721">721</span>
<span id="L722" rel="#L722">722</span>
<span id="L723" rel="#L723">723</span>
<span id="L724" rel="#L724">724</span>
<span id="L725" rel="#L725">725</span>
<span id="L726" rel="#L726">726</span>
<span id="L727" rel="#L727">727</span>
<span id="L728" rel="#L728">728</span>
<span id="L729" rel="#L729">729</span>
<span id="L730" rel="#L730">730</span>
<span id="L731" rel="#L731">731</span>
<span id="L732" rel="#L732">732</span>
<span id="L733" rel="#L733">733</span>
<span id="L734" rel="#L734">734</span>
<span id="L735" rel="#L735">735</span>
<span id="L736" rel="#L736">736</span>
<span id="L737" rel="#L737">737</span>
<span id="L738" rel="#L738">738</span>
<span id="L739" rel="#L739">739</span>
<span id="L740" rel="#L740">740</span>
<span id="L741" rel="#L741">741</span>
<span id="L742" rel="#L742">742</span>
<span id="L743" rel="#L743">743</span>
<span id="L744" rel="#L744">744</span>
<span id="L745" rel="#L745">745</span>
<span id="L746" rel="#L746">746</span>
<span id="L747" rel="#L747">747</span>
<span id="L748" rel="#L748">748</span>
<span id="L749" rel="#L749">749</span>
<span id="L750" rel="#L750">750</span>
<span id="L751" rel="#L751">751</span>
<span id="L752" rel="#L752">752</span>
<span id="L753" rel="#L753">753</span>
<span id="L754" rel="#L754">754</span>
<span id="L755" rel="#L755">755</span>
<span id="L756" rel="#L756">756</span>
<span id="L757" rel="#L757">757</span>
<span id="L758" rel="#L758">758</span>
<span id="L759" rel="#L759">759</span>
<span id="L760" rel="#L760">760</span>
<span id="L761" rel="#L761">761</span>
<span id="L762" rel="#L762">762</span>
<span id="L763" rel="#L763">763</span>
<span id="L764" rel="#L764">764</span>
<span id="L765" rel="#L765">765</span>
<span id="L766" rel="#L766">766</span>
<span id="L767" rel="#L767">767</span>
<span id="L768" rel="#L768">768</span>
<span id="L769" rel="#L769">769</span>
<span id="L770" rel="#L770">770</span>
<span id="L771" rel="#L771">771</span>
<span id="L772" rel="#L772">772</span>
<span id="L773" rel="#L773">773</span>
<span id="L774" rel="#L774">774</span>
<span id="L775" rel="#L775">775</span>
<span id="L776" rel="#L776">776</span>
<span id="L777" rel="#L777">777</span>
<span id="L778" rel="#L778">778</span>
<span id="L779" rel="#L779">779</span>
<span id="L780" rel="#L780">780</span>
<span id="L781" rel="#L781">781</span>
<span id="L782" rel="#L782">782</span>
<span id="L783" rel="#L783">783</span>
<span id="L784" rel="#L784">784</span>
<span id="L785" rel="#L785">785</span>
<span id="L786" rel="#L786">786</span>
<span id="L787" rel="#L787">787</span>
<span id="L788" rel="#L788">788</span>
<span id="L789" rel="#L789">789</span>
<span id="L790" rel="#L790">790</span>
<span id="L791" rel="#L791">791</span>
<span id="L792" rel="#L792">792</span>
<span id="L793" rel="#L793">793</span>
<span id="L794" rel="#L794">794</span>
<span id="L795" rel="#L795">795</span>
<span id="L796" rel="#L796">796</span>
<span id="L797" rel="#L797">797</span>
<span id="L798" rel="#L798">798</span>
<span id="L799" rel="#L799">799</span>
<span id="L800" rel="#L800">800</span>
<span id="L801" rel="#L801">801</span>
<span id="L802" rel="#L802">802</span>
<span id="L803" rel="#L803">803</span>
<span id="L804" rel="#L804">804</span>
<span id="L805" rel="#L805">805</span>
<span id="L806" rel="#L806">806</span>
<span id="L807" rel="#L807">807</span>
<span id="L808" rel="#L808">808</span>
<span id="L809" rel="#L809">809</span>
<span id="L810" rel="#L810">810</span>
<span id="L811" rel="#L811">811</span>
<span id="L812" rel="#L812">812</span>
<span id="L813" rel="#L813">813</span>
<span id="L814" rel="#L814">814</span>
<span id="L815" rel="#L815">815</span>
<span id="L816" rel="#L816">816</span>
<span id="L817" rel="#L817">817</span>
<span id="L818" rel="#L818">818</span>
<span id="L819" rel="#L819">819</span>
<span id="L820" rel="#L820">820</span>
<span id="L821" rel="#L821">821</span>
<span id="L822" rel="#L822">822</span>
<span id="L823" rel="#L823">823</span>
<span id="L824" rel="#L824">824</span>
<span id="L825" rel="#L825">825</span>
<span id="L826" rel="#L826">826</span>
<span id="L827" rel="#L827">827</span>
<span id="L828" rel="#L828">828</span>
<span id="L829" rel="#L829">829</span>
<span id="L830" rel="#L830">830</span>
<span id="L831" rel="#L831">831</span>
<span id="L832" rel="#L832">832</span>
<span id="L833" rel="#L833">833</span>
<span id="L834" rel="#L834">834</span>
<span id="L835" rel="#L835">835</span>
<span id="L836" rel="#L836">836</span>
<span id="L837" rel="#L837">837</span>
<span id="L838" rel="#L838">838</span>
<span id="L839" rel="#L839">839</span>
<span id="L840" rel="#L840">840</span>
<span id="L841" rel="#L841">841</span>
<span id="L842" rel="#L842">842</span>
<span id="L843" rel="#L843">843</span>
<span id="L844" rel="#L844">844</span>
<span id="L845" rel="#L845">845</span>
<span id="L846" rel="#L846">846</span>
<span id="L847" rel="#L847">847</span>
<span id="L848" rel="#L848">848</span>
<span id="L849" rel="#L849">849</span>
<span id="L850" rel="#L850">850</span>
<span id="L851" rel="#L851">851</span>
<span id="L852" rel="#L852">852</span>
<span id="L853" rel="#L853">853</span>
<span id="L854" rel="#L854">854</span>
<span id="L855" rel="#L855">855</span>
<span id="L856" rel="#L856">856</span>
<span id="L857" rel="#L857">857</span>
<span id="L858" rel="#L858">858</span>
<span id="L859" rel="#L859">859</span>
<span id="L860" rel="#L860">860</span>
<span id="L861" rel="#L861">861</span>
<span id="L862" rel="#L862">862</span>
<span id="L863" rel="#L863">863</span>
<span id="L864" rel="#L864">864</span>
<span id="L865" rel="#L865">865</span>
<span id="L866" rel="#L866">866</span>
<span id="L867" rel="#L867">867</span>
<span id="L868" rel="#L868">868</span>
<span id="L869" rel="#L869">869</span>
<span id="L870" rel="#L870">870</span>
<span id="L871" rel="#L871">871</span>
<span id="L872" rel="#L872">872</span>
<span id="L873" rel="#L873">873</span>
<span id="L874" rel="#L874">874</span>
<span id="L875" rel="#L875">875</span>
<span id="L876" rel="#L876">876</span>
<span id="L877" rel="#L877">877</span>
<span id="L878" rel="#L878">878</span>
<span id="L879" rel="#L879">879</span>
<span id="L880" rel="#L880">880</span>
<span id="L881" rel="#L881">881</span>
<span id="L882" rel="#L882">882</span>
<span id="L883" rel="#L883">883</span>
<span id="L884" rel="#L884">884</span>
<span id="L885" rel="#L885">885</span>
<span id="L886" rel="#L886">886</span>
<span id="L887" rel="#L887">887</span>
<span id="L888" rel="#L888">888</span>
<span id="L889" rel="#L889">889</span>
<span id="L890" rel="#L890">890</span>
<span id="L891" rel="#L891">891</span>
<span id="L892" rel="#L892">892</span>
<span id="L893" rel="#L893">893</span>
<span id="L894" rel="#L894">894</span>
<span id="L895" rel="#L895">895</span>
<span id="L896" rel="#L896">896</span>
<span id="L897" rel="#L897">897</span>
<span id="L898" rel="#L898">898</span>
<span id="L899" rel="#L899">899</span>
<span id="L900" rel="#L900">900</span>
<span id="L901" rel="#L901">901</span>
<span id="L902" rel="#L902">902</span>
<span id="L903" rel="#L903">903</span>
<span id="L904" rel="#L904">904</span>
<span id="L905" rel="#L905">905</span>
<span id="L906" rel="#L906">906</span>
<span id="L907" rel="#L907">907</span>
<span id="L908" rel="#L908">908</span>
<span id="L909" rel="#L909">909</span>
<span id="L910" rel="#L910">910</span>
<span id="L911" rel="#L911">911</span>
<span id="L912" rel="#L912">912</span>
<span id="L913" rel="#L913">913</span>
<span id="L914" rel="#L914">914</span>
<span id="L915" rel="#L915">915</span>
<span id="L916" rel="#L916">916</span>
<span id="L917" rel="#L917">917</span>
<span id="L918" rel="#L918">918</span>
<span id="L919" rel="#L919">919</span>
<span id="L920" rel="#L920">920</span>
<span id="L921" rel="#L921">921</span>
<span id="L922" rel="#L922">922</span>
<span id="L923" rel="#L923">923</span>
<span id="L924" rel="#L924">924</span>
<span id="L925" rel="#L925">925</span>
<span id="L926" rel="#L926">926</span>
</pre>
          </td>
          <td width="100%">
                <div class="highlight"><pre><div class='line' id='LC1'><span class="c1">// ColorBox v1.3.19.3 - jQuery lightbox plugin</span></div><div class='line' id='LC2'><span class="c1">// (c) 2011 Jack Moore - jacklmoore.com</span></div><div class='line' id='LC3'><span class="c1">// License: http://www.opensource.org/licenses/mit-license.php</span></div><div class='line' id='LC4'><span class="p">(</span><span class="kd">function</span> <span class="p">(</span><span class="nx">$</span><span class="p">,</span> <span class="nb">document</span><span class="p">,</span> <span class="nb">window</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC5'>	<span class="kd">var</span></div><div class='line' id='LC6'>	<span class="c1">// Default settings object.	</span></div><div class='line' id='LC7'>	<span class="c1">// See http://jacklmoore.com/colorbox for details.</span></div><div class='line' id='LC8'>	<span class="nx">defaults</span> <span class="o">=</span> <span class="p">{</span></div><div class='line' id='LC9'>		<span class="nx">transition</span><span class="o">:</span> <span class="s2">&quot;elastic&quot;</span><span class="p">,</span></div><div class='line' id='LC10'>		<span class="nx">speed</span><span class="o">:</span> <span class="mi">300</span><span class="p">,</span></div><div class='line' id='LC11'>		<span class="nx">width</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC12'>		<span class="nx">initialWidth</span><span class="o">:</span> <span class="s2">&quot;600&quot;</span><span class="p">,</span></div><div class='line' id='LC13'>		<span class="nx">innerWidth</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC14'>		<span class="nx">maxWidth</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC15'>		<span class="nx">height</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC16'>		<span class="nx">initialHeight</span><span class="o">:</span> <span class="s2">&quot;450&quot;</span><span class="p">,</span></div><div class='line' id='LC17'>		<span class="nx">innerHeight</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC18'>		<span class="nx">maxHeight</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC19'>		<span class="nx">scalePhotos</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC20'>		<span class="nx">scrolling</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC21'>		<span class="nx">inline</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC22'>		<span class="nx">html</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC23'>		<span class="nx">iframe</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC24'>		<span class="nx">fastIframe</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC25'>		<span class="nx">photo</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC26'>		<span class="nx">href</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC27'>		<span class="nx">title</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC28'>		<span class="nx">rel</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC29'>		<span class="nx">opacity</span><span class="o">:</span> <span class="mf">0.9</span><span class="p">,</span></div><div class='line' id='LC30'>		<span class="nx">preloading</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC31'><br/></div><div class='line' id='LC32'>		<span class="nx">current</span><span class="o">:</span> <span class="s2">&quot;image {current} of {total}&quot;</span><span class="p">,</span></div><div class='line' id='LC33'>		<span class="nx">previous</span><span class="o">:</span> <span class="s2">&quot;previous&quot;</span><span class="p">,</span></div><div class='line' id='LC34'>		<span class="nx">next</span><span class="o">:</span> <span class="s2">&quot;next&quot;</span><span class="p">,</span></div><div class='line' id='LC35'>		<span class="nx">close</span><span class="o">:</span> <span class="s2">&quot;close&quot;</span><span class="p">,</span></div><div class='line' id='LC36'>		<span class="nx">xhrError</span><span class="o">:</span> <span class="s2">&quot;This content failed to load.&quot;</span><span class="p">,</span></div><div class='line' id='LC37'>		<span class="nx">imgError</span><span class="o">:</span> <span class="s2">&quot;This image failed to load.&quot;</span><span class="p">,</span></div><div class='line' id='LC38'><br/></div><div class='line' id='LC39'>		<span class="nx">open</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC40'>		<span class="nx">returnFocus</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC41'>		<span class="nx">reposition</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC42'>		<span class="nx">loop</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC43'>		<span class="nx">slideshow</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC44'>		<span class="nx">slideshowAuto</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC45'>		<span class="nx">slideshowSpeed</span><span class="o">:</span> <span class="mi">2500</span><span class="p">,</span></div><div class='line' id='LC46'>		<span class="nx">slideshowStart</span><span class="o">:</span> <span class="s2">&quot;start slideshow&quot;</span><span class="p">,</span></div><div class='line' id='LC47'>		<span class="nx">slideshowStop</span><span class="o">:</span> <span class="s2">&quot;stop slideshow&quot;</span><span class="p">,</span></div><div class='line' id='LC48'>		<span class="nx">onOpen</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC49'>		<span class="nx">onLoad</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC50'>		<span class="nx">onComplete</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC51'>		<span class="nx">onCleanup</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC52'>		<span class="nx">onClosed</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC53'>		<span class="nx">overlayClose</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>		</div><div class='line' id='LC54'>		<span class="nx">escKey</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC55'>		<span class="nx">arrowKey</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span></div><div class='line' id='LC56'>		<span class="nx">top</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC57'>		<span class="nx">bottom</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC58'>		<span class="nx">left</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC59'>		<span class="nx">right</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC60'>		<span class="nx">fixed</span><span class="o">:</span> <span class="kc">false</span><span class="p">,</span></div><div class='line' id='LC61'>		<span class="nx">data</span><span class="o">:</span> <span class="kc">undefined</span></div><div class='line' id='LC62'>	<span class="p">},</span></div><div class='line' id='LC63'><br/></div><div class='line' id='LC64'>	<span class="c1">// Abstracting the HTML and event identifiers for easy rebranding</span></div><div class='line' id='LC65'>	<span class="nx">colorbox</span> <span class="o">=</span> <span class="s1">&#39;colorbox&#39;</span><span class="p">,</span></div><div class='line' id='LC66'>	<span class="nx">prefix</span> <span class="o">=</span> <span class="s1">&#39;cbox&#39;</span><span class="p">,</span></div><div class='line' id='LC67'>	<span class="nx">boxElement</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;Element&#39;</span><span class="p">,</span></div><div class='line' id='LC68'><br/></div><div class='line' id='LC69'>	<span class="c1">// Events	</span></div><div class='line' id='LC70'>	<span class="nx">event_open</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;_open&#39;</span><span class="p">,</span></div><div class='line' id='LC71'>	<span class="nx">event_load</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;_load&#39;</span><span class="p">,</span></div><div class='line' id='LC72'>	<span class="nx">event_complete</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;_complete&#39;</span><span class="p">,</span></div><div class='line' id='LC73'>	<span class="nx">event_cleanup</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;_cleanup&#39;</span><span class="p">,</span></div><div class='line' id='LC74'>	<span class="nx">event_closed</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;_closed&#39;</span><span class="p">,</span></div><div class='line' id='LC75'>	<span class="nx">event_purge</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;_purge&#39;</span><span class="p">,</span></div><div class='line' id='LC76'><br/></div><div class='line' id='LC77'>	<span class="c1">// Special Handling for IE</span></div><div class='line' id='LC78'>	<span class="nx">isIE</span> <span class="o">=</span> <span class="o">!</span><span class="nx">$</span><span class="p">.</span><span class="nx">support</span><span class="p">.</span><span class="nx">opacity</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">$</span><span class="p">.</span><span class="nx">support</span><span class="p">.</span><span class="nx">style</span><span class="p">,</span> <span class="c1">// IE7 &amp; IE8</span></div><div class='line' id='LC79'>	<span class="nx">isIE6</span> <span class="o">=</span> <span class="nx">isIE</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nb">window</span><span class="p">.</span><span class="nx">XMLHttpRequest</span><span class="p">,</span> <span class="c1">// IE6</span></div><div class='line' id='LC80'>	<span class="nx">event_ie6</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;_IE6&#39;</span><span class="p">,</span></div><div class='line' id='LC81'><br/></div><div class='line' id='LC82'>	<span class="c1">// Cached jQuery Object Variables</span></div><div class='line' id='LC83'>	<span class="nx">$overlay</span><span class="p">,</span></div><div class='line' id='LC84'>	<span class="nx">$box</span><span class="p">,</span></div><div class='line' id='LC85'>	<span class="nx">$wrap</span><span class="p">,</span></div><div class='line' id='LC86'>	<span class="nx">$content</span><span class="p">,</span></div><div class='line' id='LC87'>	<span class="nx">$topBorder</span><span class="p">,</span></div><div class='line' id='LC88'>	<span class="nx">$leftBorder</span><span class="p">,</span></div><div class='line' id='LC89'>	<span class="nx">$rightBorder</span><span class="p">,</span></div><div class='line' id='LC90'>	<span class="nx">$bottomBorder</span><span class="p">,</span></div><div class='line' id='LC91'>	<span class="nx">$related</span><span class="p">,</span></div><div class='line' id='LC92'>	<span class="nx">$window</span><span class="p">,</span></div><div class='line' id='LC93'>	<span class="nx">$loaded</span><span class="p">,</span></div><div class='line' id='LC94'>	<span class="nx">$loadingBay</span><span class="p">,</span></div><div class='line' id='LC95'>	<span class="nx">$loadingOverlay</span><span class="p">,</span></div><div class='line' id='LC96'>	<span class="nx">$title</span><span class="p">,</span></div><div class='line' id='LC97'>	<span class="nx">$current</span><span class="p">,</span></div><div class='line' id='LC98'>	<span class="nx">$slideshow</span><span class="p">,</span></div><div class='line' id='LC99'>	<span class="nx">$next</span><span class="p">,</span></div><div class='line' id='LC100'>	<span class="nx">$prev</span><span class="p">,</span></div><div class='line' id='LC101'>	<span class="nx">$close</span><span class="p">,</span></div><div class='line' id='LC102'>	<span class="nx">$groupControls</span><span class="p">,</span></div><div class='line' id='LC103'><br/></div><div class='line' id='LC104'>	<span class="c1">// Variables for cached values or use across multiple functions</span></div><div class='line' id='LC105'>	<span class="nx">settings</span><span class="p">,</span></div><div class='line' id='LC106'>	<span class="nx">interfaceHeight</span><span class="p">,</span></div><div class='line' id='LC107'>	<span class="nx">interfaceWidth</span><span class="p">,</span></div><div class='line' id='LC108'>	<span class="nx">loadedHeight</span><span class="p">,</span></div><div class='line' id='LC109'>	<span class="nx">loadedWidth</span><span class="p">,</span></div><div class='line' id='LC110'>	<span class="nx">element</span><span class="p">,</span></div><div class='line' id='LC111'>	<span class="nx">index</span><span class="p">,</span></div><div class='line' id='LC112'>	<span class="nx">photo</span><span class="p">,</span></div><div class='line' id='LC113'>	<span class="nx">open</span><span class="p">,</span></div><div class='line' id='LC114'>	<span class="nx">active</span><span class="p">,</span></div><div class='line' id='LC115'>	<span class="nx">closing</span><span class="p">,</span></div><div class='line' id='LC116'>	<span class="nx">loadingTimer</span><span class="p">,</span></div><div class='line' id='LC117'>	<span class="nx">publicMethod</span><span class="p">,</span></div><div class='line' id='LC118'>	<span class="nx">div</span> <span class="o">=</span> <span class="s2">&quot;div&quot;</span><span class="p">,</span></div><div class='line' id='LC119'>	<span class="nx">init</span><span class="p">;</span></div><div class='line' id='LC120'><br/></div><div class='line' id='LC121'>	<span class="c1">// ****************</span></div><div class='line' id='LC122'>	<span class="c1">// HELPER FUNCTIONS</span></div><div class='line' id='LC123'>	<span class="c1">// ****************</span></div><div class='line' id='LC124'><br/></div><div class='line' id='LC125'>	<span class="c1">// Convience function for creating new jQuery objects</span></div><div class='line' id='LC126'>	<span class="kd">function</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">tag</span><span class="p">,</span> <span class="nx">id</span><span class="p">,</span> <span class="nx">css</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC127'>		<span class="kd">var</span> <span class="nx">element</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">createElement</span><span class="p">(</span><span class="nx">tag</span><span class="p">);</span></div><div class='line' id='LC128'><br/></div><div class='line' id='LC129'>		<span class="k">if</span> <span class="p">(</span><span class="nx">id</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC130'>			<span class="nx">element</span><span class="p">.</span><span class="nx">id</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="nx">id</span><span class="p">;</span></div><div class='line' id='LC131'>		<span class="p">}</span></div><div class='line' id='LC132'><br/></div><div class='line' id='LC133'>		<span class="k">if</span> <span class="p">(</span><span class="nx">css</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC134'>			<span class="nx">element</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">cssText</span> <span class="o">=</span> <span class="nx">css</span><span class="p">;</span></div><div class='line' id='LC135'>		<span class="p">}</span></div><div class='line' id='LC136'><br/></div><div class='line' id='LC137'>		<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC138'>	<span class="p">}</span></div><div class='line' id='LC139'><br/></div><div class='line' id='LC140'>	<span class="c1">// Determine the next and previous members in a group.</span></div><div class='line' id='LC141'>	<span class="kd">function</span> <span class="nx">getIndex</span><span class="p">(</span><span class="nx">increment</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC142'>		<span class="kd">var</span> </div><div class='line' id='LC143'>		<span class="nx">max</span> <span class="o">=</span> <span class="nx">$related</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span> </div><div class='line' id='LC144'>		<span class="nx">newIndex</span> <span class="o">=</span> <span class="p">(</span><span class="nx">index</span> <span class="o">+</span> <span class="nx">increment</span><span class="p">)</span> <span class="o">%</span> <span class="nx">max</span><span class="p">;</span></div><div class='line' id='LC145'><br/></div><div class='line' id='LC146'>		<span class="k">return</span> <span class="p">(</span><span class="nx">newIndex</span> <span class="o">&lt;</span> <span class="mi">0</span><span class="p">)</span> <span class="o">?</span> <span class="nx">max</span> <span class="o">+</span> <span class="nx">newIndex</span> <span class="o">:</span> <span class="nx">newIndex</span><span class="p">;</span></div><div class='line' id='LC147'>	<span class="p">}</span></div><div class='line' id='LC148'><br/></div><div class='line' id='LC149'>	<span class="c1">// Convert &#39;%&#39; and &#39;px&#39; values to integers</span></div><div class='line' id='LC150'>	<span class="kd">function</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">size</span><span class="p">,</span> <span class="nx">dimension</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC151'>		<span class="k">return</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">((</span><span class="sr">/%/</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">size</span><span class="p">)</span> <span class="o">?</span> <span class="p">((</span><span class="nx">dimension</span> <span class="o">===</span> <span class="s1">&#39;x&#39;</span> <span class="o">?</span> <span class="nx">$window</span><span class="p">.</span><span class="nx">width</span><span class="p">()</span> <span class="o">:</span> <span class="nx">$window</span><span class="p">.</span><span class="nx">height</span><span class="p">())</span> <span class="o">/</span> <span class="mi">100</span><span class="p">)</span> <span class="o">:</span> <span class="mi">1</span><span class="p">)</span> <span class="o">*</span> <span class="nb">parseInt</span><span class="p">(</span><span class="nx">size</span><span class="p">,</span> <span class="mi">10</span><span class="p">));</span></div><div class='line' id='LC152'>	<span class="p">}</span></div><div class='line' id='LC153'><br/></div><div class='line' id='LC154'>	<span class="c1">// Checks an href to see if it is a photo.</span></div><div class='line' id='LC155'>	<span class="c1">// There is a force photo option (photo: true) for hrefs that cannot be matched by this regex.</span></div><div class='line' id='LC156'>	<span class="kd">function</span> <span class="nx">isImage</span><span class="p">(</span><span class="nx">url</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC157'>		<span class="k">return</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">photo</span> <span class="o">||</span> <span class="sr">/\.(gif|png|jpe?g|bmp|ico)((#|\?).*)?$/i</span><span class="p">.</span><span class="nx">test</span><span class="p">(</span><span class="nx">url</span><span class="p">);</span></div><div class='line' id='LC158'>	<span class="p">}</span></div><div class='line' id='LC159'><br/></div><div class='line' id='LC160'>	<span class="c1">// Assigns function results to their respective properties</span></div><div class='line' id='LC161'>	<span class="kd">function</span> <span class="nx">makeSettings</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC162'>		<span class="kd">var</span> <span class="nx">i</span><span class="p">,</span></div><div class='line' id='LC163'>			<span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="nx">element</span><span class="p">,</span> <span class="nx">colorbox</span><span class="p">);</span></div><div class='line' id='LC164'><br/></div><div class='line' id='LC165'>		<span class="k">if</span> <span class="p">(</span><span class="nx">data</span> <span class="o">==</span> <span class="kc">null</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC166'>			<span class="nx">settings</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">({},</span> <span class="nx">defaults</span><span class="p">);</span></div><div class='line' id='LC167'>			<span class="k">if</span> <span class="p">(</span><span class="nx">console</span> <span class="o">&amp;&amp;</span> <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC168'>				<span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Error: cboxElement missing settings object&#39;</span><span class="p">)</span></div><div class='line' id='LC169'>			<span class="p">}</span></div><div class='line' id='LC170'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC171'>			<span class="nx">settings</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">({},</span> <span class="nx">data</span><span class="p">);</span>    		</div><div class='line' id='LC172'>		<span class="p">}</span></div><div class='line' id='LC173'><br/></div><div class='line' id='LC174'>		<span class="k">for</span> <span class="p">(</span><span class="nx">i</span> <span class="k">in</span> <span class="nx">settings</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC175'>			<span class="k">if</span> <span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">isFunction</span><span class="p">(</span><span class="nx">settings</span><span class="p">[</span><span class="nx">i</span><span class="p">])</span> <span class="o">&amp;&amp;</span> <span class="nx">i</span><span class="p">.</span><span class="nx">slice</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="mi">2</span><span class="p">)</span> <span class="o">!==</span> <span class="s1">&#39;on&#39;</span><span class="p">)</span> <span class="p">{</span> <span class="c1">// checks to make sure the function isn&#39;t one of the callbacks, they will be handled at the appropriate time.</span></div><div class='line' id='LC176'>				<span class="nx">settings</span><span class="p">[</span><span class="nx">i</span><span class="p">]</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">[</span><span class="nx">i</span><span class="p">].</span><span class="nx">call</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC177'>			<span class="p">}</span></div><div class='line' id='LC178'>		<span class="p">}</span></div><div class='line' id='LC179'><br/></div><div class='line' id='LC180'>		<span class="nx">settings</span><span class="p">.</span><span class="nx">rel</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">rel</span> <span class="o">||</span> <span class="nx">element</span><span class="p">.</span><span class="nx">rel</span> <span class="o">||</span> <span class="s1">&#39;nofollow&#39;</span><span class="p">;</span></div><div class='line' id='LC181'>		<span class="nx">settings</span><span class="p">.</span><span class="nx">href</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">href</span> <span class="o">||</span> <span class="nx">$</span><span class="p">(</span><span class="nx">element</span><span class="p">).</span><span class="nx">attr</span><span class="p">(</span><span class="s1">&#39;href&#39;</span><span class="p">);</span></div><div class='line' id='LC182'>		<span class="nx">settings</span><span class="p">.</span><span class="nx">title</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">title</span> <span class="o">||</span> <span class="nx">element</span><span class="p">.</span><span class="nx">title</span><span class="p">;</span></div><div class='line' id='LC183'><br/></div><div class='line' id='LC184'>		<span class="k">if</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">href</span> <span class="o">===</span> <span class="s2">&quot;string&quot;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC185'>			<span class="nx">settings</span><span class="p">.</span><span class="nx">href</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">trim</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">href</span><span class="p">);</span></div><div class='line' id='LC186'>		<span class="p">}</span></div><div class='line' id='LC187'>	<span class="p">}</span></div><div class='line' id='LC188'><br/></div><div class='line' id='LC189'>	<span class="kd">function</span> <span class="nx">trigger</span><span class="p">(</span><span class="nx">event</span><span class="p">,</span> <span class="nx">callback</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC190'>		<span class="nx">$</span><span class="p">.</span><span class="nx">event</span><span class="p">.</span><span class="nx">trigger</span><span class="p">(</span><span class="nx">event</span><span class="p">);</span></div><div class='line' id='LC191'>		<span class="k">if</span> <span class="p">(</span><span class="nx">callback</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC192'>			<span class="nx">callback</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC193'>		<span class="p">}</span></div><div class='line' id='LC194'>	<span class="p">}</span></div><div class='line' id='LC195'><br/></div><div class='line' id='LC196'>	<span class="c1">// Slideshow functionality</span></div><div class='line' id='LC197'>	<span class="kd">function</span> <span class="nx">slideshow</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC198'>		<span class="kd">var</span></div><div class='line' id='LC199'>		<span class="nx">timeOut</span><span class="p">,</span></div><div class='line' id='LC200'>		<span class="nx">className</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s2">&quot;Slideshow_&quot;</span><span class="p">,</span></div><div class='line' id='LC201'>		<span class="nx">click</span> <span class="o">=</span> <span class="s2">&quot;click.&quot;</span> <span class="o">+</span> <span class="nx">prefix</span><span class="p">,</span></div><div class='line' id='LC202'>		<span class="nx">start</span><span class="p">,</span></div><div class='line' id='LC203'>		<span class="nx">stop</span><span class="p">,</span></div><div class='line' id='LC204'>		<span class="nx">clear</span><span class="p">;</span></div><div class='line' id='LC205'><br/></div><div class='line' id='LC206'>		<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">slideshow</span> <span class="o">&amp;&amp;</span> <span class="nx">$related</span><span class="p">[</span><span class="mi">1</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC207'>			<span class="nx">start</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC208'>				<span class="nx">$slideshow</span></div><div class='line' id='LC209'>					<span class="p">.</span><span class="nx">text</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">slideshowStop</span><span class="p">)</span></div><div class='line' id='LC210'>					<span class="p">.</span><span class="nx">unbind</span><span class="p">(</span><span class="nx">click</span><span class="p">)</span></div><div class='line' id='LC211'>					<span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="nx">event_complete</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC212'>						<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">loop</span> <span class="o">||</span> <span class="nx">$related</span><span class="p">[</span><span class="nx">index</span> <span class="o">+</span> <span class="mi">1</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC213'>							<span class="nx">timeOut</span> <span class="o">=</span> <span class="nx">setTimeout</span><span class="p">(</span><span class="nx">publicMethod</span><span class="p">.</span><span class="nx">next</span><span class="p">,</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">slideshowSpeed</span><span class="p">);</span></div><div class='line' id='LC214'>						<span class="p">}</span></div><div class='line' id='LC215'>					<span class="p">})</span></div><div class='line' id='LC216'>					<span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="nx">event_load</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC217'>						<span class="nx">clearTimeout</span><span class="p">(</span><span class="nx">timeOut</span><span class="p">);</span></div><div class='line' id='LC218'>					<span class="p">})</span></div><div class='line' id='LC219'>					<span class="p">.</span><span class="nx">one</span><span class="p">(</span><span class="nx">click</span> <span class="o">+</span> <span class="s1">&#39; &#39;</span> <span class="o">+</span> <span class="nx">event_cleanup</span><span class="p">,</span> <span class="nx">stop</span><span class="p">);</span></div><div class='line' id='LC220'>				<span class="nx">$box</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="nx">className</span> <span class="o">+</span> <span class="s2">&quot;off&quot;</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="nx">className</span> <span class="o">+</span> <span class="s2">&quot;on&quot;</span><span class="p">);</span></div><div class='line' id='LC221'>				<span class="nx">timeOut</span> <span class="o">=</span> <span class="nx">setTimeout</span><span class="p">(</span><span class="nx">publicMethod</span><span class="p">.</span><span class="nx">next</span><span class="p">,</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">slideshowSpeed</span><span class="p">);</span></div><div class='line' id='LC222'>			<span class="p">};</span></div><div class='line' id='LC223'><br/></div><div class='line' id='LC224'>			<span class="nx">stop</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC225'>				<span class="nx">clearTimeout</span><span class="p">(</span><span class="nx">timeOut</span><span class="p">);</span></div><div class='line' id='LC226'>				<span class="nx">$slideshow</span></div><div class='line' id='LC227'>					<span class="p">.</span><span class="nx">text</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">slideshowStart</span><span class="p">)</span></div><div class='line' id='LC228'>					<span class="p">.</span><span class="nx">unbind</span><span class="p">([</span><span class="nx">event_complete</span><span class="p">,</span> <span class="nx">event_load</span><span class="p">,</span> <span class="nx">event_cleanup</span><span class="p">,</span> <span class="nx">click</span><span class="p">].</span><span class="nx">join</span><span class="p">(</span><span class="s1">&#39; &#39;</span><span class="p">))</span></div><div class='line' id='LC229'>					<span class="p">.</span><span class="nx">one</span><span class="p">(</span><span class="nx">click</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC230'>						<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">next</span><span class="p">();</span></div><div class='line' id='LC231'>						<span class="nx">start</span><span class="p">();</span></div><div class='line' id='LC232'>					<span class="p">});</span></div><div class='line' id='LC233'>				<span class="nx">$box</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="nx">className</span> <span class="o">+</span> <span class="s2">&quot;on&quot;</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="nx">className</span> <span class="o">+</span> <span class="s2">&quot;off&quot;</span><span class="p">);</span></div><div class='line' id='LC234'>			<span class="p">};</span></div><div class='line' id='LC235'><br/></div><div class='line' id='LC236'>			<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">slideshowAuto</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC237'>				<span class="nx">start</span><span class="p">();</span></div><div class='line' id='LC238'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC239'>				<span class="nx">stop</span><span class="p">();</span></div><div class='line' id='LC240'>			<span class="p">}</span></div><div class='line' id='LC241'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC242'>			<span class="nx">$box</span><span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="nx">className</span> <span class="o">+</span> <span class="s2">&quot;off &quot;</span> <span class="o">+</span> <span class="nx">className</span> <span class="o">+</span> <span class="s2">&quot;on&quot;</span><span class="p">);</span></div><div class='line' id='LC243'>		<span class="p">}</span></div><div class='line' id='LC244'>	<span class="p">}</span></div><div class='line' id='LC245'><br/></div><div class='line' id='LC246'>	<span class="kd">function</span> <span class="nx">launch</span><span class="p">(</span><span class="nx">target</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC247'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">closing</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC248'><br/></div><div class='line' id='LC249'>			<span class="nx">element</span> <span class="o">=</span> <span class="nx">target</span><span class="p">;</span></div><div class='line' id='LC250'><br/></div><div class='line' id='LC251'>			<span class="nx">makeSettings</span><span class="p">();</span></div><div class='line' id='LC252'><br/></div><div class='line' id='LC253'>			<span class="nx">$related</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC254'><br/></div><div class='line' id='LC255'>			<span class="nx">index</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC256'><br/></div><div class='line' id='LC257'>			<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">rel</span> <span class="o">!==</span> <span class="s1">&#39;nofollow&#39;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC258'>				<span class="nx">$related</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="s1">&#39;.&#39;</span> <span class="o">+</span> <span class="nx">boxElement</span><span class="p">).</span><span class="nx">filter</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC259'>					<span class="kd">var</span> <span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">colorbox</span><span class="p">),</span> </div><div class='line' id='LC260'>						<span class="nx">relRelated</span><span class="p">;</span></div><div class='line' id='LC261'><br/></div><div class='line' id='LC262'>					<span class="k">if</span> <span class="p">(</span><span class="nx">data</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC263'>						<span class="nx">relRelated</span> <span class="o">=</span>  <span class="nx">data</span><span class="p">.</span><span class="nx">rel</span> <span class="o">||</span> <span class="k">this</span><span class="p">.</span><span class="nx">rel</span><span class="p">;</span></div><div class='line' id='LC264'>					<span class="p">}</span></div><div class='line' id='LC265'><br/></div><div class='line' id='LC266'>					<span class="k">return</span> <span class="p">(</span><span class="nx">relRelated</span> <span class="o">===</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">rel</span><span class="p">);</span></div><div class='line' id='LC267'>				<span class="p">});</span></div><div class='line' id='LC268'>				<span class="nx">index</span> <span class="o">=</span> <span class="nx">$related</span><span class="p">.</span><span class="nx">index</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC269'><br/></div><div class='line' id='LC270'>				<span class="c1">// Check direct calls to ColorBox.</span></div><div class='line' id='LC271'>				<span class="k">if</span> <span class="p">(</span><span class="nx">index</span> <span class="o">===</span> <span class="o">-</span><span class="mi">1</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC272'>					<span class="nx">$related</span> <span class="o">=</span> <span class="nx">$related</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC273'>					<span class="nx">index</span> <span class="o">=</span> <span class="nx">$related</span><span class="p">.</span><span class="nx">length</span> <span class="o">-</span> <span class="mi">1</span><span class="p">;</span></div><div class='line' id='LC274'>				<span class="p">}</span></div><div class='line' id='LC275'>			<span class="p">}</span></div><div class='line' id='LC276'><br/></div><div class='line' id='LC277'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">open</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC278'>				<span class="nx">open</span> <span class="o">=</span> <span class="nx">active</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span> <span class="c1">// Prevents the page-change action from queuing up if the visitor holds down the left or right keys.</span></div><div class='line' id='LC279'><br/></div><div class='line' id='LC280'>				<span class="nx">$box</span><span class="p">.</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC281'><br/></div><div class='line' id='LC282'>				<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">returnFocus</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC283'>					<span class="nx">$</span><span class="p">(</span><span class="nx">element</span><span class="p">).</span><span class="nx">blur</span><span class="p">().</span><span class="nx">one</span><span class="p">(</span><span class="nx">event_closed</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC284'>						<span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">focus</span><span class="p">();</span></div><div class='line' id='LC285'>					<span class="p">});</span></div><div class='line' id='LC286'>				<span class="p">}</span></div><div class='line' id='LC287'><br/></div><div class='line' id='LC288'>				<span class="c1">// +settings.opacity avoids a problem in IE when using non-zero-prefixed-string-values, like &#39;.5&#39;</span></div><div class='line' id='LC289'>				<span class="nx">$overlay</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="s2">&quot;opacity&quot;</span><span class="o">:</span> <span class="o">+</span><span class="nx">settings</span><span class="p">.</span><span class="nx">opacity</span><span class="p">,</span> <span class="s2">&quot;cursor&quot;</span><span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">overlayClose</span> <span class="o">?</span> <span class="s2">&quot;pointer&quot;</span> <span class="o">:</span> <span class="s2">&quot;auto&quot;</span><span class="p">}).</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC290'><br/></div><div class='line' id='LC291'>				<span class="c1">// Opens inital empty ColorBox prior to content being loaded.</span></div><div class='line' id='LC292'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">initialWidth</span><span class="p">,</span> <span class="s1">&#39;x&#39;</span><span class="p">);</span></div><div class='line' id='LC293'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">initialHeight</span><span class="p">,</span> <span class="s1">&#39;y&#39;</span><span class="p">);</span></div><div class='line' id='LC294'>				<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">position</span><span class="p">();</span></div><div class='line' id='LC295'><br/></div><div class='line' id='LC296'>				<span class="k">if</span> <span class="p">(</span><span class="nx">isIE6</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC297'>					<span class="nx">$window</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="s1">&#39;resize.&#39;</span> <span class="o">+</span> <span class="nx">event_ie6</span> <span class="o">+</span> <span class="s1">&#39; scroll.&#39;</span> <span class="o">+</span> <span class="nx">event_ie6</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC298'>						<span class="nx">$overlay</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">width</span><span class="o">:</span> <span class="nx">$window</span><span class="p">.</span><span class="nx">width</span><span class="p">(),</span> <span class="nx">height</span><span class="o">:</span> <span class="nx">$window</span><span class="p">.</span><span class="nx">height</span><span class="p">(),</span> <span class="nx">top</span><span class="o">:</span> <span class="nx">$window</span><span class="p">.</span><span class="nx">scrollTop</span><span class="p">(),</span> <span class="nx">left</span><span class="o">:</span> <span class="nx">$window</span><span class="p">.</span><span class="nx">scrollLeft</span><span class="p">()});</span></div><div class='line' id='LC299'>					<span class="p">}).</span><span class="nx">trigger</span><span class="p">(</span><span class="s1">&#39;resize.&#39;</span> <span class="o">+</span> <span class="nx">event_ie6</span><span class="p">);</span></div><div class='line' id='LC300'>				<span class="p">}</span></div><div class='line' id='LC301'><br/></div><div class='line' id='LC302'>				<span class="nx">trigger</span><span class="p">(</span><span class="nx">event_open</span><span class="p">,</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">onOpen</span><span class="p">);</span></div><div class='line' id='LC303'><br/></div><div class='line' id='LC304'>				<span class="nx">$groupControls</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="nx">$title</span><span class="p">).</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC305'><br/></div><div class='line' id='LC306'>				<span class="nx">$close</span><span class="p">.</span><span class="nx">html</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">close</span><span class="p">).</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC307'>			<span class="p">}</span></div><div class='line' id='LC308'><br/></div><div class='line' id='LC309'>			<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">load</span><span class="p">(</span><span class="kc">true</span><span class="p">);</span></div><div class='line' id='LC310'>		<span class="p">}</span></div><div class='line' id='LC311'>	<span class="p">}</span></div><div class='line' id='LC312'><br/></div><div class='line' id='LC313'>	<span class="c1">// ColorBox&#39;s markup needs to be added to the DOM prior to being called</span></div><div class='line' id='LC314'>	<span class="c1">// so that the browser will go ahead and load the CSS background images.</span></div><div class='line' id='LC315'>	<span class="kd">function</span> <span class="nx">appendHTML</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC316'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">$box</span> <span class="o">&amp;&amp;</span> <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC317'>			<span class="nx">init</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC318'><br/></div><div class='line' id='LC319'>			<span class="nx">$window</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="nb">window</span><span class="p">);</span></div><div class='line' id='LC320'>			<span class="nx">$box</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">).</span><span class="nx">attr</span><span class="p">({</span><span class="nx">id</span><span class="o">:</span> <span class="nx">colorbox</span><span class="p">,</span> <span class="s1">&#39;class&#39;</span><span class="o">:</span> <span class="nx">isIE</span> <span class="o">?</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="p">(</span><span class="nx">isIE6</span> <span class="o">?</span> <span class="s1">&#39;IE6&#39;</span> <span class="o">:</span> <span class="s1">&#39;IE&#39;</span><span class="p">)</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">}).</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC321'>			<span class="nx">$overlay</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;Overlay&quot;</span><span class="p">,</span> <span class="nx">isIE6</span> <span class="o">?</span> <span class="s1">&#39;position:absolute&#39;</span> <span class="o">:</span> <span class="s1">&#39;&#39;</span><span class="p">).</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC322'>			<span class="nx">$wrap</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;Wrapper&quot;</span><span class="p">);</span></div><div class='line' id='LC323'>			<span class="nx">$content</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;Content&quot;</span><span class="p">).</span><span class="nx">append</span><span class="p">(</span></div><div class='line' id='LC324'>				<span class="nx">$loaded</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;LoadedContent&quot;</span><span class="p">,</span> <span class="s1">&#39;width:0; height:0; overflow:hidden&#39;</span><span class="p">),</span></div><div class='line' id='LC325'>				<span class="nx">$loadingOverlay</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;LoadingOverlay&quot;</span><span class="p">).</span><span class="nx">add</span><span class="p">(</span><span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;LoadingGraphic&quot;</span><span class="p">)),</span></div><div class='line' id='LC326'>				<span class="nx">$title</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;Title&quot;</span><span class="p">),</span></div><div class='line' id='LC327'>				<span class="nx">$current</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;Current&quot;</span><span class="p">),</span></div><div class='line' id='LC328'>				<span class="nx">$next</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;Next&quot;</span><span class="p">),</span></div><div class='line' id='LC329'>				<span class="nx">$prev</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;Previous&quot;</span><span class="p">),</span></div><div class='line' id='LC330'>				<span class="nx">$slideshow</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;Slideshow&quot;</span><span class="p">).</span><span class="nx">bind</span><span class="p">(</span><span class="nx">event_open</span><span class="p">,</span> <span class="nx">slideshow</span><span class="p">),</span></div><div class='line' id='LC331'>				<span class="nx">$close</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;Close&quot;</span><span class="p">)</span></div><div class='line' id='LC332'>			<span class="p">);</span></div><div class='line' id='LC333'><br/></div><div class='line' id='LC334'>			<span class="nx">$wrap</span><span class="p">.</span><span class="nx">append</span><span class="p">(</span> <span class="c1">// The 3x3 Grid that makes up ColorBox</span></div><div class='line' id='LC335'>				<span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">).</span><span class="nx">append</span><span class="p">(</span></div><div class='line' id='LC336'>					<span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;TopLeft&quot;</span><span class="p">),</span></div><div class='line' id='LC337'>					<span class="nx">$topBorder</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;TopCenter&quot;</span><span class="p">),</span></div><div class='line' id='LC338'>					<span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;TopRight&quot;</span><span class="p">)</span></div><div class='line' id='LC339'>				<span class="p">),</span></div><div class='line' id='LC340'>				<span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="s1">&#39;clear:left&#39;</span><span class="p">).</span><span class="nx">append</span><span class="p">(</span></div><div class='line' id='LC341'>					<span class="nx">$leftBorder</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;MiddleLeft&quot;</span><span class="p">),</span></div><div class='line' id='LC342'>					<span class="nx">$content</span><span class="p">,</span></div><div class='line' id='LC343'>					<span class="nx">$rightBorder</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;MiddleRight&quot;</span><span class="p">)</span></div><div class='line' id='LC344'>				<span class="p">),</span></div><div class='line' id='LC345'>				<span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="s1">&#39;clear:left&#39;</span><span class="p">).</span><span class="nx">append</span><span class="p">(</span></div><div class='line' id='LC346'>					<span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;BottomLeft&quot;</span><span class="p">),</span></div><div class='line' id='LC347'>					<span class="nx">$bottomBorder</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;BottomCenter&quot;</span><span class="p">),</span></div><div class='line' id='LC348'>					<span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s2">&quot;BottomRight&quot;</span><span class="p">)</span></div><div class='line' id='LC349'>				<span class="p">)</span></div><div class='line' id='LC350'>			<span class="p">).</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;div div&#39;</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="s1">&#39;float&#39;</span><span class="o">:</span> <span class="s1">&#39;left&#39;</span><span class="p">});</span></div><div class='line' id='LC351'><br/></div><div class='line' id='LC352'>			<span class="nx">$loadingBay</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="kc">false</span><span class="p">,</span> <span class="s1">&#39;position:absolute; width:9999px; visibility:hidden; display:none&#39;</span><span class="p">);</span></div><div class='line' id='LC353'><br/></div><div class='line' id='LC354'>			<span class="nx">$groupControls</span> <span class="o">=</span> <span class="nx">$next</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="nx">$prev</span><span class="p">).</span><span class="nx">add</span><span class="p">(</span><span class="nx">$current</span><span class="p">).</span><span class="nx">add</span><span class="p">(</span><span class="nx">$slideshow</span><span class="p">);</span></div><div class='line' id='LC355'><br/></div><div class='line' id='LC356'>			<span class="nx">$</span><span class="p">(</span><span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">).</span><span class="nx">append</span><span class="p">(</span><span class="nx">$overlay</span><span class="p">,</span> <span class="nx">$box</span><span class="p">.</span><span class="nx">append</span><span class="p">(</span><span class="nx">$wrap</span><span class="p">,</span> <span class="nx">$loadingBay</span><span class="p">));</span></div><div class='line' id='LC357'>		<span class="p">}</span></div><div class='line' id='LC358'>	<span class="p">}</span></div><div class='line' id='LC359'><br/></div><div class='line' id='LC360'>	<span class="c1">// Add ColorBox&#39;s event bindings</span></div><div class='line' id='LC361'>	<span class="kd">function</span> <span class="nx">addBindings</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC362'>		<span class="k">if</span> <span class="p">(</span><span class="nx">$box</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC363'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">init</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC364'>				<span class="nx">init</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC365'><br/></div><div class='line' id='LC366'>				<span class="c1">// Cache values needed for size calculations</span></div><div class='line' id='LC367'>				<span class="nx">interfaceHeight</span> <span class="o">=</span> <span class="nx">$topBorder</span><span class="p">.</span><span class="nx">height</span><span class="p">()</span> <span class="o">+</span> <span class="nx">$bottomBorder</span><span class="p">.</span><span class="nx">height</span><span class="p">()</span> <span class="o">+</span> <span class="nx">$content</span><span class="p">.</span><span class="nx">outerHeight</span><span class="p">(</span><span class="kc">true</span><span class="p">)</span> <span class="o">-</span> <span class="nx">$content</span><span class="p">.</span><span class="nx">height</span><span class="p">();</span><span class="c1">//Subtraction needed for IE6</span></div><div class='line' id='LC368'>				<span class="nx">interfaceWidth</span> <span class="o">=</span> <span class="nx">$leftBorder</span><span class="p">.</span><span class="nx">width</span><span class="p">()</span> <span class="o">+</span> <span class="nx">$rightBorder</span><span class="p">.</span><span class="nx">width</span><span class="p">()</span> <span class="o">+</span> <span class="nx">$content</span><span class="p">.</span><span class="nx">outerWidth</span><span class="p">(</span><span class="kc">true</span><span class="p">)</span> <span class="o">-</span> <span class="nx">$content</span><span class="p">.</span><span class="nx">width</span><span class="p">();</span></div><div class='line' id='LC369'>				<span class="nx">loadedHeight</span> <span class="o">=</span> <span class="nx">$loaded</span><span class="p">.</span><span class="nx">outerHeight</span><span class="p">(</span><span class="kc">true</span><span class="p">);</span></div><div class='line' id='LC370'>				<span class="nx">loadedWidth</span> <span class="o">=</span> <span class="nx">$loaded</span><span class="p">.</span><span class="nx">outerWidth</span><span class="p">(</span><span class="kc">true</span><span class="p">);</span></div><div class='line' id='LC371'><br/></div><div class='line' id='LC372'>				<span class="c1">// Setting padding to remove the need to do size conversions during the animation step.</span></div><div class='line' id='LC373'>				<span class="nx">$box</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="s2">&quot;padding-bottom&quot;</span><span class="o">:</span> <span class="nx">interfaceHeight</span><span class="p">,</span> <span class="s2">&quot;padding-right&quot;</span><span class="o">:</span> <span class="nx">interfaceWidth</span><span class="p">});</span></div><div class='line' id='LC374'><br/></div><div class='line' id='LC375'>				<span class="c1">// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.</span></div><div class='line' id='LC376'>				<span class="nx">$next</span><span class="p">.</span><span class="nx">click</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC377'>					<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">next</span><span class="p">();</span></div><div class='line' id='LC378'>				<span class="p">});</span></div><div class='line' id='LC379'>				<span class="nx">$prev</span><span class="p">.</span><span class="nx">click</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC380'>					<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">prev</span><span class="p">();</span></div><div class='line' id='LC381'>				<span class="p">});</span></div><div class='line' id='LC382'>				<span class="nx">$close</span><span class="p">.</span><span class="nx">click</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC383'>					<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">close</span><span class="p">();</span></div><div class='line' id='LC384'>				<span class="p">});</span></div><div class='line' id='LC385'>				<span class="nx">$overlay</span><span class="p">.</span><span class="nx">click</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC386'>					<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">overlayClose</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC387'>						<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">close</span><span class="p">();</span></div><div class='line' id='LC388'>					<span class="p">}</span></div><div class='line' id='LC389'>				<span class="p">});</span></div><div class='line' id='LC390'><br/></div><div class='line' id='LC391'>				<span class="c1">// Key Bindings</span></div><div class='line' id='LC392'>				<span class="nx">$</span><span class="p">(</span><span class="nb">document</span><span class="p">).</span><span class="nx">bind</span><span class="p">(</span><span class="s1">&#39;keydown.&#39;</span> <span class="o">+</span> <span class="nx">prefix</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC393'>					<span class="kd">var</span> <span class="nx">key</span> <span class="o">=</span> <span class="nx">e</span><span class="p">.</span><span class="nx">keyCode</span><span class="p">;</span></div><div class='line' id='LC394'>					<span class="k">if</span> <span class="p">(</span><span class="nx">open</span> <span class="o">&amp;&amp;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">escKey</span> <span class="o">&amp;&amp;</span> <span class="nx">key</span> <span class="o">===</span> <span class="mi">27</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC395'>						<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC396'>						<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">close</span><span class="p">();</span></div><div class='line' id='LC397'>					<span class="p">}</span></div><div class='line' id='LC398'>					<span class="k">if</span> <span class="p">(</span><span class="nx">open</span> <span class="o">&amp;&amp;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">arrowKey</span> <span class="o">&amp;&amp;</span> <span class="nx">$related</span><span class="p">[</span><span class="mi">1</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC399'>						<span class="k">if</span> <span class="p">(</span><span class="nx">key</span> <span class="o">===</span> <span class="mi">37</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC400'>							<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC401'>							<span class="nx">$prev</span><span class="p">.</span><span class="nx">click</span><span class="p">();</span></div><div class='line' id='LC402'>						<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">key</span> <span class="o">===</span> <span class="mi">39</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC403'>							<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC404'>							<span class="nx">$next</span><span class="p">.</span><span class="nx">click</span><span class="p">();</span></div><div class='line' id='LC405'>						<span class="p">}</span></div><div class='line' id='LC406'>					<span class="p">}</span></div><div class='line' id='LC407'>				<span class="p">});</span></div><div class='line' id='LC408'><br/></div><div class='line' id='LC409'>				<span class="nx">$</span><span class="p">(</span><span class="s1">&#39;.&#39;</span> <span class="o">+</span> <span class="nx">boxElement</span><span class="p">,</span> <span class="nb">document</span><span class="p">).</span><span class="nx">live</span><span class="p">(</span><span class="s1">&#39;click&#39;</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC410'>					<span class="c1">// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.</span></div><div class='line' id='LC411'>					<span class="c1">// See: http://jacklmoore.com/notes/click-events/</span></div><div class='line' id='LC412'>					<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="p">(</span><span class="nx">e</span><span class="p">.</span><span class="nx">which</span> <span class="o">&gt;</span> <span class="mi">1</span> <span class="o">||</span> <span class="nx">e</span><span class="p">.</span><span class="nx">shiftKey</span> <span class="o">||</span> <span class="nx">e</span><span class="p">.</span><span class="nx">altKey</span> <span class="o">||</span> <span class="nx">e</span><span class="p">.</span><span class="nx">metaKey</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC413'>						<span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span></div><div class='line' id='LC414'>						<span class="nx">launch</span><span class="p">(</span><span class="k">this</span><span class="p">);</span></div><div class='line' id='LC415'>					<span class="p">}</span></div><div class='line' id='LC416'>				<span class="p">});</span></div><div class='line' id='LC417'>			<span class="p">}</span></div><div class='line' id='LC418'>			<span class="k">return</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC419'>		<span class="p">}</span></div><div class='line' id='LC420'>		<span class="k">return</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC421'>	<span class="p">}</span></div><div class='line' id='LC422'><br/></div><div class='line' id='LC423'>	<span class="c1">// Don&#39;t do anything if ColorBox already exists.</span></div><div class='line' id='LC424'>	<span class="k">if</span> <span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">colorbox</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC425'>		<span class="k">return</span><span class="p">;</span></div><div class='line' id='LC426'>	<span class="p">}</span></div><div class='line' id='LC427'><br/></div><div class='line' id='LC428'>	<span class="c1">// Append the HTML when the DOM loads</span></div><div class='line' id='LC429'>	<span class="nx">$</span><span class="p">(</span><span class="nx">appendHTML</span><span class="p">);</span></div><div class='line' id='LC430'><br/></div><div class='line' id='LC431'><br/></div><div class='line' id='LC432'>	<span class="c1">// ****************</span></div><div class='line' id='LC433'>	<span class="c1">// PUBLIC FUNCTIONS</span></div><div class='line' id='LC434'>	<span class="c1">// Usage format: $.fn.colorbox.close();</span></div><div class='line' id='LC435'>	<span class="c1">// Usage from within an iframe: parent.$.fn.colorbox.close();</span></div><div class='line' id='LC436'>	<span class="c1">// ****************</span></div><div class='line' id='LC437'><br/></div><div class='line' id='LC438'>	<span class="nx">publicMethod</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">fn</span><span class="p">[</span><span class="nx">colorbox</span><span class="p">]</span> <span class="o">=</span> <span class="nx">$</span><span class="p">[</span><span class="nx">colorbox</span><span class="p">]</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">options</span><span class="p">,</span> <span class="nx">callback</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC439'>		<span class="kd">var</span> <span class="nx">$this</span> <span class="o">=</span> <span class="k">this</span><span class="p">;</span></div><div class='line' id='LC440'><br/></div><div class='line' id='LC441'>		<span class="nx">options</span> <span class="o">=</span> <span class="nx">options</span> <span class="o">||</span> <span class="p">{};</span></div><div class='line' id='LC442'><br/></div><div class='line' id='LC443'>		<span class="nx">appendHTML</span><span class="p">();</span></div><div class='line' id='LC444'><br/></div><div class='line' id='LC445'>		<span class="k">if</span> <span class="p">(</span><span class="nx">addBindings</span><span class="p">())</span> <span class="p">{</span></div><div class='line' id='LC446'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">$this</span><span class="p">[</span><span class="mi">0</span><span class="p">])</span> <span class="p">{</span></div><div class='line' id='LC447'>				<span class="k">if</span> <span class="p">(</span><span class="nx">$this</span><span class="p">.</span><span class="nx">selector</span><span class="p">)</span> <span class="p">{</span> <span class="c1">// if a selector was given and it didn&#39;t match any elements, go ahead and exit.</span></div><div class='line' id='LC448'>					<span class="k">return</span> <span class="nx">$this</span><span class="p">;</span></div><div class='line' id='LC449'>				<span class="p">}</span></div><div class='line' id='LC450'>				<span class="c1">// if no selector was given (ie. $.colorbox()), create a temporary element to work with</span></div><div class='line' id='LC451'>				<span class="nx">$this</span> <span class="o">=</span> <span class="nx">$</span><span class="p">(</span><span class="s1">&#39;&lt;a/&gt;&#39;</span><span class="p">);</span></div><div class='line' id='LC452'>				<span class="nx">options</span><span class="p">.</span><span class="nx">open</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span> <span class="c1">// assume an immediate open</span></div><div class='line' id='LC453'>			<span class="p">}</span></div><div class='line' id='LC454'><br/></div><div class='line' id='LC455'>			<span class="k">if</span> <span class="p">(</span><span class="nx">callback</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC456'>				<span class="nx">options</span><span class="p">.</span><span class="nx">onComplete</span> <span class="o">=</span> <span class="nx">callback</span><span class="p">;</span></div><div class='line' id='LC457'>			<span class="p">}</span></div><div class='line' id='LC458'><br/></div><div class='line' id='LC459'>			<span class="nx">$this</span><span class="p">.</span><span class="nx">each</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC460'>				<span class="nx">$</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">colorbox</span><span class="p">,</span> <span class="nx">$</span><span class="p">.</span><span class="nx">extend</span><span class="p">({},</span> <span class="nx">$</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="k">this</span><span class="p">,</span> <span class="nx">colorbox</span><span class="p">)</span> <span class="o">||</span> <span class="nx">defaults</span><span class="p">,</span> <span class="nx">options</span><span class="p">));</span></div><div class='line' id='LC461'>			<span class="p">}).</span><span class="nx">addClass</span><span class="p">(</span><span class="nx">boxElement</span><span class="p">);</span></div><div class='line' id='LC462'><br/></div><div class='line' id='LC463'>			<span class="k">if</span> <span class="p">((</span><span class="nx">$</span><span class="p">.</span><span class="nx">isFunction</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">open</span><span class="p">)</span> <span class="o">&amp;&amp;</span> <span class="nx">options</span><span class="p">.</span><span class="nx">open</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">$this</span><span class="p">))</span> <span class="o">||</span> <span class="nx">options</span><span class="p">.</span><span class="nx">open</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC464'>				<span class="nx">launch</span><span class="p">(</span><span class="nx">$this</span><span class="p">[</span><span class="mi">0</span><span class="p">]);</span></div><div class='line' id='LC465'>			<span class="p">}</span></div><div class='line' id='LC466'>		<span class="p">}</span></div><div class='line' id='LC467'><br/></div><div class='line' id='LC468'>		<span class="k">return</span> <span class="nx">$this</span><span class="p">;</span></div><div class='line' id='LC469'>	<span class="p">};</span></div><div class='line' id='LC470'><br/></div><div class='line' id='LC471'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">position</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">speed</span><span class="p">,</span> <span class="nx">loadedCallback</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC472'>		<span class="kd">var</span> </div><div class='line' id='LC473'>		<span class="nx">top</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> </div><div class='line' id='LC474'>		<span class="nx">left</span> <span class="o">=</span> <span class="mi">0</span><span class="p">,</span> </div><div class='line' id='LC475'>		<span class="nx">offset</span> <span class="o">=</span> <span class="nx">$box</span><span class="p">.</span><span class="nx">offset</span><span class="p">(),</span></div><div class='line' id='LC476'>		<span class="nx">scrollTop</span><span class="p">,</span> </div><div class='line' id='LC477'>		<span class="nx">scrollLeft</span><span class="p">;</span></div><div class='line' id='LC478'><br/></div><div class='line' id='LC479'>		<span class="nx">$window</span><span class="p">.</span><span class="nx">unbind</span><span class="p">(</span><span class="s1">&#39;resize.&#39;</span> <span class="o">+</span> <span class="nx">prefix</span><span class="p">);</span></div><div class='line' id='LC480'><br/></div><div class='line' id='LC481'>		<span class="c1">// remove the modal so that it doesn&#39;t influence the document width/height        </span></div><div class='line' id='LC482'>		<span class="nx">$box</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">top</span><span class="o">:</span> <span class="o">-</span><span class="mi">9</span><span class="nx">e4</span><span class="p">,</span> <span class="nx">left</span><span class="o">:</span> <span class="o">-</span><span class="mi">9</span><span class="nx">e4</span><span class="p">});</span></div><div class='line' id='LC483'><br/></div><div class='line' id='LC484'>		<span class="nx">scrollTop</span> <span class="o">=</span> <span class="nx">$window</span><span class="p">.</span><span class="nx">scrollTop</span><span class="p">();</span></div><div class='line' id='LC485'>		<span class="nx">scrollLeft</span> <span class="o">=</span> <span class="nx">$window</span><span class="p">.</span><span class="nx">scrollLeft</span><span class="p">();</span></div><div class='line' id='LC486'><br/></div><div class='line' id='LC487'>		<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">fixed</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">isIE6</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC488'>			<span class="nx">offset</span><span class="p">.</span><span class="nx">top</span> <span class="o">-=</span> <span class="nx">scrollTop</span><span class="p">;</span></div><div class='line' id='LC489'>			<span class="nx">offset</span><span class="p">.</span><span class="nx">left</span> <span class="o">-=</span> <span class="nx">scrollLeft</span><span class="p">;</span></div><div class='line' id='LC490'>			<span class="nx">$box</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">position</span><span class="o">:</span> <span class="s1">&#39;fixed&#39;</span><span class="p">});</span></div><div class='line' id='LC491'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC492'>			<span class="nx">top</span> <span class="o">=</span> <span class="nx">scrollTop</span><span class="p">;</span></div><div class='line' id='LC493'>			<span class="nx">left</span> <span class="o">=</span> <span class="nx">scrollLeft</span><span class="p">;</span></div><div class='line' id='LC494'>			<span class="nx">$box</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">position</span><span class="o">:</span> <span class="s1">&#39;absolute&#39;</span><span class="p">});</span></div><div class='line' id='LC495'>		<span class="p">}</span></div><div class='line' id='LC496'><br/></div><div class='line' id='LC497'>		<span class="c1">// keeps the top and left positions within the browser&#39;s viewport.</span></div><div class='line' id='LC498'>		<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">right</span> <span class="o">!==</span> <span class="kc">false</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC499'>			<span class="nx">left</span> <span class="o">+=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="nx">$window</span><span class="p">.</span><span class="nx">width</span><span class="p">()</span> <span class="o">-</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">-</span> <span class="nx">loadedWidth</span> <span class="o">-</span> <span class="nx">interfaceWidth</span> <span class="o">-</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">right</span><span class="p">,</span> <span class="s1">&#39;x&#39;</span><span class="p">),</span> <span class="mi">0</span><span class="p">);</span></div><div class='line' id='LC500'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">left</span> <span class="o">!==</span> <span class="kc">false</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC501'>			<span class="nx">left</span> <span class="o">+=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">left</span><span class="p">,</span> <span class="s1">&#39;x&#39;</span><span class="p">);</span></div><div class='line' id='LC502'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC503'>			<span class="nx">left</span> <span class="o">+=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="nx">$window</span><span class="p">.</span><span class="nx">width</span><span class="p">()</span> <span class="o">-</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">-</span> <span class="nx">loadedWidth</span> <span class="o">-</span> <span class="nx">interfaceWidth</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span> <span class="o">/</span> <span class="mi">2</span><span class="p">);</span></div><div class='line' id='LC504'>		<span class="p">}</span></div><div class='line' id='LC505'><br/></div><div class='line' id='LC506'>		<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">bottom</span> <span class="o">!==</span> <span class="kc">false</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC507'>			<span class="nx">top</span> <span class="o">+=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="nx">$window</span><span class="p">.</span><span class="nx">height</span><span class="p">()</span> <span class="o">-</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">-</span> <span class="nx">loadedHeight</span> <span class="o">-</span> <span class="nx">interfaceHeight</span> <span class="o">-</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">bottom</span><span class="p">,</span> <span class="s1">&#39;y&#39;</span><span class="p">),</span> <span class="mi">0</span><span class="p">);</span></div><div class='line' id='LC508'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">top</span> <span class="o">!==</span> <span class="kc">false</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC509'>			<span class="nx">top</span> <span class="o">+=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">top</span><span class="p">,</span> <span class="s1">&#39;y&#39;</span><span class="p">);</span></div><div class='line' id='LC510'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC511'>			<span class="nx">top</span> <span class="o">+=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">round</span><span class="p">(</span><span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="nx">$window</span><span class="p">.</span><span class="nx">height</span><span class="p">()</span> <span class="o">-</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">-</span> <span class="nx">loadedHeight</span> <span class="o">-</span> <span class="nx">interfaceHeight</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span> <span class="o">/</span> <span class="mi">2</span><span class="p">);</span></div><div class='line' id='LC512'>		<span class="p">}</span></div><div class='line' id='LC513'><br/></div><div class='line' id='LC514'>		<span class="nx">$box</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">top</span><span class="o">:</span> <span class="nx">offset</span><span class="p">.</span><span class="nx">top</span><span class="p">,</span> <span class="nx">left</span><span class="o">:</span> <span class="nx">offset</span><span class="p">.</span><span class="nx">left</span><span class="p">});</span></div><div class='line' id='LC515'><br/></div><div class='line' id='LC516'>		<span class="c1">// setting the speed to 0 to reduce the delay between same-sized content.</span></div><div class='line' id='LC517'>		<span class="nx">speed</span> <span class="o">=</span> <span class="p">(</span><span class="nx">$box</span><span class="p">.</span><span class="nx">width</span><span class="p">()</span> <span class="o">===</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">+</span> <span class="nx">loadedWidth</span> <span class="o">&amp;&amp;</span> <span class="nx">$box</span><span class="p">.</span><span class="nx">height</span><span class="p">()</span> <span class="o">===</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">+</span> <span class="nx">loadedHeight</span><span class="p">)</span> <span class="o">?</span> <span class="mi">0</span> <span class="o">:</span> <span class="nx">speed</span> <span class="o">||</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC518'><br/></div><div class='line' id='LC519'>		<span class="c1">// this gives the wrapper plenty of breathing room so it&#39;s floated contents can move around smoothly,</span></div><div class='line' id='LC520'>		<span class="c1">// but it has to be shrank down around the size of div#colorbox when it&#39;s done.  If not,</span></div><div class='line' id='LC521'>		<span class="c1">// it can invoke an obscure IE bug when using iframes.</span></div><div class='line' id='LC522'>		<span class="nx">$wrap</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">width</span> <span class="o">=</span> <span class="nx">$wrap</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">height</span> <span class="o">=</span> <span class="s2">&quot;9999px&quot;</span><span class="p">;</span></div><div class='line' id='LC523'><br/></div><div class='line' id='LC524'>		<span class="kd">function</span> <span class="nx">modalDimensions</span><span class="p">(</span><span class="nx">that</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC525'>			<span class="nx">$topBorder</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">width</span> <span class="o">=</span> <span class="nx">$bottomBorder</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">width</span> <span class="o">=</span> <span class="nx">$content</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">width</span> <span class="o">=</span> <span class="nx">that</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">width</span><span class="p">;</span></div><div class='line' id='LC526'>			<span class="nx">$content</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">height</span> <span class="o">=</span> <span class="nx">$leftBorder</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">height</span> <span class="o">=</span> <span class="nx">$rightBorder</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">height</span> <span class="o">=</span> <span class="nx">that</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">height</span><span class="p">;</span></div><div class='line' id='LC527'>		<span class="p">}</span></div><div class='line' id='LC528'><br/></div><div class='line' id='LC529'>		<span class="nx">$box</span><span class="p">.</span><span class="nx">dequeue</span><span class="p">().</span><span class="nx">animate</span><span class="p">({</span><span class="nx">width</span><span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">+</span> <span class="nx">loadedWidth</span><span class="p">,</span> <span class="nx">height</span><span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">+</span> <span class="nx">loadedHeight</span><span class="p">,</span> <span class="nx">top</span><span class="o">:</span> <span class="nx">top</span><span class="p">,</span> <span class="nx">left</span><span class="o">:</span> <span class="nx">left</span><span class="p">},</span> <span class="p">{</span></div><div class='line' id='LC530'>			<span class="nx">duration</span><span class="o">:</span> <span class="nx">speed</span><span class="p">,</span></div><div class='line' id='LC531'>			<span class="nx">complete</span><span class="o">:</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC532'>				<span class="nx">modalDimensions</span><span class="p">(</span><span class="k">this</span><span class="p">);</span></div><div class='line' id='LC533'><br/></div><div class='line' id='LC534'>				<span class="nx">active</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC535'><br/></div><div class='line' id='LC536'>				<span class="c1">// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE&#39;s iframe implementation.</span></div><div class='line' id='LC537'>				<span class="nx">$wrap</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">width</span> <span class="o">=</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">+</span> <span class="nx">loadedWidth</span> <span class="o">+</span> <span class="nx">interfaceWidth</span><span class="p">)</span> <span class="o">+</span> <span class="s2">&quot;px&quot;</span><span class="p">;</span></div><div class='line' id='LC538'>				<span class="nx">$wrap</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">height</span> <span class="o">=</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">+</span> <span class="nx">loadedHeight</span> <span class="o">+</span> <span class="nx">interfaceHeight</span><span class="p">)</span> <span class="o">+</span> <span class="s2">&quot;px&quot;</span><span class="p">;</span></div><div class='line' id='LC539'><br/></div><div class='line' id='LC540'>				<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">reposition</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC541'>					<span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>  <span class="c1">// small delay before binding onresize due to an IE8 bug.</span></div><div class='line' id='LC542'>						<span class="nx">$window</span><span class="p">.</span><span class="nx">bind</span><span class="p">(</span><span class="s1">&#39;resize.&#39;</span> <span class="o">+</span> <span class="nx">prefix</span><span class="p">,</span> <span class="nx">publicMethod</span><span class="p">.</span><span class="nx">position</span><span class="p">);</span></div><div class='line' id='LC543'>					<span class="p">},</span> <span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC544'>				<span class="p">}</span></div><div class='line' id='LC545'><br/></div><div class='line' id='LC546'>				<span class="k">if</span> <span class="p">(</span><span class="nx">loadedCallback</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC547'>					<span class="nx">loadedCallback</span><span class="p">();</span></div><div class='line' id='LC548'>				<span class="p">}</span></div><div class='line' id='LC549'>			<span class="p">},</span></div><div class='line' id='LC550'>			<span class="nx">step</span><span class="o">:</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC551'>				<span class="nx">modalDimensions</span><span class="p">(</span><span class="k">this</span><span class="p">);</span></div><div class='line' id='LC552'>			<span class="p">}</span></div><div class='line' id='LC553'>		<span class="p">});</span></div><div class='line' id='LC554'>	<span class="p">};</span></div><div class='line' id='LC555'><br/></div><div class='line' id='LC556'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">resize</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">options</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC557'>		<span class="k">if</span> <span class="p">(</span><span class="nx">open</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC558'>			<span class="nx">options</span> <span class="o">=</span> <span class="nx">options</span> <span class="o">||</span> <span class="p">{};</span></div><div class='line' id='LC559'><br/></div><div class='line' id='LC560'>			<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">width</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC561'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">width</span><span class="p">,</span> <span class="s1">&#39;x&#39;</span><span class="p">)</span> <span class="o">-</span> <span class="nx">loadedWidth</span> <span class="o">-</span> <span class="nx">interfaceWidth</span><span class="p">;</span></div><div class='line' id='LC562'>			<span class="p">}</span></div><div class='line' id='LC563'>			<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">innerWidth</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC564'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">innerWidth</span><span class="p">,</span> <span class="s1">&#39;x&#39;</span><span class="p">);</span></div><div class='line' id='LC565'>			<span class="p">}</span></div><div class='line' id='LC566'>			<span class="nx">$loaded</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">width</span><span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span><span class="p">});</span></div><div class='line' id='LC567'><br/></div><div class='line' id='LC568'>			<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">height</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC569'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">height</span><span class="p">,</span> <span class="s1">&#39;y&#39;</span><span class="p">)</span> <span class="o">-</span> <span class="nx">loadedHeight</span> <span class="o">-</span> <span class="nx">interfaceHeight</span><span class="p">;</span></div><div class='line' id='LC570'>			<span class="p">}</span></div><div class='line' id='LC571'>			<span class="k">if</span> <span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">innerHeight</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC572'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">options</span><span class="p">.</span><span class="nx">innerHeight</span><span class="p">,</span> <span class="s1">&#39;y&#39;</span><span class="p">);</span></div><div class='line' id='LC573'>			<span class="p">}</span></div><div class='line' id='LC574'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">options</span><span class="p">.</span><span class="nx">innerHeight</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">options</span><span class="p">.</span><span class="nx">height</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC575'>				<span class="nx">$loaded</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">height</span><span class="o">:</span> <span class="s2">&quot;auto&quot;</span><span class="p">});</span></div><div class='line' id='LC576'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">=</span> <span class="nx">$loaded</span><span class="p">.</span><span class="nx">height</span><span class="p">();</span></div><div class='line' id='LC577'>			<span class="p">}</span></div><div class='line' id='LC578'>			<span class="nx">$loaded</span><span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">height</span><span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span><span class="p">});</span></div><div class='line' id='LC579'><br/></div><div class='line' id='LC580'>			<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">position</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">transition</span> <span class="o">===</span> <span class="s2">&quot;none&quot;</span> <span class="o">?</span> <span class="mi">0</span> <span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">speed</span><span class="p">);</span></div><div class='line' id='LC581'>		<span class="p">}</span></div><div class='line' id='LC582'>	<span class="p">};</span></div><div class='line' id='LC583'><br/></div><div class='line' id='LC584'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">prep</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">object</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC585'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">open</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC586'>			<span class="k">return</span><span class="p">;</span></div><div class='line' id='LC587'>		<span class="p">}</span></div><div class='line' id='LC588'><br/></div><div class='line' id='LC589'>		<span class="kd">var</span> <span class="nx">callback</span><span class="p">,</span> <span class="nx">speed</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">transition</span> <span class="o">===</span> <span class="s2">&quot;none&quot;</span> <span class="o">?</span> <span class="mi">0</span> <span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">speed</span><span class="p">;</span></div><div class='line' id='LC590'><br/></div><div class='line' id='LC591'>		<span class="nx">$loaded</span><span class="p">.</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC592'>		<span class="nx">$loaded</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s1">&#39;LoadedContent&#39;</span><span class="p">).</span><span class="nx">append</span><span class="p">(</span><span class="nx">object</span><span class="p">);</span></div><div class='line' id='LC593'><br/></div><div class='line' id='LC594'>		<span class="kd">function</span> <span class="nx">getWidth</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC595'>			<span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">||</span> <span class="nx">$loaded</span><span class="p">.</span><span class="nx">width</span><span class="p">();</span></div><div class='line' id='LC596'>			<span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span> <span class="o">&amp;&amp;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span> <span class="o">&lt;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">?</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span> <span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span><span class="p">;</span></div><div class='line' id='LC597'>			<span class="k">return</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span><span class="p">;</span></div><div class='line' id='LC598'>		<span class="p">}</span></div><div class='line' id='LC599'>		<span class="kd">function</span> <span class="nx">getHeight</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC600'>			<span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">||</span> <span class="nx">$loaded</span><span class="p">.</span><span class="nx">height</span><span class="p">();</span></div><div class='line' id='LC601'>			<span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span> <span class="o">&amp;&amp;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span> <span class="o">&lt;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">?</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span> <span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span><span class="p">;</span></div><div class='line' id='LC602'>			<span class="k">return</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span><span class="p">;</span></div><div class='line' id='LC603'>		<span class="p">}</span></div><div class='line' id='LC604'><br/></div><div class='line' id='LC605'>		<span class="nx">$loaded</span><span class="p">.</span><span class="nx">hide</span><span class="p">()</span></div><div class='line' id='LC606'>		<span class="p">.</span><span class="nx">appendTo</span><span class="p">(</span><span class="nx">$loadingBay</span><span class="p">.</span><span class="nx">show</span><span class="p">())</span><span class="c1">// content has to be appended to the DOM for accurate size calculations.</span></div><div class='line' id='LC607'>		<span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">width</span><span class="o">:</span> <span class="nx">getWidth</span><span class="p">(),</span> <span class="nx">overflow</span><span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">scrolling</span> <span class="o">?</span> <span class="s1">&#39;auto&#39;</span> <span class="o">:</span> <span class="s1">&#39;hidden&#39;</span><span class="p">})</span></div><div class='line' id='LC608'>		<span class="p">.</span><span class="nx">css</span><span class="p">({</span><span class="nx">height</span><span class="o">:</span> <span class="nx">getHeight</span><span class="p">()})</span><span class="c1">// sets the height independently from the width in case the new width influences the value of height.</span></div><div class='line' id='LC609'>		<span class="p">.</span><span class="nx">prependTo</span><span class="p">(</span><span class="nx">$content</span><span class="p">);</span></div><div class='line' id='LC610'><br/></div><div class='line' id='LC611'>		<span class="nx">$loadingBay</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC612'><br/></div><div class='line' id='LC613'>		<span class="c1">// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.</span></div><div class='line' id='LC614'>		<span class="c1">//$(photo).css({&#39;float&#39;: &#39;none&#39;, marginLeft: &#39;auto&#39;, marginRight: &#39;auto&#39;});</span></div><div class='line' id='LC615'><br/></div><div class='line' id='LC616'>		<span class="nx">$</span><span class="p">(</span><span class="nx">photo</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="s1">&#39;float&#39;</span><span class="o">:</span> <span class="s1">&#39;none&#39;</span><span class="p">});</span></div><div class='line' id='LC617'><br/></div><div class='line' id='LC618'>		<span class="c1">// Hides SELECT elements in IE6 because they would otherwise sit on top of the overlay.</span></div><div class='line' id='LC619'>		<span class="k">if</span> <span class="p">(</span><span class="nx">isIE6</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC620'>			<span class="nx">$</span><span class="p">(</span><span class="s1">&#39;select&#39;</span><span class="p">).</span><span class="nx">not</span><span class="p">(</span><span class="nx">$box</span><span class="p">.</span><span class="nx">find</span><span class="p">(</span><span class="s1">&#39;select&#39;</span><span class="p">)).</span><span class="nx">filter</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC621'>				<span class="k">return</span> <span class="k">this</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">visibility</span> <span class="o">!==</span> <span class="s1">&#39;hidden&#39;</span><span class="p">;</span></div><div class='line' id='LC622'>			<span class="p">}).</span><span class="nx">css</span><span class="p">({</span><span class="s1">&#39;visibility&#39;</span><span class="o">:</span> <span class="s1">&#39;hidden&#39;</span><span class="p">}).</span><span class="nx">one</span><span class="p">(</span><span class="nx">event_cleanup</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC623'>				<span class="k">this</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">visibility</span> <span class="o">=</span> <span class="s1">&#39;inherit&#39;</span><span class="p">;</span></div><div class='line' id='LC624'>			<span class="p">});</span></div><div class='line' id='LC625'>		<span class="p">}</span></div><div class='line' id='LC626'><br/></div><div class='line' id='LC627'>		<span class="nx">callback</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC628'>			<span class="kd">var</span> <span class="nx">preload</span><span class="p">,</span> </div><div class='line' id='LC629'>				<span class="nx">i</span><span class="p">,</span> </div><div class='line' id='LC630'>				<span class="nx">total</span> <span class="o">=</span> <span class="nx">$related</span><span class="p">.</span><span class="nx">length</span><span class="p">,</span> </div><div class='line' id='LC631'>				<span class="nx">iframe</span><span class="p">,</span> </div><div class='line' id='LC632'>				<span class="nx">frameBorder</span> <span class="o">=</span> <span class="s1">&#39;frameBorder&#39;</span><span class="p">,</span> </div><div class='line' id='LC633'>				<span class="nx">allowTransparency</span> <span class="o">=</span> <span class="s1">&#39;allowTransparency&#39;</span><span class="p">,</span> </div><div class='line' id='LC634'>				<span class="nx">complete</span><span class="p">,</span> </div><div class='line' id='LC635'>				<span class="nx">src</span><span class="p">,</span> </div><div class='line' id='LC636'>				<span class="nx">img</span><span class="p">,</span> </div><div class='line' id='LC637'>				<span class="nx">data</span><span class="p">;</span></div><div class='line' id='LC638'><br/></div><div class='line' id='LC639'>			<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">open</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC640'>				<span class="k">return</span><span class="p">;</span></div><div class='line' id='LC641'>			<span class="p">}</span></div><div class='line' id='LC642'><br/></div><div class='line' id='LC643'>			<span class="kd">function</span> <span class="nx">removeFilter</span><span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC644'>				<span class="k">if</span> <span class="p">(</span><span class="nx">isIE</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC645'>					<span class="nx">$box</span><span class="p">[</span><span class="mi">0</span><span class="p">].</span><span class="nx">style</span><span class="p">.</span><span class="nx">removeAttribute</span><span class="p">(</span><span class="s1">&#39;filter&#39;</span><span class="p">);</span></div><div class='line' id='LC646'>				<span class="p">}</span></div><div class='line' id='LC647'>			<span class="p">}</span></div><div class='line' id='LC648'><br/></div><div class='line' id='LC649'>			<span class="nx">complete</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC650'>				<span class="nx">clearTimeout</span><span class="p">(</span><span class="nx">loadingTimer</span><span class="p">);</span></div><div class='line' id='LC651'>				<span class="nx">$loadingOverlay</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC652'>				<span class="nx">trigger</span><span class="p">(</span><span class="nx">event_complete</span><span class="p">,</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">onComplete</span><span class="p">);</span></div><div class='line' id='LC653'>			<span class="p">};</span></div><div class='line' id='LC654'><br/></div><div class='line' id='LC655'>			<span class="k">if</span> <span class="p">(</span><span class="nx">isIE</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC656'>				<span class="c1">//This fadeIn helps the bicubic resampling to kick-in.</span></div><div class='line' id='LC657'>				<span class="k">if</span> <span class="p">(</span><span class="nx">photo</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC658'>					<span class="nx">$loaded</span><span class="p">.</span><span class="nx">fadeIn</span><span class="p">(</span><span class="mi">100</span><span class="p">);</span></div><div class='line' id='LC659'>				<span class="p">}</span></div><div class='line' id='LC660'>			<span class="p">}</span></div><div class='line' id='LC661'><br/></div><div class='line' id='LC662'>			<span class="nx">$title</span><span class="p">.</span><span class="nx">html</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">title</span><span class="p">).</span><span class="nx">add</span><span class="p">(</span><span class="nx">$loaded</span><span class="p">).</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC663'><br/></div><div class='line' id='LC664'>			<span class="k">if</span> <span class="p">(</span><span class="nx">total</span> <span class="o">&gt;</span> <span class="mi">1</span><span class="p">)</span> <span class="p">{</span> <span class="c1">// handle grouping</span></div><div class='line' id='LC665'>				<span class="k">if</span> <span class="p">(</span><span class="k">typeof</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">current</span> <span class="o">===</span> <span class="s2">&quot;string&quot;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC666'>					<span class="nx">$current</span><span class="p">.</span><span class="nx">html</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">current</span><span class="p">.</span><span class="nx">replace</span><span class="p">(</span><span class="s1">&#39;{current}&#39;</span><span class="p">,</span> <span class="nx">index</span> <span class="o">+</span> <span class="mi">1</span><span class="p">).</span><span class="nx">replace</span><span class="p">(</span><span class="s1">&#39;{total}&#39;</span><span class="p">,</span> <span class="nx">total</span><span class="p">)).</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC667'>				<span class="p">}</span></div><div class='line' id='LC668'><br/></div><div class='line' id='LC669'>				<span class="nx">$next</span><span class="p">[(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">loop</span> <span class="o">||</span> <span class="nx">index</span> <span class="o">&lt;</span> <span class="nx">total</span> <span class="o">-</span> <span class="mi">1</span><span class="p">)</span> <span class="o">?</span> <span class="s2">&quot;show&quot;</span> <span class="o">:</span> <span class="s2">&quot;hide&quot;</span><span class="p">]().</span><span class="nx">html</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">next</span><span class="p">);</span></div><div class='line' id='LC670'>				<span class="nx">$prev</span><span class="p">[(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">loop</span> <span class="o">||</span> <span class="nx">index</span><span class="p">)</span> <span class="o">?</span> <span class="s2">&quot;show&quot;</span> <span class="o">:</span> <span class="s2">&quot;hide&quot;</span><span class="p">]().</span><span class="nx">html</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">previous</span><span class="p">);</span></div><div class='line' id='LC671'><br/></div><div class='line' id='LC672'>				<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">slideshow</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC673'>					<span class="nx">$slideshow</span><span class="p">.</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC674'>				<span class="p">}</span></div><div class='line' id='LC675'><br/></div><div class='line' id='LC676'>				<span class="c1">// Preloads images within a rel group</span></div><div class='line' id='LC677'>				<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">preloading</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC678'>					<span class="nx">preload</span> <span class="o">=</span> <span class="p">[</span></div><div class='line' id='LC679'>						<span class="nx">getIndex</span><span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">),</span></div><div class='line' id='LC680'>						<span class="nx">getIndex</span><span class="p">(</span><span class="mi">1</span><span class="p">)</span></div><div class='line' id='LC681'>					<span class="p">];</span></div><div class='line' id='LC682'>					<span class="k">while</span> <span class="p">(</span><span class="nx">i</span> <span class="o">=</span> <span class="nx">$related</span><span class="p">[</span><span class="nx">preload</span><span class="p">.</span><span class="nx">pop</span><span class="p">()])</span> <span class="p">{</span></div><div class='line' id='LC683'>						<span class="nx">data</span> <span class="o">=</span> <span class="nx">$</span><span class="p">.</span><span class="nx">data</span><span class="p">(</span><span class="nx">i</span><span class="p">,</span> <span class="nx">colorbox</span><span class="p">);</span></div><div class='line' id='LC684'><br/></div><div class='line' id='LC685'>						<span class="k">if</span> <span class="p">(</span><span class="nx">data</span> <span class="o">&amp;&amp;</span> <span class="nx">data</span><span class="p">.</span><span class="nx">href</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC686'>							<span class="nx">src</span> <span class="o">=</span> <span class="nx">data</span><span class="p">.</span><span class="nx">href</span><span class="p">;</span></div><div class='line' id='LC687'>							<span class="k">if</span> <span class="p">(</span><span class="nx">$</span><span class="p">.</span><span class="nx">isFunction</span><span class="p">(</span><span class="nx">src</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC688'>								<span class="nx">src</span> <span class="o">=</span> <span class="nx">src</span><span class="p">.</span><span class="nx">call</span><span class="p">(</span><span class="nx">i</span><span class="p">);</span></div><div class='line' id='LC689'>							<span class="p">}</span></div><div class='line' id='LC690'>						<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC691'>							<span class="nx">src</span> <span class="o">=</span> <span class="nx">i</span><span class="p">.</span><span class="nx">href</span><span class="p">;</span></div><div class='line' id='LC692'>						<span class="p">}</span></div><div class='line' id='LC693'><br/></div><div class='line' id='LC694'>						<span class="k">if</span> <span class="p">(</span><span class="nx">isImage</span><span class="p">(</span><span class="nx">src</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC695'>							<span class="nx">img</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Image</span><span class="p">();</span></div><div class='line' id='LC696'>							<span class="nx">img</span><span class="p">.</span><span class="nx">src</span> <span class="o">=</span> <span class="nx">src</span><span class="p">;</span></div><div class='line' id='LC697'>						<span class="p">}</span></div><div class='line' id='LC698'>					<span class="p">}</span></div><div class='line' id='LC699'>				<span class="p">}</span></div><div class='line' id='LC700'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC701'>				<span class="nx">$groupControls</span><span class="p">.</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC702'>			<span class="p">}</span></div><div class='line' id='LC703'><br/></div><div class='line' id='LC704'>			<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">iframe</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC705'>				<span class="nx">iframe</span> <span class="o">=</span> <span class="nx">$tag</span><span class="p">(</span><span class="s1">&#39;iframe&#39;</span><span class="p">)[</span><span class="mi">0</span><span class="p">];</span></div><div class='line' id='LC706'><br/></div><div class='line' id='LC707'>				<span class="k">if</span> <span class="p">(</span><span class="nx">frameBorder</span> <span class="k">in</span> <span class="nx">iframe</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC708'>					<span class="nx">iframe</span><span class="p">[</span><span class="nx">frameBorder</span><span class="p">]</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span></div><div class='line' id='LC709'>				<span class="p">}</span></div><div class='line' id='LC710'>				<span class="k">if</span> <span class="p">(</span><span class="nx">allowTransparency</span> <span class="k">in</span> <span class="nx">iframe</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC711'>					<span class="nx">iframe</span><span class="p">[</span><span class="nx">allowTransparency</span><span class="p">]</span> <span class="o">=</span> <span class="s2">&quot;true&quot;</span><span class="p">;</span></div><div class='line' id='LC712'>				<span class="p">}</span></div><div class='line' id='LC713'>				<span class="c1">// give the iframe a unique name to prevent caching</span></div><div class='line' id='LC714'>				<span class="nx">iframe</span><span class="p">.</span><span class="nx">name</span> <span class="o">=</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="p">(</span><span class="o">+</span><span class="k">new</span> <span class="nb">Date</span><span class="p">());</span></div><div class='line' id='LC715'>				<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">fastIframe</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC716'>					<span class="nx">complete</span><span class="p">();</span></div><div class='line' id='LC717'>				<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC718'>					<span class="nx">$</span><span class="p">(</span><span class="nx">iframe</span><span class="p">).</span><span class="nx">one</span><span class="p">(</span><span class="s1">&#39;load&#39;</span><span class="p">,</span> <span class="nx">complete</span><span class="p">);</span></div><div class='line' id='LC719'>				<span class="p">}</span></div><div class='line' id='LC720'>				<span class="nx">iframe</span><span class="p">.</span><span class="nx">src</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">href</span><span class="p">;</span></div><div class='line' id='LC721'>				<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">settings</span><span class="p">.</span><span class="nx">scrolling</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC722'>					<span class="nx">iframe</span><span class="p">.</span><span class="nx">scrolling</span> <span class="o">=</span> <span class="s2">&quot;no&quot;</span><span class="p">;</span></div><div class='line' id='LC723'>				<span class="p">}</span></div><div class='line' id='LC724'>				<span class="nx">$</span><span class="p">(</span><span class="nx">iframe</span><span class="p">).</span><span class="nx">addClass</span><span class="p">(</span><span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;Iframe&#39;</span><span class="p">).</span><span class="nx">appendTo</span><span class="p">(</span><span class="nx">$loaded</span><span class="p">).</span><span class="nx">one</span><span class="p">(</span><span class="nx">event_purge</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC725'>					<span class="nx">iframe</span><span class="p">.</span><span class="nx">src</span> <span class="o">=</span> <span class="s2">&quot;//about:blank&quot;</span><span class="p">;</span></div><div class='line' id='LC726'>				<span class="p">});</span></div><div class='line' id='LC727'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC728'>				<span class="nx">complete</span><span class="p">();</span></div><div class='line' id='LC729'>			<span class="p">}</span></div><div class='line' id='LC730'><br/></div><div class='line' id='LC731'>			<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">transition</span> <span class="o">===</span> <span class="s1">&#39;fade&#39;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC732'>				<span class="nx">$box</span><span class="p">.</span><span class="nx">fadeTo</span><span class="p">(</span><span class="nx">speed</span><span class="p">,</span> <span class="mi">1</span><span class="p">,</span> <span class="nx">removeFilter</span><span class="p">);</span></div><div class='line' id='LC733'>			<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC734'>				<span class="nx">removeFilter</span><span class="p">();</span></div><div class='line' id='LC735'>			<span class="p">}</span></div><div class='line' id='LC736'>		<span class="p">};</span></div><div class='line' id='LC737'><br/></div><div class='line' id='LC738'>		<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">transition</span> <span class="o">===</span> <span class="s1">&#39;fade&#39;</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC739'>			<span class="nx">$box</span><span class="p">.</span><span class="nx">fadeTo</span><span class="p">(</span><span class="nx">speed</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC740'>				<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">position</span><span class="p">(</span><span class="mi">0</span><span class="p">,</span> <span class="nx">callback</span><span class="p">);</span></div><div class='line' id='LC741'>			<span class="p">});</span></div><div class='line' id='LC742'>		<span class="p">}</span> <span class="k">else</span> <span class="p">{</span></div><div class='line' id='LC743'>			<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">position</span><span class="p">(</span><span class="nx">speed</span><span class="p">,</span> <span class="nx">callback</span><span class="p">);</span></div><div class='line' id='LC744'>		<span class="p">}</span></div><div class='line' id='LC745'>	<span class="p">};</span></div><div class='line' id='LC746'><br/></div><div class='line' id='LC747'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">load</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">launched</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC748'>		<span class="kd">var</span> <span class="nx">href</span><span class="p">,</span> <span class="nx">setResize</span><span class="p">,</span> <span class="nx">prep</span> <span class="o">=</span> <span class="nx">publicMethod</span><span class="p">.</span><span class="nx">prep</span><span class="p">;</span></div><div class='line' id='LC749'><br/></div><div class='line' id='LC750'>		<span class="nx">active</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC751'><br/></div><div class='line' id='LC752'>		<span class="nx">photo</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC753'><br/></div><div class='line' id='LC754'>		<span class="nx">element</span> <span class="o">=</span> <span class="nx">$related</span><span class="p">[</span><span class="nx">index</span><span class="p">];</span></div><div class='line' id='LC755'><br/></div><div class='line' id='LC756'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">launched</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC757'>			<span class="nx">makeSettings</span><span class="p">();</span></div><div class='line' id='LC758'>		<span class="p">}</span></div><div class='line' id='LC759'><br/></div><div class='line' id='LC760'>		<span class="nx">trigger</span><span class="p">(</span><span class="nx">event_purge</span><span class="p">);</span></div><div class='line' id='LC761'><br/></div><div class='line' id='LC762'>		<span class="nx">trigger</span><span class="p">(</span><span class="nx">event_load</span><span class="p">,</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">onLoad</span><span class="p">);</span></div><div class='line' id='LC763'><br/></div><div class='line' id='LC764'>		<span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">height</span> <span class="o">?</span></div><div class='line' id='LC765'>				<span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">height</span><span class="p">,</span> <span class="s1">&#39;y&#39;</span><span class="p">)</span> <span class="o">-</span> <span class="nx">loadedHeight</span> <span class="o">-</span> <span class="nx">interfaceHeight</span> <span class="o">:</span></div><div class='line' id='LC766'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">innerHeight</span> <span class="o">&amp;&amp;</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">innerHeight</span><span class="p">,</span> <span class="s1">&#39;y&#39;</span><span class="p">);</span></div><div class='line' id='LC767'><br/></div><div class='line' id='LC768'>		<span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">width</span> <span class="o">?</span></div><div class='line' id='LC769'>				<span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">width</span><span class="p">,</span> <span class="s1">&#39;x&#39;</span><span class="p">)</span> <span class="o">-</span> <span class="nx">loadedWidth</span> <span class="o">-</span> <span class="nx">interfaceWidth</span> <span class="o">:</span></div><div class='line' id='LC770'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">innerWidth</span> <span class="o">&amp;&amp;</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">innerWidth</span><span class="p">,</span> <span class="s1">&#39;x&#39;</span><span class="p">);</span></div><div class='line' id='LC771'><br/></div><div class='line' id='LC772'>		<span class="c1">// Sets the minimum dimensions for use in image scaling</span></div><div class='line' id='LC773'>		<span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span><span class="p">;</span></div><div class='line' id='LC774'>		<span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span><span class="p">;</span></div><div class='line' id='LC775'><br/></div><div class='line' id='LC776'>		<span class="c1">// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.</span></div><div class='line' id='LC777'>		<span class="c1">// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.</span></div><div class='line' id='LC778'>		<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">maxWidth</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC779'>			<span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span> <span class="o">=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">maxWidth</span><span class="p">,</span> <span class="s1">&#39;x&#39;</span><span class="p">)</span> <span class="o">-</span> <span class="nx">loadedWidth</span> <span class="o">-</span> <span class="nx">interfaceWidth</span><span class="p">;</span></div><div class='line' id='LC780'>			<span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">&amp;&amp;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">&lt;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span> <span class="o">?</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">w</span> <span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span><span class="p">;</span></div><div class='line' id='LC781'>		<span class="p">}</span></div><div class='line' id='LC782'>		<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">maxHeight</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC783'>			<span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span> <span class="o">=</span> <span class="nx">setSize</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">maxHeight</span><span class="p">,</span> <span class="s1">&#39;y&#39;</span><span class="p">)</span> <span class="o">-</span> <span class="nx">loadedHeight</span> <span class="o">-</span> <span class="nx">interfaceHeight</span><span class="p">;</span></div><div class='line' id='LC784'>			<span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">&amp;&amp;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">&lt;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span> <span class="o">?</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">:</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span><span class="p">;</span></div><div class='line' id='LC785'>		<span class="p">}</span></div><div class='line' id='LC786'><br/></div><div class='line' id='LC787'>		<span class="nx">href</span> <span class="o">=</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">href</span><span class="p">;</span></div><div class='line' id='LC788'><br/></div><div class='line' id='LC789'>		<span class="nx">loadingTimer</span> <span class="o">=</span> <span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC790'>			<span class="nx">$loadingOverlay</span><span class="p">.</span><span class="nx">show</span><span class="p">();</span></div><div class='line' id='LC791'>		<span class="p">},</span> <span class="mi">100</span><span class="p">);</span></div><div class='line' id='LC792'><br/></div><div class='line' id='LC793'>		<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">inline</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC794'>			<span class="c1">// Inserts an empty placeholder where inline content is being pulled from.</span></div><div class='line' id='LC795'>			<span class="c1">// An event is bound to put inline content back when ColorBox closes or loads new content.</span></div><div class='line' id='LC796'>			<span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">).</span><span class="nx">hide</span><span class="p">().</span><span class="nx">insertBefore</span><span class="p">(</span><span class="nx">$</span><span class="p">(</span><span class="nx">href</span><span class="p">)[</span><span class="mi">0</span><span class="p">]).</span><span class="nx">one</span><span class="p">(</span><span class="nx">event_purge</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC797'>				<span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">replaceWith</span><span class="p">(</span><span class="nx">$loaded</span><span class="p">.</span><span class="nx">children</span><span class="p">());</span></div><div class='line' id='LC798'>			<span class="p">});</span></div><div class='line' id='LC799'>			<span class="nx">prep</span><span class="p">(</span><span class="nx">$</span><span class="p">(</span><span class="nx">href</span><span class="p">));</span></div><div class='line' id='LC800'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">iframe</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC801'>			<span class="c1">// IFrame element won&#39;t be added to the DOM until it is ready to be displayed,</span></div><div class='line' id='LC802'>			<span class="c1">// to avoid problems with DOM-ready JS that might be trying to run in that iframe.</span></div><div class='line' id='LC803'>			<span class="nx">prep</span><span class="p">(</span><span class="s2">&quot; &quot;</span><span class="p">);</span></div><div class='line' id='LC804'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">html</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC805'>			<span class="nx">prep</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">html</span><span class="p">);</span></div><div class='line' id='LC806'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">isImage</span><span class="p">(</span><span class="nx">href</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC807'>			<span class="nx">$</span><span class="p">(</span><span class="nx">photo</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">Image</span><span class="p">())</span></div><div class='line' id='LC808'>			<span class="p">.</span><span class="nx">addClass</span><span class="p">(</span><span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39;Photo&#39;</span><span class="p">)</span></div><div class='line' id='LC809'>			<span class="p">.</span><span class="nx">error</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC810'>				<span class="nx">settings</span><span class="p">.</span><span class="nx">title</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC811'>				<span class="nx">prep</span><span class="p">(</span><span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s1">&#39;Error&#39;</span><span class="p">).</span><span class="nx">html</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">imgError</span><span class="p">));</span></div><div class='line' id='LC812'>			<span class="p">})</span></div><div class='line' id='LC813'>			<span class="p">.</span><span class="nx">load</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC814'>				<span class="kd">var</span> <span class="nx">percent</span><span class="p">;</span></div><div class='line' id='LC815'>				<span class="nx">photo</span><span class="p">.</span><span class="nx">onload</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span> <span class="c1">//stops animated gifs from firing the onload repeatedly.</span></div><div class='line' id='LC816'><br/></div><div class='line' id='LC817'>				<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">scalePhotos</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC818'>					<span class="nx">setResize</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC819'>						<span class="nx">photo</span><span class="p">.</span><span class="nx">height</span> <span class="o">-=</span> <span class="nx">photo</span><span class="p">.</span><span class="nx">height</span> <span class="o">*</span> <span class="nx">percent</span><span class="p">;</span></div><div class='line' id='LC820'>						<span class="nx">photo</span><span class="p">.</span><span class="nx">width</span> <span class="o">-=</span> <span class="nx">photo</span><span class="p">.</span><span class="nx">width</span> <span class="o">*</span> <span class="nx">percent</span><span class="p">;</span>	</div><div class='line' id='LC821'>					<span class="p">};</span></div><div class='line' id='LC822'>					<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span> <span class="o">&amp;&amp;</span> <span class="nx">photo</span><span class="p">.</span><span class="nx">width</span> <span class="o">&gt;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC823'>						<span class="nx">percent</span> <span class="o">=</span> <span class="p">(</span><span class="nx">photo</span><span class="p">.</span><span class="nx">width</span> <span class="o">-</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mw</span><span class="p">)</span> <span class="o">/</span> <span class="nx">photo</span><span class="p">.</span><span class="nx">width</span><span class="p">;</span></div><div class='line' id='LC824'>						<span class="nx">setResize</span><span class="p">();</span></div><div class='line' id='LC825'>					<span class="p">}</span></div><div class='line' id='LC826'>					<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span> <span class="o">&amp;&amp;</span> <span class="nx">photo</span><span class="p">.</span><span class="nx">height</span> <span class="o">&gt;</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC827'>						<span class="nx">percent</span> <span class="o">=</span> <span class="p">(</span><span class="nx">photo</span><span class="p">.</span><span class="nx">height</span> <span class="o">-</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">mh</span><span class="p">)</span> <span class="o">/</span> <span class="nx">photo</span><span class="p">.</span><span class="nx">height</span><span class="p">;</span></div><div class='line' id='LC828'>						<span class="nx">setResize</span><span class="p">();</span></div><div class='line' id='LC829'>					<span class="p">}</span></div><div class='line' id='LC830'>				<span class="p">}</span></div><div class='line' id='LC831'><br/></div><div class='line' id='LC832'>				<span class="k">if</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">h</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC833'>					<span class="nx">photo</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">marginTop</span> <span class="o">=</span> <span class="nb">Math</span><span class="p">.</span><span class="nx">max</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">h</span> <span class="o">-</span> <span class="nx">photo</span><span class="p">.</span><span class="nx">height</span><span class="p">,</span> <span class="mi">0</span><span class="p">)</span> <span class="o">/</span> <span class="mi">2</span> <span class="o">+</span> <span class="s1">&#39;px&#39;</span><span class="p">;</span></div><div class='line' id='LC834'>				<span class="p">}</span></div><div class='line' id='LC835'><br/></div><div class='line' id='LC836'>				<span class="k">if</span> <span class="p">(</span><span class="nx">$related</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">loop</span> <span class="o">||</span> <span class="nx">$related</span><span class="p">[</span><span class="nx">index</span> <span class="o">+</span> <span class="mi">1</span><span class="p">]))</span> <span class="p">{</span></div><div class='line' id='LC837'>					<span class="nx">photo</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">cursor</span> <span class="o">=</span> <span class="s1">&#39;pointer&#39;</span><span class="p">;</span></div><div class='line' id='LC838'>					<span class="nx">photo</span><span class="p">.</span><span class="nx">onclick</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC839'>						<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">next</span><span class="p">();</span></div><div class='line' id='LC840'>					<span class="p">};</span></div><div class='line' id='LC841'>				<span class="p">}</span></div><div class='line' id='LC842'><br/></div><div class='line' id='LC843'>				<span class="k">if</span> <span class="p">(</span><span class="nx">isIE</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC844'>					<span class="nx">photo</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">msInterpolationMode</span> <span class="o">=</span> <span class="s1">&#39;bicubic&#39;</span><span class="p">;</span></div><div class='line' id='LC845'>				<span class="p">}</span></div><div class='line' id='LC846'><br/></div><div class='line' id='LC847'>				<span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span> <span class="c1">// A pause because Chrome will sometimes report a 0 by 0 size otherwise.</span></div><div class='line' id='LC848'>					<span class="nx">prep</span><span class="p">(</span><span class="nx">photo</span><span class="p">);</span></div><div class='line' id='LC849'>				<span class="p">},</span> <span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC850'>			<span class="p">});</span></div><div class='line' id='LC851'><br/></div><div class='line' id='LC852'>			<span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span> <span class="c1">// A pause because Opera 10.6+ will sometimes not run the onload function otherwise.</span></div><div class='line' id='LC853'>				<span class="nx">photo</span><span class="p">.</span><span class="nx">src</span> <span class="o">=</span> <span class="nx">href</span><span class="p">;</span></div><div class='line' id='LC854'>			<span class="p">},</span> <span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC855'>		<span class="p">}</span> <span class="k">else</span> <span class="k">if</span> <span class="p">(</span><span class="nx">href</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC856'>			<span class="nx">$loadingBay</span><span class="p">.</span><span class="nx">load</span><span class="p">(</span><span class="nx">href</span><span class="p">,</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">data</span><span class="p">,</span> <span class="kd">function</span> <span class="p">(</span><span class="nx">data</span><span class="p">,</span> <span class="nx">status</span><span class="p">,</span> <span class="nx">xhr</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC857'>				<span class="nx">prep</span><span class="p">(</span><span class="nx">status</span> <span class="o">===</span> <span class="s1">&#39;error&#39;</span> <span class="o">?</span> <span class="nx">$tag</span><span class="p">(</span><span class="nx">div</span><span class="p">,</span> <span class="s1">&#39;Error&#39;</span><span class="p">).</span><span class="nx">html</span><span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">xhrError</span><span class="p">)</span> <span class="o">:</span> <span class="nx">$</span><span class="p">(</span><span class="k">this</span><span class="p">).</span><span class="nx">contents</span><span class="p">());</span></div><div class='line' id='LC858'>			<span class="p">});</span></div><div class='line' id='LC859'>		<span class="p">}</span></div><div class='line' id='LC860'>	<span class="p">};</span></div><div class='line' id='LC861'><br/></div><div class='line' id='LC862'>	<span class="c1">// Navigates to the next page/image in a set.</span></div><div class='line' id='LC863'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">next</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC864'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">active</span> <span class="o">&amp;&amp;</span> <span class="nx">$related</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">loop</span> <span class="o">||</span> <span class="nx">$related</span><span class="p">[</span><span class="nx">index</span> <span class="o">+</span> <span class="mi">1</span><span class="p">]))</span> <span class="p">{</span></div><div class='line' id='LC865'>			<span class="nx">index</span> <span class="o">=</span> <span class="nx">getIndex</span><span class="p">(</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC866'>			<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">load</span><span class="p">();</span></div><div class='line' id='LC867'>		<span class="p">}</span></div><div class='line' id='LC868'>	<span class="p">};</span></div><div class='line' id='LC869'><br/></div><div class='line' id='LC870'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">prev</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC871'>		<span class="k">if</span> <span class="p">(</span><span class="o">!</span><span class="nx">active</span> <span class="o">&amp;&amp;</span> <span class="nx">$related</span><span class="p">[</span><span class="mi">1</span><span class="p">]</span> <span class="o">&amp;&amp;</span> <span class="p">(</span><span class="nx">settings</span><span class="p">.</span><span class="nx">loop</span> <span class="o">||</span> <span class="nx">index</span><span class="p">))</span> <span class="p">{</span></div><div class='line' id='LC872'>			<span class="nx">index</span> <span class="o">=</span> <span class="nx">getIndex</span><span class="p">(</span><span class="o">-</span><span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC873'>			<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">load</span><span class="p">();</span></div><div class='line' id='LC874'>		<span class="p">}</span></div><div class='line' id='LC875'>	<span class="p">};</span></div><div class='line' id='LC876'><br/></div><div class='line' id='LC877'>	<span class="c1">// Note: to use this within an iframe use the following format: parent.$.fn.colorbox.close();</span></div><div class='line' id='LC878'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">close</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC879'>		<span class="k">if</span> <span class="p">(</span><span class="nx">open</span> <span class="o">&amp;&amp;</span> <span class="o">!</span><span class="nx">closing</span><span class="p">)</span> <span class="p">{</span></div><div class='line' id='LC880'><br/></div><div class='line' id='LC881'>			<span class="nx">closing</span> <span class="o">=</span> <span class="kc">true</span><span class="p">;</span></div><div class='line' id='LC882'><br/></div><div class='line' id='LC883'>			<span class="nx">open</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC884'><br/></div><div class='line' id='LC885'>			<span class="nx">trigger</span><span class="p">(</span><span class="nx">event_cleanup</span><span class="p">,</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">onCleanup</span><span class="p">);</span></div><div class='line' id='LC886'><br/></div><div class='line' id='LC887'>			<span class="nx">$window</span><span class="p">.</span><span class="nx">unbind</span><span class="p">(</span><span class="s1">&#39;.&#39;</span> <span class="o">+</span> <span class="nx">prefix</span> <span class="o">+</span> <span class="s1">&#39; .&#39;</span> <span class="o">+</span> <span class="nx">event_ie6</span><span class="p">);</span></div><div class='line' id='LC888'><br/></div><div class='line' id='LC889'>			<span class="nx">$overlay</span><span class="p">.</span><span class="nx">fadeTo</span><span class="p">(</span><span class="mi">200</span><span class="p">,</span> <span class="mi">0</span><span class="p">);</span></div><div class='line' id='LC890'><br/></div><div class='line' id='LC891'>			<span class="nx">$box</span><span class="p">.</span><span class="nx">stop</span><span class="p">().</span><span class="nx">fadeTo</span><span class="p">(</span><span class="mi">300</span><span class="p">,</span> <span class="mi">0</span><span class="p">,</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC892'><br/></div><div class='line' id='LC893'>				<span class="nx">$box</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="nx">$overlay</span><span class="p">).</span><span class="nx">css</span><span class="p">({</span><span class="s1">&#39;opacity&#39;</span><span class="o">:</span> <span class="mi">1</span><span class="p">,</span> <span class="nx">cursor</span><span class="o">:</span> <span class="s1">&#39;auto&#39;</span><span class="p">}).</span><span class="nx">hide</span><span class="p">();</span></div><div class='line' id='LC894'><br/></div><div class='line' id='LC895'>				<span class="nx">trigger</span><span class="p">(</span><span class="nx">event_purge</span><span class="p">);</span></div><div class='line' id='LC896'><br/></div><div class='line' id='LC897'>				<span class="nx">$loaded</span><span class="p">.</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC898'><br/></div><div class='line' id='LC899'>				<span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC900'>					<span class="nx">closing</span> <span class="o">=</span> <span class="kc">false</span><span class="p">;</span></div><div class='line' id='LC901'>					<span class="nx">trigger</span><span class="p">(</span><span class="nx">event_closed</span><span class="p">,</span> <span class="nx">settings</span><span class="p">.</span><span class="nx">onClosed</span><span class="p">);</span></div><div class='line' id='LC902'>				<span class="p">},</span> <span class="mi">1</span><span class="p">);</span></div><div class='line' id='LC903'>			<span class="p">});</span></div><div class='line' id='LC904'>		<span class="p">}</span></div><div class='line' id='LC905'>	<span class="p">};</span></div><div class='line' id='LC906'><br/></div><div class='line' id='LC907'>	<span class="c1">// Removes changes ColorBox made to the document, but does not remove the plugin</span></div><div class='line' id='LC908'>	<span class="c1">// from jQuery.</span></div><div class='line' id='LC909'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">remove</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC910'>		<span class="nx">$</span><span class="p">([]).</span><span class="nx">add</span><span class="p">(</span><span class="nx">$box</span><span class="p">).</span><span class="nx">add</span><span class="p">(</span><span class="nx">$overlay</span><span class="p">).</span><span class="nx">remove</span><span class="p">();</span></div><div class='line' id='LC911'>		<span class="nx">$box</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span></div><div class='line' id='LC912'>		<span class="nx">$</span><span class="p">(</span><span class="s1">&#39;.&#39;</span> <span class="o">+</span> <span class="nx">boxElement</span><span class="p">)</span></div><div class='line' id='LC913'>			<span class="p">.</span><span class="nx">removeData</span><span class="p">(</span><span class="nx">colorbox</span><span class="p">)</span></div><div class='line' id='LC914'>			<span class="p">.</span><span class="nx">removeClass</span><span class="p">(</span><span class="nx">boxElement</span><span class="p">)</span></div><div class='line' id='LC915'>			<span class="p">.</span><span class="nx">die</span><span class="p">();</span></div><div class='line' id='LC916'>	<span class="p">};</span></div><div class='line' id='LC917'><br/></div><div class='line' id='LC918'>	<span class="c1">// A method for fetching the current element ColorBox is referencing.</span></div><div class='line' id='LC919'>	<span class="c1">// returns a jQuery object.</span></div><div class='line' id='LC920'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">element</span> <span class="o">=</span> <span class="kd">function</span> <span class="p">()</span> <span class="p">{</span></div><div class='line' id='LC921'>		<span class="k">return</span> <span class="nx">$</span><span class="p">(</span><span class="nx">element</span><span class="p">);</span></div><div class='line' id='LC922'>	<span class="p">};</span></div><div class='line' id='LC923'><br/></div><div class='line' id='LC924'>	<span class="nx">publicMethod</span><span class="p">.</span><span class="nx">settings</span> <span class="o">=</span> <span class="nx">defaults</span><span class="p">;</span></div><div class='line' id='LC925'><br/></div><div class='line' id='LC926'><span class="p">}(</span><span class="nx">jQuery</span><span class="p">,</span> <span class="nb">document</span><span class="p">,</span> <span class="k">this</span><span class="p">));</span></div></pre></div>
          </td>
        </tr>
      </table>
  </div>

          </div>
        </div>
      </div>
    </div>

  </div>

<div class="frame frame-loading large-loading-area" style="display:none;" data-tree-list-url="/jackmoore/colorbox/tree-list/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346" data-blob-url-prefix="/jackmoore/colorbox/blob/2a9b30084a4e67dce2dcba9091dcd7d9ebc65346">
  <img src="https://a248.e.akamai.net/assets.github.com/images/spinners/octocat-spinner-64.gif?1329872007" height="64" width="64">
</div>

      </div>
      <div class="context-overlay"></div>
    </div>

      <div id="footer-push"></div><!-- hack for sticky footer -->
    </div><!-- end of wrapper - hack for sticky footer -->

      <!-- footer -->
      <div id="footer" >
        
  <div class="upper_footer">
     <div class="container clearfix">

       <!--[if IE]><h4 id="blacktocat_ie">GitHub Links</h4><![endif]-->
       <![if !IE]><h4 id="blacktocat">GitHub Links</h4><![endif]>

       <ul class="footer_nav">
         <h4>GitHub</h4>
         <li><a href="https://github.com/about">About</a></li>
         <li><a href="https://github.com/blog">Blog</a></li>
         <li><a href="https://github.com/features">Features</a></li>
         <li><a href="https://github.com/contact">Contact &amp; Support</a></li>
         <li><a href="https://github.com/training">Training</a></li>
         <li><a href="http://enterprise.github.com/">GitHub Enterprise</a></li>
         <li><a href="http://status.github.com/">Site Status</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Tools</h4>
         <li><a href="http://get.gaug.es/">Gauges: Analyze web traffic</a></li>
         <li><a href="http://speakerdeck.com">Speaker Deck: Presentations</a></li>
         <li><a href="https://gist.github.com">Gist: Code snippets</a></li>
         <li><a href="http://mac.github.com/">GitHub for Mac</a></li>
         <li><a href="http://mobile.github.com/">Issues for iPhone</a></li>
         <li><a href="http://jobs.github.com/">Job Board</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Extras</h4>
         <li><a href="http://shop.github.com/">GitHub Shop</a></li>
         <li><a href="http://octodex.github.com/">The Octodex</a></li>
       </ul>

       <ul class="footer_nav">
         <h4>Documentation</h4>
         <li><a href="http://help.github.com/">GitHub Help</a></li>
         <li><a href="http://developer.github.com/">Developer API</a></li>
         <li><a href="http://github.github.com/github-flavored-markdown/">GitHub Flavored Markdown</a></li>
         <li><a href="http://pages.github.com/">GitHub Pages</a></li>
       </ul>

     </div><!-- /.site -->
  </div><!-- /.upper_footer -->

<div class="lower_footer">
  <div class="container clearfix">
    <!--[if IE]><div id="legal_ie"><![endif]-->
    <![if !IE]><div id="legal"><![endif]>
      <ul>
          <li><a href="https://github.com/site/terms">Terms of Service</a></li>
          <li><a href="https://github.com/site/privacy">Privacy</a></li>
          <li><a href="https://github.com/security">Security</a></li>
      </ul>

      <p>&copy; 2012 <span title="0.05154s from fe11.rs.github.com">GitHub</span> Inc. All rights reserved.</p>
    </div><!-- /#legal or /#legal_ie-->

      <div class="sponsor">
        <a href="http://www.rackspace.com" class="logo">
          <img alt="Dedicated Server" height="36" src="https://a248.e.akamai.net/assets.github.com/images/modules/footer/rackspaces_logo.png?1329521039" width="38" />
        </a>
        Powered by the <a href="http://www.rackspace.com ">Dedicated
        Servers</a> and<br/> <a href="http://www.rackspacecloud.com">Cloud
        Computing</a> of Rackspace Hosting<span>&reg;</span>
      </div>
  </div><!-- /.site -->
</div><!-- /.lower_footer -->

      </div><!-- /#footer -->

    

<div id="keyboard_shortcuts_pane" class="instapaper_ignore readability-extra" style="display:none">
  <h2>Keyboard Shortcuts <small><a href="#" class="js-see-all-keyboard-shortcuts">(see all)</a></small></h2>

  <div class="columns threecols">
    <div class="column first">
      <h3>Site wide shortcuts</h3>
      <dl class="keyboard-mappings">
        <dt>s</dt>
        <dd>Focus site search</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>?</dt>
        <dd>Bring up this help dialog</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column middle" style='display:none'>
      <h3>Commit list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>c <em>or</em> o <em>or</em> enter</dt>
        <dd>Open commit</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>y</dt>
        <dd>Expand URL to its canonical form</dd>
      </dl>
    </div><!-- /.column.first -->

    <div class="column last" style='display:none'>
      <h3>Pull request list</h3>
      <dl class="keyboard-mappings">
        <dt>j</dt>
        <dd>Move selection down</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>k</dt>
        <dd>Move selection up</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt>o <em>or</em> enter</dt>
        <dd>Open issue</dd>
      </dl>
      <dl class="keyboard-mappings">
        <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
        <dd>Submit comment</dd>
      </dl>
    </div><!-- /.columns.last -->

  </div><!-- /.columns.equacols -->

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>x</dt>
          <dd>Toggle selection</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>c</dt>
          <dd>Create issue</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Create label</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>i</dt>
          <dd>Back to inbox</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>u</dt>
          <dd>Back to issues</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>/</dt>
          <dd>Focus issues search</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Issues Dashboard</h3>

    <div class="columns threecols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt>j</dt>
          <dd>Move selection down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>k</dt>
          <dd>Move selection up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o <em>or</em> enter</dt>
          <dd>Open issue</dd>
        </dl>
      </div><!-- /.column.first -->
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>

    <h3>Network Graph</h3>
    <div class="columns equacols">
      <div class="column first">
        <dl class="keyboard-mappings">
          <dt><span class="badmono">←</span> <em>or</em> h</dt>
          <dd>Scroll left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">→</span> <em>or</em> l</dt>
          <dd>Scroll right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↑</span> <em>or</em> k</dt>
          <dd>Scroll up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt><span class="badmono">↓</span> <em>or</em> j</dt>
          <dd>Scroll down</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Toggle visibility of head labels</dd>
        </dl>
      </div><!-- /.column.first -->
      <div class="column last">
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">←</span> <em>or</em> shift h</dt>
          <dd>Scroll all the way left</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">→</span> <em>or</em> shift l</dt>
          <dd>Scroll all the way right</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↑</span> <em>or</em> shift k</dt>
          <dd>Scroll all the way up</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>shift <span class="badmono">↓</span> <em>or</em> shift j</dt>
          <dd>Scroll all the way down</dd>
        </dl>
      </div><!-- /.column.last -->
    </div>
  </div>

  <div >
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first" >
        <h3>Source Code Browsing</h3>
        <dl class="keyboard-mappings">
          <dt>t</dt>
          <dd>Activates the file finder</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>l</dt>
          <dd>Jump to line</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>w</dt>
          <dd>Switch branch/tag</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>y</dt>
          <dd>Expand URL to its canonical form</dd>
        </dl>
      </div>
    </div>
  </div>

  <div style='display:none'>
    <div class="rule"></div>
    <div class="columns threecols">
      <div class="column first">
        <h3>Browsing Commits</h3>
        <dl class="keyboard-mappings">
          <dt><span class="platform-mac">⌘</span><span class="platform-other">ctrl</span> <em>+</em> enter</dt>
          <dd>Submit comment</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>escape</dt>
          <dd>Close form</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>p</dt>
          <dd>Parent commit</dd>
        </dl>
        <dl class="keyboard-mappings">
          <dt>o</dt>
          <dd>Other parent commit</dd>
        </dl>
      </div>
    </div>
  </div>
</div>

    <div id="markdown-help" class="instapaper_ignore readability-extra">
  <h2>Markdown Cheat Sheet</h2>

  <div class="cheatsheet-content">

  <div class="mod">
    <div class="col">
      <h3>Format Text</h3>
      <p>Headers</p>
      <pre>
# This is an &lt;h1&gt; tag
## This is an &lt;h2&gt; tag
###### This is an &lt;h6&gt; tag</pre>
     <p>Text styles</p>
     <pre>
*This text will be italic*
_This will also be italic_
**This text will be bold**
__This will also be bold__

*You **can** combine them*
</pre>
    </div>
    <div class="col">
      <h3>Lists</h3>
      <p>Unordered</p>
      <pre>
* Item 1
* Item 2
  * Item 2a
  * Item 2b</pre>
     <p>Ordered</p>
     <pre>
1. Item 1
2. Item 2
3. Item 3
   * Item 3a
   * Item 3b</pre>
    </div>
    <div class="col">
      <h3>Miscellaneous</h3>
      <p>Images</p>
      <pre>
![GitHub Logo](/images/logo.png)
Format: ![Alt Text](url)
</pre>
     <p>Links</p>
     <pre>
http://github.com - automatic!
[GitHub](http://github.com)</pre>
<p>Blockquotes</p>
     <pre>
As Kanye West said:

> We're living the future so
> the present is our past.
</pre>
    </div>
  </div>
  <div class="rule"></div>

  <h3>Code Examples in Markdown</h3>
  <div class="col">
      <p>Syntax highlighting with <a href="http://github.github.com/github-flavored-markdown/" title="GitHub Flavored Markdown" target="_blank">GFM</a></p>
      <pre>
```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```</pre>
    </div>
    <div class="col">
      <p>Or, indent your code 4 spaces</p>
      <pre>
Here is a Python code example
without syntax highlighting:

    def foo:
      if not bar:
        return true</pre>
    </div>
    <div class="col">
      <p>Inline code for comments</p>
      <pre>
I think you should use an
`&lt;addr&gt;` element here instead.</pre>
    </div>
  </div>

  </div>
</div>


    <div class="ajax-error-message">
      <p><span class="mini-icon exclamation"></span> Something went wrong with that request. Please try again. <a href="javascript:;" class="ajax-error-dismiss">Dismiss</a></p>
    </div>

    <div id="logo-popup">
      <h2>Looking for the GitHub logo?</h2>
      <ul>
        <li>
          <h4>GitHub Logo</h4>
          <a href="http://github-media-downloads.s3.amazonaws.com/GitHub_Logos.zip"><img alt="Github_logo" src="https://a248.e.akamai.net/assets.github.com/images/modules/about_page/github_logo.png?1315928456" /></a>
          <a href="http://github-media-downloads.s3.amazonaws.com/GitHub_Logos.zip" class="minibutton btn-download download"><span><span class="icon"></span>Download</span></a>
        </li>
        <li>
          <h4>The Octocat</h4>
          <a href="http://github-media-downloads.s3.amazonaws.com/Octocats.zip"><img alt="Octocat" src="https://a248.e.akamai.net/assets.github.com/images/modules/about_page/octocat.png?1315928456" /></a>
          <a href="http://github-media-downloads.s3.amazonaws.com/Octocats.zip" class="minibutton btn-download download"><span><span class="icon"></span>Download</span></a>
        </li>
      </ul>
    </div>

    
    
    
    <span id='server_response_time' data-time='0.05418' data-host='fe11'></span>
  </body>
</html>

