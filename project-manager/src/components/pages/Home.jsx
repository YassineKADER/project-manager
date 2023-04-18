import { UserAuth } from "../context/AuthContext";
import { Navbar } from "../items/Navbar";

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
    <Navbar logout={handelLogoutClick} username={"yassine kader"}></Navbar>
      <h1>home page</h1>
    </div>
  );
}

export default Home;
