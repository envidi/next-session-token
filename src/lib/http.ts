type CustomOptions = RequestInit & {
  baseUrl?: string | undefined;
};
const ENITY_ERROR_STATUS = 422;
export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}
export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({ status, payload }: { status: 422; payload: any }) {
    super({ status, payload });
    if(status !== ENITY_ERROR_STATUS){
      throw new Error('EntityError must have status 422')
    }
    this.status  = status;
    this.payload = payload;
  }
}

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};
class SessionToken {
  private token = "";
  get value() {
    return this.token;
  }
  set value(token: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set token on server side");
    }
    this.token = token;
  }
}
export const sessionToken = new SessionToken();

async function request<Response>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  options?: CustomOptions | undefined,
) {
  const body = options?.body ? JSON.stringify(options?.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: sessionToken.value ? `Bearer ${sessionToken.value}` : "",
  };
  const baseUrl =
    options?.baseUrl === undefined ? "http://localhost:4000" : options?.baseUrl;
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;
  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  const payload = await res.json();
  const data = {
    status: res.status,
    payload,
  };
  if (!res.ok) {
    if(res.status === ENITY_ERROR_STATUS){
      throw new EntityError(data as {
        status : 422,
        payload : EntityErrorPayload
      })
    }else{
      throw new HttpError(data)
    }
  }
  if (["/auth/login", "/auth/register"].includes(url)) {
    sessionToken.value = payload?.data?.token || "";
  } else if (["/auth/logout"].includes(url)) {
    sessionToken.value = "";
  }
  return data;
}
const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined,
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};
export default http;
