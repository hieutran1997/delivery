import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { TabView, TabPanel } from 'primereact/tabview';
import { useLocation, useHistory  } from 'react-router-dom';
import GrowthUpProcess from './GrowthUpProcess';
import TransportProcess from './TransportProcess';
import ManufactureProcess from './ManufactureProcess';
import DisplayProcess from './DisplayProcess';
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ProductInfo() {
  const [activeIndex, setActiveIndex] = useState();
  let history = useHistory();
  let query = useQuery();

  if(!query.get("code") || query.get("code") === ""){
    history.push("/admin/process/products");
  }

  return (
    <div>
      <div className="content-section implementation">
        <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
          <TabPanel header="Nuôi trồng, chăm sóc" leftIcon="pi pi-chart-line">
            <GrowthUpProcess productCode={query.get("code")}></GrowthUpProcess>
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

export default ProductInfo;
