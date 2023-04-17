import { UserAuth } from "../context/AuthContext";

function Home() {
    const { logOut, user } = UserAuth();
  const handelLogoutClick = async () => {
    try {
      console.log(user);
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1>home page</h1>
      <button onClick={handelLogoutClick}>logout</button>
    </div>
  );
}

export default Home;
