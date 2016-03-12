"use strict";

var POSystem = React.createClass({
  displayName: "POSystem",

  render: function render() {
    return React.createElement(
      "div",
      { className: "pure-g" },
      React.createElement(
        "div",
        { className: "pure-u-7-12" },
        React.createElement(SaleItems, { rows: this.state.rows, itemClick: this.itemClick, items: this.state.items })
      ),
      React.createElement(
        "div",
        { className: "pure-u-5-12" },
        React.createElement(SaleBar, { items: this.state.items, purchased: this.state.purchased })
      )
    );
  },
  getInitialState: function getInitialState() {
    return {
      rows: 5,
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
  }
});

var SaleItems = React.createClass({
  displayName: "SaleItems",

  render: function render() {
    var itemRows = [];
    for (var i = 0; i < this.props.rows; i++) {
      var indivItems = [];
      for (var j = 0; j < 5; j++) {
        if (i == 0) indivItems.push(React.createElement(IndivItem, { itemIndex: j, itemClick: this.props.itemClick, items: this.props.items }));else indivItems.push(React.createElement(IndivItem, null));
      }itemRows.push(React.createElement(
        "div",
        { className: "pure-g item-row", key: i },
        indivItems
      ));
    }
    return React.createElement(
      "div",
      null,
      itemRows
    );
  },
  getInitialState: function getInitialState() {
    return {
      items: []
    };
  },
  addItem: function addItem(item) {}
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
        name,
        name ? ", $" : "",
        price
      )
    );
  },
  handleClick: function handleClick() {
    this.props.itemClick(this.props.itemIndex);
  }
});

var SaleBar = React.createClass({
  displayName: "SaleBar",

  render: function render() {
    var itemEntries = [];
    for (var key in this.props.purchased) {
      itemEntries.push(React.createElement(ItemEntry, { items: this.props.items, purchased: this.props.purchased }));
    }
    var total = 0;
    for (var key in this.props.purchased) {
      total += this.props.items[key].price * this.props.purchased[key];
    }
    return React.createElement(
      "div",
      null,
      React.createElement(
        "h1",
        null,
        " Total: $",
        total,
        " "
      ),
      itemEntries
    );
  }
});

var ItemEntry = React.createClass({
  displayName: "ItemEntry",

  render: function render() {
    return React.createElement(
      "div",
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
          { className: "pure-u-3-5" },
          this.props.purchased[key]
        ),
        React.createElement(
          "div",
          { className: "pure-u-1-5" },
          this.props.items[key].name
        )
      ),
      "$",
      this.props.purchased[key] * this.props.items[key].price
    );
  }
});

var POS = React.createElement(POSystem);
ReactDOM.render(POS, document.getElementById('POS'));