'use strict';

var POSystem = React.createClass({
  displayName: "POSystem",

  render: function render() {
    return React.createElement(
      "div",
      { className: "pure-g" },
      React.createElement(
        "div",
        { className: "pure-u-7-12 left-button-body" },
        React.createElement(SaleItems, { itemClick: this.itemClick, items: this.state.items })
      ),
      React.createElement(
        "div",
        { className: "pure-u-9-24 right-side-bar" },
        React.createElement(SaleBar, { items: this.state.items, purchased: this.state.purchased }),
        React.createElement(
          "div",
          { id: "post-button", onClick: this.postState },
          "Submit"
        )
      )
    );
  },
  getInitialState: function getInitialState() {
    return {
      purchased: {},
      items: [{ name: "Apple",
        price: 2 }, { name: "Orange",
        price: 3 }, { name: "Banana",
        price: 4 }, { name: "Tomato",
        price: 10 }, { name: "Bratwurst",
        price: .5 }]
    };
  },
  itemClick: function itemClick(itemIndex) {
    var newState = this.state;
    if (itemIndex in newState.purchased) newState.purchased[itemIndex] += 1;else newState.purchased[itemIndex] = 1;
    this.setState(newState);
  },
  postState: function postState() {
    if (window.FACE) {
      var buyer = {
        age: age,
        gender: gender[0],
        mood: mood[0]
      };
      console.log(buyer);
    } else {
      var buyer = {};
    }

    var requestBody = {
      item: {},
      buyer: buyer
    };

    for (var purchaseKey in this.state.purchased) {
      var itemName = this.state.items[purchaseKey].name.toLowerCase();
      requestBody.item[itemName] = this.state.purchased[purchaseKey];
    }
    var self = this;
    $.ajax({
      type: "POST",
      url: "http://localhost:4005/sales",
      data: JSON.stringify(requestBody),
      contentType: "application/json",
      success: function success(data, status) {
        console.log(data);
        self.setState(self.getInitialState());
      },
      error: function error(data, status) {
        console.log("Error: " + status + " " + JSON.stringify(data));
      }
    });
  }
});

var SaleItems = React.createClass({
  displayName: "SaleItems",

  render: function render() {
    var itemRows = [];
    var indivItems = [];
    for (var j = 0; j < 5; j++) {
      indivItems.push(React.createElement(IndivItem, { itemIndex: j, itemClick: this.props.itemClick, items: this.props.items }));
    }itemRows.push(React.createElement(
      "div",
      { className: "pure-g item-row" },
      indivItems
    ));
    return React.createElement(
      "div",
      null,
      itemRows,
      React.createElement("video", { id: "webcam_preview", className: "face-hidden", autoplay: true })
    );
  },
  getInitialState: function getInitialState() {
    return {
      items: []
    };
  }
});

var IndivItem = React.createClass({
  displayName: "IndivItem",

  render: function render() {
    if (this.props.items) {
      var itemEntry = this.props.items[this.props.itemIndex];
      var name = itemEntry.name;
      var price = itemEntry.price;
    } else {
      var name = "";
      var price = "";
    }

    return React.createElement(
      "div",
      { className: "pure-u-1-5" },
      React.createElement(
        "div",
        { className: "indiv-item", onClick: this.handleClick },
        React.createElement(
          "h3",
          null,
          name
        ),
        React.createElement(
          "p",
          null,
          "$",
          price
        )
      )
    );
  },
  handleClick: function handleClick() {
    if (this.props.itemClick) this.props.itemClick(this.props.itemIndex);
  }
});

var SaleBar = React.createClass({
  displayName: "SaleBar",

  render: function render() {
    var itemEntries = [];
    for (var key in this.props.purchased) {
      itemEntries.push(React.createElement(ItemEntry, { items: this.props.items, purchased: this.props.purchased, itemKey: key }));
    }
    var total = 0;
    for (var key in this.props.purchased) {
      total += this.props.items[key].price * this.props.purchased[key];
    }
    return React.createElement(
      "div",
      { id: "sale-bar" },
      React.createElement(
        "h1",
        null,
        " Total: $",
        total,
        " "
      ),
      React.createElement(
        "div",
        { className: "pure-g" },
        React.createElement(
          "div",
          { className: "pure-u-1-5" },
          React.createElement(
            "h3",
            null,
            "Name"
          )
        ),
        React.createElement(
          "div",
          { className: "pure-u-1-5" },
          React.createElement(
            "h3",
            null,
            "Quantity"
          )
        ),
        React.createElement(
          "div",
          { className: "pure-u-1-5" },
          React.createElement(
            "h3",
            null,
            "Total Price"
          )
        )
      ),
      React.createElement(
        "ul",
        { className: "sale-bar-items" },
        itemEntries
      )
    );
  }
});

var ItemEntry = React.createClass({
  displayName: "ItemEntry",

  render: function render() {
    var key = this.props.itemKey;
    return React.createElement(
      "li",
      { key: key },
      React.createElement(
        "div",
        { className: "pure-g" },
        React.createElement(
          "div",
          { className: "pure-u-1-5" },
          this.props.items[key].name
        ),
        React.createElement(
          "div",
          { className: "pure-u-1-5" },
          this.props.purchased[key]
        ),
        React.createElement(
          "div",
          { className: "pure-u-1-5" },
          "$",
          this.props.purchased[key] * this.props.items[key].price
        )
      )
    );
  }
});

var POS = React.createElement(POSystem);
ReactDOM.render(POS, document.getElementById('POS'));