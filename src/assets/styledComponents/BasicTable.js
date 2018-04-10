import styled from 'styled-components';

const BasicTable = styled.table`
  width: 80%;
  margin: 0 auto;
  th {
    text-decoration: underline;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: right;
    padding-bottom: 20px;
  }
  td {
    font-size: 1rem;
    text-align: right;
  }
`;

export default BasicTable;
