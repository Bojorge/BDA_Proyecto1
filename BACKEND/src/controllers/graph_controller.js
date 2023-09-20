const database = require("../../database");
const queries = require('../queries/graph_query');

const get = async (request, response) => { // Marca la función como async
    const session = database.session();

    try {
        const result = await session.run(queries.get_all_graph);
        response.json(result.records.map((record) => record.get(0).properties));
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: "Error en la consulta" });
    } finally {
        session.close();
    }
}

module.exports = {
    get
}
