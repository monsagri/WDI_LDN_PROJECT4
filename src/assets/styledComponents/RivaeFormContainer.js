import styled from 'styled-components';

const RivaeFormContainer = styled.div`
  margin: 10vh auto;
  display: flex;
  justify-content: center;
  width: 70vw;
  font-size: 3rem;
  form {
    flex-basis: 80%;
    input{
      height: 70px;
      font-size: 1.5rem;
    }
    button {
      margin-top: 20px;
      height: 75px;
      width: 150px;
      font-size: 2rem;
      left: calc(100% - 150px);
    }
  }
`;

export default RivaeFormContainer;
