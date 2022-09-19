import DataProteccionText from "../Components/DataProtectionText";

const DataProteccion = () => {
  return (
    <DataProteccionText
      companyName={"La Herradura Vinoteca"}
      website={"https://www.laherraduravinoteca.es"}
      email={"javierseiglie@gmail.com"}
      address={"Paseo de Extremadura 117, 28011. Madrid, España."}
      owner={"Marta Albasanz Herrero"}
      ownerAddress={"P° de Extremadura 117"}
      ownerDNI={"51683810G"}
      DataProteccionURL={
        "https://www.laherraduravinoteca.es/politica_de_privacidad"
      }
    />
  );
};

export default DataProteccion;
