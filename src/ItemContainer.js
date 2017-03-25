import styled from 'styled-components';

export default styled.li`
  display: flex;
  flex-direction: column;
  width: ${props => props.size};
  overflow: hidden;
`;
