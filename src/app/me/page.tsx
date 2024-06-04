import { cookies } from "next/headers";
import accountApiRequest from "../ApiRequest/account";
async function Me() {
  const cookiesStore = cookies();
  const sessionToken = cookiesStore.get("sessionToken");
  const result = await accountApiRequest.me(sessionToken?.value);
  // status: 200,
  // payload: {
  //   data: { id: 5, name: 'duoc', email: 'u1@gmail.com' },
  //   message: 'Lấy thông tin thành công'
  // }
  return <div>
    <ul>
      <li>{result?.payload?.data?.name||""}</li>
      <li>{result?.payload?.data?.email||""}</li>
    </ul>
  </div>;
}

export default Me;
