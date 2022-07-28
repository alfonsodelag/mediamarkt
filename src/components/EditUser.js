import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";

const EditUser = ({ users, setUsers }) => {
  const [user, setUser] = useState({
    name: "",
    firstName: "",
    phone: "",
    street: "",
    city: "",
    postalcode: "",
    country: "",
    birthday: "",
    gender: "",
    nationality: "",
  });

  const { id } = useParams();

  useEffect(() => {
    console.log("idgg", id);
    if (id) {
      const userEdit = users.find(({ id: _id }) => _id == id);
      console.log("userEdit", userEdit);
      setUser(userEdit);
    }
  }, [users]);

  useEffect(() => {
    console.log("se modifico user", user);
  }, [user]);

  // const [name, setName] = useState(users[id].name);

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    // setUsers(users);
    try {
      await axios.put(`http://localhost:3001/users/${id}`, user);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Form className="p-4" onSubmit={onSubmit}>
      <FormGroup>
        <Label>Name</Label>
        {/* <Input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={name}
          onChange={onChangeInput}
        ></Input> */}
        <Input
          type="text"
          placeholder="Please write Name"
          name="name"
          value={user?.name}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
      <Link style={{ marginLeft: "5px" }} to="/" className="btn btn-danger">
        Cancel
      </Link>
    </Form>
  );
};

export default EditUser;
