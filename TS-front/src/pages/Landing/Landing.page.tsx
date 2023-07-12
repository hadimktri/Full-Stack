import { Container } from "@mantine/core";
import useBoundStore from "../../store/Store";

const Landing = () => {
  const { user } = useBoundStore((state) => state);

  return (
    <Container>
      {user ? (
        <h1>
          {" "}
          Welcome {user.name}.<img src={user.profileImage} />{" "}
        </h1>
      ) : (
        <>
          <h1> Welcome to the homepage.</h1>
          <h4> Please login to see the Posts.</h4>
        </>
      )}
    </Container>
  );
};

export default Landing;
