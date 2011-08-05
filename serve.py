import web
from web import template
from tests import tests_model
from build import Build

urls = (
    '/testcase/(RGraph|Treemap|Icicle|Hypertree|Spacetree|ForceDirected|ForceDirected3D|Sunburst|AreaChart|BarChart|PieChart|TimeGraph|HeatMap|Scatter|LineChart|Other)/([0-9]+)/?', 'testcase',
)

app = web.application(urls, globals())

render = {
    'TestCases': template.render('Templates/'),
}

class testcase(object):
    def GET(self, viz_type, number):
        number_int = int(number)
        max = len(tests_model[viz_type])
        if number_int > max:
            return "Wrong test number"
        
        name = viz_type
        test = 'test' + number + '.js'
                
        model = tests_model[viz_type][number_int -1]
        title = model['Title']
        extras = model['Extras'][:]
        
        if 'Build' in model: build_config = model['Build']
        else: build_config = [viz_type]

        build = Build().build(build_config)
        
        includes = {
            'left':  getattr(render['TestCases'], viz_type + '/' + 'left')(model, viz_type, number_int, max),
            'right': getattr(render['TestCases'], viz_type + '/' + 'test' + number)(model),
        }
        
        return render['TestCases'].basetests(name, title, extras, test, build, includes)

if __name__ == "__main__":
    app.run()
