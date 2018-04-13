import styled from 'styled-components';

const PieChartDiv = styled.div`
  width: 600px;
  height: 400px;
  h3 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: center;
  }
  h4 {
    font-size: 1.5rem;
    margin-bottom: 5px;
    text-align: center;
  }
  div {
    height: 400px !important;
    top: -60px;
  }
  svg {
    padding-left: 100px;
    padding-right: 100px;
  }
`;

export default PieChartDiv;
