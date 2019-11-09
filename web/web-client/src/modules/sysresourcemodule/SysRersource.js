import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import { Card, Tree } from 'antd';
import { connect } from 'react-redux';
import { getAll, insert, update, deleteData } from '../../actions/ActionResource';
import { dataPost, message } from '../../common';

const { TreeNode } = Tree;

function SysResource(props){
    const [dataSearch] = useState(dataPost);
    useEffect(() => {
        if (!props.resource) {
          props.filterData(dataSearch);
        } else {
         
        }
    }, [props, dataSearch]);

    const onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    return (
    <div>
        <Card title={message.titleFormResource}>
            <Tree showLine defaultExpandedKeys={['0-0-0']} onSelect={onSelect}>
            <TreeNode title="parent 1" key="0-0">
            <TreeNode title="parent 1-0" key="0-0-0">
                <TreeNode title="leaf" key="0-0-0-0" />
                <TreeNode title="leaf" key="0-0-0-1" />
                <TreeNode title="leaf" key="0-0-0-2" />
            </TreeNode>
            <TreeNode title="parent 1-1" key="0-0-1">
                <TreeNode title="leaf" key="0-0-1-0" />
            </TreeNode>
            <TreeNode title="parent 1-2" key="0-0-2">
                <TreeNode title="leaf" key="0-0-2-0" />
                <TreeNode title="leaf" key="0-0-2-1" />
            </TreeNode>
            </TreeNode>
        </Tree>
        </Card>
    </div>
    );
}

const mapStateToProps = state => ({
    resource: state.resourceReducer
});

const mapDispatchToProps = dispatch => {
    return {
        filterData: (data) => dispatch(getAll(data)),
        insert: (data)=>dispatch(insert(data)),
        update: (data) => dispatch(update(data)),
        deleteData: (data) => dispatch(deleteData(data))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SysResource);
