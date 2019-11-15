import React, { useState } from 'react';
import { connect } from 'react-redux';
import { OrganizationChart } from 'primereact/organizationchart';
import {Card} from 'antd';

const org = {
    data: [{
        label: 'F.C Barcelona',
        expanded: true,
        children: [
            {
                label: 'F.C Barcelona',
                expanded: true,
                children: [
                    {
                        label: 'Chelsea FC'
                    },
                    {
                        label: 'F.C. Barcelona'
                    }
                ]
            },
            {
                label: 'Real Madrid',
                expanded: true,
                children: [
                    {
                        label: 'Bayern Munich'
                    },
                    {
                        label: 'Real Madrid'
                    },
                    {
                        label: 'MU'
                    }
                ]
            }
        ]
    }],
    selection: []
};

function Organization() {
    const [organization] = useState(org.data);
    return (
        <Card title="Title" >
            <div className="content-section implementation organizationchart-demo">
                <OrganizationChart value={organization}></OrganizationChart>
            </div>
        </Card>
    );
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => {
    return {
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Organization);
