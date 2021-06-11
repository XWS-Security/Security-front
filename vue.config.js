const fs = require('fs')

module.exports = {
    devServer: {
        https: {
            key: fs.readFileSync(process.env.VUE_APP_KEY),
            cert: fs.readFileSync(process.env.VUE_APP_CERT),
        },
        public: 'https://localhost:8080/'
    }
}
