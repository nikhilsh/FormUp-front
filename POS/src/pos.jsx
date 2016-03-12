var POSystem = React.createClass({
  render: function(){
    return (
      <div className="pure-g">
      <div className="pure-u-7-12">
        <SaleItems rows={this.state.rows} itemClick={this.itemClick} items={this.state.items}/>
      </div>
      <div className="pure-u-5-12">
        <SaleBar items={this.state.items} purchased={this.state.purchased}/>
        </div>
      </div>
    );
  },
  getInitialState: function(){
      return {
        rows: 5,
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
    for(var i = 0; i < this.props.rows; i++){
      var indivItems = [];
      for (var j = 0; j < 5; j++)
        if (i == 0)
          indivItems.push(<IndivItem itemIndex={j} itemClick={this.props.itemClick} items={this.props.items}/>);
        else
          indivItems.push(<IndivItem/>);
      itemRows.push(
        <div className="pure-g item-row" key={i}>
            {indivItems}
        </div>);
    }
    return (<div>{itemRows}</div>);
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
    this.props.itemClick(this.props.itemIndex);
  },
});

var SaleBar = React.createClass({
  render: function(){
    var itemEntries = [];
    for (var key in this.props.purchased){
      itemEntries.push(<ItemEntry items={this.props.items} purchased={this.props.purchased}/>);
    }
    var total = 0;
    for (var key in this.props.purchased){
      total += this.props.items[key].price * this.props.purchased[key]
    }
    return (
      <div>
        <h1> Total: ${total} </h1>
        {itemEntries}
      </div>
    );
  }
});

var ItemEntry = React.createClass({
  render: function(){
    return (<div key={key}>
      <div className="pure-g">
        <div className="pure-u-1-5">
          {this.props.items[key].name}
        </div>
        <div className="pure-u-3-5">
          {this.props.purchased[key]}
        </div>
        <div className="pure-u-1-5">
          {this.props.items[key].name}
        </div>
      </div>
      ${this.props.purchased[key] * this.props.items[key].price}</div>);
  }
});

var POS = React.createElement(POSystem);
ReactDOM.render(POS, document.getElementById('POS'));