module.exports = {
    lintOnSave: false,
  
    transpileDependencies: ["vuetify"],
    devServer: {
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          ws: true,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
  