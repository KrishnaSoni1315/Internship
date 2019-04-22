
const PROXY_CONFIG = [
    {
        "context": [
            "/user",
            "/seller",
            "/buyer"
        ],
        "target": "http://localhost:3000",
        "secure": false
    }
]

module.exports = PROXY_CONFIG;