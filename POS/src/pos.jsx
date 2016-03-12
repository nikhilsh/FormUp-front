'use strict';
var POSystem = React.createClass({
  render: function(){
    return (
        <div className="pure-g">
          <div className="pure-u-7-12 left-button-body">
            <SaleItems itemClick={this.itemClick} items={this.state.items}/>
          </div>
          <div className="pure-u-9-24 right-side-bar">
            <SaleBar items={this.state.items} purchased={this.state.purchased}/>
            <div id="post-button" onClick={this.postState}>Submit</div>
          </div>
        </div>
    );
  },
  getInitialState: function(){
      return {
        purchased: {},
        items: [
          {name: "Apple",
            price: 1},
          {name: "Orange",
            price: 1.5},
          {name: "Banana",
            price: 2},
          {name: "Tomato",
            price: 0.5},
          {name: "Bratwurst",
            price: 5},],
      };
  },
  itemClick: function(itemIndex){
    var newState = this.state;
    if (itemIndex in newState.purchased)
      newState.purchased[itemIndex] += 1;
    else
      newState.purchased[itemIndex] = 1
    this.setState(newState);
  },
  postState: function(){
    if (window.FACE){
      var buyer = {
        age: age,
        gender: gender[0],
        mood: mood[0],
      };
      console.log(buyer);
    }
    else{
      var buyer = {}
    }
    
    var requestBody = {
      item: {},
      buyer: buyer
    };

    for (var purchaseKey in this.state.purchased){
      var itemName = this.state.items[purchaseKey].name.toLowerCase();
      requestBody.item[itemName] = this.state.purchased[purchaseKey];
    }
    var self = this;
    $.ajax({
      type: "POST",
      url: "http://localhost:4005/sales",
      data: JSON.stringify(requestBody),
      contentType: "application/json",
      success: function(data, status){
          console.log(data);
          self.setState(self.getInitialState());
      },
      error: function(data, status){
        console.log("Error: " + status + " " + JSON.stringify(data));
      },
    });
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
    return (<div>{itemRows}<video id="webcam_preview" className="face-hidden" autoplay></video></div>);
  },
  getInitialState: function(){
    return {
      items: []
    };
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
        <div className="indiv-item" onClick={this.handleClick}>
          <h3>{name}</h3>
          <p>${price}</p>
        </div>
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
            <h3>Name</h3>
          </div>
          <div className="pure-u-1-5">
            <h3>Quantity</h3>
          </div>
          <div className="pure-u-1-5">
            <h3>Total Price</h3>
          </div>
        </div>
        <ul className="sale-bar-items">
          {itemEntries}
        </ul>
      </div>
    );
  }
});

var ItemEntry = React.createClass({
  render: function(){
    var key = this.props.itemKey;
    return (
    <li key={key}>
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
    </li>);
  }
});

var POS = React.createElement(POSystem);
ReactDOM.render(POS, document.getElementById('POS'));