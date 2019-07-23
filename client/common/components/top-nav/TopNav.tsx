import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import './style/top.nav.less';

export default class TopNav extends CoreComponent<any, any> {
  public render() {
    return (
      <div className="top-nav-component">
        <div className="top-nav-component-info">Let's start writing the doc～</div>
      </div>
    );
  }
}