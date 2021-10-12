import React from 'react';
import { Tab } from 'semantic-ui-react';
import InfoProp from '../InfoProp';


export default function TabsProp( props ) {

    const { prop } = props;

    const panes = [
        {
            menuItem: 'Información',
            render: () => (
                <Tab.Pane>
                    <InfoProp prop={ prop } />
                </Tab.Pane>
            ),
        },
    ];

    return <Tab className="tabs-prop" panes={ panes } />;
}