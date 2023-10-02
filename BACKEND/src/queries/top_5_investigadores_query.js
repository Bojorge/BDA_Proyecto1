const get = "MATCH (i:Investigador)-[:PARTICIPA_EN]->(p:Proyecto) WITH i, COUNT(p) AS cantidad_proyectos RETURN i.nombre_completo AS nombre, i.institucion AS institucion, cantidad_proyectos ORDER BY cantidad_proyectos DESC LIMIT 5;"

//const get = "MATCH (i:Investigador)-[:PARTICIPA_EN]->(p:Proyecto) WHERE p.titulo_proyecto CONTAINS 'Investiga' WITH i, COUNT(p) AS cantidad_proyectos RETURN i.nombre_completo AS nombre, i.institucion AS institucion, cantidad_proyectos ORDER BY cantidad_proyectos DESC LIMIT 5;"


module.exports = {
    get
}
