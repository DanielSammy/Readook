import io from "socket.io-client";
import Global from "../components/screens/Global";

export const socket = io(`http://${Global.ipBancoDados}:${Global.portaBancoDados}`);