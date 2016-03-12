var POSystem = React.createClass({
  render: function(){
    return (
      <div className="pure-g">
      <div className="pure-u-7-12">
        <SaleItems rows={this.state.rows} itemClick={this.itemClick}/>
      </div>
      <div className="pure-u-5-12">
        <SaleBar items={this.state.items}/>
        </div>
      </div>
    );
  },
  getInitialState: function(){
      return {
        rows: 5,
        items: [],
      };
  },
  itemClick: function(itemName){
    var newState = this.state;
    console.log(newState.items);
    newState.items.push(itemName);
    this.setState(newState);
  }
});

var SaleItems = React.createClass({
  render: function(){
    var itemRows = [];
    for(var i = 0; i < this.props.rows; i++){
      itemRows.push(<div className="pure-g item-row" key={i}>
        <IndivItem itemName="apple" itemClick={this.props.itemClick}/>
        <IndivItem itemName="orange" itemClick={this.props.itemClick}/>
        <IndivItem itemName="banana" itemClick={this.props.itemClick}/>
        <IndivItem itemName="tomato" itemClick={this.props.itemClick}/>
        <IndivItem itemName="bratwurst" itemClick={this.props.itemClick}/>
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
    return (
      <div className="pure-u-1-5" onClick={this.handleClick}>
        <div className="indiv-item">{this.props.itemName}</div>
      </div>
      );
  },
  handleClick: function(){
    this.props.itemClick(this.props.itemName);
  },
});

var SaleBar = React.createClass({
  render: function(){
    var itemEntries = [];
    for (var i = 0; i < this.props.items.length; i++){
      itemEntries.push(<div key={i}>{this.props.items[i]}</div>);
    }
    return (
      <div>{itemEntries}</div>
    );
  }
});

var POS = React.createElement(POSystem);
ReactDOM.render(POS, document.getElementById('POS'));