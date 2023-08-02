import { AppContainer } from './styles';

const OutLayout = ({ children }: any) => {
  return <AppContainer sx={{ flexGrow: 1 }}>{children}</AppContainer>;
};

export default OutLayout;
