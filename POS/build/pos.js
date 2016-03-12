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
        React.createElement(SaleItems, { rows: this.state.rows, itemClick: this.itemClick })
      ),
      React.createElement(
        "div",
        { className: "pure-u-5-12" },
        React.createElement(SaleBar, { items: this.state.items })
      )
    );
  },
  getInitialState: function getInitialState() {
    return {
      rows: 5,
      items: []
    };
  },
  itemClick: function itemClick(itemName) {
    var newState = this.state;
    console.log(newState.items);
    newState.items.push(itemName);
    this.setState(newState);
  }
});

var SaleItems = React.createClass({
  displayName: "SaleItems",

  render: function render() {
    var itemRows = [];
    for (var i = 0; i < this.props.rows; i++) {
      itemRows.push(React.createElement(
        "div",
        { className: "pure-g item-row", key: i },
        React.createElement(IndivItem, { itemName: "apple", itemClick: this.props.itemClick }),
        React.createElement(IndivItem, { itemName: "orange", itemClick: this.props.itemClick }),
        React.createElement(IndivItem, { itemName: "banana", itemClick: this.props.itemClick }),
        React.createElement(IndivItem, { itemName: "tomato", itemClick: this.props.itemClick }),
        React.createElement(IndivItem, { itemName: "bratwurst", itemClick: this.props.itemClick })
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
    return React.createElement(
      "div",
      { className: "pure-u-1-5", onClick: this.handleClick },
      React.createElement(
        "div",
        { className: "indiv-item" },
        this.props.itemName
      )
    );
  },
  handleClick: function handleClick() {
    this.props.itemClick(this.props.itemName);
  }
});

var SaleBar = React.createClass({
  displayName: "SaleBar",

  render: function render() {
    var itemEntries = [];
    for (var i = 0; i < this.props.items.length; i++) {
      itemEntries.push(React.createElement(
        "div",
        { key: i },
        this.props.items[i]
      ));
    }
    return React.createElement(
      "div",
      null,
      itemEntries
    );
  }
});

var POS = React.createElement(POSystem);
ReactDOM.render(POS, document.getElementById('POS'));