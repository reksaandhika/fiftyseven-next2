import { withRegisterRoute } from '../routing';

const sliderHeight = 250;

function Test() {
  const ref = useRef();

  return (
    <Page>
      <Container
        style={{ padding: '200px 0 0 0' }}
      >
      </Container>
    </Page>
  );
}

export default withRegisterRoute(Test, { route: '/test', name: 'Test' });
