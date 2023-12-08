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

const LoginForm: NextPage = () => {
  return (
    <section className="self-stretch bg-text-white-op-100
                        flex flex-col items-center
                        justify-start
                        text-left text-base text-black font-poppins
                        py-3 px-3">
      <div className="relative">
        <div className="overflow-hidden
                        flex flex-col
                        gap-5">
          <div className="font-semibold
                          font-semibold font-poppins text-17xl
                          text-center text-black flex">
            Log In
          </div>
          <TextField
            className="[border:none] bg-[transparent]]"
            color="success"
            label="Email address"
            variant="outlined"
          />
          <TextField
            className="[border:none] bg-[transparent]"
            color="success"
            label="Password"
            variant="outlined"
          />
          <FormControlLabel
            className=""
            label="Remember me"
            control={<Checkbox color="success" defaultChecked />}
          />
          <div className="overflow-hidden flex flex-row items-center gap-10">
            <Button className="flex-1" color="success" variant="outlined">
              Log In
            </Button>
            <a className="[text-decoration:none] flex-1 relative text-left font-light text-[inherit]">
              Lost Your Password?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
