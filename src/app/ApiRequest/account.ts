import http from "@/lib/http";

const accountApiRequest = {
  me: (sessionToken: any) => http.get("/account/me", {
    headers : {
        Authorization: "Bearer " + sessionToken
    }
  }),
  meClient: () => http.get("/account/me"),
};

export default accountApiRequest;
