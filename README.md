# Field-Object Tumblr Theme

A minimal Tumblr theme with keyboard navigation and user-defined tag menus.

* Front page: distraction free perusal of full-size posts
* Tag and search pages: masonry thumbnails for efficient browsing

[Demo blog] (http://field-object-demo.tumblr.com/)

# Features

* HTML5, supports all post types
* Keyboard navigation (j/k for next/previous post, n/m for next/previous page)
* User-defined tag menus (lists of comma separated tags are turned into linked drop-down menus by jQuery)

Group blogs are not supported.

# Installation

For now, please paste the contents of field-object.html into the Edit HTML pane of Tumblr's Customize page, replacing everything. Note that you may lose any information in the custom fields of your current theme.

The theme works best when the number of posts per page is set to the maximum (in Customize > Advanced options).

# Resources

This theme doesn't include infinite scroll, but if you're interested in incorporating it:

* [Using jQuery jknav plugin on dynamically loaded content] (http://blog.yjl.im/2010/09/using-jquery-jknav-plugin-on.html)

# Acknowledgements

* [Tumblr Boilerplate] (http://github.com/davesantos/tumblr-boilerplate)
* [jQuery] (http://jquery.com/)
* [Modernizr] (http://modernizr.com/)
* [jQuery jknav] (http://github.com/livibetter/jquery-jknav)
* [Better Vimeo Embeds 2.1] (http://matthewbuchanan.name/tumblr/vimeo-embeds/)

# Changelog

#### 23/02/14 - Field-Object v1.0.2

* Added Customize option: Menu absolutely positioned or fixed (with independent scroll if overlong)

#### 19/09/14 - Field-Object v1.0.1

* CSS fixes
* Repo created

#### 14/02/14 - Field-Object v1.0

* Initial release

# General Issues

1. **Old jQuery:** The latest version of jknav is almost a year old, and seems to necessitate a similarly old version of jQuery. The theme uses v1.4.2. This had some minor ramifications (such as not being able to use `.on()` instead of the problematic and now deprecated `.bind()` for key presses) but none so great that loading two versions of jQuery with `.noConflict()` was justified.

2. **jknav jump to next page:** jknav was slightly edited/hacked to jump to the next or previous page as appropriate. It behaves as desired except when jumping to the next page where the height of the viewport exceeds the distance from the bottom of the page to the top of the last post. Because jknav is set to re-evaluate the current scroll position when j or k are pressed (which I have a strong preference for), the last post in such cases is never recognised as being in focus, and the jump to the next page is never triggered. 75vh of padding to the bottom of the page reliably solves this problem, but is unpleasant and disorienting for users scrolling with the mouse. Not knowing enough JS to make more complex changes, I've chosen to make the trade-off in favour of reliable keyboard navigation.
