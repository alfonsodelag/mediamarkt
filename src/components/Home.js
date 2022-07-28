import Heading from "./Heading";
import UserList from "./UserList";

const Home = ({ users }) => {
  return (
    <div>
      <Heading />
      <UserList users={users} />
    </div>
  );
};

export default Home;
