import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Radio, Row } from 'antd';
import { TabView, TabPanel } from 'primereact/tabview';
import { useLocation, useHistory } from 'react-router-dom';
import GrowthUpProcess from './GrowthUpProcess';
import TransportProcess from './TransportProcess';
import ManufactureProcess from './ManufactureProcess';
import DisplayProcess from './DisplayProcess';
import { TableOutlined, EyeOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { findByCode } from '../../../shared/actions/process/ProductResource';
import { ACTION_MODULE } from '../../../shared/common';
import * as types from '../../../shared/constants/ActionTypeCommon';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
let productCode = '';
function ProductInfo(props) {
  const [activeIndex, setActiveIndex] = useState();
  const [view, setView] = useState("grid");
  const [product, setProduct] = useState("grid");

  let history = useHistory();
  let query = useQuery();

  if (!query.get("code") || query.get("code") === "") {
    history.push("/admin/process/products");
  }
  else if(productCode !== query.get("code")){
    productCode = query.get("code");
    props.findByCode(productCode);
  }

  useEffect(()=>{
    if(props.propsData && props.propsData.type === `${ACTION_MODULE.PRODUCT}_${types.FIND_BY_CODE_SUCCESS}`){
      setProduct(props.propsData);
    }
  }, [props.propsData]);

  const handleViewChange = (ev) => {
    setView(ev.target.value);
  }

  return (
    <div>
      <div className="content-section implementation">
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Nuôi trồng, chăm sóc" leftIcon="pi pi-chart-line">
            <Row gutter={16}>
              <Radio.Group value={view} style={{ float: "right" }} onChange={handleViewChange}>
                <Radio.Button value="grid"><TableOutlined /></Radio.Button>
                <Radio.Button value="timeline"><EyeOutlined /></Radio.Button>
              </Radio.Group>
            </Row>
            <Row></Row>
            <Row gutter={16}>
              <GrowthUpProcess view={view} product={product} productCode={query.get("code")}></GrowthUpProcess>
            </Row>
          </TabPanel>
          <TabPanel header="Chế biến, sản xuất" leftIcon="pi pi-cog">
            <ManufactureProcess productCode={query.get("code")}></ManufactureProcess>
          </TabPanel>
          <TabPanel header="Vận chuyển" leftIcon="pi pi-eject">
            <TransportProcess productCode={query.get("code")}></TransportProcess>
          </TabPanel>
          <TabPanel header="Bày bán" leftIcon="pi pi-shopping-cart">
            <DisplayProcess productCode={query.get("code")}></DisplayProcess>
          </TabPanel>
        </TabView>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  propsData: state.productReducer,
});

const mapDispatchToProps = dispatch => {
  return {
    findByCode: (code) => dispatch(findByCode(code))
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductInfo);