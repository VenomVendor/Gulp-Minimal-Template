# Gulp-Minimal-Template [![Build Status](https://travis-ci.org/VenomVendor/Gulp-Minimal-Template.svg?branch=master)](https://travis-ci.org/VenomVendor/Gulp-Minimal-Template)
  Getting started with Gulp which runs as task runnner & local server, serving static files similar to express in node.

# clone
<pre>git clone https://github.com/VenomVendor/Gulp-Minimal-Template.git</pre>

# install dependencies
<pre>npm i</pre>

# start server
<pre>gulp</pre>

# {}
<pre>
git clone https://github.com/VenomVendor/Gulp-Minimal-Template.git
cd Gulp-Minimal-Template
npm i
gulp
</pre>

# default-port
<pre>8080</pre>

# server-url
<pre>http://localhost:8080</pre>

# src-structure
    --index.html
    --js/
        |--*.js
        |--/libs/*.js
    --sass/
        |--*.scss
        |--modules/
            |--*.scss

# dist-structure
    --index.html
    --dist/
        |--js/
            |--*.js
            |--/libs/*.js
        |--css/
            |--*.css
            |--modules/
                |--*.css

# including external-css in html
    <link rel="stylesheet" href="dist/css/style.css" />

# including external-js in html
    <script src="dist/js/demo.js"></script>
    
# options
    - DEBUG //change DEBUG value to enable/disable minification.
    - ES6 // enable/disable ES6 support.
    - SHOULD_RENAME // should *.min files be created
[more info.](https://github.com/VenomVendor/Gulp-Minimal-Template/blob/master/gulpfile.js#L35)

# TODO
    - add image support.
    - remove metadata from images.
    - gzip support.

# License
    The MIT License (MIT)
    Copyright © 2016 VenomVendor <info@VenomVendor.com>
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the “Software”), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
