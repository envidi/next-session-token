import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputText = ({
  name,
  control,
  label,
}: {
  name: string;
  control: any;
  label: string;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <TextField
          helperText={error ? error.message : null}
          size='small'
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant='outlined'
          sx={{
            marginTop: '10px',
            marginBottom: '10px'
          }}
        />
      )}
    />
  );
};
