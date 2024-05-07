import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        age: 0,
        password: ""
    });

    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:5000/api/users/register", formData);
            toast({
                title: "Registro exitoso",
                description: `Usuario ${formData.first_name} ${formData.last_name} registrado correctamente!`,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate("/");
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Error desconocido";
            toast({
                title: "Error al registrar el usuario",
                description: errorMessage,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <div className="register-form">
            <h4 className="formTitle">Register!</h4>
            <form onSubmit={handleSubmit}>
                <div className="formField">
                    <input id="regname" type="text" placeholder="Nombre" className="formInput-field" name="first_name" value={formData.first_name} onChange={handleChange} required />
                </div>
                <div className="formField">
                    <input id="regSurn" type="text" placeholder="Apellido" className="formInput-field" name="last_name" value={formData.last_name} onChange={handleChange} required />
                </div>
                <div className="formField">
                    <input id="regemail" placeholder="Email" className="formInput-field" name="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="formField">
                    <input id="regAge" type="number" placeholder="Edad" className="formInput-field" name="age" value={formData.age} onChange={handleChange} required />
                </div>
                <div className="formField">
                    <input id="regpass" placeholder="Contraseña" type="password" className="formInput-field" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button className="formBtn" type="submit">Registrarse</button>
            </form>
            <Link to="/login" className="formBtn-link">Ya tienes una cuenta?</Link>
        </div>
    );
};

export default RegisterForm;
