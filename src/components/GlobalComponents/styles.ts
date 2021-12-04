import { Animated } from 'react-native';
import styled from 'styled-components/native';

export const Header = styled.View`
  flex-direction: row;
  height: 20%;
  justify-content: center;
  align-items: center;
`

export const Container = styled.View`
  flex: 1;
  background: #8CA4FC;
  justify-content: center;
  
`;

export const Input = styled.TextInput`
  border-bottom-width: 1px;
  width: 100%;
`

export const Content = styled.View`
  flex: 1;
  max-height: 400px;
  z-index: 5;
`;

export const Card = styled(Animated.View)`
  flex: 1;
  background: #fff;
  border-radius: 4px;
  margin: 0 20px;
  margin-bottom: 30px;
  height: 80%;
  left: 0;
  right: 0;
  top: 0;
`;

export const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 30px;
`;

export const CardContent = styled.View`
  flex: 1;
  padding: 0 30px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 13px;
  color: #999;
  font-size: 30;
  font-weight: bold;
  font-family: 'Roboto';
  color: #fff;
`;

export const Description = styled.Text`
  font-size: 32px;
  margin-top: 3px;
  color: #333;
`;

export const CardFooter = styled.View`
  align-items: center;
  padding: 18px;
  border-radius: 4px;
`;

export const Annotation = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: #333;
`;

export const Form = styled.View`
  flex-direction: column;
  width: 100%;
`;

export const Btn = styled.Text`
  margin-top: 20px;
  border: 1px solid #8CA4FC;
  padding: 10px;
  width: 50%;
  text-align: center;
  border-radius: 5px;
`
export const Strong = styled.Text`
  font-weight: bold;
  color: #05377F;
`;