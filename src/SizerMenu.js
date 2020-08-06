import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './SizerMenu.css';

function SizerMenu() {
  return(

    <Tabs
//      id="controlled-tab-example"
//      activeKey={this.state.key}
//      onSelect={key => this.setState({ key })}
    bg = "dark" >
      <Tab eventKey="stateless" title="STATELESS APPLICATION">
        STATELESS APPLICATION content
      </Tab>
      <Tab eventKey="stateful" title="STATEFUL APPLICATION">
        STATEFUL APPLICATION content
      </Tab>
    </Tabs>
  );
}
export default SizerMenu;