import styled from 'styled-components';

const BasicTable = styled.table`
  width: 80%;
  margin: 0 auto;
  th {
    text-decoration: underline;
    font-size: 1.5rem;
    font-weight: bold;
    text-align: right;
    padding-bottom: 20px;
    padding-left: 10px;

  }
  tr {
    margin-bottom: 10px;
  }
  td {
    font-size: 1.5rem;
    text-align: right;
  }
  input {
    height: 25px;
    width: 100px;
    text-align: right;
    font-size: 1.25rem;
    padding: 10px 2px;
  }
`;

export default BasicTable;
