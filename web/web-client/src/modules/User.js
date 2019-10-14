import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { getAll } from '../actions';

function User(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    if(!props.dataUser){
      dispatch(props.getAll);
    }else{
      console.log('props.dataUser', props.dataUser);
    }
  });

  return (
    <div>
      aaaa
    </div>
  );
}

const mapStateToProps = state => ({
  dataUser: state.userReducer
});

const mapDispatchToProps = { 
  getAll
 };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
