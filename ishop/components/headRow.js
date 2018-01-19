var HeadRow = React.createClass(
    {   
        displayName: 'HeadRow',
        render: function() {
            var row = React.DOM.div({className:'product'},
              React.DOM.div({className:'text td'}, 'Наименование товара'),
              React.DOM.div({className:'count td'}, 'Код товара'),
              React.DOM.div({className:'photo td'}, 'Ссылка на фото'),
              React.DOM.div({className:'count td'}, 'Количество'),
              React.DOM.div({className:'count td'}, 'Цена'),
              React.DOM.span({className:'td'},),                  
            );
            return row;
        },
    }
);