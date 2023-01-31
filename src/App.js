import "./styles.css";
import { v4 as uuidv4 } from "uuid";

var jws = require("jws");

export default function App() {
  const connectedAppClientId = "6a7ffa3f-8232-4873-ace5-acc96e335314";
  const connectedAppSecretId = "6b174e9a-1155-49cb-b172-7991cbc8ec05";
  const connectedAppSecretKey = "7g1Td6NePScONBwjuSwvANWWKFAuCe0M7SGlSN9LEdA=";
  const userName = "ryan.crawford@brighterion.com";
  let data = {
    iss: connectedAppClientId,
    exp: Math.floor(Date.now() / 1000) + 100,
    jti: uuidv4(),
    aud: "tableau",
    sub: userName,
    scp: ["tableau:views:embed", "tableau:metrics:embed"]
  };
  let header = {
    alg: "HS256",
    typ: "JWT",
    kid: connectedAppSecretId,
    iss: connectedAppClientId
  };

  const token = jws.sign({
    header: header,
    payload: data,
    secret: connectedAppSecretKey
  });
  //console.log(token);
  //console.log(uuidv4()),
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <tableau-viz
        id="tableauViz"
        src="https://prod-useast-a.online.tableau.com/t/murrayslanding/views/AssetManagementandEnergyEfficiencyPlatform/Dashboard1"
        token={token}
        toolbar="hidden"
        iframeSizedToWindow="true"
      ></tableau-viz>
    </div>
  );
}
