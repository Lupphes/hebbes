import type { NextPage } from "next";
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  InputAdornment,
  Icon,
  IconButton,
} from "@mui/material";

const LoginCardForm: NextPage = () => {
  return (
    <section className="self-stretch bg-text-white-op-100 h-[760px] flex flex-col items-center justify-start py-[64.73745727539062px] px-0 box-border text-left text-base text-black font-poppins">
      <div className="relative bg-text-white-op-100 w-[608px] h-[630px]">
        <div className="absolute top-[47.3px] left-[91px] w-[427px] h-[537px] overflow-hidden">
          <div className="absolute top-[473px] left-[0px] w-[406px] overflow-hidden flex flex-row items-center justify-end gap-[31px]">
            <Button className="flex-1" color="success" variant="outlined">
              Log In
            </Button>
            <a className="[text-decoration:none] flex-1 relative font-light text-[inherit]">
              Lost Your Password?
            </a>
          </div>
          <FormControlLabel
            className="absolute top-[417.3px] left-[3px]"
            label="Remember me"
            control={<Checkbox color="success" defaultChecked />}
          />
          <TextField
            className="[border:none] bg-[transparent] absolute top-[90px] left-[3px]"
            color="success"
            label="Email address"
            sx={{ width: 424 }}
            variant="outlined"
          />
          <TextField
            className="[border:none] bg-[transparent] absolute top-[246.3px] left-[0px]"
            color="success"
            label="Password"
            sx={{ width: 424 }}
            variant="outlined"
          />
          <div className="absolute top-[0px] left-[2px] text-17xl font-semibold flex w-[200px] h-[54px] hover:font-semibold hover:font-poppins hover:text-17xl hover:text-left hover:text-black hover:flex hover:w-[200px] hover:h-[54px]">
            Log In
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginCardForm;
