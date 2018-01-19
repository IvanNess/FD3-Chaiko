import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {isDelConfirmed} from '../actions/index';


class DelConfirm extends Component{
    render(){
        switch(this.props.confirmMode){
            case(1): //-показать окно удаления
                return(
                    <div>
                        <div>Вы действительно хотите удалить этот обьект</div>
                        <button onClick={()=>{
                            this.props.isDelConfirmed(true, this.props.activeUser);
                        }}>Да
                        </button>
                        <button onClick={()=>{
                            this.props.isDelConfirmed(false, this.props.activeUser);
                        }}>Нет
                        </button>
                    </div>
                );
            case(0):
                return(
                    <div></div>
                );
        }
    }
}

function mapStateToProps(state){
    return{
        confirmMode: state.activeUser.confirmMode,
        activeUser: state.activeUser
    }
};

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        isDelConfirmed: isDelConfirmed,

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DelConfirm);