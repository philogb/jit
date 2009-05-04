from os import system, walk
import sys

PROJECT_ROOT = '/home/nicolas/workspace/jit/'

def main():
    if 'docs' in sys.argv: make_docs()

def make_docs():
    system("perl " 
        + PROJECT_ROOT 
        + "NaturalDocs-1.4/NaturalDocs -i " 
        + PROJECT_ROOT + "Source/ -o HTML "
        + PROJECT_ROOT +"Docs/ -p "
        + PROJECT_ROOT + "NaturalDocs-1.4 -s docstyle -r")
    
if __name__ == "__main__": main()