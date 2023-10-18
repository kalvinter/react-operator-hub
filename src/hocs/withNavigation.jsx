
import { useNavigate } from "react-router-dom";

export default function withNavigation(WrappedComponent) {
    return function(props) {
      const navigate = useNavigate();
      return <WrappedComponent {...props} navigate={navigate} />;
    };
  }
