import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Table, Button, Select, Tbody, Th, Thead, Tr, Td, useToast, Box, Heading, VStack, HStack
} from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";

const UsersControl = () => {
    const [users, setUsers] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = location.state || {};
    const toast = useToast();

    useEffect(() => {
        if (!user || user.role !== "admin") {
            navigate("/"); 
        } else {
            fetchUsers();
        }
    }, [user, navigate]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/users");
            setUsers(response.data);
            setSelectedRoles(response.data.reduce((acc, user) => ({
                ...acc, [user._id]: user.role
            }), {}));
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudieron cargar los usuarios",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const changeUserRole = async (uid, newRole) => {
        try {
            const response = await axios.post(`/api/users/role/${uid}`, { newRole });
            toast({
                title: "Éxito",
                description: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            fetchUsers(); 
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.error || "No se pudo cambiar el rol del usuario",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const deleteUser = async (uid) => {
        try {
            const response = await axios.delete(`/api/users/user/${uid}`);
            toast({
                title: "Éxito",
                description: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            fetchUsers();
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.error || "No se pudo eliminar al usuario",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const deleteInactiveUsers = async () => {
        try {
            const response = await axios.delete("/api/users/deleteInactiveUsers");
            toast({
                title: "Éxito",
                description: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            fetchUsers();
        } catch (error) {
            toast({
                title: "Error",
                description: error.response?.data?.error || "No se pudieron eliminar los usuarios inactivos",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const handleRoleChange = (uid, newRole) => {
        setSelectedRoles(prev => ({
            ...prev,
            [uid]: newRole
        }));
    }

    return (
        <VStack spacing={4} align="flex-start">
            <Heading size="md">Control de Usuarios</Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Email</Th>
                        <Th>Rol</Th>
                        <Th>Acción</Th>
                        <Th>Eliminar</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map(user => (
                        <Tr key={user._id}>
                            <Td>{user.first_name} {user.last_name}</Td>
                            <Td>{user.email}</Td>
                            <Td>
                                <Select
                                    value={selectedRoles[user._id]}
                                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="premium">Premium</option>
                                    <option value="admin">Admin</option>
                                </Select>
                            </Td>
                            <Td>
                                <Button
                                    colorScheme="blue"
                                    onClick={() => changeUserRole(user._id, selectedRoles[user._id])}
                                >
                                    Cambiar de rol
                                </Button>
                            </Td>
                            <Td>
                                <Button
                                    colorScheme="red"
                                    onClick={() => deleteUser(user._id)}
                                >
                                    Eliminar
                                </Button>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <HStack>
                <Button colorScheme="red" onClick={deleteInactiveUsers}>
                    Eliminar Usuarios Inactivos
                </Button>
            </HStack>
        </VStack>
    );
};

export default UsersControl;
