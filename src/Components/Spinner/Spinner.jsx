import CircularProgress from "@mui/material/CircularProgress";
import './spinner.css';

function Spinner() {

  return (
    <div className="overlay">
      <CircularProgress />
    </div>
  );
}

export default Spinner;