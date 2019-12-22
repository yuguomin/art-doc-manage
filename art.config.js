const projectVirtualPath = 'art/doc/manage';

const artConfig = {

  projectVirtualPath,

  // The version 
  version: Date.now(),

  // If true will received `public/some/module/bundle229503e9d2e481b9223c.js`
  // If false will received `public/some/module/bundle.js`
  enableBundleHashName: false,

  devHost: {
    dev: "http://me.dev.com",
    prod: "http://me.dev.com"
  },

  webpack: {
    entry: {
      [`${projectVirtualPath}/doc-form`]: ["./client/doc-form/index.tsx"],
      [`${projectVirtualPath}/vendors`]: ["./client/vendors"]
    },
    output: {
      // Config CDN path for static files, images ....
      intePublicPath: 'http://10.10.10.132:9090/frontend/',
      prodPublicPath: 'http://getui996.com;'
    },
    dll: {
      version: '20190522_v1',
      vendors: [] // modify this option cautiously
    }
  }
}

module.exports = artConfig;