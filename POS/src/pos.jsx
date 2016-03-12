'use strict';
var POSystem = React.createClass({
  render: function(){
    return (
      <div className="pure-g">
      <div className="pure-u-7-12">
        <SaleItems itemClick={this.itemClick} items={this.state.items}/>
      </div>
      <div className="pure-u-5-12">
        <SaleBar items={this.state.items} purchased={this.state.purchased}/>
        </div>
      </div>
    );
  },
  getInitialState: function(){
      return {
        purchased: {},
        items: [
          {name: "Apple",
            price: 2},
          {name: "Orange",
            price: 3},
          {name: "Banana",
            price: 4},
          {name: "Tomato",
            price: 10},
          {name: "Bratwurst",
            price: .5},],
      };
  },
  itemClick: function(itemIndex){
    var newState = this.state;
    if (itemIndex in newState.purchased)
      newState.purchased[itemIndex] += 1;
    else
      newState.purchased[itemIndex] = 1
    this.setState(newState);
  }
});

var SaleItems = React.createClass({
  render: function(){
    var itemRows = [];
      var indivItems = [];
      for (var j = 0; j < 5; j++)
          indivItems.push(<IndivItem itemIndex={j} itemClick={this.props.itemClick} items={this.props.items}/>);
      itemRows.push(
        <div className="pure-g item-row">
            {indivItems}
        </div>);
    return (<div>{itemRows}<video id="webcam_preview" autoplay></video></div>);
  },
  getInitialState: function(){
    return {
      items: []
    };
  },
  addItem: function(item){

  },
});

var IndivItem = React.createClass({
  render: function(){
    if (this.props.items){
      var itemEntry = this.props.items[this.props.itemIndex];
      var name = itemEntry.name;
      var price = itemEntry.price;
    }
    else{
      var name = "";
      var price = "";      
    }

    return (
      <div className="pure-u-1-5">
        <div className="indiv-item" onClick={this.handleClick}>{name}{name ? ", $" : ""}{price}</div>
      </div>
      );
  },
  handleClick: function(){
    if (this.props.itemClick)
      this.props.itemClick(this.props.itemIndex);
  },
});

var SaleBar = React.createClass({
  render: function(){
    var itemEntries = [];
    for (var key in this.props.purchased){
      itemEntries.push(<ItemEntry items={this.props.items} purchased={this.props.purchased} itemKey={key}/>);
    }
    var total = 0;
    for (var key in this.props.purchased){
      total += this.props.items[key].price * this.props.purchased[key]
    }
    return (
      <div id="sale-bar">
        <h1> Total: ${total} </h1>
        <div className="pure-g">
          <div className="pure-u-1-5">
            <h3>Item Name</h3>
          </div>
          <div className="pure-u-1-5">
            <h3>Quantity</h3>
          </div>
          <div className="pure-u-1-5">
            <h3>Total Price</h3>
          </div>
        </div>
        {itemEntries}
      </div>
    );
  }
});

var ItemEntry = React.createClass({
  render: function(){
    var key = this.props.itemKey;
    return (
    <div key={key}>
      <div className="pure-g">
        <div className="pure-u-1-5">
          {this.props.items[key].name}
        </div>
        <div className="pure-u-1-5">
          {this.props.purchased[key]}
        </div>
        <div className="pure-u-1-5">
          ${this.props.purchased[key] * this.props.items[key].price}
        </div>
      </div>
    </div>);
  }
});

var POS = React.createElement(POSystem);
ReactDOM.render(POS, document.getElementById('POS'));