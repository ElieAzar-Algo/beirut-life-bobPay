import { useSearchParams } from 'react-router-dom';
import useBobPay from './hooks/useBobPay';

function App() {
  const [searchParams] = useSearchParams();
  const sid = searchParams.get('session_id');
  const premium = searchParams.get('premium');
  const insured = searchParams.get('insured');
  const currency = searchParams.get('currency');
  const title = searchParams.get('title');
  const { createCheckout } = useBobPay();

  // useEffect(() => {
  //   setTimeout(() => createCheckout(sid), 2000);
  // }, [createCheckout, sid]);

  return (
    <div className="container">
      <div style={{ fontWeight: 'bold', fontSize: 20, marginBottom: 20 }}>
        Payment Method: using BoB PayGate
      </div>
      <div>Policy Title: {title}</div>
      <div>Premium: {premium}</div>
      <div>Insured: {insured}</div>
      <button
        type="button"
        className="btn-style"
        disabled={!sid}
        onClick={() => createCheckout(sid)}
      >
        Pay {currency} {premium}
      </button>
    </div>
  );
}

export default App;
