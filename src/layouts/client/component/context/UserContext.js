import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [id, setId] = useState("");
  const Data = useMemo(() => ({ id, setId }));
  return <UserContext.Provider value={Data}>{children}</UserContext.Provider>;
}
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default UserContextProvider;
