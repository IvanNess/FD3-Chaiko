var FilterBlock = React.createClass(
    {
        displayName: 'FilterBlock',

        pushDownButton(eo){
            console.log('pushDownButton was fired');
            console.log(eo);
          },

        render: function(){
            debugger;
            var myDownButton = React.createElement(DownButton, 
                {pushButton:this.pushDownButton, testProp: 5});           
            return React.DOM.div({className:'filterBlock'}, 
              this.props.element,
              myDownButton);
        }
    }
);