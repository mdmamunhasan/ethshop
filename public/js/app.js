App = {
    web3Provider: null,
    account: null,
    constants: {
        ether: 0,
        ipfsBase: 'https://ipfs.io/ipfs/',
        //httpProvider: 'http://34.195.183.184:8545',
        httpProvider: 'http://localhost:8545',
        noImage: 'images/no-image.gif'
    },

    init: function (callback) {
        return App.initWeb3(callback);
    },

    initWeb3: function (callback) {
        // Initialize web3 and set the provider to the testRPC.
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider;
            web3 = new Web3(web3.currentProvider);
        } else {
            // set the provider you want from Web3.providers
            App.web3Provider = new web3.providers.HttpProvider(App.constants.httpProvider);
            web3 = new Web3(App.web3Provider);
        }

        return App.initContract(callback);
    },

    initContract: function (callback) {
        $.getJSON('Shop.json', function (data) {
            // Get the necessary contract artifact file and instantiate it with truffle-contract.
            var ShopArtifact = data;
            App.contracts.Shop = TruffleContract(JournalArtifact);
            // Set the provider for our contract.
            App.contracts.Shop.setProvider(App.web3Provider);
            return callback();
        });
    }
)