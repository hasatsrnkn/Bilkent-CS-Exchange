import { Button } from "react-bootstrap";
import Link from "next/link";
import { loadingActions } from "../../store/loading";
import { useDispatch } from "react-redux";


const ContinueAsGuest = () => {

  const dispatch = useDispatch();

  const loadingHandler = () => {
    dispatch(loadingActions.setIsLoading())
  }

  return (
    <Link className="" href="/universities" passHref legacyBehavior>
      <Button className="mt-5" size="lg" variant="danger" onClick={loadingHandler}>Continue As Guest</Button>
    </Link>
  );
};

export default ContinueAsGuest;
