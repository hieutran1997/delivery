import React from 'react';
import TableFile from '../../../shared/components/FileTable.component';
import { environments_dev } from '../../../environment';
import defaultAva from '../../../containers/default.jpg';
import { hasPermission, resourceCode, control } from '../../../shared/common';
import { Button } from 'antd';

export function FormProductInfo(props) {

  const bindAvatar = (item) => {
    if (item.fileAttachment && item.fileAttachment.avatar && item.fileAttachment.avatar.length > 0) {
      return (<img alt="example" width={'100px'} src={`${environments_dev.URL_SERVICE_FILE}/file/avatar/image/${item.fileAttachment.avatar[0].id}`} />);
    }
    else {
      return (<img alt="example" width={'100px'} src={defaultAva} />);
    }
  }

  return (
    <table width={'100%'}>
      <thead style={{ hiden: true }}>
        <tr>
          <th width="15%">
          </th>
          <th width="50%">
          </th>
          <th width="15%">
          </th>
        </tr>
      </thead>
      <tbody className="ant-table-tbody">
        <tr>
          <td><b>Mã hàng: </b></td>
          <td>{props.product.productCode}</td>
          <td>{bindAvatar(props.product)}</td>
        </tr>
        <tr>
          <td><b>Tên hàng: </b></td>
          <td>{props.product.productName}</td>
          <td></td>
        </tr>
        <tr>
          <td><b>Đơn vị: </b></td>
          <td>{props.product.organizationName}</td>
          <td></td>
        </tr>
        <tr>
          <td><b>File đính kèm: </b></td>
          <td><TableFile fileAttachment={props.product.fileAttachment}></TableFile></td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>
            {hasPermission(resourceCode.process, control.hasAdd) === 1 ?
              <Button type="primary" icon="plus" style={{ float: "right" }} onClick={() => { props.setIsShowAdd(true); }}>
                Thêm mới
              </Button> : ""}
          </td>
        </tr>
      </tbody>
    </table>
  );
}