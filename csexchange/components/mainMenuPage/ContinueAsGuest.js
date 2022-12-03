import { Button } from "react-bootstrap";
import Link from 'next/link';
const ContinueAsGuest = () => {
  return (
    <Button className="mt-5 w-55" variant="danger">
      <Link className="" href='/universities'>Continue As Guest</Link>
    </Button> 
  );
};

export default ContinueAsGuest;
