import React, { useState } from "react";

function FormValidation() {
  const [profile, setProfile] = useState({
    name: "",
    age: "12",
    address: {
      city: "",
    },
  });

  const [errors, setErrors] = useState({});

  function validate() {
    const newErrors = {};

    if (!profile.name) newErrors.name = "Enter name";
    if (!profile.age) newErrors.age = "Enter age";
    if (!profile.address.city)
      newErrors.address = {
        ...newErrors.address,
        city: "Enter city",
      };

    // if (!profile.address.city)
    //   newErrors = {
    //     ...newErrors,
    //     address: {
    //       city: "enter city",
    //     },
    //   };

    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      console.log(validationErrors, "validationErrors");
      setErrors(validationErrors);
      return;
    }

    console.log("✅ Submitted:", profile);

    return;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setProfile((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setProfile((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // clear error on typing
    setErrors((prev) => ({ ...prev, [name]: null }));
  };
  return (
    <div className="playground">
      <h1>Form Validation</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Enter name"
          style={{ display: "block" }}
          value={profile.name}
          onChange={handleChange}
          name={"name"}
        />
        <span>{errors.name}</span>
        <div>
          <input
            placeholder="Enter age"
            style={{ display: "block", width: "300px" }}
            value={profile.age}
            onChange={handleChange}
            name={"age"}
          />
          {errors.age}
        </div>

        <input
          name="address.city"
          placeholder="Enter city"
          value={profile.address.city}
          onChange={handleChange}
        />
        <span>{errors?.address?.city}</span>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default FormValidation;
