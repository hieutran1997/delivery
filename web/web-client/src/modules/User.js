import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { connect } from 'react-redux';
import { getAll } from '../actions';

function User({getAll}) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAll);
  });

  return (
    <div className="App">
      <DatePicker></DatePicker>
    </div>
  );
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = { 
  getAll
 };

export default connect(
  mapStateToProps, mapDispatchToProps
)(User);
