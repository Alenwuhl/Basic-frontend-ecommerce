import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, VStack, Heading, HStack, Text, useToast } from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "../Forms/LoginForm";

const CurrentUser = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/current", {
                    withCredentials: true,
                });
                console.log("response - ", response.data);

                if (response.data && response.data.fullName && response.data.email && response.data.role) {
                    setUser(response.data);
                    setError(null);
                } else {
                    setError("Respuesta no válida del servidor");
                    console.error("Respuesta no válida del servidor: ", response.data);
                }
            } catch (error) {
                console.error("Error al obtener el usuario actual", error);
                setError("Error al obtener el usuario actual");
            }
        };

        fetchCurrentUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        document.cookie.split(";").forEach((cookie) => {
            document.cookie = cookie.replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
        });
        navigate("/");
    };

    return (
        <Box p={4}>
            {error ? (
                <Box bg="red.100" p={4} rounded="md">
                    <Text color="red.700">{error}. Intenta nuevamente más tarde.</Text>
                </Box>
            ) : user ? (
                <Box bg="gray.100" p={4} rounded="md" shadow="md">
                    <VStack spacing={4} align="flex-start">
                        <Heading size="md">Información del Usuario</Heading>
                        <HStack>
                            <Text fontWeight="bold">Nombre Completo:</Text>
                            <Text>{user.fullName}</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Email:</Text>
                            <Text>{user.email}</Text>
                        </HStack>
                        <HStack>
                            <Text fontWeight="bold">Rol:</Text>
                            <Text>{user.role}</Text>
                        </HStack>
                        <Button colorScheme="red" onClick={handleLogout}>Cerrar Sesión</Button>
                        {user.role === "admin" && (
                            <Button colorScheme="blue" as={Link} to={`/users-control`} state={{ user }}>
                                Control de Usuarios
                            </Button>
                        )}
                    </VStack>
                </Box>
            ) : (
                <LoginForm />
            )}
        </Box>
    );
};

export default CurrentUser;
