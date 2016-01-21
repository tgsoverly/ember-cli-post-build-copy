/* jshint node: true */
'use strict';

var path = require('path');
var fs = require('fs-extra');

module.exports = {
  name: 'ember-cli-post-build-copy',

  configObject: {},
  buildEnv: "",

  postBuild: function (results) {
      console.log("ember-cli-post-build-copy: copying from "+results.directory+".");
      var self = this;
      if(self.configObject && self.configObject["ember-cli-post-build-copy"]){
        let copyConfig = self.configObject["ember-cli-post-build-copy"];
        let replace = false;
        if(copyConfig.replace){
          replace = copyConfig.replace
        }

        if(copyConfig[self.buildEnv]){
          let copyEnvConfig = copyConfig[self.buildEnv];
          console.log("ember-cli-post-build-copy: copying files "+JSON.stringify(copyEnvConfig)+".");
          for (var i = 0; i < copyEnvConfig.length; i++) {
              let pair = copyEnvConfig[i]
              let src = path.resolve(results.directory+pair[0])
              let dest = path.resolve(pair[1])
              console.log("ember-cli-post-build-copy: copying "+src+" to "+dest);
              fs.copySync(results.directory+pair[0], pair[1], { clobber: replace });
          }
        }else{
          console.log("ember-cli-post-build-copy: no copy config for "+this.buildEnv)
        }
      }else{
        console.log("ember-cli-post-build-copy: no ENV['ember-cli-post-build-copy']");
      }
  },

  config: function (env, baseConfig) {

    if(this.buildEnv === ""){
      console.log("ember-cli-post-build-copy: build env set to "+env)
      this.buildEnv = env;
      this.configObject = baseConfig;
    }

  }
};
