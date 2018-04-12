import styled from 'styled-components';

const BasicTable = styled.table`
  width: 100%;
  margin: 0 auto;
  th {
    text-decoration: underline;
    font-size: 1.25rem;
    font-weight: bold;
    text-align: right;
    padding-bottom: 20px;
    padding-left: 10px;

  }
  tr {
    height: 25px;
  }
  td {
    font-size: 1rem;
    text-align: right;
    height: 40px;
  }
  input {
    height: 25px;
    width: 100px;
    text-align: right;
    font-size: 1rem;
    padding: 10px 2px;
  }
`;

export default BasicTable;
