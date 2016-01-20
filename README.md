# EmberCLI Post Build Copy

Once your build is complete you might need to move your build files to an external location

## Installation

* `ember install ember-cli-post-build-copy`

## Configuration

    //config/environment.js
    ENV['ember-cli-post-build-copy'] = {
      "development" : [
          ['/assets/vendor.js','../javascripts/vendor.js']
      ]
    }

The first argument is relative to the "dist" folder
The second argument is relative to the "root: of the ember application
