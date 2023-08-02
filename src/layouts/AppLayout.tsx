import Navbar from '../components/Navbar/Navbar';
import { AppContainer, MainBox, UpperBox } from './styles';

const AppLayout = ({ children }: any) => {
  return (
    <AppContainer sx={{ flexGrow: 1 }}>
      <UpperBox>
        <Navbar />
      </UpperBox>
      <MainBox>{children}</MainBox>
    </AppContainer>
  );
};

export default AppLayout;
