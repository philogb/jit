from os import system, path, mkdir
import re
import sys

from tests import tests_model
from serve import render
from build import Build

YC = 'yuicompressor-2.4.7.jar'
EXCLUDES = ['Source/Extras',
            'Source/Layouts',
            'Source/Options/Options.js',
            'Source/Core/Fx.js',
            'Source/Graph/Graph.Geom.js',
            'Source/Visualizations/ForceDirected3D.js']
NATURALDOCS_VER = "1.4"
NATURALDOCS = "NaturalDocs-%s" % NATURALDOCS_VER


def main():
    if 'docs' in sys.argv:
        make_docs()
    if 'examples' in sys.argv:
        make_examples()
    if 'examples-fancy' in sys.argv:
        make_examples(fancy=True)
    if 'build' in sys.argv:
        make_build()
    if 'build-fancy' in sys.argv:
        make_build(fancy=True)


def make_docs():
    if not path.exists(NATURALDOCS):
        print "Requires NaturalDocs %s." % NATURALDOCS_VER
        print "http://www.naturaldocs.org/download.html"
        return

    natural_docs_dir = path.join(NATURALDOCS, 'img')
    if not path.exists(natural_docs_dir):
        mkdir(natural_docs_dir)

    if not path.exists('Docs'):
        mkdir('Docs')

    # If we can't use 'docstyle' then fallback to 'Default'
    docstyle = 'docstyle'
    if not path.exists(NATURALDOCS + '/Styles/' + docstyle + '.css'):
        docstyle = 'Default'

    system("perl "
        + NATURALDOCS + "/NaturalDocs -r "
        + " -i Source/"
        + " -xi " + " -xi ".join(EXCLUDES)
        + " -o HTML Docs/"
        + " -p " + NATURALDOCS
        + " -img " + NATURALDOCS + "/img"
        + " -s " + docstyle)


def make_examples(fancy=False):
    if not path.exists('Examples'):
        mkdir('Examples')

    #clean examples folders
    system("rm -rf Examples/*")

    #copy css base files
    system('cp -r Tests/css Examples/css')

    #iterate over the examples
    has_example = lambda x: 'Example' in x and x['Example']

    for viz, tests in tests_model.items():
    #create example folder
        if filter(has_example, tests):
            system('mkdir Examples/' + viz)
            count = 1
            for i, model in enumerate(tests):
                if has_example(model):
                    make_example(viz, model, i, count, fancy)
                    count += 1

    #copy some extra files
    if fancy:
        system('cp -r Extras/sh Examples/')
        system('cp Extras/code.css Examples/css/code.css')


def make_example(viz, ex, i, count, fancy):
    name = viz
    stri = str(i + 1)
    model = ex
    title = model['Title']
    extras = model['Extras'][:]
    example = 'example' + str(count)
    strdir = 'Examples/' + viz + '/'

    if not path.exists(strdir):
        mkdir(strdir)

    #insert the example js file
    fcommon = open('Tests/js/common.js', 'r')
    ftest = open('Tests/' + viz + '/test' + stri + '.js', 'r')
    fout = open(strdir + example + '.js', 'w')
    fout.write('\n\n'.join([fcommon.read(), ftest.read().replace('/Tests/css',
                                                                 '../css')]))
    fcommon.close()
    ftest.close()
    fout.close()

    #render the html file
    includes = {
        'left': getattr(render['TestCases'], viz + '/left')(model, viz, 1, 1),
        'right': getattr(render['TestCases'], viz + '/test' + stri)(model),
    }

    fhtml = open(strdir + example + '.html', 'w')
    html = render['TestCases'].baseexamples(name, title, extras, example, '',
                                            includes, fancy).__body__
    fhtml.write(html)
    fhtml.close()

    #create syntax highlighted code page
    if fancy:
        begin = re.compile("[\s]*//[\s]?init ([a-zA-Z0-9]+)[\s]*")
        end = re.compile('[\s]*//[\s]?end[\s]*')
        res = []
        ftest = open('Tests/' + viz + '/test' + stri + '.js', 'r')
        for l in ftest:
            if begin.match(l):
                name, lines = begin.match(l).group(1), []
                for blockline in ftest:
                    if end.match(blockline):
                        break
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
    system('rm -rf Jit/*')
    print "Building Examples..."
    make_examples(fancy)
    system('cp -r Examples Jit/')
    print "Done. Building Extras..."
    system('mkdir Jit/Extras && cp Extras/excanvas.js Jit/Extras/excanvas.js')
    print "Done. Building Library..."
    lib = Build().build()
    license = open('LICENSE', 'r').read()
    f = open('Jit/jit.js', 'w')
    f.write(license)
    f.write(lib)
    f.close()
    print "Done. Compressing Library..."
    f = open('Jit/jit-yc.js', 'w')
    f.write(license)
    f.close()
    system('java -jar Extras/' + YC + ' Jit/jit.js >> Jit/jit-yc.js')
    print "Done. Zipping..."
    system('rm Jit.zip')
    system('zip -r Jit.zip Jit/')
    print "Done, I guess."


if __name__ == "__main__":
    main()
