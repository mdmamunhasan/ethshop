module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            //from: "0xf44cf64f2cb6381e260355d6d44c2b09a82c488b",
            gas: 4712388,
            //gasPrice: 20000000000,
            //gasLimit: 4712388,
            network_id: "*"
        },
        production: {
            host: "localhost",
            port: 8545,
            //from: "0xf44cf64f2cb6381e260355d6d44c2b09a82c488b",
            //gas: 4712388,
            //gasPrice: 20000000000,
            //gasLimit: 4712388,
            network_id: "*"
        }
    }
};
