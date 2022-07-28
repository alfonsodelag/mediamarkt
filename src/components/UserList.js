import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import axios from "axios";

const UserList = ({ users }) => {
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`, users[id]);
      users = users.filter(({ id }) => id != id);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("users: ", users);

  return (
    <div className="mt-4">
      {users.length > 0 ? (
        <>
          <table className="w-100 border" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                <td>Last Name</td>
                <td>First Name</td>
                <td>Phone</td>
                <td>Street</td>
                <td>City</td>
                <td>Postal Code</td>
                <td>Country</td>
                <td>Birthday</td>
                <td>Gender</td>
                <td>Nationality</td>
                <td className="text-center">Options</td>
              </tr>
            </thead>
            {users.map((user) => (
              <thead key={user.id}>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.firstName}</td>
                  <td>{user.phone}</td>
                  <td>{user.street}</td>
                  <td>{user.city}</td>
                  <td>{user.postalcode}</td>
                  <td>{user.country}</td>
                  <td>{user.birthday}</td>
                  <td>{user.gender}</td>
                  <td>{user.nationality}</td>
                  <td>
                    <div className="d-flex justify-content-around">
                      <Link className="btn btn-warning" to={`/edit/${user.id}`}>
                        Edit
                      </Link>
                      <Button
                        onClick={() => deleteUser(user.id)}
                        color="danger"
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              </thead>
            ))}
          </table>
        </>
      ) : (
        <h4 className="text-center">No Users. Please add a new user</h4>
      )}
    </div>
  );
};

export default UserList;
