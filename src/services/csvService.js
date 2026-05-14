// Creamos un documento js para poder exportar unas funciones que recibiran como parámetros la data de los filtros (filteredUsers)
export const exportUserCSV = (users) => {

    const headers =[
        "Name",
        "Email",
        "Gender",
        "Age",
        "Country"
    ] 

    const rows = users.map((user) => [
        `${user.name.fist} ${user.name.last}`,
        user.email,
        user.gender,
        user.dob.age,
        user.location.country,
    ]);

    const csvContent = [
        headers.join(","),

        ...rows.map((row) => row.join(",")),        //Spread para copiar
    ].join("\n");

    downloadCSV(csvContent);
};

const downloadCSV = (content) => {
    // Función para descargar el archivo
    const blob = new Blob(
        [content],
        {type: "text/csv;charset=utf-8;"}
    );
    //Creación del archivo y link para su descarga automática
    const url = URL.createObjectURL(blob);
    const link= document.createElement("a");
    link.href = url;

    link.setAttribute(
        "download",
        "users.csv"
    );
    document.body.appendChild(link);
    link.click();//Indicamos que descargue automáticamentea
    document.body.removeChild(link);
}