import sys

module_name = '{{cookiecutter.module_slug}}'
if not module_name.startswith('MMM-'):
    print('ERROR: module slug (%s) should start with MMM-' % module_name)
    sys.exit(1)
