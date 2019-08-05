import React, { PureComponent } from "react";
import { PersonnelPerformanceWidget } from "dan-components";

class PerformanceStatus extends PureComponent {
  render() {
    return (
      <div>
        <PersonnelPerformanceWidget />
      </div>
    );
  }
}

export default PerformanceStatus;
