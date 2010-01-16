import sys

#build model
class Build():
    def __init__(self):
        self.sources = 'Source/'
        
        self.included = []
        
        self.script = ''
        
        self.build_model = {
            'Animation': ['Core'],
            'Canvas': ['Core'],
            'Complex': ['Polar'],
            'Core': [],
            'Extras': ['Core', 'Animation'],
            'Graph': ['Core', 'Complex', 'Polar'],
            'Graph.Op': ['Core', 'Graph'],
            'Graph.Plot': ['Core', 'Graph'],
            'Layouts': ['Graph'],
            'Layouts.Tree': ['Layouts'],
            'Layouts.Radial': ['Layouts'],
            'Layouts.ForceDirected': ['Layouts'],
            'Loader': ['Core', 'Graph'],
            'Options': ['Core', 'Animation'],
            'Polar': ['Complex'],
            
            'Hypertree': ['Core',
                          'Options',
                          'Extras', 
                          'Canvas', 
                          'Complex', 
                          'Polar', 
                          'Graph', 
                          'Graph.Op',
                          'Graph.Plot',
                          'Loader',
                          'Layouts.Radial', 
                          'Animation'],
            
            'RGraph':     ['Core', 
                           'Options',
                           'Extras',
                           'Canvas', 
                           'Complex', 
                           'Polar', 
                           'Graph', 
                           'Graph.Op',
                           'Graph.Plot',
                           'Loader', 
                           'Layouts.Radial',
                           'Animation'],
            
            'Sunburst':     ['Core', 
                           'Options',
                           'Extras',
                           'Canvas', 
                           'Complex', 
                           'Polar', 
                           'Graph', 
                           'Graph.Op',
                           'Graph.Plot',
                           'Loader', 
                           'Layouts.Radial',
                           'Animation'],
            
            'ForceDirected':['Core', 
                           'Options',
                           'Extras',
                           'Canvas', 
                           'Complex', 
                           'Polar', 
                           'Graph', 
                           'Graph.Op',
                           'Graph.Plot',
                           'Loader', 
                           'Layouts.ForceDirected',
                           'Animation'],

            'Spacetree':   ['Core',
                            'Options', 
                            'Extras',
                            'Canvas', 
                            'Complex',
                            'Polar', 
                            'Graph', 
                            'Graph.Op',
                            'Graph.Plot',
                            'Loader',
                            'Layouts.Tree', 
                            'Animation'],
                            
            'Treemap':      ['Core',
                             'Options',
                             'Extras']
        }
        
    def build(self, args=['Spacetree', 'RGraph', 'ForceDirected', 'Hypertree', 'Treemap', 'Sunburst']):
        self.script = ''.join([self.load_script(viz) for viz in args if viz in self.build_model])
        self.script = '(function () { \n\n' + self.script + '\n\n })();'
        return self.script
    
    def load_script(self, script=None):
        ans = ''
        if script and not (script in self.included):
            self.included.append(script)
            ans = ''.join([self.load_script(s) for s in self.build_model[script]])
            f = open(self.sources + script + '.js', 'r')
            ans += f.read() + '\n\n'
            f.close()
        
        return ans

def main():
    ans = Build().build(sys.argv)
    print ans
    
if __name__ == "__main__": main()
