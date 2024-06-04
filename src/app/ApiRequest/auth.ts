import http from "@/lib/http";

const authRequest = {
  login: (body: any) => http.post("/auth/login", body),
  register: (body: any) => http.post("/auth/register", body),
  auth: (body: { sessionToken: string }) =>
    http.post("/api/auth", body, {
      baseUrl: "",
    }),
};

export default authRequest;
