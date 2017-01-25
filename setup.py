#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import sys

try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


if sys.argv[-1] == 'publish':
    try:
        import wheel
        print("Wheel version: ", wheel.__version__)
    except ImportError:
        print('Wheel library missing. Please run "pip install wheel"')
        sys.exit()
    os.system('python setup.py sdist upload')
    os.system('python setup.py bdist_wheel upload')
    sys.exit()

readme = open('README.rst').read()
history = open('HISTORY.rst').read().replace('.. :changelog:', '')

setup(
    name='django-tips',
    version='0.5.0',
    description="""Show tip of the day cards on your site.""",
    long_description=readme + '\n\n' + history,
    author='Michal Hozza',
    author_email='mhozza@gmail.com',
    url='https://github.com/trojsten/django-tips',
    packages=[
        'tips',
    ],
    include_package_data=True,
    install_requires=[
        'Django>=1.8',
        'Markdown',
        'djangorestframework',
    ],
    license="BSD",
    zip_safe=False,
    keywords='django-tips',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Framework :: Django',
        'Framework :: Django :: 1.8',
        'Framework :: Django :: 1.9',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: BSD License',
        'Natural Language :: English',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.5',
    ],
)
