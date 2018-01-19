var DownButton = React.createClass(
    {
        displayName: 'DownButton', 
        /*propTypes: {
            pushButton:React.PropTypes.function.isRequired,
        },*/      
        testParam: 5,          
        cbPushButton: function(eo){
            debugger;
            console.log('cbPushButton was fired');
            this.props.pushButton(eo);
        },
        render: function(){
            debugger;

            console.log(this.props.testProp);
            return React.DOM.div({className:'downButton', onClick:this.cbPushButton}, 'DOWN');          
        }
    }
);