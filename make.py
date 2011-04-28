from os import system, walk, path, mkdir, makedirs
from shutil import copy
import sys, re

from tests import tests_model
from serve import render
from build import Build

YC = 'yuicompressor-2.4.2.jar'
EXCLUDES = ['Source/Extras',
            'Source/Layouts',
            'Source/Options/Options.js'
            'Source/Core/Fx.js',
            'Source/Graph/Graph.Geom.js']
NATURALDOCS_VER = "1.4"
NATURALDOCS = "NaturalDocs-%s" % NATURALDOCS_VER
BUILD_DIR = {
    "jit": "Jit",
    "examples": path.join("Jit", "Examples"),
    "docs": "Docs",
    "extras": path.join("Jit", "Extras"),
}

def main():
    if 'docs' in sys.argv: make_docs()
    if 'examples' in sys.argv: make_examples()
    if 'examples-fancy' in sys.argv: make_examples(fancy=True)
    if 'build' in sys.argv: make_build()
    if 'build-fancy' in sys.argv: make_build(fancy=True)


def make_docs():
    if not path.exists(NATURALDOCS):
        print "Requires NaturalDocs %s." % NATURALDOCS_VER
        print "http://www.naturaldocs.org/download.html"
        return
    
    natural_docs_dir = path.join(NATURALDOCS, 'img')
    if not path.exists(natural_docs_dir):
        mkdir(natural_docs_dir)
    
    if not path.exists(BUILD_DIR["docs"]):
        mkdir(BUILD_DIR["docs"])
    
    # If we can't use 'docstyle' then fallback to 'Default'
    docstyle = 'docstyle'
    if not path.exists(NATURALDOCS + '/Styles/' + docstyle + '.css'):
        docstyle = 'Default'
    
    system("perl "
        + NATURALDOCS + "/NaturalDocs -r "
        + " -i Source/"
        + " -xi " + " -xi ".join(EXCLUDES)
        + " -o HTML " + BUILD_DIR["docs"] + "/"
        + " -p " + NATURALDOCS
        + " -img " + NATURALDOCS + "/img"
        + " -s " + docstyle)


def make_examples(fancy=False):
    if not path.exists(BUILD_DIR["examples"]):
        makedirs(BUILD_DIR["examples"])
    
    #clean examples folders
    system("rm -rf " + BUILD_DIR["examples"] + "/*")
    
    #copy css base files
    system('cp -r Tests/css ' + BUILD_DIR["examples"] + '/css')
    
    has_example = lambda x: 'Example' in x and x['Example']
    
    #iterate over the examples
    for viz, tests in tests_model.items():
        if filter(has_example, tests):
            #create example folder
            mkdir(path.join(BUILD_DIR["examples"], viz))
            for i, model in enumerate(tests):
                if has_example(model):
                    make_example(viz, model, i, fancy)
    
    #copy some extra files
    if fancy:
        system('cp -r Extras/sh ' + BUILD_DIR["examples"] + '/')
        system('cp Extras/code.css ' + BUILD_DIR["examples"] + '/css/code.css')


def make_example(viz, ex, i, fancy):
    
    name = viz
    stri = str(i + 1)
    model = ex
    title = model['Title']
    extras = model['Extras'][:]
    example = 'example' + stri
    strdir = BUILD_DIR["examples"] + '/' + viz + '/'
    
    #insert the example js file
    fcommon = open('Tests/js/common.js', 'r')
    ftest = open('Tests/' + viz + '/test' + stri + '.js', 'r')
    fout = open(strdir + example + '.js', 'w')
    fout.write('\n\n'.join([fcommon.read(), ftest.read().replace('/Tests/css', '../css')]))
    fcommon.close()
    ftest.close()
    fout.close()
    
    #render the html file
    includes = {
        'left':  getattr(render['TestCases'], viz + '/' + 'left')(model, viz, 1, 1),
        'right': getattr(render['TestCases'], viz + '/' + 'test' + stri)(model),
    }
    
    fhtml = open(strdir + example + '.html', 'w')
    html = render['TestCases'].baseexamples(name, title, extras, example, '', includes, fancy).__body__
    fhtml.write(html)
    fhtml.close()
    
    #create syntax highlighted code page
    if fancy:
        begin, end, res = re.compile("[\s]*//[\s]?init ([a-zA-Z0-9]+)[\s]*"), re.compile('[\s]*//[\s]?end[\s]*'), []
        ftest = open('Tests/' + viz + '/test' + stri + '.js', 'r')
        for l in ftest:
            if begin.match(l):
                name, lines = begin.match(l).group(1), []
                for blockline in ftest:
                    if end.match(blockline): break
                    lines.append(blockline)
                
                res.append({
                    'name': name,
                    'code': ''.join(lines)
                })
        
        fcode = open(strdir + example + '.code.html', 'w')
        html = render['TestCases'].basecode(name, title, res, example).__body__
        fcode.write(html)
        fcode.close()


def make_build(fancy=False):
    system('rm -rf ' + BUILD_DIR["jit"] + '/*')
    print "Building Examples..."
    make_examples(fancy)
    print "Done. Building Extras..."
    system('mkdir ' + BUILD_DIR["extras"] + ' && cp Extras/excanvas.js ' + path.join(BUILD_DIR["extras"], 'excanvas.js'))
    print "Done. Building Library..."
    lib = Build().build()
    license = open('LICENSE', 'r').read()
    jit_path = path.join(BUILD_DIR["jit"], "jit.js")
    f = open(jit_path, 'w')
    f.write(license)
    f.write(lib)
    f.close()
    print "Done. Compressing Library..."
    jit_yc_path = path.join(BUILD_DIR["jit"], "jit-yc.js")
    f = open(jit_yc_path, 'w')
    f.write(license)
    f.close()
    system('java -jar Extras/' + YC + ' ' + jit_path + ' >> ' + jit_yc_path)
    print "Done. Zipping..."
    system('rm Jit.zip')
    system('zip -r Jit.zip ' + BUILD_DIR["jit"] + "/")
    print "Done, I guess."
    

if __name__ == "__main__":
    main()
