import os, sys, json

prefix = lambda x: os.path.join(os.path.dirname(__file__), x) 
default_visualizations = ['AreaChart', 'BarChart', 'PieChart',
                          'Sunburst', 'Icicle', 'ForceDirected',
                          'Treemap', 'Spacetree', 'RGraph',
                          'Hypertree']
#build model
class Build:
    def __init__(self):
        self.sources = prefix('Source/')
        
        self.included = []
        
        self.script = ''
        
        self.build_model = json.load(open(prefix('build.json'), 'r'))
        
        self.build_paths = {}
        
        for group in self.build_model:
            for script in self.build_model[group]:
                self.build_paths[script] = {
                    'path': self.sources + group + '/' + script + '.js',
                    'deps': self.build_model[group][script]
                }
    
    def build(self, args=[]):
        if not args: args = default_visualizations
        self.script = ''.join([self.load_script(viz) for viz in args if viz in self.build_model['Visualizations']])
        return '(function () { \n\n' + self.script + '\n\n })();'
    
    def load_script(self, script=None):
        ans = ''
        if script and not (script in self.included):
            self.included.append(script)
            ans = ''.join([self.load_script(s) for s in self.build_paths[script]['deps']])
            f = open(self.build_paths[script]['path'])
            ans += f.read() + '\n\n'
            f.close()
        
        return ans

def main():
    ans = Build().build(sys.argv[1:])
    print open(prefix('LICENSE')).read() + ans
    
if __name__ == "__main__": main()
