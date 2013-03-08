boredom
=======

A boredom-countering app that attempts to use as many frameworks as possible to keep track of ping pong scores.
Remember that when I say boredom-countering, I mean mine. This was intended to be a way to play around with a bunch of
technologies, not to be something functional or easy to read.

So far, this project uses a basic LAMP API, a node.js server in front of it, and a combination of angular.js and the
Google Closure Compiler on the client. There are three templating systems in total: dust, soy, and angular. On more than
one occasion, I use dust to generate angular which generates soy that generates angular. I think "elegant" is the word
that you're searching for here.


Installation
============

1. Run dbsetup.sql.
2. Point your local apache server to serve subprojects/php/www.
3. Add this to the apache config for that directory::

    RewriteRule ^/.../boredom/api/.*?$ /.../boredom/api.php [QSA,L]

4. Modify subprojects/php/settings.php to match your system's settings.
5. From the root directory, run the runserver script. This will take a bit the first time, as it has to run the closure
   compiler on all the JS files. Once that's done, you can hit up localhost:3000 to log in.
