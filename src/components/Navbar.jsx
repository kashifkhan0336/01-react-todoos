import { Box, Button, Container, Heading, HStack } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthContext from "../auth-context";
import { auth } from "../firebase-config";
import UtilityContext from "../utility-context";
import ToggleColorModeBtn from "./ToggleColorModeBtn";

const Navbar = () => {
  const utilityCtx = useContext(UtilityContext);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      await signOut(auth);
      navigate("/")
      authCtx.setUserStatus(false)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box p={3} boxShadow="lg">
      <Container
        maxW={utilityCtx.maxWidth}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as={RouterLink} size="lg" to="/home">
          Todoos!
        </Heading>
        <HStack>
          <ToggleColorModeBtn colorScheme={utilityCtx.colorScheme} />
          {!authCtx.userStatus && (
            <Button
              as={RouterLink}
              to="/"
              variant="outline"
              colorScheme={utilityCtx.colorScheme}
            >
              Login
            </Button>
          )}
          {!authCtx.userStatus && (
            <Button
              as={RouterLink}
              to="/register"
              colorScheme={utilityCtx.colorScheme}
            >
              Register
            </Button>
          )}
          {authCtx.userStatus && <Button onClick={onLogout} colorScheme={utilityCtx.colorScheme}>
            Logout
          </Button>}
        </HStack>
      </Container>
    </Box>
  );
};

export default Navbar;
