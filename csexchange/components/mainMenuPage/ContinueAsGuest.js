import { Button } from "react-bootstrap";
import Link from "next/link";
const ContinueAsGuest = () => {
  return (
    <Link className="" href="/universities" passHref legacyBehavior>
      <Button className="mt-5" size="lg" variant="danger">Continue As Guest</Button>
    </Link>
  );
};

export default ContinueAsGuest;
