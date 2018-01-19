var MyList = React.createClass(
    {
        displayName: 'MyList', 
        propTypes: {
            strings:React.PropTypes.array.isRequired,
            divLength: React.PropTypes.number.isRequired,
            divFirstStringIndex: React.PropTypes.number.isRequired,
        },                
        render: function(){
            debugger;
            var list = [];
            this.props.strings.forEach((element, index) => {
                if (index >= this.props.divFirstStringIndex && 
                    index < this.props.divLength+this.props.divFirstStringIndex){
                      var divString = React.DOM.div({key:element, className:'divString'}, element);
                      list.push(divString);
                }
            });
            return React.DOM.div({className:'list'}, list);
        }
    }
);