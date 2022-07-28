import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { v4 as uuid } from "uuid";
import axios from "axios";

const AddUser = () => {
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

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:3001/users`, { ...user, id: uuid() });
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const enviarDatos = async () => {
    try {
      const datoUsuario = {
        name: "aa",
        firstName: "b",
        phone: "cc",
        street: "d",
        city: "f",
        postalcode: "g",
        country: "h",
        birthday: "i",
        gender: "j",
        nationality: "k",
        id: uuid(),
      };
      await axios.post(`http://localhost:3001/users`, datoUsuario);
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  return (
    <Form onSubmit={onSubmit} className="p-4">
      <button
        onClick={() => {
          enviarDatos();
        }}
      >
        enviar data
      </button>
      <FormGroup>
        <Label>Name</Label>
        <Input
          type="text"
          placeholder="Please write Name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>First Name</Label>
        <Input
          type="text"
          placeholder="Please write your First Name"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Phone</Label>
        <Input
          type="text"
          placeholder="Please write your phone number"
          name="phone"
          value={user.phone}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Street</Label>
        <Input
          type="text"
          placeholder="Please write your street"
          name="street"
          value={user.street}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>City</Label>
        <Input
          type="text"
          placeholder="Please write your city"
          name="city"
          value={user.city}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Postal Code</Label>
        <Input
          type="text"
          placeholder="Please write your postal code"
          name="postalcode"
          value={user.postalcode}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Country</Label>
        <Input
          type="text"
          placeholder="Please write your country"
          name="country"
          value={user.country}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Birthday</Label>
        <Input
          type="text"
          placeholder="Please write your birthday"
          name="birthday"
          value={user.birthday}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Gender</Label>
        <Input
          type="text"
          placeholder="Please write your gender"
          name="gender"
          value={user.gender}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Label>Nationality</Label>
        <Input
          type="text"
          placeholder="Please write your nationality"
          name="nationality"
          value={user.nationality}
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

export default AddUser;
