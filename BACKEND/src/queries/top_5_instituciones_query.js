const get = "MATCH (i:Investigador)-[:PARTICIPA_EN]->(p:Proyecto) WITH i.institucion AS Institucion, COUNT(DISTINCT p) AS CantidadProyectos RETURN Institucion, CantidadProyectos ORDER BY CantidadProyectos DESC LIMIT 5;"

//const get = "MATCH (i:Investigador)-[:PARTICIPA_EN]->(p:Proyecto) WHERE p.titulo_proyecto CONTAINS 'Investiga' WITH i.institucion AS Institucion, COUNT(DISTINCT p) AS CantidadProyectos RETURN Institucion, CantidadProyectos ORDER BY CantidadProyectos DESC LIMIT 5;"


module.exports = {
    get
}
