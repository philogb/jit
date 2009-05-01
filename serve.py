import web
from web import template
from tests import tests_model
from build import Build

urls = (
    '/testcase/(RGraph|Treemap|Hypertree|Spacetree)/([0-9]+)/', 'testcase',
)

app = web.application(urls, globals())

render = {
    'TestCases': template.render('Templates/Tests/'),
    'Examples': template.render('Templates/Examples/')
}

class testcase:
    def GET(self, type, number):
        number_int = int(number)
        max = len(tests_model[type])
        if number_int > max:
            return "Wrong test number"
        
        name = type
        test = 'test' + number + '.js'
                
        model = tests_model[type][number_int -1]
        title = model['Title']
        extras = model['Extras'][:]
        
        build_config = getattr(model, 'Build', [type])
        
        build = Build().build(build_config)
        
        includes = {
            'left':  getattr(render['TestCases'], type + '/' + 'left')(model, type, number_int, max),
            'right': getattr(render['TestCases'], type + '/' + 'test' + number)(model),
        }
        
        return render['TestCases'].base(name, title, extras, test, build, includes)

if __name__ == "__main__": app.run()
