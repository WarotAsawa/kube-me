import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './SizerMenu.css';
import './StatelessApp';
import StatelessApp from './StatelessApp';
import StatefulApp from './StatelfulApp';

function SizerMenu() {
  return(

    <Tabs
//      id="controlled-tab-example"
//      activeKey={this.state.key}
//      onSelect={key => this.setState({ key })}
    bg = "dark" >
      <Tab eventKey="stateless" title="STATELESS APPLICATION">
        <StatelessApp></StatelessApp>
      </Tab>
      <Tab eventKey="stateful" title="STATEFUL APPLICATION">
        <StatefulApp></StatefulApp>
      </Tab>
    </Tabs>
  );
}
export default SizerMenu;