pragma solidity ^0.4.15;


contract owned {
    address public owner;

    function owned() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address newOwner) onlyOwner public {
        owner = newOwner;
    }
}


contract Shop is owned {
    uint orderCount = 0;

    struct Order {
    address customer;
    string name;
    uint phone;
    string city;
    uint[] skus;
    uint[] quantities;
    uint[] prices;
    uint totalPrice;
    uint created;
    bool isProcessed;
    }

    mapping (uint => Order) public orderList;

    mapping (address => uint[]) public userOrders;

    uint[] orderIndex;

    event LogDep (address sender, uint amount, uint balance);

    function Migrate() public {
        owner = msg.sender;
    }

    function destructMe() onlyOwner public {
        selfdestruct(msg.sender);
    }

    function getOrder(uint orderId) public constant returns (address, string, uint, string, uint[], uint[], uint[], uint, uint, bool) {
        Order storage order = orderList[orderId];
        return (order.customer, order.name, order.phone, order.city, order.skus, order.quantities, order.prices, order.totalPrice, order.created, order.isProcessed);
    }

    function getOrderIds() public constant returns (uint[]) {
        return orderIndex;
    }

    function getUserOrderIds(address userId) public constant returns (uint[]) {
        return userOrders[userId];
    }

    function checkout(string name, uint phone, string city, uint[] skus, uint[] quantities, uint[] prices) public payable {
        require(msg.sender.balance > msg.value);
        require(skus.length > 0 && skus.length == quantities.length && quantities.length == prices.length);

        uint totalPrice = 0;
        for (uint i = 0; i < skus.length; i++) {
            totalPrice += prices[i] * 1 ether;
        }

        require(msg.value == totalPrice);
        LogDep(msg.sender, msg.value, this.balance);

        orderCount = orderCount + 1;
        orderList[orderCount] = Order(msg.sender, name, phone, city, skus, quantities, prices, totalPrice, now, false);
        userOrders[msg.sender].push(orderCount);
        orderIndex.push(orderCount);
    }

    function cashOnDelivery(string name, uint phone, string city, uint[] skus, uint[] quantities, uint[] prices) public {
        require(skus.length > 0 && skus.length == quantities.length && quantities.length == prices.length);

        orderCount = orderCount + 1;
        orderList[orderCount] = Order(msg.sender, name, phone, city, skus, quantities, prices, 0, now, false);
        userOrders[msg.sender].push(orderCount);
        orderIndex.push(orderCount);
    }

    function processOrder(uint orderId) onlyOwner public {
        orderList[orderId].isProcessed = true;
        for (uint i = 0; i < orderIndex.length; i++) {
            if (orderId == orderIndex[i]) {
                delete orderIndex[i];
            }
        }
    }
}