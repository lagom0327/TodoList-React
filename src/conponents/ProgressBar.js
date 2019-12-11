import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Progress = styled.div`
  width:${props => props.ratio * 100}%;
`;

class ProgressBar extends PureComponent {
  render() {
    const { ratio } = this.props;
    return (
      <div className="pbar">
        <Progress className="progress" ratio={ratio} />
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  ratio: 0,
};

ProgressBar.propTypes = {
  ratio: PropTypes.number,
};

export default ProgressBar;
