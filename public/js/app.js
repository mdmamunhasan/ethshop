App = {
    web3Provider: null,
    account: null,
    owner: null,
    contracts: {},
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
            App.contracts.Shop = TruffleContract(ShopArtifact);
            // Set the provider for our contract.
            App.contracts.Shop.setProvider(App.web3Provider);

            return App.getInitialData(callback);
        });
    },

    getInitialData: function (callback) {
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                return console.log(error);
            }

            App.account = accounts[0];

            var shopInstance;

            App.contracts.Shop.deployed().then(function (instance) {
                shopInstance = instance;
                return shopInstance.getOwner.call();
            }).then(function (data) {

                App.owner = data;

                return callback();

            }).catch(function (err) {
                console.log(err.message);
            });
        });
    },

    placeOrder: function (orderData, callback) {
        var shopInstance;

        App.contracts.Shop.deployed().then(function (instance) {
            shopInstance = instance;

            return shopInstance.checkout(
                orderData.name,
                orderData.phone,
                orderData.city,
                orderData.skus,
                orderData.quantities,
                orderData.prices, {
                    value: web3.toWei(orderData.amount)
                }
            );

        }).then(function (result) {
            return callback(result);
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    getOrderData: function (orderId, callback) {
        var shopInstance;

        App.contracts.Shop.deployed().then(function (instance) {
            shopInstance = instance;
            return shopInstance.getOrder.call(orderId);
        }).then(function (data) {

            var orderData = {
                orderId: orderId,
                customer: data[0],
                name: data[1],
                phone: parseInt(data[2], 10),
                city: data[3],
                skus: data[4],
                quantities: data[5],
                prices: data[6],
                totalPrice: parseInt(web3.fromWei(data[7], 'ETHER'), 10),
                created: parseInt(data[8], 10),
                isProcessed: data[9]
            };

            return callback(orderData);

        }).catch(function (err) {
            console.log(err.message);
        });
    },

    getOrderList: function (callback) {
        var shopInstance;

        App.contracts.Shop.deployed().then(function (instance) {
            shopInstance = instance;
            return shopInstance.getOrderIds.call();
        }).then(function (data) {
            return data.forEach(function (orderId) {
                orderId = parseInt(orderId, 10);
                if (orderId) {
                    return getOrderData(orderId, callback);
                }
            });
        }).catch(function (err) {
            console.log(err.message);
        });
    },

    getUserOrderList: function (address, callback) {
        var userAddress = address || App.account, shopInstance;
        App.contracts.Shop.deployed().then(function (instance) {
            shopInstance = instance;
            return shopInstance.getUserOrderIds.call(userAddress);
        }).then(function (data) {
            data.forEach(function (orderId) {
                orderId = parseInt(orderId, 10);
                if (orderId) {
                    return App.getOrderData(orderId, callback);
                }
            });
        }).catch(function (err) {
            console.log(err.message);
        });
    }
}