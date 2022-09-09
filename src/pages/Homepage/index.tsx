import { useAppSelector } from "../../hooks/state"
import { selectLoggedIn } from "../../redux/homepage/selectors"
import { Dossier } from "./Dossier"
import { Login } from "./Login"

export const Homepage = () => {
  const loggedIn = useAppSelector(selectLoggedIn)
  return loggedIn ? <Dossier /> : <Login />
}