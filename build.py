import sys, json

#build model
class Build():
    def __init__(self):
        self.sources = 'Source/'
        
        self.included = []
        
        self.script = ''
        
        self.build_model = json.load(open('model.json', 'r'))
        
        self.build_paths = {}
        
        for group in self.build_model:
            for script in self.build_model[group]:
                self.build_paths[script] = {
                    'path': self.sources + group + '/' + script + '.js',
                    'deps': self.build_model[group][script]
                }
    
    def build(self, args=[]):
        if len(args) == 0: args = [viz for viz in self.build_model['Visualizations']]
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
    print ans
    
if __name__ == "__main__": main()
