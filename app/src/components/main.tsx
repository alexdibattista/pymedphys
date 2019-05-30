import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";


import {
  Tabs, Tab, H3, Icon
} from '@blueprintjs/core';

import { IconName } from "@blueprintjs/icons";


import { AppNavbar } from './navbar';
import { AppUserScripts } from './user-scripts';
import { placeholder } from '@babel/types';


interface IAppMainProps {

}

interface IAppMainState extends Readonly<{}> {

}


interface ITab {
  path: string;
  icon: IconName;
  label: string;
}


const tabs: ITab[] = [
  {
    path: "/user-scripts/",
    icon: "code",
    label: "User Scripts"
  },
  {
    path: "/gamma-analysis/",
    icon: "grid",
    label: "Gamma Analysis"
  },
  {
    path: "/python-engine/",
    icon: "function",
    label: "Python Engine"
  }
]

export class AppMain extends React.Component<IAppMainProps, IAppMainState> {


  constructor(props: IAppMainProps) {
    super(props)
    this.state = {
      path: window.location.pathname
    }
  }

  render() {
    return (
      <div className="AppMain">
        <AppNavbar />

        <BrowserRouter>

          <Tabs
            animate={true}
            id="Tabs"
            vertical={true}
          >
            {tabs.map(tab => {
              return <Tab id={tab.path} title={
                <Link
                  to={tab.path}
                  onClick={() => this.setState({ path: tab.path })}
                ><Icon icon={tab.icon} /> {tab.label}</Link>
              } />
            })}

          </Tabs>

          <div className="TabPadding">
            <Route path="/" exact component={RedirectToUserScripts} />
            <Route path="/user-scripts/" exact component={AppUserScripts} />
            <Route path="/gamma-analysis/" exact component={Placeholder} />
            <Route path="/python-engine/" exact component={Placeholder} />
          </div>
        </BrowserRouter>


      </div>
    );
  }
}

const Placeholder: React.SFC<{}> = () => (
  <div>
    <H3>Placeholder</H3>
  </div>
);


const RedirectToUserScripts: React.SFC<{}> = () => (
  <Redirect to="/user-scripts/" />
);