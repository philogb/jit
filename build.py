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
            'Graph': ['Core', 'Complex', 'Polar'],
            'Graph.Op': ['Core', 'Graph'],
            'Graph.Plot': ['Core', 'Graph'],
            'Layouts': ['Graph'],
            'Loader': ['Core', 'Graph'],
            'Options': ['Core', 'Animation'],
            'Polar': ['Complex'],
            
            'Hypertree': ['Core',
                          'Options', 
                          'Canvas', 
                          'Complex', 
                          'Polar', 
                          'Graph', 
                          'Graph.Op',
                          'Graph.Plot',
                          'Loader',
                          'Layouts', 
                          'Animation'],
            
            'RGraph':     ['Core', 
                           'Options',
                           'Canvas', 
                           'Complex', 
                           'Polar', 
                           'Graph', 
                           'Graph.Op',
                           'Graph.Plot',
                           'Loader', 
                           'Layouts',
                           'Animation'],
            
            'Spacetree':   ['Core', 
                            'Canvas', 
                            'Complex',
                            'Polar', 
                            'Graph', 
                            'Graph.Op',
                            'Graph.Plot',
                            'Loader',
                            'Layouts', 
                            'Animation'],
                            
            'Treemap':      ['Core']
        }
        
    def build(self, args=['Spacetree', 'RGraph', 'Hypertree', 'Treemap']):
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
