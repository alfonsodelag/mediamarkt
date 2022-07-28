class Validators {
  static validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
}
class Field extends React.Component {
  state = {
    value: this.props.value,
    error: false,
  };

  static propTypes = {
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    type: PropTypes.string,
    icon: PropTypes.string,
    onChange: PropTypes.func,
    validate: PropTypes.func,
  };

  getDerivedStateFromProps(nextProps) {
    return { value: nextProps.value };
  }

  onChange = ({ target: { value: value } }) => {
    const name = this.props.name;
    const error = this.props.validate ? this.props.validate(value) : false;

    this.setState({ value, error });

    this.props.onChange({ name, value, error });
  };

  render() {
    return (
      <div className="input-addon">
        <input
          value={this.state.value}
          onChange={this.onChange}
          name={this.props.name}
          className="form-element input-field"
          placeholder={this.props.placeholder}
          type={this.props.type}
        />
        <button className="input-addon-item">
          <span className={`fa ${this.props.icon}`}></span>
        </button>
        <span class={this.state.error ? "" : "hidden"}>{this.state.error}</span>
      </div>
    );
  }
}

class SignupFormComponent extends React.Component {
  state = {
    fields: {
      name: "",
      email: "",
      password: "",
      passwordRetype: "",
    },
    errors: {},
  };

  handleChange = ({ name, value, error }) => {
    const fieldInput = name;
    const fields = Object.assign({}, this.state.fields);
    fields[fieldInput] = value;
    this.setState({ fields });
  };

  handleFormSubmit = (evt) => {
    evt.preventDefault();

    // Here I'll send this info to the backend
  };

  validateForm = ({ name, email, password, passwordRetype }) => {
    const errors = {};
    if (!name) errors.name = "Name is required";
    if (!email) errors.email = "Email is required";
    if (!password) errors.password = "Password is required";
    if (password && !passwordRetype)
      errors.retypePassword = "You need to confirm the password";
    if (password !== passwordRetype)
      errors.notMatch = "Passwords must be equal";

    return Object.keys(errors).length !== 0;
  };

  render() {
    return (
      <div class="login-box">
        <h3 class="info-text">User Registration</h3>
        <form
          class="form-container"
          onSubmit={this.handleFormSubmit}
          novalidate
        >
          <Field
            name="name"
            icon="fa-user"
            type="text"
            value={this.state.fields.name}
            placeholder="Name"
            onChange={this.handleChange}
            validate={(val) => (val ? false : "Name required")}
          />
          <Field
            name="email"
            icon="fa-envelope"
            type="email"
            value={this.state.fields.email}
            placeholder="Email"
            onChange={this.handleChange}
            validate={(val) =>
              Validators.validateEmail(val) ? false : "Invalid email"
            }
          />
          <Field
            name="password"
            icon="fa-lock"
            type="password"
            value={this.state.fields.password}
            placeholder="Password"
            onChange={this.handleChange}
            validate={false}
          />
          <Field
            name="passwordRetype"
            icon="fa-lock"
            type="password"
            value={this.state.fields.passwordRetype}
            placeholder="Re-type password"
            onChange={this.handleChange}
            validate={false}
          />
          <input
            class="form-element is-submit"
            type="submit"
            value="Create User"
            disabled={this.validateForm(this.state.fields)}
          />
        </form>
        <p>
          Or if you already have an user <a href="#">login here.</a>
        </p>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <SignupFormComponent />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
