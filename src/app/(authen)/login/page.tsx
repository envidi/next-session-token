"use client";
import authRequest from "@/app/ApiRequest/auth";
import { FormInputText } from "@/app/component/FormInputText";
import { sessionToken } from "@/lib/http";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function Login() {
  const router = useRouter()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: any) => {
    try {
      const result = await authRequest.login(values);      
      await authRequest.auth({ sessionToken: result?.payload?.data?.token });
      router.push('/me')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} action=''>
        <FormInputText name='email' label='Email' control={control} />
        <FormInputText name='password' label='Password' control={control} />
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
    </Box>
  );
}

export default Login;
