## Requirements

1. NodeJS
2. Truffle
3. Geth\TestRPC
4. IPFS
5. MySQL
6. Angular JS
7. jQuery
8. Bootstrap
9. MetaMask

# What this project about
    
This project is used for Smart Contract implement, compile and deployment for Ecommerce Shop. Also it contains the ethereum payment gateway.
  
# How to get env, ready

Install nodejs 8+ and execute the command below
    
    npm install -g ethereumjs-testrpc
    npm install -g truffle
    git clone https://github.com/mdmamunhasan/ethshop.git
    cd ethshop
    npm install
  
# How this project organized

To generate same addresses every time

    testrpc -m "this govern write planet caught leopard require mother long file jazz absurd"
    
Add localhost:8545 to metamask network. Next, add a couple accounts to MetaMask. 

truffle.js contains ethereum network configuration 
    
To deploy your contracts to TestRPC run the following command:

    truffle migrate
    
After change smart contract contracts/Journal.sol

    truffle compile
    truffle migrate
    
Here sub-directory src contains the dapp implementation. 
public/js/app.js contains the HttpProvider for geth rpc for web3.