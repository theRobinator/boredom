##########
Ping Pong!
##########

This is a boredom-countering app that attempts to use as many frameworks as possible to keep track of ping pong scores.
Remember that when I say boredom-countering, I mean mine. This was intended to be a way to play around with a bunch of
technologies, not to be something functional or easy to read.

So far, this project uses a basic LAMP API, a node.js server in front of it, and a combination of angular.js and the
Google Closure Compiler on the client. There are three templating systems in total: dust, soy, and angular. On more than
one occasion, I use dust to generate angular which generates soy that generates angular. I think "elegant" is the word
that you're searching for here.


Installation
============

This project has three components: PHP, Node, and Angular.

PHP
---

1. Set up your local Apache server so that you can get to the subprojects/php/www directory from a browser.
2. Modify subprojects/php/settings.php to match your system's settings.

Node
----

1. Modify subprojects/node/src/settings.js to match the URL of your PHP API.

Angular
-------

1. Modify subprojects/js/libs/constants.js to match the URL of your PHP API.

Putting it all together
-----------------------

1. Run dbsetup.sql.
2. Set up a proxy server like nginx that will serve both the node and PHP parts under the same domain. There is an
   example nginx config file in the root directory of this project. Without changes, node will serve on port 3000 and
   apache on 80.
3. Run the runserver script in the root directory. This will take a bit the first time, because it needs to compile the
   client side JS. After the first time, it will just start the server.

Common errors
-------------

- If nginx returns a Bad Gateway error, it means that it can't communicate with either apache or node. Make sure that
  they're running.
- If your API calls are returning with a 500, check your apache error logs. If they say "RewriteRule not allowed here"
  you need to go into your apache configuration and change whatever AllowOverride directives you have in there. If in
  doubt, you can just delete those lines.


Modification
============

If you want to modify the code, you will need to know about the compilation process. Simply pass an argument to the
runserver script to cause it to re-compile your code::

    ./runserver debugHome

In this example, 'home' is the name of the JS module that will be compiled. Other possible modules are 'login,'
'newgame,' 'node', and 'ranking.' If you want to turn off code obfuscation so you can debug, you can pass the
-Pwhitespace argument to the script and it will make your code readable.

Finally, if you need to clean your workspace, you can pass the 'clean' argument to rebuild everything.
