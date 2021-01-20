import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  background: ${props => props.theme.myColor.background };
  align-items: center;
  justify-content: center;
`

const Title = styled.Text`
  font-size: 60px;
  color: ${props => props.theme.myColor.line };
`


export { Container, Title };