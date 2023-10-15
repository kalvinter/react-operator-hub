import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import { buttonType } from "../components/common/Button";


export default function NotFoundPage() {

  return (
    <div className="App container h-[100vh]">
        <div className="main-card flex justify-center flex-col items-center" id="error-page">
          <h1 className="mb-6 w-full text-center">404 Page not Found</h1>

            <Link to={`/react-reactor-game/`}>
              <Button 
                  buttonType={buttonType.neutralButton}
                  label={"Back to Home"}>
              </Button>
            </Link>

        </div>
    </div>
  );
}