import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "../buzz-style.css";
import "./create-buzz-style.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    marginLeft: 30,
    height: 70,
    marginTop: 10,
    marginBottom: -10
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function SimpleSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    category: "",
    name: "categroy"
  });

  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  function handleChange(event) {
    props.handleCategory(event.target.value);
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
  }

  return (
    <React.Fragment>
      <FormControl variant="outlined" className={classes.formControl} required>
        <InputLabel ref={inputLabel} htmlFor="create-buzz">
          Category
        </InputLabel>
        <Select
          value={props.category}
          onChange={event => handleChange(event)}
          className="select-menu"
          required
          form="create-buzz"
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              name="category"
              required
              id="category"
            />
          }
        >
          <MenuItem value="Activity" active>
            Activity
          </MenuItem>
          <MenuItem value="Lost & Found">Lost & Found</MenuItem>
        </Select>
      </FormControl>
    </React.Fragment>
  );
}
