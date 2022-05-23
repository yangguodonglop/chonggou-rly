const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  
  // publicPath: '/html' ,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("common", resolve("src/common"))
      .set("components", resolve("src/components"))
      .set("network", resolve("src/network"))
      .set("store", resolve("src/store"))
      .set("views", resolve("src/views"));
  }
};
