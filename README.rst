=============================
django-tips
=============================

.. image:: https://badge.fury.io/py/django-tips.png
    :target: https://badge.fury.io/py/django-tips

.. image:: https://travis-ci.org/trojsten/django-tips.png?branch=master
    :target: https://travis-ci.org/trojsten/django-tips

Show tip of the day cards on your site.

Quickstart
----------

Install django-tips::

    pip install django-tips

Then use it in a project::

    import tips

Requirements
------------

* django > 1.8
* react
* djangorestframework
* markdown

Recommanded packages
--------------------

* django-sekizai

Building frontend
-----------------

From tips_frontend directory run::

    npm run_script watch

or::

    npm run_script build

Usage
-----
place where you want to show tips::

    {% include "tips/tips.html" %}

include in your base template on appropriate places::

    {% render_block "css" %}

    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react.js" type="text/javascript"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.0.1/react-dom.min.js" type="text/javascript"></script>

    {% render_block "js" %}

include csrf-token ajax setup script if you have csrf protection enabled (you can find the script in the example)::

    <script src="{% static "js/csrf_token.js" %}"></script>

Credits
-------

Tools used in rendering this package:

*  Cookiecutter_
*  `cookiecutter-djangopackage`_

.. _Cookiecutter: https://github.com/audreyr/cookiecutter
.. _`cookiecutter-djangopackage`: https://github.com/trojsten/cookiecutter-djangopackage
